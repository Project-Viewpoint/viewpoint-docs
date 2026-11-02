# Draw callbacks

> An addon draws with OpenGL at a named point of a frame.

An addon can draw with OpenGL at a named point of the frame. The card of such an addon says that it draws with OpenGL.

**Permission:** `draw`. More than 128 MiB of video memory also needs `vram`.

```properties
permissions=draw
draw.gpuMiB=32
```

## Points

| Point | When | Target |
| --- | --- | --- |
| `AFTER_OPAQUE` | The opaque world and its light are drawn. The glass and the water are not drawn yet. | The colour of the frame in high dynamic range, with the depth of the world |
| `AFTER_TRANSLUCENT` | The glass and the other translucent things are blended in. | The same |
| `AFTER_WEATHER` | The wet ground, the puddles and the distant rain are drawn, or none was necessary. | The same |
| `BEFORE_POST` | The world is complete. The light in the air, the bloom and the tone mapping come next. | The same |
| `CROSSHAIR` | Where the crosshair goes, only while the crosshair shows. | The screen |
| `FINAL` | The final picture is on the screen, with its colours as shown, before the interface of the game. | The screen |

- No point runs while a Minecraft shader pack draws the frame. The pack owns its targets.
- At one point, the callbacks of the addons run in the order of the player. See [Order](https://docs.projectviewpoint.org/concepts/order.md).
- What you draw at `AFTER_OPAQUE` to `BEFORE_POST` goes through the post-processing of Viewpoint. Write the depth too, if
  you draw into the world: the light in the air goes over a pixel that has the depth of the sky.

```java title="MarkerPart.java"
ctx.render().draw(DrawPoint.FINAL, context -> {
    FrameView view = context.view(); // the matrices, the eye, the origin of scene space
    int width = context.width();     // the size of the target that is bound
    // Draw here, on the render thread.
});
```

## The frame's view

`DrawContext.view()` gives a `FrameView`:

- `view()` and `projection()`: the matrices of the frame, 16 numbers by columns. The projection is the one that the world
  is drawn with in this frame, with the offset of the anti-aliasing.
- `eye()`: the place of the eye in scene space.
- `sceneOrigin()`: the point of the world that is the origin of scene space. In scene space, `x` points west, `y` up in
  squares (a storey is about 2.45 squares) and `z` north.
- `frameWidth()`, `frameHeight()`: the size of the targets of the frame before the post-processing.
- `seconds()`: the clock of the scene.

## The state that you leave

A callback runs on the render thread. Draw into the target that is bound.

- Viewpoint puts back the state that the raw calls change: blending, the depth test and the depth mask, the colour mask,
  culling, the scissor and the line width.
- Leave unit 0 active, and leave no program and no vertex array of yours bound. Leave the target bound. If a callback
  changes one of these, Viewpoint puts it back and suspends the addon. The card says what was wrong.
- A callback that throws is suspended too.

## Cost

Viewpoint measures the time of each callback on the render thread and on the graphics card. See
[Measuring your addon](https://docs.projectviewpoint.org/performance/measuring-your-addon.md).

## The Gpu object

`DrawContext.gpu()` gives the `Gpu` of your addon. Use it to make programs, buffers, textures and meshes, and to draw
with them. Use it only in a draw callback. Outside a callback, each method throws an `IllegalStateException`.

- Make each object one time, and keep it. Use it again in each frame.
- Tell Viewpoint how much video memory your buffers and textures need, in `draw.gpuMiB` (64 MiB if you do not). Viewpoint
  gives that amount to the addon when it starts. A buffer or a texture past it makes the method throw. More than 128 MiB
  needs the permission `vram`, which the player must accept.
- Viewpoint sets no other limit: the graphics card of the player is the limit. The amount and the permission show the
  player what your addon uses. The card shows the amount and what the addon holds.
- Viewpoint frees all the objects of the addon when the addon goes off. You can close an object before that.

| Method | What it makes |
| --- | --- |
| `program(vertex, fragment)` | A program from the text of its two stages. Each text starts with its `#version` line. The same text gives the same program, compiled one time. An addon has 32 programs at most. |
| `buffer(bytes)` | A buffer of vertex data. Write to it with `upload(float[])`, `upload(int[])`, `upload(FloatBuffer)` or `upload(ByteBuffer)`. |
| `texture(width, height)` | A clear texture, 8 bits a channel with alpha. Write to it with `upload(int[])`, each pixel `0xAARRGGBB`. |
| `texture(picture)` | A texture of a PNG that `ctx.render().picture(bytes)` read on the main thread. |
| `mesh(buffer, 3, 2)` | The buffer read as vertices: each number gives the size of one attribute (`layout(location = 0)`, then 1), from 1 to 4 floats, 8 attributes at most. |
| `draw(program, mesh, primitive, first, count)` | Draws vertices of a mesh into the target that is bound. |
| `fullscreen(program)` | Draws one triangle that covers the target. The vertex stage makes its corners from `gl_VertexID`. |

A program keeps its values until you set them again:

- `set(name, numbers...)` for a `float` to a `vec4`, `setInt(name, value)`, `setMatrix(name, sixteen)`.
- `texture(sampler, slot, texture)` samples one of your textures, `input(sampler, slot, input)` one of the frame's:
  `DEPTH`, `NORMAL` or `ALBEDO`. A program samples two textures at most, at slots 0 and 1.
- A name that is not in the text of the program makes the method throw.
- The first row of a picture is at the texture coordinate `t = 0`.

Read the text of the program and the picture from your `data` folder. `read` gives the bytes later, on the main thread.
Give them to the callback, and make the objects in the callback:

```java title="BadgePart.java"
DataAssets data = ctx.assets().data();

data.read("badge.vert").then(vertex -> data.read("badge.frag").then(fragment -> data.read("badge.png").then(png -> {
    String vertexText = new String(vertex, StandardCharsets.UTF_8);
    String fragmentText = new String(fragment, StandardCharsets.UTF_8);
    Picture badge = ctx.render().picture(png);

    ctx.render().draw(DrawPoint.FINAL, context -> {
        Gpu gpu = context.gpu();

        if (program == null) {
            program = gpu.program(vertexText, fragmentText);
            mesh = gpu.mesh(gpu.buffer(QUAD.length * Float.BYTES).upload(QUAD), 2, 2); // place, then texture coordinate
            texture = gpu.texture(badge);
        }

        program.set("uRect", 0.8f, 0.8f, 0.95f, 0.95f).texture("uBadge", 0, texture);
        gpu.draw(program, mesh, Primitive.TRIANGLE_STRIP, 0, mesh.vertices());
    });
})));
```

`Gpu.draw` and `Gpu.fullscreen` put back the program and the vertex array that were bound before the callback.

## No memory addresses

An addon may not call LWJGL with a memory address. `org.lwjgl.system` (`MemoryUtil`, `MemoryStack`), `PointerBuffer`,
the `n`-prefixed functions and any call that takes a pointer make Viewpoint refuse the jar, and the card names the call.
Make your buffers with `BufferUtils`, and use the `Gpu` object instead.

---

Previous: [Shader snippets](https://docs.projectviewpoint.org/api/shader-snippets.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
