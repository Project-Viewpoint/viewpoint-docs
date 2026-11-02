# Tiles

> Replace the game's tile art with your own, with normal and specular textures, as one PNG for each tile.

The `tiles` folder of a resource pack replaces the art of the game's tiles: floors, walls, furniture, plants. While the
pack is active, Viewpoint shows your PNG in place of the game's art. The isometric view of the game keeps its own art.

## One PNG for each tile

Give each file the id of the tile in the game, as the game's tile sheets name it:

- tiles/
  - walls_exterior_house_01_0.png
  - walls_exterior_house_01_0_n.png
  - walls_exterior_house_01_0_s.png

| File | Contains | Required |
| --- | --- | --- |
| `<id>.png` | The colour | Yes |
| `<id>_n.png` | The normal texture, in the LabPBR layout | No |
| `<id>_s.png` | The specular texture, in the LabPBR layout | No |

If you give `<id>_n` or `<id>_s`, the light uses the surface of your tile. If you do not, Viewpoint lights the tile as it
lights the game's art. `<id>_n` and `<id>_s` must have the same size as `<id>`.

## The size and the shape of a tile

Your tiles are made for Viewpoint, so floors and walls are flat: do not draw them at the isometric angle of the game.

| Tile | The art | Sizes |
| --- | --- | --- |
| A floor | A square, seen from above. North is at the top. | 64 × 64, 128 × 128 or 256 × 256 |
| A wall | One face, seen from the side that the game shows: from the south for a north wall, from the east for a west wall. The bottom row is on the floor. | 64 × 192, 128 × 384 or 256 × 768 |
| A corner of two walls | The north face, then the west face, side by side. | 128 × 192, 256 × 384 or 512 × 768 |
| All other tiles | The full frame of the tile, as the tile sheets of the game give it, for example 128 × 256. | The frame, or 2 or 4 times its size |

The larger sizes give more detail when the player is near. Viewpoint does not use a PNG of another size, and writes in
the log the sizes that the tile can have.

Many Minecraft resource packs use LabPBR for normals, smoothness, reflectance and emission. Textures in that layout
work here with no change.

## How Viewpoint uses them

- Viewpoint puts many tiles together on large textures. It keeps them on disk, so the next start is faster. When you
  change a PNG, Viewpoint reads it again.
- If the game has no tile with the name of a PNG, Viewpoint writes it in the log and does not use the PNG.
- A floor tile also replaces the ceilings that show the art of that floor.
- The far world shows your tiles too. From far away, a tile shows the average colour of your PNG.
- When the player changes the packs, the far world goes and Viewpoint builds it again from the new tiles. This can take
  some seconds. Viewpoint keeps the result on disk, so the next time it is faster.
- The game tints its grass floors. It also tints your tile for a grass floor.
- They count in `memory.texturePackMiB` (256 MiB by default). The disk copy counts in `memory.texturePackDiskMiB`
  (1024 MiB by default). If your tiles need more, Viewpoint increases these sizes, so that all your tiles show. When the
  player switches the pack off, Viewpoint makes them smaller again.
- The default shader pack and Iris shader packs both use them.

## Estimates

A tile of width `w` and height `h` uses approximately `w × h × 4 × 4/3` bytes of video memory for each texture, with
mipmaps. Before the player switches the pack on, the **Performance** tab shows the total.

Viewpoint also bakes floors and ceilings into pages. For floors of 128 × 128, the pages can use 4 times the video memory
that they use for the art of the game. For floors of 256 × 256, they can use 16 times that memory, up to about 6 GiB.
Viewpoint increases the pool `memory.floorMiB` by this amount, so that your floors keep all their detail.

Viewpoint also bakes walls into arrays, in `memory.wallMiB`. With walls of 256 × 768, these can use up to about 2 GiB.

## Order

When two packs have the same tile, the pack nearer the top of the Active column wins, for each tile. See
[Order](https://docs.projectviewpoint.org/concepts/order.md).

---

Previous: [Model states](https://docs.projectviewpoint.org/resource-packs/model-states.md) | Next: [Legacy model packs](https://docs.projectviewpoint.org/resource-packs/legacy-model-packs.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
