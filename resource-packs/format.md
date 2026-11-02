# Format

> The folders of a resource pack, the version 2 model manifest, and the limits of the files.

A resource pack contains assets and no code. `pack.properties` describes it. It can have four kinds of asset.

- media/viewpoint/resourcepacks/example.pack/
  - pack.properties
  - icon.png
  - models/
    - manifest.txt
    - crate.obj
    - crate.mtl
    - crate.png
    - chair.obj
    - chair.mtl
    - chair.png
  - tiles/
  - sounds/
  - data/

```properties title="pack.properties"
format=1
id=example.pack
name=Example pack
version=1.0.0
author=Example
game.min=42.21
models=models/manifest.txt
tiles=tiles
sounds=sounds
data=data
```

`models` is the path of the manifest file. `tiles`, `sounds` and `data` are folders. Each path is relative to the
folder of the pack, and must be in the folder of the pack's version or in `common/` (the folder that holds its
`media` folder). The [Descriptor](https://docs.projectviewpoint.org/concepts/descriptor.md) page gives the common keys.

## Models

The manifest is a text file of `key=value` lines. Put `format=2` in it: this is version 2, the version for all new packs.
If Viewpoint cannot read a line, it ignores that line, and names its line number in the log. It uses the other lines.

```properties title="models/manifest.txt"
format=2
id=example.pack
name=Example pack

model.crate=crate.obj
model.chair=chair.obj

bind.furniture_storage_01_5=crate,90,0,0,0,1.0
group.furniture_seating_indoor_02/Wooden Chair=chair,0,0,0.1,0,1
```

| Line | Meaning |
| --- | --- |
| `format=2` | The version of the manifest. |
| `id`, `name` | The id and name of the manifest, for messages. |
| `model.<id>=<path>` | A model: an OBJ file, relative to the folder of the manifest. Viewpoint finds its MTL and PNG files from the OBJ file. |
| `group.<tileset>/<name>=<model>,<degrees>,<x>,<y>,<z>,<scale>` | One line for all the facings of an object. See [Group binds](https://docs.projectviewpoint.org/resource-packs/model-states.md#group-binds). |
| `bind.<sprite>=<model>,<degrees>,<x>,<y>,<z>,<scale>` | The sprite whose square shows this model, the model id, its rotation in degrees, its offset and its scale. A bind is stronger than a group in the same pack. |

> **Note**
>
> The two `format` keys are different. In `pack.properties`, `format=1` is the version of the descriptor. In the manifest,
> `format=2` is the version of the manifest.

The model stands on its square:

- The origin is the **centre** of the square.
- The axes are `x` east, `y` south, `z` up. One storey is the side of a square multiplied by √6.
- The model turns about the vertical axis by its degrees, from east towards south. Then it moves by its offset.

The model replaces the art of the sprite: the projected art, the game's own sprite model, or the card of a plant.
Viewpoint loads a model the first time that the game shows its sprite. When two packs put a model on the same sprite,
the pack nearer the top of the Active column wins.

A model can change its parts when its object is lit. See [Model states](https://docs.projectviewpoint.org/resource-packs/model-states.md).

Each material of the MTL uses the PNG of its `map_Kd` line. When the materials of a model use more than one PNG,
Viewpoint puts these PNGs together on one texture as it loads the model. Together, they must fit in 2056 × 2056
pixels. If they are larger, Viewpoint makes each of them half as large (again, if necessary) and writes a line in the
log. Keep the UVs of a model in the range 0 to 1: a model does not repeat its texture.

### Version 1 (legacy)

> **Caution**
>
> Version 1 is deprecated. Do not use it for a new pack.

A manifest without `format=2` is version 1. Viewpoint continues to read it. Version 1 has only `bind.` lines: one line
for each sprite. Viewpoint ignores its `group.` lines, and the log names them. To change a pack to version 2, see
[Migrate to version 2](https://docs.projectviewpoint.org/resource-packs/migrating.md).

This is not the *legacy* flag on a card. That flag shows a pack that its Lua registers, with no descriptor. See
[Legacy model packs](https://docs.projectviewpoint.org/resource-packs/legacy-model-packs.md).

## Tiles

Tile textures have their own format. See [Tiles](https://docs.projectviewpoint.org/resource-packs/tiles.md).

## Sounds

`ogg` and `wav` files. The **Performance** line of the card includes them. In this version, Viewpoint does not play the
sounds of a resource pack, and they do not replace the sounds of the game. To play a sound, put it in an addon. See
[Assets](https://docs.projectviewpoint.org/api/assets.md).

## Data

Read-only files. Viewpoint does not use them itself. An addon reads only the data of its own package. See
[Assets](https://docs.projectviewpoint.org/api/assets.md). The Lua of the mod can read them with the file functions of the game.

## Limits

| Limit | Value |
| --- | --- |
| One data file | 16 MiB |
| All assets | They count in their pool. If the pool is full, Viewpoint refuses the asset, and the card tells you. |
| Paths | In the folder of the pack's version or in `common/`, the one that holds its `media` folder. Viewpoint refuses an absolute path, a `\`, and a link or a junction that goes out of it. A `..` is allowed when the file stays in that folder. |

If Viewpoint cannot read a file, the card names the file. See [Labels](https://docs.projectviewpoint.org/trust/labels.md#resource-packs-and-shaderpacks).

> **Note**
>
> A resource pack has no Java and no shader code. If you need Java, make an addon. If you need to change how the whole
> frame is drawn, make a [Shaderpack](https://docs.projectviewpoint.org/shaderpacks/format.md). Viewpoint does not check the Lua of the
> mod. The last line of the label tells the player this.

---

Previous: [Measuring your addon](https://docs.projectviewpoint.org/performance/measuring-your-addon.md) | Next: [Model states](https://docs.projectviewpoint.org/resource-packs/model-states.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
