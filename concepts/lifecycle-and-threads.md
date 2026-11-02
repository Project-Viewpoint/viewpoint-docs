# Lifecycle & threads

> The states of a package, what runs when, and on which thread.

## The states

Each package has one state at a time. The card shows it. Viewpoint compares a package with this installation when it finds it.

| State | Meaning |
| --- | --- |
| **Incompatible** | Its game, Viewpoint or API range does not agree with this installation. You cannot switch it on. The card names the range. For a Shaderpack: **Incompatible: requires its base**. |
| **Refused** | Its descriptor or its files are wrong, or its `requires` make a cycle. You cannot switch it on. The card gives the cause. |
| **Inactive** | It can run, and it is off. A new package starts in this state. If something stops it, for example a package that it requires is off, the card says what. |
| **Waiting for \<package\>** | A Shaderpack that builds on another package that is not active. It starts when the other package is active. |
| **Checking** | Viewpoint reads the jar and checks its signature in the background. The package goes on when this is done: it asks for consent, or starts if the consent covers it. |
| **Awaiting consent** | The player clicked the green tick. Viewpoint checked the package and shows the consent dialog. |
| **Activating** | Viewpoint prepares the entry class and runs `enable`. |
| **Active** | Running. |
| **Active: hooks pending** | Running. Its hooks wait for the next safe point. |
| **Deactivating** | `disable` runs, and Viewpoint closes the registrations. |
| **Lingering** | Off, but Java has not yet released its classes from memory. The card shows **Inactive**. |
| **Failed** | It did not load, `enable` failed, or its hooks did not install. The card gives the cause. |
| **Suspended** | Stopped for this session. A handler threw an exception, or the server does not list the mod of a `side=gameplay` addon. |
| **Needs an update** | The addon uses a member of Viewpoint that Viewpoint has removed. The card names the member and the replacement, or says that nothing replaces it. See [Hooking Viewpoint](https://project-viewpoint.github.io/viewpoint-docs/patching/hooking-viewpoint.md#removed-members). |

A resource pack and a Shaderpack use the same states, but not the states that are about code.

## When Viewpoint finds packages

Viewpoint reads the game's mod list once, when the game starts. This list stays the same for the session. Addons
stay loaded when the player joins a server.

Viewpoint looks for packages at these times:

- when the game starts;
- when the player opens the **Addons** page or the **Resource Packs** page;
- when the player clicks **Rescan**.

A package that Viewpoint finds for the first time is always **Inactive**.

## The start of the game

If an enabled addon has the `lua` permission and gives functions to Lua, Viewpoint must start it before the Lua of the
mods runs. At the start of the game, Viewpoint checks and starts these addons, and it waits for them. The wait has a
short limit (about 5 seconds) in all. The screen shows the message "Viewpoint is checking N addons" during the wait.

- An addon that is ready before the limit has its Lua functions when the Lua of the mods starts.
- An addon that is not ready at the limit starts at the first frame. Its Lua functions come late. The card says "its Lua
  functions came late at this start".
- Viewpoint checks the addons that give functions to Lua first.
- When a world loads, or when the player returns to the menu, the functions install again, with no wait.

Keep your addon small and fast to load. A jar that is large or slow can miss the limit.

## Enabling

When the player switches an addon on, Viewpoint does these steps on the main thread:

1. It reads and checks the jar.
2. It compares the addon with the player's consent. If the addon asks for more than before, the player must give
   consent again.
3. It loads the classes from the bytes of the jar that it checked, in a class loader of the addon's own. It starts
   an addon only from a jar that is the same as the one that it checked. If the file on disk changed after the check
   and Viewpoint no longer has the bytes that it checked, the addon does not start: the card shows **Failed**, and
   Viewpoint checks the jar again when the player switches the addon on. No other addon shares a class with it.
4. It prepares the entry class and the class of each handler. If a static initialiser throws an exception, the enable
   fails.
5. It runs `enable(AddonContext)`. Each listener or callback that you register through the context gives you a `Registration`.
6. It puts your hooks in a queue for the next safe point.

If a step fails, Viewpoint closes your registrations in reverse order. The addon goes to **Failed** or **Inactive**. The
game does not change.

### Safe points

Viewpoint installs and removes hooks only at safe points, on the main thread:

- in the main menu;
- while a world loads;
- in a paused single-player game, with the game window open.

On a server, only the main menu and the loading screen are safe points. The card then shows *applies at the main menu*.
Between the switch-on and the next safe point, the state is **Active: hooks pending**.

To know when your hooks are installed, use one of these:

- `ctx.hooksLive()` tells you if they are installed now.
- `ctx.onHooksLive(Runnable)` calls your code when they are installed.

## Disabling

When the player switches the addon off:

1. Viewpoint runs your `disable()`, if you wrote one.
2. Viewpoint closes each `Registration` in reverse order. It does this also if `disable` throws an exception.
3. Viewpoint frees the buffers, textures and programs that you made with `Gpu`.
4. Viewpoint removes your hooks at the next safe point.

`disable` is optional. If you get all your resources as a `Registration`, you do not have to write it.

If another addon has your addon in `requires`, Viewpoint first asks to switch that addon off. When a Shaderpack builds on
your package, it waits for the package to come back.

The addon is **Lingering** until Java releases your classes from memory. Its card shows it as **Inactive**. If Java still
holds them one minute after the addon closed, Viewpoint writes a line with the id of the addon to `console.txt`. In
`disable`, remove everything of your addon from places outside it, for example from lists of the game. If something still
refers to your classes, the addon stays **Lingering** until the game restarts, and `console.txt` has that line.

Three things keep your classes in memory that Viewpoint cannot clear for you. Do these in `disable`:

- **Stop your threads.** A thread that you start inside `enable` gets your addon as its context loader and holds it
  until the thread ends.
- **Clear your `ThreadLocal` values** on each thread that set one. A value of your class holds your classes.
- **Do not keep your objects outside your addon.** This includes a `ClassValue`, a listener that you gave to the game, and
  a list of another addon.

## Updates

A loaded addon keeps the jar that it loaded, in memory. If the files on disk change, also if only the jar changes, the
card shows a dot and *update available, applies at next enable or restart*. The next enable reads the new jar and compares it with the player's consent. An
update that asks for more never starts without the player's consent. This is also true after a restart. See
[Updates & changelogs](https://project-viewpoint.github.io/viewpoint-docs/trust/updates-and-changelogs.md).

## Suspension

If a `Throwable` goes out of one of your handlers or callbacks, Viewpoint suspends the addon for the session. Viewpoint
writes this line and the stack trace to `console.txt`:

```text
[Viewpoint] addon example.lean suspended: <hook> threw ...
```

To try again, the player switches the addon on again.

The server's list of mods applies from the end of the connection's handshake, when the game has joined the server. Before
that, and after a join that failed, Viewpoint uses no list. When the server does not list the mod of a `side=gameplay`
addon, Viewpoint suspends the addon, and also each package that requires it. They start again when the player leaves the server or joins one that lists the mod, if the rules and the
player's consent still allow it. An addon that a handler suspended stays off for the whole session.

When Viewpoint suspends an addon, it releases each claim that the addon holds (camera, view, cursor, shot resolver and
reticle). The release happens at the start of the next frame. The frame that is being drawn keeps its values.

## Threads

Almost all of your code runs on the game's **main thread**:

- `enable` and `disable`;
- hook handlers (except `thread = ANY` and `thread = RENDER`, see below);
- view listeners, aim and shot listeners, camera layers and claims, and providers;
- services, and the calls of Lua to your exports;
- setting and key callbacks;
- the callbacks of a `Pending`;
- `ShaderValues.set`.

Viewpoint does file work, downloads and asset decoding on its own threads. You get each result on the main thread.

### The render thread

Your code runs on the render thread only in two places:

- a **draw callback**, which uses the `Gpu` object and a short list of OpenGL calls. See
  [Draw callbacks](https://project-viewpoint.github.io/viewpoint-docs/api/draw-callbacks.md) (planned);
- a hook with `thread = RENDER`, which can read and set values only. It cannot draw.

Viewpoint measures each of these calls. If one throws an exception, Viewpoint suspends the addon. Values from the main
thread, such as shader values and view poses, reach the render thread in a copy of the frame. You do not read game
objects on the render thread.

The javadoc of each public API method has a `@thread` tag. It tells you the thread that can call the method.

> **A handler that does not return stops the game**
>
> Your handlers run on the main thread, or on the render thread. If a handler loops forever, the game stops. Viewpoint
> cannot stop the handler.

### Hooks and other threads

A hook has `thread = MAIN` by default. If the game calls the hooked method from a different thread, Viewpoint **does
not run your handler**. The card counts the call as *skipped off-thread*. You can use `thread = ANY` for a handler that
reads only values. See [Managed patching](https://project-viewpoint.github.io/viewpoint-docs/patching/managed-patching.md#threads).

## Re-entry

While your handler runs, Viewpoint does not run your handlers again. If your handler calls a hooked method, the call
does not recurse into your handlers. The card counts these skipped calls.

---

Previous: [Descriptor](https://project-viewpoint.github.io/viewpoint-docs/concepts/descriptor.md) | Next: [Versions & compatibility](https://project-viewpoint.github.io/viewpoint-docs/concepts/versions-and-compatibility.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
