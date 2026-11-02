# Managed patching

> Declare hooks into game methods. Viewpoint installs them at safe points, runs them in the player's order and lists them.

A **hook** connects a **handler** to a game method. A handler is a static method of yours. Viewpoint runs it when the
game method starts or ends. You declare the hook. Viewpoint installs it.

Viewpoint reads your hooks from the jar before it shows the consent dialog. It runs the hooks of all active addons in
the player's order. The player can see each active hook and veto it.

**Permission:** `hooks`, with each hooked class in `hooks.targets`. You can hook game methods and the listed methods of Viewpoint. See [Hooking Viewpoint](https://docs.projectviewpoint.org/patching/hooking-viewpoint.md). You cannot hook a class of another addon.

```properties
permissions=hooks
hooks.targets=zombie.characters.IsoPlayer
```

## Declare a hook

```java title="HookPart.java"
public final class HookPart {
    @Hook.After(target = "zombie.characters.IsoPlayer", method = "update", descriptor = "()V")
    public static void afterUpdate(HookCall call) {
        IsoPlayer player = (IsoPlayer) call.self();
        // observe the player once a tick
    }
}
```

- `@Hook.Before` runs before the game method. `@Hook.After` runs after it.
- Put the annotation on a `public static` method.
- The handler has one parameter, a `HookCall`, or it is a [typed handler](#typed-handlers) and takes the values of the call.
- You do not register the handler. Viewpoint finds the annotations when it reads the jar.

| Attribute | Meaning |
| --- | --- |
| `target` | The binary name of the class. It must be in `hooks.targets`. |
| `method` | The name of the method. |
| `descriptor` | The JVM descriptor of the method, for example `()V` or `(I)Z`. It selects the overload. |
| `kind` | What the handler can do: `OBSERVE` (the default), `ARGS`, `RETURN` or `SKIP`. |
| `thread` | `MAIN` (the default), `ANY` or `RENDER`. See [Threads](#threads). |

### Kinds

Each kind can do all that the kinds before it can do.

| Kind | The handler can |
| --- | --- |
| `OBSERVE` | Read the call: `self()`, `arg(i)`. In an `After`, also `returned()` and `thrown()`. |
| `ARGS` | Also change an argument before the game method runs: `setArg(i, value)`. |
| `RETURN` | Also replace the return value: `setReturn(value)`. |
| `SKIP` | Also stop the game method: `skip()`. A `Before` that calls `setReturn` also skips the method. |

If a handler does more than its kind lets it do, it gets an `IllegalStateException`, and Viewpoint suspends the addon.
The player gives consent to the kind. A stronger kind in an update needs consent again.

Use the weakest kind that does the work.

### Typed handlers

A handler with a `HookCall` boxes every argument. This costs about 50 nanoseconds a call. For a method that the game calls
very often, write a **typed handler**. It takes the values of the call as typed parameters, and it has no `HookCall`.
Viewpoint boxes nothing for it, and it makes no call record.

```java
@Hook.After(target = "zombie.characters.IsoPlayer", method = "update", descriptor = "()V")
public static void afterUpdate(IsoPlayer player) {
    // runs for each call, with the object that the method ran on
}
```

The parameters of a typed handler are these, in this order:

1. Optional: the object that the method runs on, for an instance method. It has the type of the class.
2. The parameters of the method, with their types.
3. Optional, in an `After` only: the result of the method, when it gives one.

A typed handler returns nothing, and it is a hook of kind `OBSERVE`: it reads the call and cannot change it. If a
handler must change an argument or the result, or skip the method, it takes a `HookCall`. A typed `After` runs when the
method returns. It does not run when the method throws. A typed handler with `thread = ANY` cannot take the object.

A parameter has the type that the method has. If the method's type is a class of Viewpoint, which your jar cannot name,
the parameter is `Object`. Viewpoint refuses a handler whose parameters do not fit, and the card tells why. A typed
handler on a method that the game calls more than 1,000 times each frame does not make a **costly hook**. A handler with
a `HookCall` there does.

A typed `After` sees the parameters as the method leaves them. If the method assigns to a parameter, the handler sees
the new value. A handler with a `HookCall` sees the values that the method was called with.

A typed handler must not call its own method, directly or through other code. It has no guard against a recursion: the
call ends in a `StackOverflowError`, and Viewpoint suspends the addon.

Two typed handlers of one method can be of two addons. If one handler on the method takes a `HookCall`, Viewpoint calls
the typed ones through the boxed path, and the method pays the cost of it again.

### `HookCall`

| Member | Use |
| --- | --- |
| `self()` | The object of the call. `null` for a static method. |
| `arg(i)`, `argCount()` | The arguments, boxed. |
| `returned()` | In an `After`: the return value, boxed, or `null`. |
| `thrown()` | In an `After`: the exception from the method, or `null`. Read only. |
| `setArg(i, v)`, `setReturn(v)`, `skip()` | Changes, as the kind lets you. |
| `state()`, `setState(o)` | A value that your `Before` keeps for your `After` of the same call. Only your handler sees it. |

`setArg` and `setReturn` check the type of the value against the method descriptor:

- For a primitive, give its exact wrapper type. Do not give `null`.
- For a reference, give an instance of the declared class.

If the type is not correct, your handler gets an `IllegalArgumentException`, and Viewpoint suspends the addon. The
incorrect value does not go to the game.

A hook with `thread = ANY` or `thread = RENDER` is installed where its thread fits the member (see [Threads](#threads)).
Viewpoint refuses one that does not fit when it reads the jar, so the player does not see a consent dialog for it.

A value that is an object of your own addon is not accepted either: the game would then keep your code, and your addon
could not unload. Viewpoint looks at the value, and at the elements of an array, a list, a set or a map one level inside
it. It does not look deeper, and it does not look inside a wrapper that is not a container (a `Thread`, a
`FutureTask`, an `Optional`). Do not hide an object of your addon in a wrapper to give it to the game: a hook that does
this is your bug, and Viewpoint cannot promise to find it.

## When the game calls a hooked method

1. **Start.** The `Before` handlers run, from the top of the Active column to the bottom.
2. If a handler **skips or replaces** the call, the handlers below it are *pre-empted*. Their `Before` and `After` do
   not run. The card counts them.
3. The game method runs, if no handler skipped it.
4. **End.** The `After` handlers run from bottom to top. The pre-empted handlers do not run.

If the game method **throws an exception**, the `After` handlers run, and `thrown()` gives the exception. They cannot
stop or replace the exception. Viewpoint ignores their changes to the return value. The exception goes on, with no
change.

Viewpoint keeps a copy of the handler list from the start of the call. A veto or a new order during the call does not
change which `After` handlers run for that call.

## Threads

Hooks run on the main thread by default. If a different thread calls the hooked method, **your handler does not run**.
The card counts *skipped off-thread*.

With `thread = ANY`, your handler runs on the thread that calls the method. Viewpoint accepts `thread = ANY` only when
both of these are true:

- Your handler does not call `self()`. If it does, `self()` throws an `IllegalStateException`, and Viewpoint suspends
  the addon. Your handler must not keep the `HookCall` or pass it to a lambda.
- Each parameter and the return type is a primitive, a boxed primitive or `String`.

A `thread = ANY` hook makes the label **Amber**. Your handler must not use game objects.

With `thread = RENDER`, your handler runs on the render thread. Use it only for a method of Viewpoint that the
[internals list](https://docs.projectviewpoint.org/reference/viewpoint-internals.md) marks as a render method. A `RENDER` handler can read and set the
arguments and the return value. It cannot use `Gpu` or OpenGL: Viewpoint refuses the jar when the handler's code, or a
method that it calls, can reach either. If the method is called on another thread, Viewpoint does not run the handler,
and the card counts the call. A `RENDER` hook makes the label Red.

## When a handler fails

| Event | Result |
| --- | --- |
| A `Throwable` goes out of a handler | Viewpoint suspends the addon for the session. `console.txt` gets `[Viewpoint] addon <id> suspended: <hook> threw ...` and the stack trace. The player switches the addon on again to try again. |
| Your handler calls a hooked method | Viewpoint does not run your handlers again during your handler. |
| A hook does not install | The addon is **Failed**. The card gives the cause. The game method does not change. |

## Cost

Viewpoint measures the time of your handlers, for each addon and each hook. The **Performance** tab of the card shows the
values. Viewpoint's profiler shows them under the group `ADDONS`.

| Mark | When | On the card |
| --- | --- | --- |
| **Slow hook** | One handler call takes more than 1 ms, or the handlers take more than 2 ms each frame for 60 frames | Flag |
| **Costly hook** | The game calls the method more than 1,000 times each frame, from any thread, and the handler is not typed | Flag |

Viewpoint finds these marks while the addon runs. Thus they are flags on the card, and they do not change the label that
the player sees before consent. A later release can add them to the label.

An addon with no active hooks adds no cost to the game.

A handler call with a `HookCall` costs about 50 nanoseconds. A method that the game calls 1,000 times each frame then adds
about 0.05 ms to each frame. Use a **costly hook** only if no other method gives you the event, and then write a typed
handler. A `RENDER` hook is also counted in the time of the render thread.

## When hooks install

Viewpoint installs and removes hooks only at **safe points** (see
[Lifecycle & threads](https://docs.projectviewpoint.org/concepts/lifecycle-and-threads.md#safe-points)). Until the next safe point, the state is *Active:
hooks pending*. Use `ctx.hooksLive()` or `ctx.onHooksLive(Runnable)` to know when your hooks are installed.

## The hook list

Viewpoint shows each active hook in four places:

- on the card, under **Hooks**, with a veto for each hook;
- in `console.txt`, for example `[Viewpoint] addon example.lean hook zombie.characters.IsoPlayer.update()V after active`
  (or `vetoed`);
- in the crash report;
- in Viewpoint's health line.

The player can veto a hook in **Info**, **Hooks**. The veto stops the handler at once, and Viewpoint keeps it for the
next start. The advice stays on the game's class until the next change of the hooks. A method whose hooks are all vetoed costs
the game a check and no more. When the
player switches an addon off, its handlers stop at once.

## What hooks cost

A hook costs nothing while no addon has one: Viewpoint does no work for hooks in a frame then. For an addon with hooks,
the profiler shows the time that the addon takes on the main thread each frame as `addon.<id>.mainMs` (its handlers and
its Lua exports), the time of its `ANY` handlers on other threads as `addon.<id>.workerMs`, and the time of Viewpoint's
own work for hooks in the group **Addons**. The time on other threads is sampled: one call in 16 on a site that the game
calls often. A method that is called from another thread than a `MAIN` hook expects costs one counter, and nothing
else. The card counts those calls under *skipped off-thread*, for each hook
of the method.

> **Note**
>
> You can keep your ZombieBuddy `@Patch` classes. Viewpoint reads them in an addon jar. See
> [Migrating from ZombieBuddy](https://docs.projectviewpoint.org/patching/migrating-from-zombiebuddy.md).

---

Previous: [Shader values](https://docs.projectviewpoint.org/api/shader-values.md) | Next: [Hooking Viewpoint](https://docs.projectviewpoint.org/patching/hooking-viewpoint.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
