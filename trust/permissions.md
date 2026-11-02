# Permissions

> The permissions that an addon can ask for, what each one opens, and what occurs without it.

Put the services that your addon uses in `permissions`. The player reads this list before they give consent. Viewpoint
refuses a call that is not in the list.

```properties
permissions=hooks,files,downloads
hooks.targets=zombie.characters.IsoPlayer
files.quotaMiB=16
downloads.hosts=github.com,objects.githubusercontent.com
```

| Permission | Opens | Keys | Page |
| --- | --- | --- | --- |
| `hooks` | `@Hook` handlers, and `@Patch` classes in an addon jar. Game methods and listed methods of Viewpoint. | `hooks.targets` | [Managed patching](https://docs.projectviewpoint.org/patching/managed-patching.md) |
| `files` | `AddonFiles`: a folder for your addon, with a quota | `files.quotaMiB` (optional) | [Files](https://docs.projectviewpoint.org/api/files.md) |
| `downloads` | `AddonDownloads`: a download that the player accepts each time | `downloads.hosts` | [Downloads](https://docs.projectviewpoint.org/api/downloads.md) |
| `lua` | `@LuaExport`: Java functions that the Lua of any mod can call | `lua.globals` (optional) | [Lua exports](https://docs.projectviewpoint.org/api/lua-exports.md) |
| `camera` | Camera layers, camera claims, look control, view control and cursor claims | None | [Camera layers](https://docs.projectviewpoint.org/api/camera-layers.md) |
| `combat` | Aim and shot listeners, sway, shot resolvers and reticles | None | [Aim & shots](https://docs.projectviewpoint.org/api/aim-and-shots.md) |
| `models` | `ModelProvider` and `AttachmentProvider` | None | [Model providers](https://docs.projectviewpoint.org/api/model-providers.md) |
| `shaders` | `ShaderValues` and `AddonSnippets` | None | [Shader values](https://docs.projectviewpoint.org/api/shader-values.md), [Shader snippets](https://docs.projectviewpoint.org/api/shader-snippets.md) |
| `draw` | `DrawCallback` and the `Gpu` object | `draw.gpuMiB` (optional) | [Draw callbacks](https://docs.projectviewpoint.org/api/draw-callbacks.md) |
| `vram` | More than 128 MiB of video memory for the `Gpu` objects | `draw.gpuMiB` | [Draw callbacks](https://docs.projectviewpoint.org/api/draw-callbacks.md) |

These need **no** permission:

- the view state;
- your settings, your settings page and your keys;
- your own assets;
- services (`Services`). A new `exports=` package needs the player's consent.

## Without the permission

| Use | Without the permission |
| --- | --- |
| `AddonFiles` | Each call gives a `SecurityException`. |
| `AddonDownloads` | Each call gives a `SecurityException`. |
| A registration through the context, for example a camera layer, a provider or a draw callback | The call gives a `SecurityException`. |
| `@Hook` | Viewpoint refuses the jar when it reads it. |
| A hook on a class that is not in `hooks.targets` | Viewpoint refuses the jar when it reads it. |
| `@LuaExport` | Viewpoint refuses the jar when it reads it. |

## Permissions and labels

A permission is not a label. The permissions list what the addon **asks for**. The label tells what the **code** uses.
The card shows both, on the **Trust** and **Permissions** tabs.

- A hook can keep the label Normal. Its target must be a game method that Viewpoint has reviewed. It must use
  `thread = MAIN` and a fast handler.
- A `thread = ANY` hook makes the label Amber.
- A `draw` permission makes the label Amber: the addon draws with OpenGL.
- `java.nio.file` makes the label Red, also with the `files` permission. Use `AddonFiles`.

## When you change the permissions

These changes need the player's consent again:

- a new permission;
- a new class in `hooks.targets`;
- a new hooked member of Viewpoint;
- a new host in `downloads.hosts`;
- a larger `files.quotaMiB`;
- a new Lua export or Lua global;
- a new snippet point or draw point;
- a new kind of claim (camera, view, shot resolver, reticle or cursor);
- a new `exports=` package, or a new `requires`;
- a new member of Viewpoint that you use, reflect or hook.

Until the player gives consent, the addon stays off. This is also true if it was active before. See
[Updates & changelogs](https://docs.projectviewpoint.org/trust/updates-and-changelogs.md).

> **Tip**
>
> Ask only for what you need. Each permission is more text for the player to read. Each new item is one more consent
> dialog.

---

Previous: [Hookable targets & refusals](https://docs.projectviewpoint.org/patching/hookable-targets.md) | Next: [Labels](https://docs.projectviewpoint.org/trust/labels.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
