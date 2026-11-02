# Labels

> The label levels, their reasons and the texts that the player sees.

The [Labels](https://project-viewpoint.github.io/viewpoint-docs/trust/labels.md) page explains the labels. This page gives the texts and the reasons in tables.

## Texts

In Amber and Red, the braces show a list. The card shows only the items that apply, with " · " between them.

| Name | Text |
| --- | --- |
| Normal (no badge; its tooltip) | Checked by Viewpoint. This addon's Java code uses only parts of Java, the game and Viewpoint that Viewpoint has reviewed. Viewpoint found no way for it to reach your files outside its own folder, the internet, other programs or native code. It can still change anything in your game and saves. In multiplayer, what it puts into the game is sent to the server. The mod's Lua scripts are not checked. Its assets are checked for their form and size, not for what they do. |
| Amber | Uses things Viewpoint has not reviewed: \{background threads · multiplayer messages · Lua · draws with OpenGL · internals of Viewpoint · hooks that run on any thread · other parts of Java and the game · code of other addons\}. Viewpoint cannot tell what these lead to. Turn it on only if you trust the author. |
| Red (off until allowed) | Can \{read and write your files · reach the internet · start programs · load native code · change the game's code · reach any part of the game by name · stop the game or change settings of the whole game · read and write any memory of the game · use OpenGL outside the draw callbacks · use internals of Viewpoint that are graded Red · hook the render thread · do what the addons it links to can do\}. Viewpoint cannot protect you from what this addon does. Allow it only for authors you trust. |
| Disclaimer (the settings page, and the first enable) | Labels describe what Viewpoint's automatic check found in this version of the addon's Java code. They are not a promise of safety: a check can miss things, and an addon can misbehave within what it is allowed. Addons are made by third parties. Viewpoint's authors do not review, endorse or answer for them. |
| Unmanaged (amber) | Unmanaged: runs outside Viewpoint's controls (hooks cannot be listed, ordered or vetoed) |
| Unmanaged, red | loads before Viewpoint |
| Resource pack | Resource pack: assets only. Viewpoint read these files with its own loaders and found them within its limits. It contains no Java. |
| Shaderpack | Shaderpack: GLSL only. It contains no Java. (With the licence of the pack, or "No licence given".) |
| Shader line (a Shaderpack, and an addon with snippets or `Gpu` programs) | Has shader code: Viewpoint checks its size and form. Faulty shader code can stall or crash the graphics driver. |
| Export line (adds to the Lua line) | any mod's Lua can call N functions of its Java; they use: \{permissions\} |
| Export line, one function | any mod's Lua can call 1 function of its Java; it uses: \{permissions\} |
| Lua line | Has Lua: not checked by Viewpoint |
| Lua line, with what was found | Has Lua: not checked by Viewpoint. Found in it: \{names\} |
| Lua line, no Lua | No Lua |
| Too large or too complex | Cannot be checked |

The items of the lists:

| Level | Items |
| --- | --- |
| Amber | background threads · multiplayer messages · Lua · draws with OpenGL · internals of Viewpoint · hooks that run on any thread · other parts of Java and the game · code of other addons |
| Red | read and write your files · reach the internet · start programs · load native code · change the game's code · reach any part of the game by name · stop the game or change settings of the whole game · read and write any memory of the game · use OpenGL outside the draw callbacks · use internals of Viewpoint that are graded Red · hook the render thread · do what the addons it links to can do |

## The export line

The words after "they use:" or "it uses:" are the items that the exported functions reach. These are all the items:

threads · the server · Lua · files · the network · programs · native code · classes · reflection · the game's process · memory · OpenGL · internals of Viewpoint · hooks · parts of the game · other addons

If the functions reach none of them, the line says "nothing that Viewpoint lists".

The line counts the functions that the exports call. It does not count code that runs when a class loads, or an object
that the addon stored for later.

## Reasons

| Level | The addon |
| --- | --- |
| Amber | Starts background threads |
| Amber | Sends multiplayer messages |
| Amber | Calls Lua |
| Amber | Draws with OpenGL in a draw callback |
| Amber | Uses internals of Viewpoint that are graded Amber |
| Amber | Uses deprecated internals |
| Amber | Uses parts of Java or the game that Viewpoint has not reviewed |
| Amber | Extends a class that Viewpoint has not reviewed |
| Amber | Has a hook with `thread = ANY` |
| Amber | Has a costly hook (a method that the game calls very frequently) |
| Amber | Has a slow hook (a handler that takes too much time) |
| Amber | Uses code of X (Amber) |
| Red | Reads or writes files, or uses code of the game that does |
| Red | Opens network connections, or uses code of the game that does |
| Red | Uses reflection |
| Red | Starts programs |
| Red | Loads native code |
| Red | Defines classes |
| Red | Uses OpenGL directly, outside the draw callbacks and the allowed calls |
| Red | Uses LWJGL, which can read and write any memory of the game |
| Red | Stops the game process, or changes settings of the full Java process |
| Red | Uses internals of Viewpoint that are graded Red |
| Red | Has a hook with `thread = RENDER` |
| Red | Uses code of X (Red) |

A Red reason that a Lua export can reach ends with "…, callable from any mod's Lua".

## Other lines of a card

| Line | When |
| --- | --- |
| Draws over the whole screen | The addon draws at the `final` point or the `crosshair` point. |
| Its Lua functions came late at this start | The addon was not ready before the limit at the start of the game. |
| The shaderpack X has no point Y | A Shaderpack does not keep a marker, and a snippet of this addon needs it. |
| Made for \<version\>: N of the files it replaces have changed since (planned) | A Shaderpack is older than the files that it replaces. |
| Needs an update: uses \<member\>, removed in \<release\>; use \<replacement\> | The addon uses a member of Viewpoint that is gone. |
| Needs an update: uses \<member\>, removed in \<release\>; nothing replaces it | The addon uses a member of Viewpoint that is gone, and no other member does the same. |

## The Lua line

`Has Lua: not checked by Viewpoint`, then `Found in it:` and the names that Viewpoint found in the Lua of the mod, for
example `getModFileWriter`, `getHostByName` or `Clipboard`. Or `No Lua`.

Viewpoint lists these names. Some write, read or list files: `getFileWriter`, `getModFileWriter`, `getFileReader`,
`getModFileReader`, `getFileInput`, `getFileOutput`, `getGameFilesInput`, `getGameFilesTextInput`,
`listFilesInModDirectory`, `listFilesInZomboidLuaDirectory`, `serverFileExists` and `cacheFileExists`. Some reach the
internet or the desktop: `getHostByName`, `openUrl`, `activateSteamOverlayToWebPage`, `showFolderInDesktop` and
`Clipboard`. Some load a file as code or make code, or a global, from text or bytes, which hides it from this check:
`loadstring`, `bytecodeloader`, `reloadLuaFile`, `reloadServerLuaFile`, `rawset`, `setfenv` and `getfenv`. Viewpoint
reads the Lua as text. It does not run it, and it cannot see a name that the Lua makes from other text.

---

Previous: [Descriptor keys](https://project-viewpoint.github.io/viewpoint-docs/reference/descriptor-keys.md) | Next: [Permissions](https://project-viewpoint.github.io/viewpoint-docs/reference/permissions.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
