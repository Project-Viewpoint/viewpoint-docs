# Migrating from ZombieBuddy

> Change a ZombieBuddy mod into an addon. Keep its @Patch classes, or write hooks.

A mod that loads Java through ZombieBuddy (`javaJarFile` in `mod.info`) is **Unmanaged**. Viewpoint cannot order it,
switch it off, check it, or show its hooks. When you change the mod into an addon, the player gets these controls. You
get a stable API in place of reflection into Viewpoint.

## What changes

| | ZombieBuddy mod (Unmanaged) | Addon |
| --- | --- | --- |
| Loaded by | ZombieBuddy, when the game starts | Viewpoint, when the player switches it on |
| Declared by | `javaJarFile` in `mod.info` | `jar=` in `addon.properties` |
| Player control | None in Viewpoint | Order, on and off, veto of each hook, no restart |
| Checked | No | Yes, with a label |
| Patches | `@Patch` classes, for the full session | `@Hook` handlers, or `@Patch` classes, installed at safe points |
| Access to Viewpoint | Reflection into `viewpoint.*` | `viewpoint.api`, and the members in the Viewpoint internals list |
| Lua | `@Exposer` | Exports. Viewpoint reads your `@Exposer.LuaClass` classes as exports, with the name as a requested global. |
| Files and network | All that Java can do | `AddonFiles` and `AddonDownloads` |

## Two methods

### 1. Keep your `@Patch` classes

Viewpoint reads ZombieBuddy `@Patch` classes in an addon jar. It runs them as hooks, so the player can order, veto and
see them. This is the fastest method. Viewpoint accepts only part of the `@Patch` features.

| ZombieBuddy | Becomes |
| --- | --- |
| `@Patch(className, methodName)` on the class | The target and the method of the hook. The class must be in `hooks.targets`. |
| `@Patch.OnEnter` | A `Before` hook |
| `@Patch.OnEnter(skipOn = true)` | A `Before` hook of kind `SKIP` |
| `@Patch.OnExit` | An `After` hook. It runs after a normal return. `onThrowable = Throwable.class` runs it after a throw also. |
| `@Patch.This`, `@Patch.Argument`, `@Patch.AllArguments`, `@Patch.Return` | `self()`, `arg(i)`, the arguments, `returned()` |
| `@Patch.Argument(readOnly = false)` and `@Patch.AllArguments(readOnly = false)`, in an `OnEnter` | A write to the parameter changes the argument that the method gets. The hook then has kind `ARGS`. |
| `@Patch.Return(readOnly = false)`, in an `OnExit` | A write to the parameter replaces the result of the method. The hook then has kind `RETURN`. |
| `@Patch.Local("name")` | A value that the `OnEnter` writes and the `OnExit` of the same patch reads, for the same call. |

Overloads match as in ZombieBuddy. If a patch method has no arguments, `strictMatch` controls the match: all overloads,
or only the overloads with no arguments. Viewpoint finds the overloads when the addon starts, in the game as it is, and
shows one hook for each. If the patch matches no overload, the addon does not start, and the card says why.

**Not accepted.** Viewpoint cannot run these as hooks:

