# Passes & inputs

> Add full-screen passes to a Shaderpack. The stages, the inputs, the values of the frame, the event values and the values of addons.

A Shaderpack can add full-screen passes. A pass is a fragment shader of your own. Viewpoint draws it over the whole
frame at one stage. It reads what you name, and it writes the image of the stage or a target of your pack. Use a pass for
an effect that the renderer does not have: motion blur, depth of field, a lens flare, reflections.

```properties title="pack.properties"
targets=focus
target.focus=r16f 1x1 history

passes=focus dof
pass.focus.stage=final
pass.focus.fragment=focus.frag
pass.focus.inputs=depth focus.previous
pass.focus.target=focus

pass.dof.stage=final
pass.dof.fragment=dof.frag
pass.dof.inputs=color depth focus
pass.dof.when=depthOfField
```

| Key | Meaning |
| --- | --- |
| `passes` | The ids of your passes. Within a stage they run in this order. |
| `pass.<id>.stage` | `translucent`, `composite` or `final`. Required. |
| `pass.<id>.fragment` | Its fragment shader: a path in `shaders/`. Required. |
| `pass.<id>.vertex` | Its vertex shader. The default is `screen.vert`: one triangle over the screen, with `vUv` from 0 to 1. |
| `pass.<id>.inputs` | What it reads, with spaces between the names. Use at most 12. |
| `pass.<id>.target` | What it writes: `color` (the image of the stage, the default) or one of your targets. |
| `pass.<id>.when` | A toggle option of your pack. The pass runs only while it is on. |
| `targets` | The names of your targets. Use at most 8. |
| `target.<name>` | `<format> <size> [history]`. |

**Format** is `rgba8`, `rgba16f`, `rg16f`, `r16f` or `r32f`.

**Size** is a share of the frame (`1`, `0.5`, `0.25`; up to 1) or a number of texels (`1x1`, `256x256`; up to 4096).

**`history`** keeps the copy of the target from the end of the last frame.

## The stages

| Stage | When it runs | What `color` is |
| --- | --- | --- |
| `translucent` | After the glass. Before the bounce light, the weather and the air. | The lit HDR image, with the depth of the scene drawn. |
| `composite` | After the air and the bloom. Before `post.frag`. | The HDR image that `post.frag` is about to read. |
| `final` | After anti-aliasing. Before the rain over the image. | The finished image, after the tone curve. |

- What a pass writes at `translucent` or `composite` goes into the history of anti-aliasing. This is what reflections
  want, because anti-aliasing smooths their noise.
- The history of anti-aliasing is taken before `final`. A blur at `final` never smears into the next frames.
- At `final`, the image can be at the size of the screen while the other inputs are at the size of the frame. Read the
  other inputs by their UV.
- Without a pass at `final`, the frame is drawn as without passes. A pack with no passes pays nothing.

## The inputs

An input goes on a sampler. Its name is `u` and the input name with a capital letter: `color` is `uColor`, `farDepth` is
`uFarDepth`, `focus.previous` is `uFocusPrevious`.

| Input | Holds | At which stages |
| --- | --- | --- |
| `color` | The image of the stage, as the previous pass left it. | All |
| `depth` | The depth of the scene. `lib/camera.glsl` turns it into a position. | All |
| `albedo`, `normal`, `light` | The G-buffer: colour and material, normal, and the light of the game's grids. | All |
| `velocity` | How far the models moved on screen since the last frame, in UV. `w` is 1 where it is set. | All |
| `farDepth` | The depth of the far world, on its own range (`uFarRange`). Set only where the far world drew. | All |
| `occlusion` | The ambient occlusion: the bent normal and the visibility. | All |
| `volume` | The light in the air, at half size. | `composite`, `final` |
| `bloom` | The first level of the bloom. The bloom of the pack must be on. | `composite`, `final` |
| `<target>` | A target of your pack: what a pass before this pass wrote in this frame. | All |
| `<target>.previous` | A target with `history`: what it held at the end of the last frame. Zeros in the first frame. | All |

