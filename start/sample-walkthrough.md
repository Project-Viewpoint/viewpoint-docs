# Sample walkthrough

> The sample addon, the sample resource pack and the sample Shaderpack, and what each part shows.

Viewpoint's source repository has three samples and one legacy model pack. The code on these pages comes from the
samples.

## Use the samples

1. Build the samples. Run `gradlew samples` in the source repository. It makes a mod folder for each sample, for example
   `sampleaddon/build/mod/ViewpointSampleAddon`.
2. Copy their mod folders into the game's mods folder.
3. Enable the sample mods and Viewpoint in the game's mod list.
4. Start the game.
5. Open **Advanced**, **Addons** for the sample addon, and **Graphics**, **Resource Packs** for the sample resource pack. The samples are in the **Inactive** column, as all new packages are. The sample Shaderpack is in **Graphics**, **Shaderpacks**.
6. Switch them on.

## `sampleaddon`

One addon. It has one small part for each service of the API. Each part is one small class.

- sampleaddon/
  - build.gradle.kts
  - addon.properties
  - settings.properties
  - mod.info
  - CHANGELOG.md
  - models/
  - sounds/
  - data/
  - src/main/java/example/sample/
    - SampleAddon.java
    - ViewPart.java
    - and one file for each other part

The classes of an addon cannot be in a package that starts with `viewpoint.`, because Viewpoint reserves it. The sample
uses `example.sample`. It has these parts:

| Part | What it does | Page |
| --- | --- | --- |
| `SampleAddon` | Starts the parts. Writes a line to the log when the addon switches on, when its hooks are live, and when it switches off. | [Getting started](https://project-viewpoint.github.io/viewpoint-docs/start/getting-started.md) |
| `ViewPart` | A `ViewListener`. Once a second, it writes the eye's height and the ground height under the crosshair. | [View state](https://project-viewpoint.github.io/viewpoint-docs/api/view-state.md) |
| `SettingsPart` | One toggle, two numbers and one key. The key writes a line when you push it. It also adds a settings page, with a button and two value rows. | [Settings & keys](https://project-viewpoint.github.io/viewpoint-docs/api/settings-and-keys.md) |
| `FilesPart` | Writes a counter with `AddonFiles` at each enable, and reads it again. | [Files](https://project-viewpoint.github.io/viewpoint-docs/api/files.md) |
| `DownloadPart` | Asks to download one small file when you click its button on the settings page. The player sees the prompt each time. | [Downloads](https://project-viewpoint.github.io/viewpoint-docs/api/downloads.md) |
| `HookPart` | One `@Hook.Before` hook on a game method. Its handler only reads the call. | [Managed patching](https://project-viewpoint.github.io/viewpoint-docs/patching/managed-patching.md) |
| `ViewpointHookPart` | One hook on a listed method of Viewpoint. The render thread calls that method, so the hook has `thread = ANY`, with a typed handler. | [Hooking Viewpoint](https://project-viewpoint.github.io/viewpoint-docs/patching/hooking-viewpoint.md) |
| `ExportPart` | Gives one Java function to Lua: `Sample.twice(21)`. | [Lua exports](https://project-viewpoint.github.io/viewpoint-docs/api/lua-exports.md) |
| `CameraPart` | A camera layer that rolls the view a little while the key is down. | [Camera layers](https://project-viewpoint.github.io/viewpoint-docs/api/camera-layers.md) |
| `ShotPart` | A `ShotListener` that writes the number of hits of each shot. | [Aim & shots](https://project-viewpoint.github.io/viewpoint-docs/api/aim-and-shots.md) |
| `DrawPart` | A draw callback that draws one small triangle with `Gpu`, in the top right corner of the screen. | [Draw callbacks](https://project-viewpoint.github.io/viewpoint-docs/api/draw-callbacks.md) |
| `SnippetPart` | A shader snippet that tints the light at `colour.end`. While it links, the game pauses. | [Shader snippets](https://project-viewpoint.github.io/viewpoint-docs/api/shader-snippets.md) |
| `ValuesPart` | Sets a shader value that the snippet reads. | [Shader values](https://project-viewpoint.github.io/viewpoint-docs/api/shader-values.md) |
| `AssetsPart` | Writes what its model and its texture take, reads one data file, and loads and plays one sound. | [Assets](https://project-viewpoint.github.io/viewpoint-docs/api/assets.md) |

The descriptor asks only for the permissions that the sample uses. See [Permissions](https://project-viewpoint.github.io/viewpoint-docs/trust/permissions.md).

The card shows the label of the sample. Open the card's **Info**. Read **Trust**, then **Permissions**, then **Hooks**.
The player reads these tabs before they give consent. Look at them once from the player's side.

## `sampleresourcepack`

A resource pack, with no code.

- sampleresourcepack/
  - pack.properties
  - mod.info
  - CHANGELOG.md
  - models/
  - tiles/
  - sounds/

It has these parts:

- a version 2 manifest with a model on one sprite, a lamp whose shade changes when it is lit, and a chair bound for all its
  facings by one line;
- a floor and a wall, each with its normal and specular texture;
- one sound, which the card includes. Viewpoint does not play the sounds of a resource pack.

See [Format](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/format.md), [Model states](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/model-states.md) and
[Tiles](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/tiles.md).

## `sampleshaderpack`

A Shaderpack, with no Java.

- sampleshaderpack/
  - pack.properties
  - mod.info
  - CHANGELOG.md
  - shaders/
    - tint.frag

It builds on the `default` pack. It adds one option and one pass at the `final` stage. See
[Shaderpack format](https://project-viewpoint.github.io/viewpoint-docs/shaderpacks/format.md) and [Passes & inputs](https://project-viewpoint.github.io/viewpoint-docs/shaderpacks/passes-and-inputs.md).

## The legacy model pack

`samplelegacypack` is a small mod. Its Lua calls `Viewpoint.ModelPacks.register`, as older model packs do. Viewpoint shows
it as the resource pack `legacy.ViewpointSampleLegacyPack`, with the *legacy* flag. Its manifest is version 1. It shows that older packs continue to work and follow the player's order. Do not copy it for a new pack.
See [Legacy model packs](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/legacy-model-packs.md).

## Try these changes

1. Increase the sample's `version`. Build it again. The card shows a dot. Click **Info** and open the **Changelog** tab.
2. Change the line to `downloads.hosts=example.com,example.org`. The addon now asks for more. It stays off until you give
   consent again.
3. In **Info**, **Hooks**, veto the hook. At the next safe point, the game runs as if the addon has no hook.
4. Drag the sample above or below a different addon. The order in the hook list changes.
5. In **Graphics**, **Shaderpacks**, click the green tick on `sampleshaderpack`. Change its option in **Graphics**, **Shader Options**.

---

Previous: [Getting started](https://project-viewpoint.github.io/viewpoint-docs/start/getting-started.md) | Next: [Package kinds](https://project-viewpoint.github.io/viewpoint-docs/concepts/package-kinds.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
