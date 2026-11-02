# Hookable targets & refusals

> The methods that an addon can hook, and the targets that Viewpoint refuses before the player sees a dialog.

You must declare the target class of each hook in the descriptor. The target must also be a class that Viewpoint lets
you hook. Viewpoint checks both when it reads the jar. Thus the player never sees a consent dialog for a hook that
cannot install.

## Declare the targets

Put the classes in `hooks.targets`, with commas between them:

```properties
permissions=hooks
hooks.targets=zombie.characters.IsoPlayer,zombie.iso.IsoGridSquare
```

Viewpoint refuses each `@Hook` whose `target` is not in this list. The list takes the classes of Viewpoint that are on
the [internals list](https://docs.projectviewpoint.org/reference/viewpoint-internals.md), as it takes game classes. A new class in the list needs the
player's consent again. For a class of Viewpoint, each new hooked member needs it also. See [Updates & changelogs](https://docs.projectviewpoint.org/trust/updates-and-changelogs.md).

## Refused targets

| Target | Reason |
| --- | --- |
| Viewpoint's classes and members that are not in the [Viewpoint internals list](https://docs.projectviewpoint.org/reference/viewpoint-internals.md) | Use `viewpoint.api`, or a member from the list. A hook on a listed member gives an Amber or Red label. See [Hooking Viewpoint](https://docs.projectviewpoint.org/patching/hooking-viewpoint.md). |
| Classes of another addon | Hooks on the code of another author cannot be ordered or checked. Ask the author to publish a [service](https://docs.projectviewpoint.org/api/services.md). |
| Java's classes | These are not the game's classes. |
| ZombieBuddy and ByteBuddy | These load and patch the game. |
| Game code that reads files or opens network connections, as far as Viewpoint can read it | Viewpoint does not let addons change it. |
| LWJGL, Kahlua and the other libraries in the game jar | These are not the game's code. They reach memory, native code and the Lua VM. |
| Constructors and static initialisers (`<init>`, `<clinit>`) | The object does not exist yet when the hook runs. |

Viewpoint decides some things only when it installs the hook, because it has to read the game for them: a method that is
not in this build, that is abstract or native, that is static when a typed handler takes the object, or that gives no
result when a typed handler takes the result. For a ZombieBuddy patch it also decides the overloads, and whether the advice
fits each of them, and whether a member of an overload is one that Viewpoint does not let an addon change. The consent
dialog is then already past. The card says **Failed**,
with the reason, and the game does not change.

If Viewpoint refuses a hook, the card shows the hook, the refusal and the reason. The addon stays **Inactive** until you
correct the jar.

Viewpoint can also refuse hooks on a game class that cannot take hooks together with Viewpoint's own changes. The card
then names the class.

## Good and bad targets

| Good | Bad |
| --- | --- |
| A method that the game calls one time each tick or less: an update, an event, a click. | A method that the game calls thousands of times each frame, for example a square accessor. It is a **costly hook**, unless the handler is [typed](https://docs.projectviewpoint.org/patching/managed-patching.md#typed-handlers). |
| A method with one clear overload, selected by its descriptor. | A method whose result depends on a different thread. |
| A hook that only reads. | A hook that skips a method that the game needs. |

## Threads

The game calls some methods from threads that are not the main thread. Viewpoint does not run a `thread = MAIN`
handler for those calls, and counts them. A method of Viewpoint that runs on the render thread takes only a
`thread = RENDER` hook. Viewpoint refuses a `MAIN` hook on it. See
[Managed patching](https://docs.projectviewpoint.org/patching/managed-patching.md#threads).

> **Caution**
>
> A new game build can change the target methods. Set `game.min` and `game.max` to the builds that you tested. If a target
> method is not in a new build, the hook does not install, and the card tells you.

---

Previous: [Migrating from ZombieBuddy](https://docs.projectviewpoint.org/patching/migrating-from-zombiebuddy.md) | Next: [Permissions](https://docs.projectviewpoint.org/trust/permissions.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
