# Shader values

> Give numbers from your addon to shader code, as uniforms with the name of your addon in them.

A shader value is a number that your addon sets on the main thread. Viewpoint gives it to shader code as a uniform. Use
it to let a Shaderpack, a snippet or a `Gpu` program react to your addon, for example to the lean of a camera.

**Permission:** `shaders`.

```properties
permissions=shaders
```

## Declare and set

Your addon declares each value with a name and a kind. Then it sets the value on the main thread. The kinds
(`ValueKind`) are `FLOAT`, `VEC2`, `VEC3`, `VEC4`, `INT` and `MAT4`.

- Declare each value when the addon starts. Set it on the main thread, as often as you want. Viewpoint copies the values
  into the frame once each frame, if one changed.
- `set` takes as many numbers as the kind holds: 1 for `FLOAT` and `INT`, 2 to 4 for the vectors, 16 by columns for
  `MAT4`.
- A pulse records the moment of an event. Shader code reads a `vec2`: the seconds since the last event, and its
  strength from 0 to 1. Before the first event, the seconds are 1,000,000.
- An addon has 32 values and pulses at most.

```java title="LeanPart.java"
ShaderValues values = ctx.shaders().values();
ShaderValue angle = values.declare("angle", ValueKind.FLOAT);
ShaderPulse step = values.pulse("step");

// Later, on the main thread:
angle.set(leanDegrees);
step.fire(0.6f);
```

## Read it in GLSL

The name of the uniform is `uAddon_<encoded id>_<name>`. The encoded id writes `.` and `-` as `_`.

```glsl
uniform float uAddon_example_lean_angle;
```

For the addon `example.lean` and the value `angle`, this is the name above. Viewpoint sets the value on each Viewpoint
program that declares the uniform. This includes:

- the passes of a Shaderpack. See [Passes & inputs](https://docs.projectviewpoint.org/shaderpacks/passes-and-inputs.md#values-of-addons);
- the snippets of addons. See [Shader snippets](https://docs.projectviewpoint.org/api/shader-snippets.md);
- the programs that you make with `Gpu`. See [Draw callbacks](https://docs.projectviewpoint.org/api/draw-callbacks.md);
- the programs of an Iris pack. Viewpoint binds the values by name for each program that declares them.

A program that does not declare the uniform gets nothing. A declared value that you have not set is 0. When your addon
goes off, its values are 0 again.

## Rules

- A value name has letters and digits only, and it starts with a letter. Write it in camelCase, for example `leanAngle`.
  Viewpoint refuses any other name when you declare the value. Thus a name has one reading in GLSL.
- Only your addon sets the values of your addon.
- No addon code runs on the render thread to set a value. The values come in the snapshot of the frame.

> **Note**
>
> The game gives events of the fight itself, for example a shot. You do not have to pulse them. See
> [Passes & inputs](https://docs.projectviewpoint.org/shaderpacks/passes-and-inputs.md#event-values).

---

Previous: [Model providers](https://docs.projectviewpoint.org/api/model-providers.md) | Next: [Managed patching](https://docs.projectviewpoint.org/patching/managed-patching.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
