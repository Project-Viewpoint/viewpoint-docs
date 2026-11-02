# Glossary

> The terms that these pages use. Each term has one meaning on all pages.

| Term | Meaning |
| --- | --- |
| **Addon** | A package with Java code, described by `addon.properties`. It can also contain assets, shader snippets and Lua. |
| **Resource Pack** | A package with assets only (models, tiles, sounds, data), described by `pack.properties`. It has no Java and no shader code. |
| **Shaderpack** | A package with GLSL files and their options, described by `pack.properties`. It has no Java. It changes how Viewpoint draws the world. |
| **Package** | An addon, a resource pack or a Shaderpack. |
| **Base** | The pack that a Shaderpack builds on, named by `base=`. |
| **Encoded id** | An id with `.` and `-` written as `_`. It is used in settings keys and in GLSL names. |
| **Descriptor** | The file that describes a package: `addon.properties` or `pack.properties`. |
| **Hook** | A declaration in your jar that connects a handler to a game method. Viewpoint installs it. |
| **Handler** | Your `public static` method that Viewpoint runs before or after the hooked game method. |
| **Kind** | What a handler can do: `OBSERVE`, `ARGS`, `RETURN` or `SKIP`. |
| **Permission** | A service that an addon asks for in `permissions`: `hooks`, `files`, `downloads`, `lua`, `camera`, `combat`, `models`, `shaders` or `draw`. |
| **Label** | The result of Viewpoint's automatic check, on the card: **Normal**, **Amber** or **Red**. |
| **Lua line** | The last line of each label. It tells if the package has Lua. Viewpoint does not check Lua. |
| **Shader line** | A line of a card that says that the package has shader code. Viewpoint checks its size and form, not what it computes. |
| **Export** | A Java function of an addon that the Lua of any mod can call. |
| **Service** | An object that an addon publishes under an id, so that other addons can use it. |
| **Camera layer** | A small change that an addon adds to the camera. Many layers can be active together. |
| **Claim** | A right that only one addon at a time can hold, for example the camera, the cursor or the reticle. The addon nearer the top of the Active column wins. |
| **Provider** | An object that an addon gives to Viewpoint to choose the model of a world object or of a character. |
| **Shader value** | A number that an addon sets, and that shader code reads as `uAddon_<encoded id>_<name>`. |
| **Snippet** | A small piece of GLSL that an addon adds at a named point of a shader. |
| **Draw callback** | A function of an addon that Viewpoint calls at a named point of a frame, so that the addon can draw. |
| **Internals list** | The members of Viewpoint outside `viewpoint.api` that an addon can use or hook. |
| **Consent** | The player's acceptance of one version of one package. An update that asks for more needs consent again. |
| **Card** | The row that shows one package in the settings window. |
| **Active column** | The list of the packages that are on. The package nearer the top wins. |
| **Safe point** | A time when Viewpoint can install and remove hooks: the main menu, a loading screen, or a paused single-player game. |
| **Registration** | An object that the API gives you for a listener or a callback. Viewpoint closes it when the addon goes off. |
| **Legacy** | A flag for an older Viewpoint model pack. It is a resource pack. |
| **Unmanaged** | A flag for a mod that loads its Java through ZombieBuddy (`javaJarFile`). Viewpoint does not control it. |
| **Gone** | A member of Viewpoint that a release removed. An addon that uses it shows **Needs an update**. |
| **Suspended** | The state of an addon that Viewpoint stopped for the session, after an error or on a server that does not list it. |
| **Pool** | A part of memory with a maximum size, for one kind of asset. |

---

Previous: [Internals changes](https://docs.projectviewpoint.org/reference/internals-changes.md) | Next: [Shader snippets](https://docs.projectviewpoint.org/api/shader-snippets.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
