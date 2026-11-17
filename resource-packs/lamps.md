# Lamps

> Put the light of a lamp in its model. Tag a part of the model as the lamp, and give its shape, its colour, its strength and its direction.

A lamp of the game has a light. The sprite of the lamp gives the colour and the radius of the light, and Viewpoint
puts the light at a position from the type of the lamp. You can put the light **in your model**. Then the light comes
from the part that you make: the bulb, the lens or the panel.

## The lamp tag

Put a lamp tag in the name of an object (`o`) or a group (`g`) of your OBJ file, as the tags of
[Model states](https://docs.projectviewpoint.org/resource-packs/model-states.md). The part with the tag is the lamp.

```text title="street_light.obj"
mtllib street_light.mtl
o Pole
usemtl metal
f ...
o Lens[lit][lamp,s,2100K,16000lm,cone=70]
usemtl glass_on
f ...
```

A lamp tag is `[lamp]`, or `[lamp,` and a list of items, then `]`. Use commas between the items. The items can be in
any sequence. Viewpoint knows each item from its form:

| Item | Example | Meaning | If you do not write it |
| --- | --- | --- | --- |
| Shape | `p`, `s` or `r` | `p`: a point light, in all directions. `s`: a spot light, in a cone. `r`: a panel, which lights only its front. | `p` |
| Colour | `2700K` or `#FFB46B` | A temperature in kelvin, or an sRGB colour. Viewpoint uses only the hue. The strength sets the brightness. | The colour of the lamp in the game |
| Strength | `800lm`, `800` or `9000cd` | Lumens (`lm`, or a number with no unit), or candelas (`cd`: the brightness at the centre of the beam). | The strength of the lamp in the game |
| `reach=` | `reach=6` | How far the light goes, in squares. The maximum is 20. | From the strength |
| `cone=` | `cone=70` | A spot only: the full angle of the beam, in degrees. The maximum is 179. | 60 |
| `soft=` | `soft=10` | A spot only: the width of the soft edge of the beam, in degrees. The maximum is half of the cone. | A third of half the cone |
| `tilt=` | `tilt=30` | A spot or a panel only: the angle from straight down, in degrees, towards the front of the model. | From the faces of the part |
| `turn=` | `turn=90` | A spot or a panel only: then the turn, in degrees, as a bind turns (from east towards south). | 0 |
| `shadow=` | `shadow=no` | `no`: the lamp casts no shadow. | `yes` |
| `draw=` | `draw=no` | `no`: Viewpoint does not show the part. The part only marks the position of the lamp. | `yes` |

```text title="Examples"
o Glass[lit][lamp]                         the light of the game, at the glass of a porch lamp
o Bulb[lit][lamp,p,2700K,800lm,reach=6]    a desk lamp
o Lens[lamp,s,2100K,16000lm,cone=70]       a sodium street light that shines down
o Panel[lamp,r,#F2F6FF,2500lm]             a light box that lights its front
o Marker[lamp,p,3000K,draw=no]             a light inside a lamp shade: the marker does not show
```

- The tag can be anywhere in the name. `Bulb[lamp,p].001` is correct.
- Do not use spaces in the tag. Some exporters change a space to `_`.
- The tag of a group (`g`) is more important than the tag of its object (`o`).
- A part can have the tags of [Model states](https://docs.projectviewpoint.org/resource-packs/model-states.md) too. `[lit]` shows the part only when the
  lamp is on. The light of the lamp is on only when the lamp is on, with or without `[lit]`.

## Position and direction

- The lamp is at the centre of its part.
- A spot or a panel points in the direction that the faces of its part point. A flat lens that faces down shines down.
  A round bulb has no one direction: a spot of a round bulb shines straight down. Use `tilt=` and `turn=` to set the
  direction.
- Make your model to face south, as for [Group binds](https://docs.projectviewpoint.org/resource-packs/model-states.md#group-binds). Then `tilt=90` points
  to the front of the object.
- The bind moves the lamp with the model: its offset, its turn and its scale. A group bind turns the lamp for each
  facing.
- A model has a maximum of 4 lamps. Viewpoint ignores the fifth lamp and writes its name in the log.
- All the lamps of a model share one shadow, from the centre between them.

## Strength

The box of a bulb gives its lumens. Some values:

| Lamp | Lumens |
| --- | --- |
| A candle | 12 |
| A 40 W bulb | 450 |
| A 60 W bulb | 800 |
| A 100 W bulb | 1600 |
| A fluorescent tube | 2500 |
| A sodium street light | 16000 |

A lamp lights as far as its light stays brighter than 1 lux. A square is 1.22 m. Thus a lamp of 800 lumens lights
6.5 squares, and a lamp of the game with a radius of 8 is a lamp of approximately 1200 lumens. A spot puts all its
lumens in its cone: a narrow spot lights farther than a wide spot. A light goes 20 squares at most.
If you write `reach=`, the light goes that far.

> **Note**
>
> In Viewpoint 0.1.7 the Default look uses the strength to set how far the light goes. The brightness near the lamp is
> the brightness of the lamps of the game. A look that uses real units of light can use the strength as it is.

## When the lamp lights

- The game turns the lamp on and off: its switch, the power, a bulb that breaks. A street light is on only at night.
- When the player puts a bulb of a different colour in the lamp, the light has the colour of that bulb.
- A model with a lamp tag gives all the light of its lamp. Viewpoint does not show the light of the game for it.
- A model with no lamp tag, or with only tags that Viewpoint cannot read, keeps the light of the game.
- The tag works only on a lamp of the game: a lamp, a street light, a light that a switch turns on. On a different
  object, Viewpoint ignores the tag. Fires, fireplaces and televisions keep the light of the game.
- When the player turns off the models of resource packs, the lamps have the light of the game.
- When a [model provider](https://docs.projectviewpoint.org/api/model-providers.md) of an addon chooses the model of a lamp, the lamp tags of that model
  light the lamp.
- Far from the player, past the part of the map that the game has loaded, the lamps have the light of the game.
- The light of the lamp changes only the picture. The light that the game uses for play does not change.

## Errors

Viewpoint reads the lamp tags of a model the first time that the game loads a lamp with that model. It writes what
is wrong in the log, with the name of the part (`model pack lamps:`).

- A tag that Viewpoint cannot read gives no lamp. For example: `spot` in place of `s`, two colours, or `cone=200`.
- Viewpoint ignores an option that it does not know, and writes it in the log. Thus a pack for a newer Viewpoint
  works in this version.

> **Caution**
>
> A Viewpoint before 0.1.7 does not know the lamp tag. It shows all the parts, also a part with `draw=no`, and the lamp
> has the light of the game.

---

Previous: [Model states](https://docs.projectviewpoint.org/resource-packs/model-states.md) | Next: [Tiles](https://docs.projectviewpoint.org/resource-packs/tiles.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
