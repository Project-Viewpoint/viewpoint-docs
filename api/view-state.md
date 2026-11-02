# View state

> Read where Viewpoint's view is, what it shows and where the crosshair points, one time each frame.

`ViewState` is a snapshot of Viewpoint's view. You can read it. You cannot change the view with it. To change the view, use
[camera layers](https://project-viewpoint.github.io/viewpoint-docs/api/camera-layers.md). To follow the aim and the shots, use [aim & shots](https://project-viewpoint.github.io/viewpoint-docs/api/aim-and-shots.md).

No permission is necessary.

## The record

`viewpoint.api.view.ViewState` is an immutable record. You can keep it, and you can give it to a different thread.

| Member | Type | Meaning |
| --- | --- | --- |
| `on()` | `boolean` | `true` when Viewpoint's view shows, in first or third person. `false` when the game's isometric view shows. |
| `mode()` | `ViewMode` | `FIRST_PERSON`, `THIRD_PERSON` or `ISOMETRIC`. `on()` is the same as `mode() != ISOMETRIC`. |
| `eye()` | `EyePose` | The position of the view's eye in world coordinates, and its direction. |
| `fov()` | `float` | The vertical field of view, in degrees. |
| `crosshair()` | `Ray` | The line from the eye through the crosshair. |
| `terrainHeight(x, y)` | `OptionalDouble` | The ground height at a point, as world `z`. Empty if Viewpoint has no height for the point, for example when terrain relief is off. |
| `versions()` | `Versions` | The game build, the Viewpoint version and the API version, as text. |
| `freeCamera()` | `boolean` | `true` while a free camera has the view. |
| `cursorCaptured()` | `boolean` | `true` while Viewpoint holds the cursor for the view. |
| `sceneOrigin()` | `Vec3` | The point of the world that is the zero of the scene. See [Scene origin](#scene-origin). |
| `crosshairHit()` | `Optional<Vec3>` | The point in the world where the line of the crosshair meets something. See [What the view points at](#what-the-view-points-at). |
| `cursorHit()` | `Optional<Vec3>` | The point in the world that the picture shows under the free cursor. See [What the view points at](#what-the-view-points-at). |

`EyePose` has `x`, `y`, `z`, and `yaw` and `pitch` in degrees. `Ray` has an origin and a unit direction, each as three
numbers. `Vec3` has `x`, `y` and `z`.

The coordinates are the game's world coordinates. The game's Lua and Java use the same coordinates. The axes are: `x`
east and `y` south, in squares, and `z` up, in storeys. One storey is the side of a square multiplied by √6.

## Listen

```java title="ViewPart.java"
public final class ViewPart {
    private final AddonContext ctx;

    ViewPart(AddonContext ctx) {
        this.ctx = ctx;
    }

    void start() {
        ctx.view().listen(state -> {
            if (state.on()) {
                state.terrainHeight(state.eye().x(), state.eye().y())
                        .ifPresent(h -> System.out.println("ground under the eye: " + h));
            }
        });
    }
}
```

`ctx.view().listen(ViewListener)` gives a `Registration`. Viewpoint closes it when the addon goes off.

Viewpoint calls `onFrame(ViewState)` of the listener on the **main thread**:

- one time each frame while the view is on;
- one more time when the view goes off.

Viewpoint calls it after it reads the game for that frame. Thus the state agrees with the frame that Viewpoint draws.

## Ask at any time

`ctx.view().state()` gives the latest `ViewState`. Call it on the main thread. Use it when you have your own trigger,
for example a key. Viewpoint builds the state only while a listener exists or someone asked for it in the last two
seconds. The first call, or the first call after a pause, gives `null`, and the next frame has the state.

## What the view points at

Viewpoint reads both points from the picture that it draws. Each point is the surface that the player sees there, with its
height in `z`. Each point is one or two frames old.

| Point | Has a value | Is empty |
| --- | --- | --- |
| `crosshairHit()` | While Viewpoint holds the cursor for the view (`cursorCaptured()`), on foot, or seated in first person. In third person, a seated player must aim. | On the sky. On the vehicle of a seated player. With a free camera. While the cursor is free. |
| `cursorHit()` | While the cursor is free in first person. | On the sky. While the cursor moves. While Viewpoint holds the cursor. |

Thus use one point or the other, by `cursorCaptured()`, to know what the player clicks on. To know the direction of the
view, use `eye()`: `yaw()` is 0 to the east and 90 to the south, and `pitch()` is positive up. Neither point gives the
direction of the surface.

## Scene origin

Viewpoint draws the world relative to a point near the player, the scene origin. This keeps the numbers small. A position
that you read from a draw callback or a shader is relative to this point. To keep something fixed to the world, add
`sceneOrigin()` back to the position. Without it, a pattern moves when the player walks.

## Terrain height

`terrainHeight(x, y)` reads Viewpoint's terrain relief. This is the ground that Viewpoint draws. The call is fast. It reads
the relief that is current when you call, not the one of the frame of the state. Thus a state that you keep does not hold the
ground, and the answer can change if the relief changes. It is empty for a number that is not finite.

The value is correct only where terrain relief is on. If the player switches relief off, the result is empty. Then use
the floor height of the game.

> **Note**
>
> The game's Lua can read the same state through `Viewpoint.Addons`. See [Lua mirror](https://project-viewpoint.github.io/viewpoint-docs/api/lua-mirror.md). On the render
> thread, a draw callback gets the matrices and sizes of the frame in a `FrameView`. See
> [Draw callbacks](https://project-viewpoint.github.io/viewpoint-docs/api/draw-callbacks.md) (planned).

---

Previous: [Order](https://project-viewpoint.github.io/viewpoint-docs/concepts/order.md) | Next: [Settings & keys](https://project-viewpoint.github.io/viewpoint-docs/api/settings-and-keys.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
