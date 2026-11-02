# Descriptor keys

> All keys of addon.properties and pack.properties in one table.

All descriptor keys in one table. The [Descriptor](https://docs.projectviewpoint.org/concepts/descriptor.md) page explains them. `A` is an addon. `P` is a
resource pack. `S` is a Shaderpack.

| Key | For | Required | Default | Meaning |
| --- | --- | --- | --- | --- |
| `format` | A P S | Yes | | The format of the descriptor: `1`. |
| `id` | A P S | Yes | | The id. The folder name must be the same. |
| `name` | A P S | Yes | | The name on the card. |
| `version` | A P S | Yes | | The version: major, minor and patch, each of at most three digits (`MMM.NNN.PPP`). |
| `author` | A P S | No | | The author on the card. |
| `description` | A P S | No | | A short description, at most 128 characters. The card shows the start of it; the player reads all of it when the pointer rests on it. |
| `icon` | A P S | No | A tile with a letter | A PNG file in the package folder. |
| `license` | A P S | No | | The name of the licence. |
| `game.min` | A P S | Yes | | The oldest game build. |
| `game.max` | A P S | No | No limit | The newest game build. |
| `viewpoint.min` | A P S | No | | The oldest Viewpoint version. |
| `viewpoint.max` | A P S | No | No limit | The newest Viewpoint version. |
| `side` | A | No | `client` | `client` or `gameplay`. |
| `requires` | A P S | No | | `id` or `id@min`, with commas between them. |
| `conflicts` | A P S | No | | Ids, with commas between them. |
| `changelog` | A P S | No | | A file of `## <version>` sections. |
| `models` | A P | No | | The path of a model manifest. Use version 2; version 1 is deprecated. |
| `tiles` | A P | No | | A folder of tile PNG files. |
| `sounds` | A P | No | | A folder of `ogg` and `wav` files. |
| `data` | A P | No | | A folder of data files. |
| `api` | A | Yes | | The API version that you compiled against: `1.0`. |
| `jar` | A | Yes | | The name of the jar. |
| `entry` | A | Yes | | The class that implements `Addon`. |
| `settings` | A | No | | A `settings.properties` file. |
| `permissions` | A | No | None | `hooks`, `files`, `downloads`, `lua`, `camera`, `combat`, `models`, `shaders`, `draw`, `vram`. |
| `hooks.targets` | A | With `hooks` | | The classes that the addon can hook: game classes and listed classes of Viewpoint. |
| `files.quotaMiB` | A | No | 64 | The size of the files folder, in MiB. More than 64 needs consent. |
| `draw.gpuMiB` | A | No | 64 | The video memory for the `Gpu` objects, in MiB, 1 or more. It needs `draw`. More than 128 needs the permission `vram`. |
| `downloads.hosts` | A | With `downloads` | | The hosts that the addon can download from. |
| `lua.globals` | A | No | | Names of Lua globals for the exports. |
| `exports` | A | No | | Java packages that other addons can link to. |
| `base` | S | No | The library | The pack that the Shaderpack builds on. |
| `dropOptions` | S | No | | Options of the base that the pack leaves out. |
| `options`, `option.<id>.*` | S | No | | The options of the pack. |
| `presets`, `preset.<id>`, `preset.default` | S | No | | The presets of the pack. |
| `passes`, `pass.<id>.*`, `targets`, `target.<name>` | S | No | | The passes and targets of the pack. |
| `pipeline.<knob>` | S | No | The base | Which passes of the renderer run. |
| `library` | S | No | | The Viewpoint version that the pack was made for (planned). |

---

Previous: [API reference](https://docs.projectviewpoint.org/reference/api.md) | Next: [Labels](https://docs.projectviewpoint.org/reference/labels.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
