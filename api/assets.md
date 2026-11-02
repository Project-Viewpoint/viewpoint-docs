# Assets

> AddonAssets loads the models, textures, sounds and data of an addon into memory pools with limits.

Use `AddonAssets` for files in your package: a model, a texture, a sound, a data table. It uses the same loaders as a
resource pack. Thus the same limits apply. No permission is necessary.

## Where the assets are

Set the same four keys in the descriptor as a resource pack. `models` is the path of a manifest. The other three are
folders. Use a version 2 manifest. See [Format](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/format.md#models) and
[Model states](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/model-states.md). Version 1 is deprecated.

```properties
models=models/manifest.txt
tiles=tiles
sounds=sounds
data=data
```

Each path must be in your mod's folder. If it is not, the card shows an error.

## The four kinds

| Kind | Call | Files | Pool |
| --- | --- | --- | --- |
| Models | `ctx.assets().models()` | OBJ models with their art, put on sprites by a model manifest | `memory.packMiB` |
| Textures | `ctx.assets().textures()` | PNG images in the folder of the manifest | `memory.packMiB` |
| Sounds | `ctx.assets().sounds()` | `ogg` and `wav` files | `memory.soundMiB` |
| Data | `ctx.assets().data()` | Files read as bytes, 16 MiB maximum each | `memory.addonDataMiB` |

Code does not load tile textures. To replace the game's tile art, use the `tiles` folder. See
[Tiles](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/tiles.md). To choose a model with code, use a provider. See
[Model providers](https://project-viewpoint.github.io/viewpoint-docs/api/model-providers.md).

## Use them

```java title="AssetsPart.java"
AddonAssets assets = ctx.assets();

assets.data().read("table.csv").then(bytes -> System.out.println("table: " + bytes.length + " bytes"));

if (assets.sounds().available()) {
    assets.sounds().load("click.ogg").then(sound -> sound.play());
} else {
    System.out.println("[Sample] sound is off in this install");
}
```

A load gives a `Pending`. Its callbacks run on the main thread. Viewpoint reads or decodes the asset on a different thread.
Thus a load does not stop a frame. Call the methods of `ctx.assets()` on the main thread. A name has the same rules as the name
of a file in [Files](https://project-viewpoint.github.io/viewpoint-docs/api/files.md): lower-case, at most four parts, and a known extension.

- `data().read(name)` gives a copy of the bytes each time. Viewpoint keeps one copy in the pool until your addon goes off.
  Two reads of one file at the same time are one read.
- `sounds().load(name)` gives a `Sound`. Viewpoint reads the length of the file from its header before it decodes it. A sound
  that decodes to more than 32 MiB, or a file whose header does not say its length, is refused and is not decoded. `play()` plays it once. `close()` gives its memory back. A sound that you do not
  close stays until your addon goes off.
- `models().manifest()` and `models().bytes()` give the path of your manifest and what your models take in the pool now.
  `textures().bytes()` gives the same for your textures. Viewpoint loads both from the manifest that `models=` names, when the
  package runs, and takes them out when it stops. You do not load them with code.

### Sounds

`sounds().available()` is `false` only when the game's sound is off. Then the card tells the player. Use
`available()` before you use a sound.

## When a pool is full

Viewpoint counts each asset in a pool, for your package. One package can hold at most **half** of a pool. If the pool is full,
or you hold half of it, Viewpoint **refuses your asset**:

- the load fails with a message that names the pool;
- the card shows the same message;
- your other assets stay loaded.

Viewpoint never removes the assets of a different package to make space for yours. See
[Assets & budgets](https://project-viewpoint.github.io/viewpoint-docs/performance/assets-and-budgets.md) for the pool sizes and the estimates on the **Performance** tab.

> **Tip**
>
> Keep assets small. Load them when you need them. A texture of 4096 × 4096 pixels uses 85 MiB of video memory with its
> mipmaps.

---

Previous: [Downloads](https://project-viewpoint.github.io/viewpoint-docs/api/downloads.md) | Next: [Services](https://project-viewpoint.github.io/viewpoint-docs/api/services.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
