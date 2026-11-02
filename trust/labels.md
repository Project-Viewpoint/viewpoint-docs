# Labels

> What makes a label Normal, Amber or Red, the extra lines of a card, and the texts that the player sees.

Each managed package has a label on its card. Viewpoint's automatic check sets the label when it loads the package. The
label tells what the check found in this version of the package. It is not a statement about the author.

## The three levels

| Level | Meaning |
| --- | --- |
| **Normal** | The code uses only `viewpoint.api` and the parts of Java and the game that Viewpoint accepts. The card shows no badge. |
| **Amber** | The code uses something that the player must look at. The card gives the reasons. |
| **Red** | The code can do things outside Viewpoint's control. The card gives the reasons. The addon stays off until the player allows it, with a second confirmation. |

One Red reason makes the label Red. One Amber reason, and no Red reason, makes the label Amber.

## Get a Normal label

- Use `viewpoint.api` and plain Java: maths, strings, collections, time.
- Use `AddonFiles` for files.
- Use `AddonDownloads` for downloads.
- Use `AddonAssets` for models, textures, sounds and data.
- Use services, camera layers, aim and shot listeners, providers and shader values for what they cover.
- Do your work on the main thread.
- Hook game methods with `thread = MAIN`, and keep the handlers fast.
- Extend only Java classes or `viewpoint.api` types, not game classes.

An addon that uses or hooks a member of Viewpoint from the internals list is never Normal.

## What makes a label Amber

The addon:

- starts background threads;
- sends multiplayer messages;
- calls Lua;
- uses parts of Java or the game that Viewpoint has not reviewed;
- extends a class that Viewpoint has not reviewed;
- has a hook with `thread = ANY`;
- has a **costly hook**: a hook on a method that the game calls very frequently;
- has a **slow hook**: a handler that takes too much time;
- **draws with OpenGL**: it has a draw callback, and it uses the `Gpu` object or the short list of OpenGL calls that
  Viewpoint allows;
