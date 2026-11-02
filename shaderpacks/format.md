# Format

> The folder of a Shaderpack, the keys of its pack.properties, options, presets, the pipeline, and how packs build on each other.

A Shaderpack changes how Viewpoint draws the world: its light, its sky, its colours, and which effects run. It is a
folder of GLSL files and one `pack.properties`. It has no Java. The player chooses one Shaderpack at a time on the
Graphics page.

- media/viewpoint/shaderpacks/example.dusk/
  - pack.properties
  - icon.png
  - CHANGELOG.md
  - shaders/
    - lib/shade.glsl
    - post.frag
  - textures/

- The folder name must be the same as the `id`.
- `shaders/` holds your GLSL files. See [Library files](https://docs.projectviewpoint.org/shaderpacks/library-files.md).
- `textures/` is optional. It holds the images that your shaders read.
- One mod can hold many Shaderpacks.
- The id of the package is also the id of the pack.

## The descriptor

```properties title="pack.properties"
format=1
id=example.dusk
name=Dusk
version=1.0.0
author=Example
description=The default look with a warmer grade and softer shadows.
icon=icon.png
license=MIT
game.min=42.21
base=default
changelog=CHANGELOG.md

options=warmth grain
option.warmth.label=Warmth
option.warmth.tooltip=How much the grade leans towards orange.
option.warmth.range=0 1 0.05
option.warmth.default=0.4

option.grain.label=Film grain
option.grain.default=false

presets=fast balanced
preset.default=balanced
preset.fast.label=Fast
preset.fast=warmth=0 grain=false
preset.balanced=

pipeline.bloom=true
pipeline.shadowCascades=2
```

The file is a Java properties file in UTF-8. A long value can go on over several lines with `\` at the end of each line.
A Shaderpack has no `jar`, `entry`, `api` or `permissions` key, because it has no code.

### Package keys

These keys are the same as in the other descriptors. See [Descriptor](https://docs.projectviewpoint.org/concepts/descriptor.md).

| Key | Required | Meaning |
| --- | --- | --- |
| `format`, `id`, `name`, `version` | Yes | As for all packages. |
| `game.min` | Yes | The oldest game build. |
| `game.max`, `viewpoint.min`, `viewpoint.max` | No | The ranges that you tested. |
| `author`, `description`, `icon`, `license`, `changelog` | No | Shown on the card. The card shows the licence, or **No licence given**. |
| `requires`, `conflicts` | No | Other packages. A package that is your `base` must be in `requires`. |
| `library` | No | The Viewpoint version that you made the pack for (planned). See [Library files](https://docs.projectviewpoint.org/shaderpacks/library-files.md#made-for-a-version). |

### Pack keys

| Key | Meaning |
| --- | --- |
| `base` | The pack that yours starts from: its files, options and pipeline. If you leave it out, the pack starts from the library alone. See [Build on another pack](#build-on-another-pack). |
| `dropOptions` | The options of the base that your pack leaves out, by id. They are gone from the window, and their defines are not set. |
| `options` | The ids of your own options, in the order that the window lists them. |
| `presets` | The ids of your own presets, in the order of the **Quality** list. |
| `preset.default` | The preset that a new install starts with. |
| `passes`, `pass.<id>.*`, `targets`, `target.<name>` | Passes of your own. See [Passes & inputs](https://docs.projectviewpoint.org/shaderpacks/passes-and-inputs.md). |
| `pipeline.<knob>` | Which passes of the renderer run, and their sizes. See [The pipeline](#the-pipeline). |

## Options

An option is a setting that the player can change on the Graphics page. Your shaders read it as a define.

| Key | Meaning |
| --- | --- |
| `option.<id>.label`, `.tooltip` | The text that the window shows. |
| `option.<id>.default` | The default value. Required. |
| `option.<id>.values` | A choice. Its values have spaces between them. Use letters, digits, `_`, `.` and `-`. |
| `option.<id>.value.<value>` | The text that the window shows for one value of a choice. |
| `option.<id>.range` | A number: `min max step`. |
| `option.<id>.kept` | `true`: only the player sets it. No preset sets it, and a change never makes the preset **Custom**. |
| `option.<id>.disabledBy` | Another toggle or choice of the pack. While it is on, the window greys out this option and keeps its value. |

An option with no `values` and no `range` is a toggle: `true` or `false`.

**Names in GLSL.** Every shader stage gets these defines after its `#version` line:

- `OPTION_<ID>` for each option: `shadowResolution` becomes `OPTION_SHADOW_RESOLUTION`. A toggle is `1` or `0`. A
  number is its value. A choice of words is the index of the chosen word. Each word also gets a define with its index,
  for example `OPTION_SKY_FLAT 0` and `OPTION_SKY_GRADIENT 1`.
- `PIPELINE_<KNOB>` for each pipeline knob, in capitals with underscores: `PIPELINE_SHADOW_RESOLUTION 2048`.

A library file that reads an option gives it a default with `#ifndef`. A pack that does not have the option does not
define it.

**Saved values.** Each option is a live setting named `pack.<encoded id>.<option id>` in
`Zomboid/viewpoint-live.properties`. The encoded id writes `.` and `-` as `_`. For `example.dusk`, the setting for
`warmth` is `pack.example_dusk.warmth`. See [Package kinds](https://docs.projectviewpoint.org/concepts/package-kinds.md#the-encoded-id).

## Presets

The **Quality** list is the first option of a pack on the Graphics page. It lists your presets, then **Custom**. When the
player chooses a preset, Viewpoint sets the options to its values. When the player changes an option away from the
preset, the list shows **Custom**.

- `preset.<id>` lists values as `option=value`, with spaces between them. An option that the line leaves out takes its
  default.
- `preset.<id>.label` is the name in the list. Without it, the id in words: `veryHigh` is "Very high".
- The preset of `preset.default` must give every option its default. Its line is usually empty. Viewpoint tells you if it
  does not, because the list would show **Custom** from the start.
- This list is not the **Preset** of the Graphics page (Potato to Ultra). That one sets the mod's own settings, never an
  option of a pack.

A line of a preset names the option or the preset that is wrong. Viewpoint leaves out a pack that has an error in
`pack.properties`. The Graphics page lists it under **Left out** with the reason.

## The pipeline

The pipeline says which passes of the renderer run for your pack, and their sizes. A knob that you leave out keeps the
value of the base. A pass that is off is not drawn. This is where a light pack saves its time.

A value can follow an option: `pipeline.shadowResolution=${shadowResolution}`.

| Knob | Library value | What it switches |
| --- | --- | --- |
| `shadows` | `true` | The shadows of the sun and the moon. |
| `shadowResolution` | `2048` | The texels along one side of each shadow map, 256 to 16384. |
| `shadowCascades` | `3` | The number of shadow maps about the player: 1, 2 or 3. |
| `flashlightShadow` | `true` | The shadow of the flashlight, and of a muzzle flash. |
| `lampShadows` | `2` | How many of the nearest lamps cast shadows, 0 to 8. |
| `farShadows` | `true` | The shadows of the far world. |
| `clouds` | `true` | The volumetric clouds. |
| `cloudResolution` | `50` | The size of the clouds' image as a share of the frame, in percent, 25 to 100. |
| `volumetrics` | `true` | The light in the air: haze, god rays, halos of lamps and the beam of the flashlight. |
| `occlusion` | `true` | The occlusion of ambient light. |
| `bounce` | `true` | The light that the floors bounce. |
| `bloom` | `true` | The bloom. |
| `antialiasing` | `taaPlus` | One of `off`, `fxaa`, `smaa`, `taa`, `taaFxaa`, `taaPlus`. |
| `puddles` | `true` | Wet ground and puddles. |

The renderer has more knobs. The library file that uses a knob names it in its first lines.

## Build on another pack

`base=` names the pack that yours starts from. It can be one of these:

| Base | Meaning |
| --- | --- |
| `library` | The full look as the renderer draws it, with its options. The model for a pack that changes a little: replace `post.frag` for a new grade. |
| `vivid` | The full look, warmer and bolder. It holds still as Viewpoint changes. |
| `default` | The pack that the Modern mode uses until the player chooses another. It goes further than `vivid`, and it changes as Viewpoint changes. |
| The id of a folder pack | A pack that the player has in their folder. |
| The id of another package | A Shaderpack from another mod. |

If you want a look that holds still, start from `library` or `vivid`.

A pack starts with the options, presets and pipeline lines of its base. Then it adds its own.

- An option with the id of a base option replaces it, in the same place in the list.
- A `preset.<id>` line for a preset of the base adds values over the base's line.
- Pipeline lines work in the same way.

### Chaining across packages

When the base is another package, these rules apply:

- Put the base in `requires`. Without it, the pack does not start, and the card says **requires its base**.
- While the base is not active, the card shows **Waiting for \<base\>**. The pack starts when the base is active.
- A cycle of bases is refused.
- A change to a base reads its dependents again. No pack keeps an old base.
- Shaderpacks are not in an order. They never stack by their place in a list. The only stacking is `base=`.

> **Note**
>
> The pass API of Shaderpacks has a version. An addon asks for it with `Version.has("passes", generation)`. Set
> `viewpoint.min` for a Shaderpack that needs a newer Viewpoint.

## Limits

A Shaderpack that comes as a package is read one time, when Viewpoint finds the package, and Viewpoint compiles from
this copy. These limits are for such a package.

| Limit | Value |
| --- | --- |
| One file | 16 MiB |
| All files of one pack | 64 MiB |
| Files in one pack | 1,000 |
| Links | None. A link, a junction or a special file in the pack folder makes Viewpoint refuse the pack. |
| File names | No device names (`aux`, `nul`), no `:`, and no name that ends with a dot or a space |
| Text files | `pack.properties` and the files in `shaders/` must be UTF-8 |

If a pack is over a limit, Viewpoint refuses it. The card names the file.

## When something is wrong

- **In `pack.properties`:** Viewpoint leaves out the pack. The Graphics page lists it under **Left out** with the reason.
  `console.txt` has the same line.
- **In a GLSL file:** the renderer keeps the pack that it had, or the library at the start. The Graphics page shows the
  compiler's errors with file names and line numbers. `console.txt` has them also.

The files that the player accepted are the files that Viewpoint compiles.

---

Previous: [Migrate to version 2](https://docs.projectviewpoint.org/resource-packs/migrating.md) | Next: [Passes & inputs](https://docs.projectviewpoint.org/shaderpacks/passes-and-inputs.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