A pass cannot read the target that it writes. Read `<target>.previous` for the last frame.

> **Note**
>
> Each pass is one full-screen draw. Your targets use video memory. Viewpoint makes them when your pack comes into use,
> and lets them go when another pack comes into use. A pass that does not compile does not replace the pack on screen.
> The Graphics page shows the errors.

## The values of the frame

Viewpoint sets these uniforms once each frame, on every pass that declares them. Declare only the ones that you use.

| Uniform | Holds |
| --- | --- |
| `uResolution`, `uTexel` (`vec2`) | The size of what the pass writes, and one over it. |
| `uView`, `uProjection` (`mat4`) | The camera's view and projection. |
| `uViewProjection`, `uInvViewProjection` (`mat4`) | From scene space to clip space and back. |
| `uPrevious` (`mat4`) | From this frame's scene position to the clip position of the last frame. |
| `uCamera` (`vec4`), `uEye` (`vec3`) | The near and far planes and the tangents of the half-angles. The eye in scene space. |
| `uSunDir`, `uSunColor` (`vec3`), `uSunStrength` (`float`) | The direction, colour and strength of the sun, or of the moon at night. |
| `uFogColor` (`vec3`), `uFogRange` (`vec2`) | The colour of the fog, and where it starts and ends, in squares. |
| `uTime`, `uFrameSeconds`, `uExposure` (`float`), `uFrame` (`int`) | Real seconds. How long the last frame took. The exposure. The number of frames drawn. |
| `uRain`, `uSnow` (`float`) | How hard it rains and snows, 0 to 1. |
| `uWind` (`vec2`) | The wind at the ground, in squares each second. |
| `uCloudCover` (`float`) | How much of the sky over the eye is cloud, 0 to 1. |
| `uSceneOrigin` (`vec3`) | Where the origin of the scene is in the world. |

Scene space has x to the west, y up and z to the north, relative to the character. One storey is the side of a square
multiplied by √6.

> **Fix things to the world**
>
> Anything that is fixed to the world needs `uSceneOrigin` added back. Without it, patterns crawl and shadows slide when the
> player walks.

Do not use `uTime` for the weather. The weather follows the game's clock, so a paused game stills the clouds. Use the
values of the weather that `lib/weather.glsl` declares.

## Event values

Viewpoint sets a value for each event of the fight: a muzzle flash, a shot, a hit on a zombie, and damage that the player
takes. The names start with `uEvent`. Each value tells how long ago the last event happened, and how strong it was.
Declare the uniform to read it.

| Uniform | Event |
| --- | --- |
| `uniform vec2 uEventFlash;` | A muzzle flash: 1 for your own gun, less for a gun further away, 0 at 30 squares or more |
| `uniform vec2 uEventShot;` | A shot that you fire |
| `uniform vec2 uEventHit;` | A zombie that you hit: 1, or 0.5 for a blow that does no damage |
| `uniform vec2 uEventDamage;` | Damage that you take: 1 for a quarter of your health or more |

`x` is the seconds since the last event, and `y` is its strength, from 0 to 1. Before the first event, `x` is 1000000.

Use these values for an effect that you tie to the fight, for example a short vignette. Do not use them to copy a cue
that the game does not give.

## Values of addons

An addon can give a value to your shaders. See [Shader values](https://project-viewpoint.github.io/viewpoint-docs/api/shader-values.md). Declare the uniform with the
encoded id of the addon in its name:

```glsl
uniform float uAddon_example_lean_angle;
```

For the addon `example.lean` and the value `angle`, the name is `uAddon_example_lean_angle`. The name of a value has no
`_` in it, so the name has one reading. If the addon is off,
Viewpoint does not set the uniform. Make your shader work with a value of 0. Add the addon to `requires` if your pack is
not useful without it.

---

Previous: [Format](https://project-viewpoint.github.io/viewpoint-docs/shaderpacks/format.md) | Next: [Library files](https://project-viewpoint.github.io/viewpoint-docs/shaderpacks/library-files.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