- uses or hooks a member of Viewpoint that has the Amber grade in the
  [Viewpoint internals list](https://docs.projectviewpoint.org/reference/viewpoint-internals.md);
- uses a deprecated member of Viewpoint.

## What makes a label Red

The addon:

- reads or writes files outside its folder;
- opens network connections;
- uses reflection;
- starts programs;
- loads native code;
- defines classes;
- uses LWJGL beyond the allowed OpenGL calls: it can read and write any memory of the game;
- uses OpenGL directly, outside the draw callbacks and the allowed calls;
- stops the game process, or changes settings of the full Java process;
- uses game code that reads files or opens network connections;
- has a hook with `thread = RENDER`;
- uses or hooks a member of Viewpoint that has the Red grade in the
  [Viewpoint internals list](https://docs.projectviewpoint.org/reference/viewpoint-internals.md);
- links to the code of an addon that is Red. The reason reads **uses code of X (Red)**.

An addon that links to the code of another addon (with `requires` and `exports`) takes the highest level of the addons it
links to. See [Services](https://docs.projectviewpoint.org/api/services.md).

## What Viewpoint does not load

Viewpoint does not load a jar that breaks one of these rules. The card names the cause.

- Do not use ZombieBuddy or ByteBuddy. The one exception is the `@Patch` and `@Exposer.LuaClass` annotations, which
  Viewpoint reads and removes. See [Migrating from ZombieBuddy](https://docs.projectviewpoint.org/patching/migrating-from-zombiebuddy.md).
- Use only the members on the [Viewpoint internals list](https://docs.projectviewpoint.org/reference/viewpoint-internals.md), and only in the way that the
  list allows.
- Do not use a member that Viewpoint has removed (the card shows **Needs an update**).
- Do not make class loaders, and do not define classes.
- Do not declare native methods, and do not load native code (`System.load`, `System.loadLibrary`, `java.lang.foreign`).
- Do not use LWJGL calls that reach memory by its address: everything in `org.lwjgl.system` (`MemoryUtil`,
  `MemoryStack`, `Callback`, `Struct`), `PointerBuffer`, the `n`-prefixed functions, a `long` that is a pointer (for
  example in `glReadPixels`, `glDrawElements` and `glVertexAttribPointer`), and the calls that load a library. A `long`
  that is a size or an offset (`glBufferData`) is allowed. Other LWJGL calls are allowed but make the card Red.
- Do not put a class of the game, Java or a library in your jar under its own name.
- Do not ask for an agent or more access in the jar's manifest (`Class-Path`, `Launcher-Agent-Class`, `Add-Opens` and the like).
- Do not use a multi-release jar or a `module-info`.
- Do not put your classes in a package of Viewpoint, the game, ZombieBuddy or ByteBuddy.
- Do not write to a field of Viewpoint. Use the API that replaces the write, for example camera layers.

If the jar is too large or too complex for the check, the card shows **Cannot be checked**. The addon stays off. Make the
jar smaller and simpler.

## Resource packs and Shaderpacks

A resource pack has no Java. Viewpoint reads its files with its own loaders. If a file is not correct, the card tells
you which one.

A Shaderpack has no Java also. Its label says that it is graphics code only, and it shows the licence. Viewpoint checks
the size and the form of the code. It does not check what the code computes.

## The extra lines of a card

Some cards have a line below the label. These lines do not change the level.

**The Lua line.** Each label has a last line about Lua. Viewpoint does not check Lua.

- **Has Lua: not checked by Viewpoint**, then the names of some functions that Viewpoint found in the Lua. Examples are
  `getModFileWriter`, `getHostByName`, or use of the clipboard. The names are in the text "Found in it:";
- or **No Lua**.

**The export line.** An addon that gives Java functions to Lua adds a text to the Lua line. The text says that any mod's
Lua can call N functions of its Java. The card lists what they use. An export does not raise the level. If one of the functions can reach
something that is Red, the reason reads "…, callable from any mod's Lua". The text counts the functions that the exports
call. It does not count code that runs when a class loads, or an object that the addon stored for later.

**The shader line.** A card of a Shaderpack, and of an addon with shader snippets or `Gpu` programs, has the shader line.
See the texts below.

**Draws over the whole screen.** The card of an addon that draws at the `final` point or the `crosshair` point says this.
A drawing at the `final` point can cover the whole screen. A drawing there can hide the game.

## The texts that the player sees

**Normal** has no badge. Its tooltip is:

> Checked by Viewpoint. This addon's Java code uses only parts of Java, the game and Viewpoint that Viewpoint has reviewed. Viewpoint found no way for it to reach your files outside its own folder, the internet, other programs or native code. It can still change anything in your game and saves. In multiplayer, what it puts into the game is sent to the server. The mod's Lua scripts are not checked. Its assets are checked for their form and size, not for what they do.

**Amber**:

> Uses things Viewpoint has not reviewed: \{background threads · multiplayer messages · Lua · draws with OpenGL · internals of Viewpoint · hooks that run on any thread · other parts of Java and the game · code of other addons\}. Viewpoint cannot tell what these lead to. Turn it on only if you trust the author.

**Red**, off until the player allows it:

> Can \{read and write your files · reach the internet · start programs · load native code · change the game's code · reach any part of the game by name · stop the game or change settings of the whole game · read and write any memory of the game · use OpenGL outside the draw callbacks · use internals of Viewpoint that are graded Red · hook the render thread · do what the addons it links to can do\}. Viewpoint cannot protect you from what this addon does. Allow it only for authors you trust.

In Amber and Red, the braces show a list. The card shows only the items that apply, with " · " between them.

**The disclaimer**, on the settings page and at the first enable:

> Labels describe what Viewpoint's automatic check found in this version of the addon's Java code. They are not a promise of safety: a check can miss things, and an addon can misbehave within what it is allowed. Addons are made by third parties. Viewpoint's authors do not review, endorse or answer for them.

**Unmanaged**, amber:

> Unmanaged: runs outside Viewpoint's controls (hooks cannot be listed, ordered or vetoed)

Some Unmanaged mods are red. Then the card adds **loads before Viewpoint**, or a different reason.

**A resource pack**:

> Resource pack: assets only. Viewpoint read these files with its own loaders and found them within its limits. It contains no Java.

**A Shaderpack**:

> Shaderpack: GLSL only. It contains no Java.

The card also shows the licence of the pack, or **No licence given**.

**The shader line**:

> Has shader code: Viewpoint checks its size and form. Faulty shader code can stall or crash the graphics driver.

**The Lua line**, on each label: **Has Lua: not checked by Viewpoint**, or **No Lua**.

> **Note**
>
> When you describe your addon to players, tell them what it does and what it asks for. Do not call it safe because its
> label is Normal.

## Consent

The player gives consent to one **version** of one package. There is no "allow all". If an update asks for more, the
player must give consent again. See [Updates & changelogs](https://docs.projectviewpoint.org/trust/updates-and-changelogs.md).

---

Previous: [Permissions](https://docs.projectviewpoint.org/trust/permissions.md) | Next: [Updates & changelogs](https://docs.projectviewpoint.org/trust/updates-and-changelogs.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
