# Internals changes

> What each Viewpoint release adds to, deprecates in and removes from the internals list, with the replacements.

Viewpoint changes in each release. The [internals list](https://docs.projectviewpoint.org/reference/viewpoint-internals.md) changes with it. This page lists
the changes of the list, release by release, so that you can update your addon.

Viewpoint writes this page when it builds a release. Do not edit it by hand.

## What the page lists

For each release, the page has three tables.

| Table | Meaning | What you do |
| --- | --- | --- |
| **Added** | New members on the list. | Nothing. You can use them. |
| **Deprecated** | Members that still work and will go. The table names the replacement. | Move to the replacement. The card of your addon shows **uses deprecated internals** until you do. |
| **Removed** | Members that are gone. The table names the release and the replacement. | Update your addon. It shows **Needs an update** and does not start until you do. |

Each row gives the class, the member, the release and, for the last two tables, the replacement.

## Latest release

### Release alpha-0.1.7

**Added**

This is the first release with the list: every member of the
[internals list](https://docs.projectviewpoint.org/reference/viewpoint-internals.md) is new.

**Deprecated**

No member is deprecated.

**Removed**

| Class | Member | Release | Replacement |
| --- | --- | --- | --- |
| `viewpoint.FP` | `cursorBeforePause` | alpha-0.1.7 | `FP.cursorBefore` |
| `viewpoint.FP` | `snapshot(Lviewpoint/core/Frame;Lzombie/iso/IsoCell;Lzombie/characters/IsoGameCharacter;I)V` | alpha-0.1.7 | `ViewListener.onFrame` |
| `viewpoint.SceneDrawer` | `drawCrosshair()V` | alpha-0.1.7 | `ReticleProvider` |
| `viewpoint.input.Controls` | `eye` | alpha-0.1.7 | `FrameView` |
| `viewpoint.input.ThirdPerson` | `capture` | alpha-0.1.7 | `CameraLayer` |
| `viewpoint.interact.LootMenu` | `enabled` | alpha-0.1.7 | None with the same shape. |
| `viewpoint.models.RigidCapture` | `item(Lviewpoint/core/Frame;Lzombie/core/skinnedmodel/model/WorldItemModelDrawer;Lzombie/iso/IsoGridSquare;Lzombie/inventory/InventoryItem;)Z` | alpha-0.1.7 | `RigidCapture.item` |
| `viewpoint.packs.ModelPacks` | `switches` | alpha-0.1.7 | None with the same shape. |
| `viewpoint.platform.GlProgram` | `link(Lviewpoint/platform/ShaderPacks$Active;)Lviewpoint/platform/ProgramLinker$Linked;` | alpha-0.1.7 | `GlProgram.link` |
| `viewpoint.platform.Shaders` | `read(Ljava/lang/String;Lviewpoint/platform/ShaderPacks$Active;[Z)Ljava/lang/String;` | alpha-0.1.7 | `Shaders.read` |
| `viewpoint.render.IndirectPass` | `draw(Lviewpoint/render/FrameContext;ZZ)V` | alpha-0.1.7 | `IndirectPass.draw` |
| `viewpoint.render.ModelPass` | `fill` | alpha-0.1.7 | None with the same shape. |
| `viewpoint.render.MousePick$Hit` | `<init>(Lviewpoint/render/MousePick$Ask;DDDFFF)V` | alpha-0.1.7 | `MousePick.Hit` |
| `viewpoint.render.SceneData` | `torchCount` | alpha-0.1.7 | None with the same shape. |
| `viewpoint.world.ChunkCache` | `update(Lviewpoint/core/Frame;Lzombie/iso/IsoCell;I)V` | alpha-0.1.7 | `ChunkCache.update` |
| `viewpoint.world.Facades` | `facadeTile(Lzombie/iso/IsoGridSquare;ZI)Lzombie/iso/sprite/IsoSprite;` | alpha-0.1.7 | None with the same shape. |
| `viewpoint.world.Facades` | `roomTile(Lzombie/iso/RoomDef;Lzombie/iso/areas/IsoRoom;ZI)Lzombie/iso/sprite/IsoSprite;` | alpha-0.1.7 | `Facades.roomTile` |
| `viewpoint.world.PackGather` | `place(Lviewpoint/packs/PackBind;Lzombie/iso/sprite/IsoSprite;FFFI)V` | alpha-0.1.7 | `viewpoint.world.PackGather.place(Lviewpoint/packs/PackBind;Lzombie/iso/sprite/IsoSprite;FFFII)Lviewpoint/world/Recipe$Op;` |
| `viewpoint.world.Recipe` | `model(Lviewpoint/world/Recipe;Lviewpoint/packs/PackBind;ZFFFIII)V` | alpha-0.1.7 | `viewpoint.world.Recipe.model(Lviewpoint/world/Recipe;Lviewpoint/packs/PackBind;ZFFFIIII)Lviewpoint/world/Recipe$Op;` |
| `viewpoint.world.WallMesher` | `back(Lzombie/iso/sprite/IsoSprite;Lviewpoint/world/TileMesh;Lzombie/core/textures/Texture;Lzombie/iso/IsoGridSquare;Lzombie/iso/IsoGridSquare;Lzombie/iso/RoomDef;ZIZFFFFF[Z)V` | alpha-0.1.7 | `WallMesher.back` |
| `viewpoint.world.WallMesher` | `wall(Lzombie/iso/sprite/IsoSprite;Lviewpoint/world/TileMesh;Lzombie/core/textures/Texture;Lzombie/iso/IsoGridSquare;FFFZ[Z)Z` | alpha-0.1.7 | `WallMesher.wall` |
| `viewpoint.world.WorldMesher` | `plant(Lzombie/core/textures/Texture;FFFII)V` | alpha-0.1.7 | `PlantGather.plant` |

## Older releases

A release stays on this page. Read all the releases between the version that you built for and the version that your
players use.

> **Tip**
>
> To ask for a member that is not on the list, tell the maintainers on the Viewpoint issue tracker. Say why `viewpoint.api`
> does not have what you need.

---

Previous: [Viewpoint internals list](https://docs.projectviewpoint.org/reference/viewpoint-internals.md) | Next: [Glossary](https://docs.projectviewpoint.org/reference/glossary.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
