# Permissions

> The permissions, their keys and their limits, in one table.

The [Permissions](https://docs.projectviewpoint.org/trust/permissions.md) page explains the permissions.

| Permission | Keys | Limits | Without it |
| --- | --- | --- | --- |
| `hooks` | `hooks.targets` | Some targets are refused. `thread = ANY` has rules. Viewpoint measures the time of each handler. | The addon cannot start. |
| `files` | `files.quotaMiB` | 64 MiB for each folder by default, 16 MiB for each file, 1,000 files | Each call gives a `SecurityException`. |
| `downloads` | `downloads.hosts` | `https` only, hosts from `downloads.hosts`, 256 MiB for each file, the player accepts each download | Each call gives a `SecurityException`. |
| `lua` | `lua.globals` | Calls run on the main thread. A global must be free. | Viewpoint refuses the jar. |
| `camera` | None | One claim at a time for the camera, the view and the cursor. | Each call gives a `SecurityException`. |
| `combat` | None | One shot resolver and one reticle at a time. | Each call gives a `SecurityException`. |
| `models` | None | Providers answer on the main thread, for the sprites that they name. | Each call gives a `SecurityException`. |
| `shaders` | None | Snippets have size limits. Values are set on the main thread. | Each call gives a `SecurityException`. |
| `draw` | `draw.gpuMiB` | Drawing only in a draw callback. A limited list of OpenGL calls. 64 MiB of video memory by default, 128 MiB at most. | Each call gives a `SecurityException`. |
| `vram` | `draw.gpuMiB` | More than 128 MiB of video memory for the `Gpu` objects. Viewpoint sets no limit. | More than 128 in `draw.gpuMiB` makes the descriptor wrong. |

These need no permission:

- the view state;
- the settings of the addon, its settings page and its key bindings;
- the assets of the addon;
- services.

A new permission, a new target, a new host, a new export or a larger quota needs the player's consent again. See
[Updates & changelogs](https://docs.projectviewpoint.org/trust/updates-and-changelogs.md).

---

Previous: [Labels](https://docs.projectviewpoint.org/reference/labels.md) | Next: [Viewpoint internals list](https://docs.projectviewpoint.org/reference/viewpoint-internals.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