- `isAdvice = false` (ByteBuddy's `MethodDelegation`);
- a class or a method name that is a pattern (`*`, or a regular expression between `/`): name one class and one method,
  and put the class in `hooks.targets`;
- a constructor (`<init>`);
- a write to `@This` (Viewpoint cannot change the object that a method runs on), and a write to an argument in an
  `OnExit` (the method has run);
- an `OnExit` with `suppress`, or with an `onThrowable` other than `Throwable.class`;
- an `OnEnter(skipOn = true)` that does not return a `boolean`;
- `@SuperCall` and `@SuperMethod`;
- writes to `@Thrown`;
- `warmUp` and `IKnowWhatIAmDoing`;
- ByteBuddy annotations used directly (`FieldValue`, `Origin`, `StubValue`).

A mod that needs one of these must stay a ZombieBuddy mod.

**Writes.** A write to a parameter takes effect when the advice returns, as in ZombieBuddy. If the advice writes an
argument and then reads it through `@AllArguments`, it sees the old value. A write counts when the advice puts another
object in the parameter, also one that equals the first (a copy of a list). If the call refuses one of the values that the
advice wrote (a value of a wrong type), Viewpoint puts back all the arguments, suspends the addon, and the method runs
with the arguments it was called with.

**Threads.** ZombieBuddy runs a patch on the thread that calls the method. Viewpoint does the same for a patch that is
fit for it: one that takes values only (`@Argument`, `@Return`, primitives and `String`), and not the object (`@This`) or
`@AllArguments`. It runs on any thread, as a hook with `thread = ANY` does, and the label is Amber: the same patch that you ran as a ZombieBuddy mod
shows an Amber line in an addon, and adding `@This` makes the hook run on the main thread only and the label Normal. A patch that reads
`@This` runs on the **main thread only**: where another thread calls the method, the patch does not run, and the card
counts the call as *skipped off-thread*. Check the methods that you patch: a chunk, a light or a sound accessor is often
called by workers.

**Checked when the addon starts.** Viewpoint reads the game and checks each advice against each overload that the patch
matches. If an advice asks for an argument that an overload does not have, or for a result of the wrong type or from a
method that gives none, or for an object of another class, the addon does not start, and the card names the parameter and
the overload. ZombieBuddy reports these as errors when it applies the patch. An advice that reads the result with an
`Object` parameter (`@Patch.Return Object result`) is not refused where an overload gives no result: as under ZombieBuddy, it
gets `null`. A `@Patch.Return` that writes, or one of a primitive type, is refused there.

A patch with no parameter at all, and not `strictMatch`, is applied to every overload of the method. The consent shows it
as one hook on any thread; the card shows each overload, and an overload that takes an object runs on the main thread only.

**A bridge method.** The compiler makes a bridge method for a covariant return. ZombieBuddy patches it as well as the
real method, so a patch can run twice for one call. Viewpoint leaves synthetic methods alone, and the patch runs once.
Count calls with this in mind.

**The pilot.** `pilotaddon` patches `IsoPlayer.update`, which the main thread calls. If a player installs both the
ZombieBuddy mod and the addon of the pilot, the patch runs twice: once from each.

### 2. Write `@Hook` handlers

Write each patch again as a `@Hook.Before` or `@Hook.After` method with a `HookCall` parameter. The change is small. The
kind of each hook is then clear, and the player sees what it can do. See [Managed patching](https://docs.projectviewpoint.org/patching/managed-patching.md).

```java title="Before: ZombieBuddy"
@Patch(className = "zombie.characters.IsoPlayer", methodName = "update")
public final class UpdatePatch {
    @Patch.OnExit
    public static void exit(@Patch.This IsoPlayer self) {
        Counter.tick(self);
    }
}
```

```java title="After: addon"
public final class UpdateHook {
    @Hook.After(target = "zombie.characters.IsoPlayer", method = "update", descriptor = "()V")
    public static void exit(HookCall call) {
        Counter.tick((IsoPlayer) call.self());
    }
}
```

## Your `@Exposer.LuaClass` classes

Viewpoint reads these classes as [Lua exports](https://docs.projectviewpoint.org/api/lua-exports.md), so the Lua of your mod can keep its names. The addon
needs the `lua` permission.

| In ZombieBuddy | In an addon |
| --- | --- |
| The public static methods of the class, and of its superclasses | The public static methods that your jar declares, its superclasses in the jar included. `@HiddenFromLua` keeps a method out. |
| `name = "A.B"` | The table `A` with `B` in it. Lua finds the class also as `Viewpoint.Addons["<id>"].B`. |
| A blank `name` | The simple name of the class, at the top level. |
| The global exists at once | The global exists only if `lua.globals` lists it (for `A.B`, list `A`). Without it, only `Viewpoint.Addons["<id>"]` works, and `console.txt` says so. |
| Public static fields | **Not exported.** Write a static method that returns the value. |
| Public constructors (`X.new`) | **Not exported.** Write a static method that makes the object, or a handle. |
| Instance methods | **Not exported.** Lua can call them only on an object it already has. |
| Overloads | **Refused.** Name each method differently, with `@LuaExport(name = "...")` if you need to. |
| Any argument that Kahlua can convert | A closed set of types. See [The types](https://docs.projectviewpoint.org/api/lua-exports.md#the-types). |

If a class has `@LuaExport` as well as `@Exposer.LuaClass`, Viewpoint reads it through `@LuaExport` only. The other
public static methods of the class are not exports, and its `@Exposer.LuaClass` name is not asked for as a global.
Viewpoint tells you this in `console.txt` (and on the card, when the card shows it): remove one of the two
annotations.

## What to use in place of what

Some code that works in a ZombieBuddy mod has a better place in an addon.

| In your ZombieBuddy mod | In an addon |
| --- | --- |
| `@Exposer` classes, so that Lua calls your Java | Exports with `@LuaExport`. Your `@Exposer.LuaClass` classes also work, in part (see above): the name is a *requested* global, and Viewpoint refuses it if another mod has it. Exports install within the start limit. See [Lua exports](https://docs.projectviewpoint.org/api/lua-exports.md). |
| A patch on `Shaders.read` that changes library GLSL | A shader snippet, or a Shaderpack. See [Shader snippets](https://docs.projectviewpoint.org/api/shader-snippets.md) and [Shaderpack format](https://docs.projectviewpoint.org/shaderpacks/format.md). |
| Reflection to read the view or the camera | `ViewState` on the main thread, and `FrameView` in a draw callback. See [View state](https://docs.projectviewpoint.org/api/view-state.md). |
| Writes to the look, the eye, the field of view or the view mode | Camera layers and claims. See [Camera layers](https://docs.projectviewpoint.org/api/camera-layers.md). |
| Hooks or reflection on the aim, the shot and the crosshair | `AimListener`, `ShotListener`, `ShotResolver` and `ReticleProvider`. See [Aim & shots](https://docs.projectviewpoint.org/api/aim-and-shots.md). |
| A patch on the choice of the model of an object or a character | `ModelProvider` and `AttachmentProvider`. See [Model providers](https://docs.projectviewpoint.org/api/model-providers.md). |
| Direct OpenGL calls | The `Gpu` object in a draw callback. See [Draw callbacks](https://docs.projectviewpoint.org/api/draw-callbacks.md) (planned). |
| A hook on another mod's classes | A service of that mod. See [Services](https://docs.projectviewpoint.org/api/services.md). |
| An installer jar that copies a shader pack | A Shaderpack. See [Migrating from Java](https://docs.projectviewpoint.org/shaderpacks/migrating-from-java.md). |

If `viewpoint.api` has no replacement for a member that you use, you can hook or call some members of Viewpoint itself.
See [Hooking Viewpoint](https://docs.projectviewpoint.org/patching/hooking-viewpoint.md).

## The procedure

1. Remove `javaJarFile` from `mod.info`. Keep `require=Viewpoint`. If `javaJarFile` stays, ZombieBuddy loads the jar.
2. Add `addon.properties`, with `jar=` and `entry=`. The `entry` class must implement `Addon`.
3. Add `permissions`. Add `hooks.targets`, `files.quotaMiB` and `downloads.hosts` as necessary.
4. Replace reflection into `viewpoint.*` with `viewpoint.api`. If the API does not have what you need, use or hook a
   member from the [Viewpoint internals list](https://docs.projectviewpoint.org/reference/viewpoint-internals.md). This gives an Amber or Red label.
5. Replace `java.io.File` with `AddonFiles`.
6. Replace `java.net` with `AddonDownloads`.
7. Remove all use of ZombieBuddy and ByteBuddy classes. Viewpoint does not load a jar that uses them.
8. Move the start-up code of your `Main` into `enable`. Viewpoint runs `enable` when the player switches the addon on.
9. Undo that work in `disable`, or get it as a `Registration`.
10. Switch the addon on, and read its label. Remove the items that the label names, if you can.
11. In your changelog, tell the player why you need the items that stay.

If you also keep a ZombieBuddy build of the mod, give the two builds different mod ids.

## Your label

Some code that works in a ZombieBuddy mod makes the label Amber or Red in an addon. Some code stops the jar from
loading, for example your own classes in a `zombie.*` package. See [Labels](https://docs.projectviewpoint.org/trust/labels.md) for what to use.

> **The ZombieBuddy policy applies**
>
> If the ZombieBuddy policy is `deny-new`, no addon with Java can start. See
> [ZombieBuddy policy & signatures](https://docs.projectviewpoint.org/trust/relation-to-zombiebuddy.md).

---

Previous: [Hooking Viewpoint](https://docs.projectviewpoint.org/patching/hooking-viewpoint.md) | Next: [Hookable targets & refusals](https://docs.projectviewpoint.org/patching/hookable-targets.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
