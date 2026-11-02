# Aim & shots

> Listen to the aim and to each shot, add sway, decide the result of a shot, and draw your own reticle.

Use this API to follow the aim of the player and their shots, and to change them in a defined way.

**Permission:** `combat`.

```properties
permissions=combat
```

## When it works

These types work while the player aims a firearm with the gunplay of Viewpoint: "Gunplay Rework" is on, and the view is
first person or third person. When the gunplay is off, the game aims, and Viewpoint calls none of them.

All of them run on the main thread. Keep them short. Get them from `ctx.combat()`. Viewpoint closes what you registered when
your addon goes off.

Places and lines use the coordinates of the [view state](https://docs.projectviewpoint.org/api/view-state.md): `x` east, `y` south, `z` up in levels, where
Viewpoint draws things. Angles are in degrees. A yaw of 0 looks east, 90 looks south.

## Listeners

| Type | When Viewpoint calls it | What you get |
| --- | --- | --- |
| `AimListener` | Each update while the player aims. | `AimState`: the weapon, the origin of the aim, the yaw and pitch of the middle of the aim ring, the sway of the crosshair, the radius of the ring, the patience, the line of the crosshair, the target, and whether the crosshair is on a body that a shot would hit. |
| `ShotListener` | When Viewpoint has resolved a shot, and again when the game has dealt its damage. | `ShotEvent`: the weapon, the line of the crosshair, the way of the bullet, the number of pellets, the list of hits (the nearest first), and where the bullet stops when it hits nothing. |

```java title="ShotLogPart.java"
ctx.combat().aim(aim -> {
    aim.target().ifPresent(t -> lastChance = t.chance()); // 0 to 1, the chance of the game
});

ctx.combat().shots(new ShotListener() {
    @Override
    public void onShot(ShotEvent shot) {
        for (ShotHit hit : shot.hits()) {
            // hit.id(), hit.kind(), hit.part(), hit.distance(), hit.at(), hit.pellets()
        }
    }

    @Override
    public void onShotEnd(ShotEvent shot) {
        // The game has dealt the damage. Read the health of the targets from the game now.
    }
});
```

- A hit names its target by its kind and the id of the game: `getID()` of a character, `getId()` of a vehicle.
- A hit on a vehicle has the part `NONE`.
- A listener only reads. A listener that throws is a fault: Viewpoint suspends the addon. The other addons still get the
  aim and the shot.

## Sway

A `SwayProvider` adds sway to the crosshair, for example for the breath, a wound or tiredness. Many addons can add sway.

- Viewpoint asks the providers in the order of the player. See [Order](https://docs.projectviewpoint.org/concepts/order.md).
- Each provider gets the aim with the sway of Viewpoint only. Viewpoint adds the sway of all the providers to it.
- The crosshair and the shot go to the sum, also outside the aim ring.
- All the providers together move the crosshair at most 10 degrees each way.
- Return `Sway.NONE` for no sway. A `null` sway or a number that is not finite is a fault, as a throw is.

```java title="BreathPart.java"
ctx.combat().sway(aim -> {
    double t = System.nanoTime() * 1.0e-9;

    return new Sway(0.0, 0.3 * Math.sin(t * 1.5)); // degrees right, degrees up
});
```

## Decide the result of a shot

A `ShotResolver` decides the list of hits of a shot. This is a **claim**:

- Only one addon at a time can be the resolver. The addon nearer the top of the Active column wins.
- The addon that does not win waits. Its card shows which addon holds the claim.
- Viewpoint releases the claim of an addon that it suspends.

Use a resolver for a change of the rules of a shot, for example a bullet that passes a thin wall. Do not use it only to
read a shot. Use `ShotListener` to read.

```java title="ArmourPart.java"
ResolverClaim claim = ctx.combat().resolve((shot, candidates) -> {
    List<ShotHit> hits = new ArrayList<>();

    for (ShotHit hit : shot.hits()) {
        if (hit.part() != HitPart.SPINE || !wearsArmour(hit.id())) {
            hits.add(hit); // armour on the chest stops the bullet
        }
    }

    return hits;
});
```

- Viewpoint resolves the shot first. Then it gives the shot and its candidates to the resolver. The candidates are what the
  shot can hit, the nearest first.
- Return `shot.hits()` to keep the hits of Viewpoint. Return an empty list for a miss.
- Each hit that you return must name a candidate, or a hit of Viewpoint, by its kind and its id. Viewpoint ignores a hit
  that names nothing of them. Viewpoint puts the hit at the middle of the target.
- The game takes each hit as sure, and deals its damage on the part of the hit.
- A resolver that throws or returns `null` is a fault. The shot then keeps the hits of Viewpoint.
- An addon has one resolver claim open at a time. Close the claim to give it up.

## Reticle

A `ReticleProvider` is a claim. It hides the crosshair dot of Viewpoint and shows a picture of your addon in its place.
Viewpoint draws it. Your addon runs no drawing code.

- Only one addon at a time can hold the reticle. The addon nearer the top of the Active column wins. The others wait.
- The reticle shows where and when the dot shows: in first and third person, while the player looks with the mouse and the
  crosshair is on. It works also without a firearm.
- Viewpoint asks the provider once each frame. The provider returns a `Reticle`: the picture, a scale, a rotation, a tint,
  and whether the aim ring is hidden too. Return `Reticle.NONE` to show nothing. The dot stays hidden while you hold the
  claim.
- The `ReticleState` gives the last aim (while the player aims with the gunplay of Viewpoint), whether the crosshair is on a
  target, whether a fishing cast would not go there, the radius of the aim ring in pixels, the pixels of one degree, and
  the size of the screen.

### Pictures

A picture is a PNG from your package, or a canvas that your addon paints, for a reticle that changes.

```java title="ScopePart.java"
ctx.assets().data().read("reticle.png").then(png -> {
    ReticleImage dot = ctx.combat().image(png); // a PNG in the data folder

    ctx.combat().reticle(state -> new Reticle(
            dot,
            1.0,                          // screen pixels for each pixel of the picture
            0.0,                          // degrees, clockwise
            1.0, state.onTarget() ? 0.2 : 1.0, state.onTarget() ? 0.2 : 1.0, 1.0, // red, green, blue, alpha
            false));                      // true also hides the aim ring
});

ReticleImage canvas = ctx.combat().image(64, 64); // clear at first
canvas.pixels(argb);                              // 64 * 64 pixels, 0xAARRGGBB, from the top left
```

- A picture is at most 512 by 512 pixels. An addon has at most 8 pictures open at a time.
- The pixels of a picture count in `memory.addonDataMiB` until you close it. Viewpoint closes the pictures when the addon
  goes off.
- Set the pixels of a canvas only when they change. Each change goes to the graphics card again.
- A provider that throws, returns `null`, or shows a picture of another addon is a fault. The dot then comes back.

If you want to draw the reticle yourself, use a draw callback at the `crosshair` point. The card of such an addon says
**draws over the whole screen**. See [Draw callbacks](https://docs.projectviewpoint.org/api/draw-callbacks.md).

> **Note**
>
> These types replace the hooks that older addons put on the aim and on the crosshair. Viewpoint refuses a hook on a
> method that has been removed. See [Hooking Viewpoint](https://docs.projectviewpoint.org/patching/hooking-viewpoint.md#removed-members).

---

Previous: [Camera layers](https://docs.projectviewpoint.org/api/camera-layers.md) | Next: [Model providers](https://docs.projectviewpoint.org/api/model-providers.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
