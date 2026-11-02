# Model states

> One model for all the states of an object. Name the parts that change when the object is lit, make a part glow, and bind all the facings of an object with one line.

An object can change while the game runs. A lamp goes on and off. You do not make a model for each state. You make
**one model**, and you name the **parts** that change. Viewpoint shows the parts for the state of the object. When the
state changes, Viewpoint changes the parts at once. It does not load a second model.

A version 2 manifest also has **group binds**: one line for all the facings of an object.

To change a version 1 pack, see [Migrate to version 2](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/migrating.md).

## Parts

Your OBJ file has objects (`o`) or groups (`g`). Put a tag in the name of an object or a group:

| Tag in the name | The part shows |
| --- | --- |
| `[lit]` | Only when the object is lit. |
| `[!lit]` | Only when the object is not lit. |
| No tag | Always. |

```text title="lamp.obj"
mtllib lamp.mtl
o Base
usemtl wood
f ...
o Shade[!lit]
usemtl shade
f ...
o Shade[lit]
usemtl shade_on
f ...
```

- To change the look of a part, put the part two times in the model: one time with `[!lit]` and one time with `[lit]`.
  The two copies can have a different shape, or different UVs on your texture.
- Make only the parts that change. The other parts are shared by all the states.
- The tag can be anywhere in the name. `Shade[lit]_Mesh.001` is correct.
- The tag of a group (`g`) is more important than the tag of its object (`o`).
- A name with both tags shows in all the states, as a name with no tag.

## Glow

A material glows when your MTL gives it an emission colour that is not black (`Ke`), or an emission map (`map_Ke`).
A part that glows is drawn as bright as its texture, without the light of the scene: a bulb, a screen, a flame.

```text title="lamp.mtl"
newmtl shade
map_Kd lamp.png

newmtl shade_on
Ke 1.0 0.85 0.6
map_Kd lamp.png
```

Blender writes `Ke` when the material has an emission colour. Use a glowing material only on a `[lit]` part, or the
part glows in all the states.

> **Note**
>
> Each material uses the texture of its own `map_Kd`. The two copies of a part can use different materials, with
> different textures. A model that uses one texture for all its states uses less memory. See
> [Format](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/format.md).

## Lit

An object is lit when:

| Object | Lit when |
| --- | --- |
| A lamp or a light switch | It is on and it has power: a battery, electricity on its square, or the power grid. A street lamp is lit only at night. |
| A stove, an oven or a microwave | It is on. |
| A generator | It is on. |
| A radio or a television | It is on. |
| A fireplace or a barbecue | It burns. |

Any other object is never lit, and its `[lit]` parts never show. When an object changes, Viewpoint shows the other
parts in a short time (about a tenth of a second).

## Group binds

A group bind gives the same model to all the facings of an object:

```properties title="models/manifest.txt"
format=2
model.chair=chair.obj
group.furniture_seating_indoor_02/Wooden Chair=chair,0,0,0.1,0,1
```

| Line | Meaning |
| --- | --- |
| `group.<tileset>/<name>=<model>,<degrees>,<x>,<y>,<z>,<scale>` | The model of each facing of the object. `<tileset>` is the sheet of the sprites, for example `furniture_seating_indoor_02`. `<name>` is the name of the object: its `GroupName`, a space, and its `CustomName`, for example `Wooden Chair`. If the object has no `GroupName`, use its `CustomName`. The values are the same as in a bind. |

You make the model for the object that **faces south**. Viewpoint turns the model to the `Facing` of each sprite:
south 0 degrees, west 90, north 180, east 270. It turns the offset `<x>,<y>` together with the model. Thus a model that
you move back against the wall of a south-facing chair stays against the wall when the chair faces east.

- A bind of a sprite (`bind.<sprite>=`) is stronger than the bind of its group, in the same pack.
- An object that has more than one square (its sprites have a `SpriteGridPos`) does not get a group bind. Bind each of
  its sprites.
- If a group finds no sprite, the log names the group.
- Without `format=2`, Viewpoint ignores group lines, and the log names them.

## Other states

Open, closed, damaged and facing are not states of a model. In the game, each of them is a different sprite: an open
door, a smashed window, each facing of a chair. Bind that sprite. A bind cannot have a state in its key: Viewpoint
ignores `bind.<sprite>[lit]=` and names the line in the log.

## Rules

- See [Format](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/format.md#models) for how a model stands on its square.
- Models count in `memory.packMiB`. Viewpoint loads a model the first time that the game shows it.
- The package nearer the top of the Active column wins a sprite. See [Order](https://project-viewpoint.github.io/viewpoint-docs/concepts/order.md).
- A line that Viewpoint cannot read is ignored. The log names its line number.

> **Note**
>
> A model with parts works in an older Viewpoint too: there, all its parts show at the same time. A version 2 manifest
> needs a Viewpoint that supports it. An older Viewpoint ignores its group lines.

For a model that needs code, see [Model providers](https://project-viewpoint.github.io/viewpoint-docs/api/model-providers.md).

---

Previous: [Format](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/format.md) | Next: [Tiles](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/tiles.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
