# Introduction

> What a Viewpoint package is, what it can do in API 1.0, and what Viewpoint does with it.

Viewpoint is a mod for Project Zomboid. It draws the game in first and third person. Other authors can add to it with
addons, resource packs and Shaderpacks. Players see each package and control it from the settings window.

## The three kinds of package

| Kind | Contains | Descriptor |
| --- | --- | --- |
| **Addon** | Java code. It can also contain assets, shader snippets and Lua. | `addon.properties` |
| **Resource Pack** | Models, tiles, sounds and data. No Java and no shader code. | `pack.properties` |
| **Shaderpack** | GLSL files and their options. No Java. | `pack.properties` |

A model pack in the older Viewpoint model pack format is a resource pack with the *legacy* flag. See
[Package kinds](https://docs.projectviewpoint.org/concepts/package-kinds.md).

## What Viewpoint does with your package

- It loads your jar in a class loader of its own. Your code can use `viewpoint.api`, and the members of Viewpoint that
  are on the [internals list](https://docs.projectviewpoint.org/reference/viewpoint-internals.md).
- It shows your package in the settings window: an addon in **Advanced**, **Addons**, a resource pack in **Graphics**,
  **Resource Packs**, and a Shaderpack in **Graphics**, **Shaderpacks**. The player orders it, switches it on and off, and reads what it does. A
  restart is not necessary.
- It checks your jar when it loads it, and shows a label: **Normal**, **Amber** or **Red**. See [Labels](https://docs.projectviewpoint.org/trust/labels.md).
- It installs the hooks that you declare, runs them in the player's order, and lists each active hook.
- It gives you files, downloads and assets through its services. Each service has a permission and limits.

## What you can do in API 1.0

| To do this | Use | Page |
| --- | --- | --- |
| Read where the view is and what it shows | `ViewState`, `ViewListener` | [View state](https://docs.projectviewpoint.org/api/view-state.md) |
| Give settings and key bindings | `settings.properties`, `AddonSettings`, `KeyAction` | [Settings & keys](https://docs.projectviewpoint.org/api/settings-and-keys.md) |
| Read the view state from Lua | `Viewpoint.Addons` | [Lua mirror](https://docs.projectviewpoint.org/api/lua-mirror.md) |
| Give your Java functions to Lua | `@LuaExport` | [Lua exports](https://docs.projectviewpoint.org/api/lua-exports.md) |
| Keep files | `AddonFiles` | [Files](https://docs.projectviewpoint.org/api/files.md) |
| Get a file from the internet | `AddonDownloads` | [Downloads](https://docs.projectviewpoint.org/api/downloads.md) |
| Load models, textures, sounds and data | `AddonAssets` | [Assets](https://docs.projectviewpoint.org/api/assets.md) |
| Give a feature to other addons | `Services` | [Services](https://docs.projectviewpoint.org/api/services.md) |
| Move the camera | `CameraLayer`, `CameraClaim` | [Camera layers](https://docs.projectviewpoint.org/api/camera-layers.md) |
| Follow the aim and the shots | `AimListener`, `ShotListener` | [Aim & shots](https://docs.projectviewpoint.org/api/aim-and-shots.md) |
| Choose the model of an object | `ModelProvider`, `AttachmentProvider` | [Model providers](https://docs.projectviewpoint.org/api/model-providers.md) |
| Give numbers to shader code | `ShaderValues` | [Shader values](https://docs.projectviewpoint.org/api/shader-values.md) |
| Add a piece of GLSL to a shader | `AddonSnippets` | [Shader snippets](https://docs.projectviewpoint.org/api/shader-snippets.md) |
| Draw with OpenGL | `DrawCallback`, `Gpu` | [Draw callbacks](https://docs.projectviewpoint.org/api/draw-callbacks.md) (planned) |
| Change what a game method does | `@Hook` | [Managed patching](https://docs.projectviewpoint.org/patching/managed-patching.md) |
| Change what a method of Viewpoint does | `@Hook` on a listed member | [Hooking Viewpoint](https://docs.projectviewpoint.org/patching/hooking-viewpoint.md) |
| Replace the game's tile art | The `tiles` folder of a resource pack | [Tiles](https://docs.projectviewpoint.org/resource-packs/tiles.md) |
| Choose a model from the state of an object | A version 2 manifest | [Model states](https://docs.projectviewpoint.org/resource-packs/model-states.md) |
| Change how the whole frame looks | A Shaderpack | [Shaderpack format](https://docs.projectviewpoint.org/shaderpacks/format.md) |

A page marked *planned* is not written yet. Its feature is part of API 1.0. The sidebar group **Planned** lists these pages.

> **ZombieBuddy mods are different**
>
> A mod that loads its Java through ZombieBuddy (`javaJarFile` in `mod.info`) is not managed by Viewpoint. Viewpoint
> shows it as **Unmanaged**. Viewpoint cannot order it, switch it off or check it. To change such a mod into an addon,
> read [Migrating from ZombieBuddy](https://docs.projectviewpoint.org/patching/migrating-from-zombiebuddy.md).

## Licence

The addon API (`viewpoint-api.jar`), the samples and these pages have the MIT licence. Viewpoint itself has a different
licence. The font of these pages is Roboto Medium, under the Apache 2.0 licence ([notice](https://docs.projectviewpoint.org/notices/Roboto.txt)).

## Where to go next

1. [Getting started](https://docs.projectviewpoint.org/start/getting-started.md): make the smallest addon and switch it on.
2. [Sample walkthrough](https://docs.projectviewpoint.org/start/sample-walkthrough.md): the samples that use each service.
3. [Package kinds](https://docs.projectviewpoint.org/concepts/package-kinds.md): which kind of package to make.
4. [Descriptor](https://docs.projectviewpoint.org/concepts/descriptor.md): all keys of the descriptors.
5. [Glossary](https://docs.projectviewpoint.org/reference/glossary.md): the terms these pages use.

---

Previous: [Project Viewpoint Addon API](https://docs.projectviewpoint.org/index.md) | Next: [Getting started](https://docs.projectviewpoint.org/start/getting-started.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
