# Hooking Viewpoint

> Hook the methods of Viewpoint that are on the internals list. Which threads, which levels, and what happens when a member is removed.

> **This release**
>
> In this release you can hook a listed member of Viewpoint with a `MAIN` hook (a member that runs on the main thread) or
> with an `ANY` hook (a member that other threads call, with values only). A `RENDER` hook, for a member that runs on the
> render thread, comes with the renderer API; Viewpoint refuses it now.

An addon can hook some methods of Viewpoint itself, and read some of its members. This is for the cases where
`viewpoint.api` does not have what you need. Look at `viewpoint.api` first.

Viewpoint lets you use only the members on the [internals list](https://docs.projectviewpoint.org/reference/viewpoint-internals.md). It does not load a jar
that uses another member of Viewpoint.

## Use, hook and reflect

The list gives three ways to reach a member. Each has a rule.

| Way | Rule | Level |
| --- | --- | --- |
| **Hook** | You can hook a listed method of any access: public, protected, package or private. | The grade of the list |
| **Use** | You can call a method or read a field only when the member and its class are both public. | The grade of the list |
| **Reflect** | You can find a listed member by reflection. | Always Red |

- Viewpoint does not make code public for addons. A private method can be hooked, but not called.
- A write to a field of Viewpoint is refused. The message names the API that replaces the write, for example camera
  layers.
- A member can be **hook only**. You can hook it, but you cannot call it. The list says so.
- Every member has a grade: Amber or Red. An addon that uses or hooks a member is never Normal.
- The code that runs the hooks is never listed, so you cannot hook it. That is the classes `AddonHooks`, `AddonTrampoline`
  and `SiteId`, and the classes that Viewpoint makes for a typed hook while it runs.

## Declare the hook

Declare a hook on a Viewpoint method as you declare one on a game method. See
[Managed patching](https://docs.projectviewpoint.org/patching/managed-patching.md). The target is the class on the internals list. The method name and
the descriptor are the ones that the list gives for the member. Put the class in `hooks.targets`, as for a game class.
The consent dialog and the update list each hooked member of Viewpoint.

The kinds, `HookCall` and the order of handlers are the same as for game methods.

**Types.** Your jar cannot name a class of Viewpoint that is not public and listed. Thus a handler gets a Viewpoint object
as `Object`, and `call.self()` gives an `Object`. A typed handler takes only primitives, types of `viewpoint.api` and
game types. A Viewpoint object that passes through it arrives boxed.

## Threads

Each member on the list has a thread. The thread tells you which hook you can use.

| The list says | You can use |
| --- | --- |
| `main` | A `thread = MAIN` hook. |
| `render` | Only a `thread = RENDER` hook. Viewpoint refuses a `MAIN` hook on this member when it reads the jar. |
| `any` | A hook with `thread = MAIN`. It does not run when another thread calls the member, and the card counts that call as *skipped off-thread*. Or a hook with `thread = ANY`, on a member whose parameters and result are values only. |
| `worker` | Only a hook with `thread = ANY`. The handler takes values only. Viewpoint refuses a `MAIN` hook on this member when it reads the jar. |

A `RENDER` hook runs on the render thread. It can read and set the arguments and the return value. It cannot draw. It
cannot use `Gpu` or OpenGL. Viewpoint refuses a jar that does. A hook on a `render` member is Red.

The card lists the hooks on members of Viewpoint apart from the hooks on the game, and `console.txt` ends their line with
"(a member of Viewpoint)".

If Viewpoint calls the method on another thread than the hook expects, your handler does not run. The card counts the
call as *skipped off-thread*.

## Hot members

Some members run more than 1,000 times each frame. A hook on them is a **costly hook**, and the label is Amber. A typed
handler is much cheaper than a boxed one. See [Managed patching](https://docs.projectviewpoint.org/patching/managed-patching.md#typed-handlers).

## Replacements

For some of the most hooked members, `viewpoint.api` has a better way. Use it when you can.

| Member | Replacement |
| --- | --- |
| `ModelCapture.capture`, to put a model on a bone | `AttachmentProvider`. See [Model providers](https://docs.projectviewpoint.org/api/model-providers.md). |
| `PackGather.object` | `ModelProvider`. See [Model providers](https://docs.projectviewpoint.org/api/model-providers.md). |
| `Shaders.read` | Shader snippets, or a Shaderpack. See [Shader snippets](https://docs.projectviewpoint.org/api/shader-snippets.md) and [Shaderpack format](https://docs.projectviewpoint.org/shaderpacks/format.md). |
| `Eye.place` | Camera layers. See [Camera layers](https://docs.projectviewpoint.org/api/camera-layers.md). |

`AttachmentProvider` adds a model to a bone. It does not move a bone. This release has no API that changes the pose of a
character. A hook on `ModelCapture.capture` is the only way that Viewpoint lists, and its level is Red. An API for this is
planned for API 1.1.

## Removed members

Viewpoint changes in each release. A member that Viewpoint removes is marked **gone** in the list, with the release and
the replacement.

- An addon that uses or hooks a gone member shows **Needs an update**. The card says: "uses \<member\>, removed in
  \<release\>; use \<replacement\>", or "...; nothing replaces it". The addon does not start. It starts again when its
  author makes a new version that does not use the member.
- Some members are only **deprecated**. The addon works. The card shows the replacement and the Amber reason **uses
  deprecated internals**.
- A member whose descriptor changes is a gone member plus a new member.

Examples of members that are gone: `FP.snapshot` (use `ViewListener.onFrame`) and `SceneDrawer.drawCrosshair` (use
`ReticleProvider`, or the `crosshair` draw point). The page [Internals changes](https://docs.projectviewpoint.org/reference/internals-changes.md) lists the
changes of each release.

> **Caution**
>
> A listed member has no promise of stability. Test your addon after each Viewpoint release. A new member in an update
> needs the consent of the player again.

## Hooks of other addons

Viewpoint refuses a hook on a class of another addon. If you need an extension point, ask the author to publish a service.
See [Services](https://docs.projectviewpoint.org/api/services.md).

---

Previous: [Managed patching](https://docs.projectviewpoint.org/patching/managed-patching.md) | Next: [Migrating from ZombieBuddy](https://docs.projectviewpoint.org/patching/migrating-from-zombiebuddy.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
