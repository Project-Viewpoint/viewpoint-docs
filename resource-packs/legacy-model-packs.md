# Legacy model packs

> How older model packs load, and how to change one into a resource pack.

An older model pack is a mod whose Lua registers a manifest:

```lua
Viewpoint.ModelPacks.register("MyPackMod", "media/models/pack.txt")
```

These packs continue to work. Viewpoint shows each one as a resource pack with the **legacy** flag.

## How Viewpoint finds a legacy pack

Viewpoint reads the Lua of each enabled mod. It looks for calls to `Viewpoint.ModelPacks.register("<modId>", "<path>")`
whose two arguments are fixed strings. For each call, it shows a resource pack:

| Property | Value |
| --- | --- |
| Id | `legacy.<modId>` |
| Version and game range | From the `mod.info` of the mod |
| Models | The manifest of the call, in the version folder of the mod, then in `common/` |
| Flag | *legacy* |

If your Lua makes the path while the game runs, Viewpoint cannot find the call when it reads the Lua. When the call
occurs, Viewpoint shows the pack as **registered at run time**.

## What is different

- A legacy pack follows the player's **order** and **switch**. The pack nearer the top of the Active column wins a
  sprite. Before, the pack that registered last won.
- Viewpoint moves the old switch of each pack (`packs.<modId>`) into the **Graphics**, **Resource Packs** page one time. A pack that was on
  starts **Active**. A pack that was off starts **Inactive**. The pack that registered last goes to the top.
- The manifest, the models and their art must be in the folder of the version or in `common/`, the one that holds the
  `media` folder of the pack. If a path goes outside (with `..`, an absolute path, a `\` or a link), Viewpoint refuses
  it and names it in `console.txt`. Move the files into that folder.
- A legacy pack has no descriptor. Thus its card has no author, no icon and no changelog, other than what `mod.info`
  gives.

## Change it into a resource pack

1. Make the file `media/viewpoint/resourcepacks/<id>/pack.properties`.
2. Write the common keys in it.
3. Add `models=` with the path of your manifest.
4. Move the manifest and its models into that folder, or set `models=` to their current path.
5. Remove the call to `Viewpoint.ModelPacks.register`.
6. Add a version, an author and an icon.

The manifest does not change in these steps. Then change it to version 2. See
[Migrate to version 2](https://docs.projectviewpoint.org/resource-packs/migrating.md).

> **Note**
>
> Legacy packs continue to work, but do not make a new pack in this way. See [Format](https://docs.projectviewpoint.org/resource-packs/format.md). A resource pack can also have an icon, a version, a
> changelog, tiles, sounds and data.

---

Previous: [Tiles](https://docs.projectviewpoint.org/resource-packs/tiles.md) | Next: [Migrate to version 2](https://docs.projectviewpoint.org/resource-packs/migrating.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
