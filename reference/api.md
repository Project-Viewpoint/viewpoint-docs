# API reference

> The packages of viewpoint.api, and where to find the javadoc.

Each Viewpoint release has `viewpoint-api.jar`, with a sources jar and a javadoc jar. The javadoc gives each public type
and member of `viewpoint.api`. It has:

- a description of each type and member;
- a `@thread` tag on each method, which tells the thread that can call it;
- the API version, the same as `Version.API`.

## Packages

| Package | Contains | Guide |
| --- | --- | --- |
| `viewpoint.api` | `Addon`, `AddonContext`, `Registration`, `Version`, `AddonRender`, `AddonShaders`, `AddonSnippets` | [Getting started](https://project-viewpoint.github.io/viewpoint-docs/start/getting-started.md) |
| `viewpoint.api.patch` | `@Hook.Before`, `@Hook.After`, `HookCall` | [Managed patching](https://project-viewpoint.github.io/viewpoint-docs/patching/managed-patching.md) |
| `viewpoint.api.view` | `ViewState`, `ViewListener` | [View state](https://project-viewpoint.github.io/viewpoint-docs/api/view-state.md) |
| `viewpoint.api.settings` | `AddonSettings`, `KeyAction`, `SettingsPage` | [Settings & keys](https://project-viewpoint.github.io/viewpoint-docs/api/settings-and-keys.md) |
| `viewpoint.api.files` | `AddonFiles`, `Pending` | [Files](https://project-viewpoint.github.io/viewpoint-docs/api/files.md) |
| `viewpoint.api.net` | `AddonDownloads`, `DownloadRequest`, `DownloadResult` | [Downloads](https://project-viewpoint.github.io/viewpoint-docs/api/downloads.md) |
| `viewpoint.api.assets` | `AddonAssets` | [Assets](https://project-viewpoint.github.io/viewpoint-docs/api/assets.md) |
| `viewpoint.api.lua` | `@LuaExport`, `LuaTable`, `LuaHandle` | [Lua exports](https://project-viewpoint.github.io/viewpoint-docs/api/lua-exports.md) |
| `viewpoint.api.services` | `Services` | [Services](https://project-viewpoint.github.io/viewpoint-docs/api/services.md) |
| `viewpoint.api.camera` | `AddonCamera`, `CameraLayer`, `LookControl`, `CameraClaim`, `ViewControl`, `CursorClaim` | [Camera layers](https://project-viewpoint.github.io/viewpoint-docs/api/camera-layers.md) |
| `viewpoint.api.combat` | `AddonCombat`, `AimListener`, `AimState`, `ShotListener`, `ShotEvent`, `ShotHit`, `SwayProvider`, `Sway`, `ShotResolver`, `ResolverClaim`, `ReticleProvider`, `Reticle`, `ReticleImage`, `ReticleClaim` | [Aim & shots](https://project-viewpoint.github.io/viewpoint-docs/api/aim-and-shots.md) |
| `viewpoint.api.models` | `ModelProvider`, `AttachmentProvider`, `ModelRef` | [Model providers](https://project-viewpoint.github.io/viewpoint-docs/api/model-providers.md) |
| `viewpoint.api.render` | `DrawPoint`, `DrawCallback`, `DrawContext`, `FrameView`, `Gpu` (`GpuProgram`, `GpuBuffer`, `GpuTexture`, `GpuMesh`), `Picture`, `Primitive`, `FrameInput`, `ShaderValues`, `ShaderValue`, `ShaderPulse`, `ValueKind`, `SnippetPoint` | [Draw callbacks](https://project-viewpoint.github.io/viewpoint-docs/api/draw-callbacks.md), [Shader values](https://project-viewpoint.github.io/viewpoint-docs/api/shader-values.md), [Shader snippets](https://project-viewpoint.github.io/viewpoint-docs/api/shader-snippets.md) |

The API uses only `java.*` and `viewpoint.api.*`. `viewpoint-api.jar` has the MIT licence.

## Lua

| Function | Guide |
| --- | --- |
| `Viewpoint.Addons.viewState()` | [Lua mirror](https://project-viewpoint.github.io/viewpoint-docs/api/lua-mirror.md) |
| `Viewpoint.Addons.terrainHeight(x, y)` | [Lua mirror](https://project-viewpoint.github.io/viewpoint-docs/api/lua-mirror.md) |
| `Viewpoint.Addons.setting(addonId, name)` | [Lua mirror](https://project-viewpoint.github.io/viewpoint-docs/api/lua-mirror.md) |
| `Viewpoint.Addons["<id>"]` and the globals of `lua.globals` | [Lua exports](https://project-viewpoint.github.io/viewpoint-docs/api/lua-exports.md) |
| `Viewpoint.ModelPacks.register(modId, path)` | [Legacy model packs](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/legacy-model-packs.md) |

---

Previous: [Shaderpacks](https://project-viewpoint.github.io/viewpoint-docs/players/shaderpacks.md) | Next: [Descriptor keys](https://project-viewpoint.github.io/viewpoint-docs/reference/descriptor-keys.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
