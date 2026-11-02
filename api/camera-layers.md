# Camera layers

> Move the camera with a layer that adds to Viewpoint's own motion, or take the whole camera for a short time with a claim.

An addon does not own the camera. It adds to the camera with a **layer**, or it takes the camera for a short time with a
**claim**. Use this API in place of a write to the look, the eye or the field of view.

**Permission:** `camera`.

```properties
permissions=camera
```

## Layers

A `CameraLayer` adds a small change to the camera. Many addons can have a layer at the same time. Viewpoint adds the
layers together with its own motion. The player's order decides the order of the layers. See [Order](https://docs.projectviewpoint.org/concepts/order.md).

A layer has these values. Each is neutral until you set it.

| Value | Meaning |
| --- | --- |
| Eye offset | Moves the eye, relative to the view. |
| Yaw, pitch, roll | Turns the view. |
| Lean | Leans the view to one side. |
| Field of view | A factor, and an amount to add. |

- Set the values on the main thread, once each frame. A value stays as you set it until you set it again.
- Viewpoint applies the layers in the render of the frame with the newest look of the player. Thus the camera does not
  lag. The layers work in first person and in third person.
- Set a value back to its neutral value to stop the effect, or close the layer. Viewpoint closes the layers when the addon
  goes off.

```java title="LeanPart.java"
CameraLayer layer = ctx.camera().layer();

// Each frame, on the main thread:
layer.lean(leaning ? 1.0 : 0.0)      // -1 left to 1 right
        .turn(0.0, 0.0, 0.0)          // yaw right, pitch up, roll right, in degrees
        .eye(0.0, 0.0, 0.0)           // right, up, back, in squares
        .fov(zoomed ? 0.5 : 1.0, 0.0); // a factor on the field of view, and degrees to add
```

| Method | Limits |
| --- | --- |
| `eye(right, up, back)` | All the layers together move the eye at most 2 squares each way. A square is the side of a floor tile. |
| `turn(yaw, pitch, roll)` | All the layers together turn the view at most 45 degrees each way. |
| `lean(amount)` | From -1 to 1. A full lean rolls the view by 10 degrees and moves it 0.3 squares to that side. |
| `fov(factor, degrees)` | The factor is from 0.1 to 10. The factors of the layers multiply, their degrees add. The field of view stays from 15 to 150 degrees. |
| `reset()` | Every value back to neutral. |
| `close()` | The layer goes. |

- An addon has at most 8 layers open at a time.
- A value that is not a finite number gets an `IllegalArgumentException`. A call on a closed layer, after the addon is
  off, or from a thread that is not the main thread gets an `IllegalStateException`.
- Without the `camera` permission, each call gets a `SecurityException`.
- The free camera of Viewpoint is the player's own: the layers do not move it.

## Claims

A `CameraClaim` takes the whole pose of the camera. Use it for a cut scene, a death camera or a free camera.

- Only one claim can hold the camera at a time. The addon nearer the top of the Active column wins.
- An addon that does not win waits. The card of the addon shows who holds the camera.
- While you hold the claim, you set the whole pose of the camera.
- Release the claim when you finish. Viewpoint releases the claim of an addon that it suspends. The release happens at
  the start of the next frame, and the frame that is being drawn keeps its values.

```java title="DeathCamPart.java"
CameraClaim claim = ctx.camera().claim(false); // false: only the picture moves

// Each frame while it moves, on the main thread:
claim.pose(x, y, z, yaw, pitch, 0.0) // the game's x, y and level; degrees: 0 looks east, 90 south
        .fov(70.0);                  // degrees, 15 to 150

// When it ends:
ctx.camera().look().set(yaw, pitch); // the player looks this way after the cut scene
claim.close();
```

- `claim(false)` moves only the picture. The world stays loaded, culled and heard round the player: keep the camera near
  the player. `claim(true)` is **physical**: what Viewpoint draws far off, its lights, its culling and its sound go by
  where the camera stands. The game still loads its own chunks round the player.
- Until the first `pose`, the claim draws nothing of its own: the view stays the player's.
- `held()` tells if the claim holds the camera now. A claim that waits keeps its pose, and it is drawn from as soon as it
  holds.
- An addon has one camera claim open at a time. The pitch is from -89 to 89 degrees.
- The player's own free camera of Viewpoint wins over any claim.
- While a claim holds the camera, the player's head is drawn, and the crosshair is not.

## Look, view and cursor

| Type | Use |
| --- | --- |
| `LookControl` | Add to the look of the player every frame, with look deltas: `ctx.camera().look().turn(yaw, pitch)`, in degrees, right and up. Viewpoint adds them as it reads the mouse for the next frame, while the look is the player's; it drops them while it is not. `look().set(yaw, pitch)` sets the look at the next frame, only while you hold the camera claim. |
| `LookControl`, to follow | Turn the look with something that moves, for example a car: `ctx.camera().look().follow(yaw, pitch)` once a frame, with where the car points, in degrees. The look turns by as much as the car moves, and the player keeps their own look relative to it. Viewpoint takes up each move smoothly as it reads the mouse. Use this in place of `turn` for a way that moves all the time. `stopFollowing()` stops it. |
| `ViewControl` | `ctx.camera().view().request(ViewMode.THIRD_PERSON)`: first person, third person, or the isometric view (`ISOMETRIC`). While it holds, the player's keys to switch the view wait. When you close it, the player's view comes back. |
| `CursorClaim` | `ctx.camera().cursor()`: the view lets go of the mouse, so the player can click a window of your addon. The look does not turn while it holds. |

These claims work in the same way as the camera claim: one holder, the top of the order wins, and a card shows the holder.

> **Note**
>
> These types replace the writes that older addons did with reflection. Reflection into Viewpoint is Red. A layer is Normal.
> See [Migrating from ZombieBuddy](https://docs.projectviewpoint.org/patching/migrating-from-zombiebuddy.md).

## Read the result

`ViewState` tells you if the free camera is on. See [View state](https://docs.projectviewpoint.org/api/view-state.md).

---

Previous: [Services](https://docs.projectviewpoint.org/api/services.md) | Next: [Aim & shots](https://docs.projectviewpoint.org/api/aim-and-shots.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
