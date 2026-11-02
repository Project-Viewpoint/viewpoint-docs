# Assets & budgets

> The memory pools of your assets, the estimates of their cost, and what occurs when a pool is full.

Viewpoint keeps assets in memory pools. Each pool has a maximum size. Viewpoint counts your assets in the pools for your
package. The card shows your part. If a pool is full, Viewpoint refuses *your* next asset. It never removes the assets
of a different package to make space.

## The pools

| Asset | Pool | Default size |
| --- | --- | --- |
| Models | `memory.packMiB` (video memory) | 768 MiB |
| Textures | `memory.packMiB` (video memory) | 768 MiB, together with models |
| Sounds | `memory.soundMiB` | 128 MiB |
| Data files (16 MiB maximum each) | `memory.addonDataMiB` (memory) | 64 MiB |
| Shader snippets, Lua exports and the text of Shaderpacks | `memory.addonDataMiB` (memory), together with data files | 64 MiB |
| Buffers and textures that you make with `Gpu` | `draw.gpuMiB` (video memory), for each addon | 64 MiB by default; you set the amount, more than 128 MiB with the permission `vram` |
| Tile textures | `memory.texturePackMiB` (video memory), and `memory.texturePackDiskMiB` on disk | 256 MiB, 1024 MiB |

The player can change the pool sizes in Viewpoint's settings, on the **World**, **Memory** page.

Tile textures are different. If the tile packs that the player selects need more, Viewpoint increases their pools, and
`memory.floorMiB` and `memory.wallMiB`, so that the tiles keep all their detail. See [Tiles](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/tiles.md).

If there is no space for your icon, the card shows a tile with a letter.

## Estimates

The **Performance** tab shows an estimate before the package loads. Viewpoint calculates it from the file headers when
the tab opens.

| What | Estimate |
| --- | --- |
| Video memory, textures | width × height × 4 bytes × 4/3 (with mipmaps) |
| Video memory, models | vertices × the vertex size + indices × 4 bytes |
| Memory, data | the file size |
| Memory, sounds | sample rate × channels × 2 bytes × duration |
| Memory, classes | approximately 3 × the class bytes in the jar |
| Video memory, targets of a Shaderpack | the targets that the pack declares × the size of the output × the size of the format |
| Main-thread time, for each hook | calls each frame × the measured cost of one call, or *unknown until measured* |
| Graphics-card time | *measured only* |

A texture of 2048 × 2048 pixels uses approximately 21 MiB with mipmaps. A texture of 4096 × 4096 pixels uses 85 MiB.

## When a pool is full

The video memory of the `Gpu` objects works in a different way. Your addon asks for an amount in `draw.gpuMiB`, and
Viewpoint gives it when the addon starts:

- Viewpoint sets no limit on the amount. The graphics card of the player is the limit. The card of your addon shows the
  amount to the player, and more than 128 MiB needs the permission `vram`.
- When your addon asks for a buffer or a texture past its own amount, the call fails, and the message names
  `draw.gpuMiB`.
- Viewpoint frees all your `Gpu` objects when the addon goes off.

- The load of that asset fails.
- The error names the pool. The card shows the same error.
- Your other assets stay loaded.

To correct this, release an asset that you do not use. Or ask the player to make the pool larger.

## Where the work occurs

Viewpoint decodes your assets on a different thread. It counts that time for your package. Viewpoint sends the assets to
the graphics card a little each frame. Viewpoint reads and parses a Shaderpack on this thread also.

## Keep it small

- Load an asset when you need it. Release it when you do not need it.
- Use one texture for many models.
- Use one texture of 1024 × 1024 pixels in place of four textures of 512 × 512 pixels that you always use together.
- Use `ogg` for long sounds.

> **Note**
>
> The estimates are approximate. The **Performance** tab shows them next to the measured values. See
> [Measuring your addon](https://project-viewpoint.github.io/viewpoint-docs/performance/measuring-your-addon.md).

---

Previous: [ZombieBuddy policy & signatures](https://project-viewpoint.github.io/viewpoint-docs/trust/relation-to-zombiebuddy.md) | Next: [Measuring your addon](https://project-viewpoint.github.io/viewpoint-docs/performance/measuring-your-addon.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
