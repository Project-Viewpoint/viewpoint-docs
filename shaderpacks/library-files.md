# Library files

> Replace files of Viewpoint's shader library by path, keep the snippet markers, and follow the rules of the files that need care.

Viewpoint draws the world with a library of GLSL files. A Shaderpack changes the look by replacing some of them.

## Replace a file

A file in the `shaders/` folder of your pack replaces the file of the same path in the library.

- The library is in Viewpoint's source repository, in `src/main/resources/viewpoint/shaders/`.
- Files in `lib/` can also be replaced. Each program that includes the file gets your version.
- A file that you do not replace comes from your `base`, then from the library. A pack holds only what it changes.
- `constants.glsl` cannot be replaced. Viewpoint makes it. Any file can `#include "constants.glsl"`.
- Every stage starts with `#version 330`. Viewpoint adds the defines of the options and the pipeline after this line.
  See [Format](https://docs.projectviewpoint.org/shaderpacks/format.md#options).

An include is a line of this form. Viewpoint expands it before it compiles the file, and it adds `#line` directives so
that an error names the file and the line.

```glsl
#include "lib/sun.glsl"
```

An include path is relative to the `shaders/` folder. Viewpoint reads `./` and `//` in it as plain. It refuses a file
whose include path holds `..`, an absolute path or `\`.

> **Tip**
>
> Read the library file that you replace first. Its first lines say what it does and which uniforms it gets. Your file can
> leave out the uniforms that it does not use.

## Files that are easy to replace

A shared file in `lib/` is the cheapest file to replace. One change then applies to the near world and the far world.

| File | Controls |
| --- | --- |
| `lib/shade.glsl` | The lighting model. The deferred, forward and far passes all call it. |
| `lib/fog.glsl` | The colour of the fog: what the world fades into at the end of the fog. |
| `lib/fog_amount.glsl` | How much fog a point gets. Keep the end of the fog where the range puts it: past it nothing is drawn. |
| `lib/distance.glsl` | What the distance does to a colour. |
| `lib/sun_filter.glsl` | The filter of the sun's shadows. |
| `lib/cloud_shadow.glsl` | The shadow of the clouds on the sun's light. |
| `lib/precip_look.glsl` | The look of rain, snow and splashes. |
| `post.frag` | The composite: the fog, the tone curve and the grade. |
| `sky.frag` | The sky. |

The weather is Viewpoint's. How it looks is the pack's. Two files are always the library's, and a copy in your pack is
not used: `lib/weather.glsl` and `precip.vert`. The console names the copy when the pack loads.

## Rules for some files

Some files must follow a rule, or the picture breaks.

- **Models of packs.** A replaced `mesh.vert` or `shadow.vert` must include `lib/pack_model.glsl`. While `uModels` is
  set, it must take its vertex from `modelVertex(aPos, aUv, aNormal)`, as the library files do. A program without
  `uModels` draws no models of packs.
- **Dead bodies.** A replaced `mesh.vert` or `shadow.vert` must include `lib/corpse_card.glsl`. While `uCards` is set, it
  must take its vertex from `cardVertex()`.
- **Characters and items.** A replaced `model_gbuffer.frag`, `model_shadow.frag` or `model_outline.frag` reads
  `uTextures[vTexture]`, not `uTexture`. It needs `#extension GL_ARB_gpu_shader5 : enable`.
- **The far shell.** A replaced `far_shell.frag`, `gbuffer_shell.frag` or `far_shadow_shell.frag` reads
  `uAtlases[vAtlas]`.
- **Glass.** Keep the rule of the library in `gbuffer.frag` and `forward.frag`. Glass for which `glassSolid` is true is
  solid in the G-buffer. It is not in the translucent pass. Otherwise a window shows the empty rooms behind it.
- **Translucent texels.** A replaced `forward.frag` or `vehicle_glass.frag` writes each texel through
  `translucent(colour, alpha, fromEye)`. Do not declare an output of your own.
- **The sun's light.** The direct light of the sun must fall to none as `uSunStrength` falls, at dusk and at dawn. Follow
  `uSunStrength`, as the library does. Otherwise the light drops in one frame.
- **Includes of options.** A library file that reads an option gives it a default with `#ifndef`.

## The markers for snippets

Addons can add snippets of GLSL to your shaders. Most points work with any file. They are the start and the end of a
vertex or fragment stage. You do not have to do anything for them. Declare each colour output of a fragment stage with its location, `layout(location = N)`.

A few points are inside a shader. The library marks them with comments:

```glsl
// @viewpoint point surface
```

If you replace a library file that has a marker, keep the marker line in the same place in your file. If you drop a
marker, the snippets of that point do not run in your pack. A message on the Addons page says "the shaderpack X has no
point Y". See [Shader snippets](https://docs.projectviewpoint.org/api/shader-snippets.md).

## Made for a version

Set `library=` in your descriptor to the Viewpoint version that you made your pack for. Some library files that your
pack replaces can change after that version. Then the card says "made for \<version\>: N of the files it replaces have
changed since". This is a notice for the player. It does not stop the pack.

This notice is planned. It can come after API 1.0.

---

Previous: [Passes & inputs](https://docs.projectviewpoint.org/shaderpacks/passes-and-inputs.md) | Next: [Migrating from Java](https://docs.projectviewpoint.org/shaderpacks/migrating-from-java.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
