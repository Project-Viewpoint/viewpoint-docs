# Shader snippets

> An addon adds a small piece of GLSL at a named point of a shader.

A snippet is a small piece of GLSL that your addon adds at a named point of the shaders of Viewpoint. Use it to change a
surface, a vertex or a colour, for example to make surfaces wet or to tint the scene.

**Permission:** `shaders`.

```properties
permissions=shaders
```

## Add a snippet

A snippet is the body of a function. Viewpoint declares the function for the point, with the point's parameters. Your
snippet reads and changes the parameters.

```java title="WetPart.java"
AddonSnippets snippets = ctx.shaders().snippets();
ShaderValue wetness = ctx.shaders().values().declare("wetness", ValueKind.FLOAT);

snippets.add(SnippetPoint.GBUFFER_END, "wet", """
        g.albedo.rgb *= 1.0 - 0.4 * wetness;
        """);
```

- `add` takes the point, a name for messages, the body, and the programs that it runs in. Give no program to run it in
  every program that has the point.
- Load a long snippet from your data assets, then add it. See [Assets](https://project-viewpoint.github.io/viewpoint-docs/api/assets.md).
- Close the registration to take the snippet out. When your addon goes off, Viewpoint takes out all its snippets.
- Read the values of your addon by their names, for example `wetness` above. See [Shader values](https://project-viewpoint.github.io/viewpoint-docs/api/shader-values.md).

## The points

| Point | Parameters | Programs |
| --- | --- | --- |
| `surface` | `inout Surface s` (`vec3 albedo`, `vec3 normal`, `vec4 light`, `bool foliage`), `vec3 local`, `vec3 pos`, `vec3 eye` | `gbuffer`, `forward`, `far shell`, `far shell band` |
| `vertex.world` | `inout MeshVertex v` (`v.pos` in scene space) | `gbuffer`, `forward`, `puddle` |
| `vertex.end` | `inout vec4 clipPosition` | every program with a vertex stage, but those with tessellation or a geometry stage |
| `gbuffer.end` | `inout GBuffer g` (`vec4 albedo`, `vec4 normal`, `vec4 light`, `vec4 velocity`) | `gbuffer`, `far shell band`, `model`, `vehicle`, `grass`, `snow layer`, `snow layer tessellated`, `snow wake` |
| `colour.end` | `inout vec4 colour` | `light`, `far shell`, `far` |

`surface` and `vertex.world` are in the middle of a shader. A Shaderpack that replaces their file keeps their marker. If a
Shaderpack does not keep it, your snippets at that point do not run, and a message on the Addons page says so.

At `gbuffer.end`, a program without a velocity output ignores what you write to `g.velocity`.

## Rules

Viewpoint checks each snippet when you add it. If the snippet breaks a rule, `add` throws an
`IllegalArgumentException` that gives each reason.

- A snippet is at most 16 KiB. The snippets of one addon are at most 64 KiB together.
- The braces, brackets and parentheses of a snippet close in the snippet.
- A snippet has no `#` lines.
- A snippet has no `while` or `do` loops. A `for` loop counts with numbers towards a number:
  `for (int i = 0; i < 8; i++)`, or `for (int i = 8; i > 0; i -= 2)`.
- A snippet writes no images or buffers, and calls no atomic or barrier functions. It declares no uniforms or blocks.
- A snippet uses none of the names of Viewpoint's shaders: no name of `u`, `v` or `a` followed by a capital letter, and no
  name that starts with `vp_` or `addon_`. Of the names that start with `gl_`, it can read only `gl_FragCoord`,
  `gl_FrontFacing`, `gl_PointCoord`, `gl_VertexID` and `gl_InstanceID`.

The graphics driver compiles the snippet. If it fails, your snippets at that point stop, a message on the Addons page
says so, and `console.txt` has the driver's error. The other addons and Viewpoint go on.

## When a change applies

When an addon with snippets goes on or off, Viewpoint compiles the programs with those points again.

- In a single-player game, the game pauses until the programs are ready. A dark layer covers the screen, under the Esc
  menu, and the bar at the bottom left shows "Compiling addon shaders" and the progress.
- In a multiplayer game, the game does not pause. Only the bar shows.

> **Note**
>
> After the programs are ready, a snippet costs only its own GPU time in each frame. Your card's Performance tab shows it.

---

Previous: [Glossary](https://project-viewpoint.github.io/viewpoint-docs/reference/glossary.md) | Next: [Draw callbacks](https://project-viewpoint.github.io/viewpoint-docs/api/draw-callbacks.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
