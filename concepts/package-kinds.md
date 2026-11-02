# Package kinds

> The three kinds of package, the legacy and Unmanaged flags, and which kind to make.

Viewpoint has three kinds of package. Each package that Viewpoint shows, orders and switches is one of them.

| | Addon | Resource Pack | Shaderpack |
| --- | --- | --- | --- |
| Contains | Java in a jar, assets, shader snippets, Lua | Assets only: `models/`, `tiles/`, `sounds/`, `data/` | GLSL files, their options, and `textures/` |
| Descriptor | `media/viewpoint/addons/<id>/addon.properties` | `media/viewpoint/resourcepacks/<id>/pack.properties` | `media/viewpoint/shaderpacks/<id>/pack.properties` |
| Java | A jar, named by `jar=`. Never by `javaJarFile`. | None | None |
| Shader code | Snippets and `Gpu` programs, with permissions | None | GLSL files of the pack |
| Permissions | In the descriptor | None | None |
| The label tells about | The Java, the assets, the Lua line and the shader line | The assets and the Lua line | The GLSL, the Lua line and the shader line |

Make a resource pack if you have only files: a model for a sprite, a set of tiles. Make a
Shaderpack if you change how Viewpoint draws the whole frame. Make an addon if you need code, or to play a sound or read a data file. An addon can also contain
assets, with the same four keys as a resource pack.

## Where each one goes

Viewpoint looks in the mod's version folder first, then in `common/`.

If the same folder name is in both, Viewpoint uses the package in the version folder.

- MyMod/
  - mod.info
  - 42/
    - media/viewpoint/addons/example.lean/
      - addon.properties
  - common/
    - media/viewpoint/resourcepacks/example.tiles/
      - pack.properties
    - media/viewpoint/shaderpacks/example.dusk/
      - pack.properties
      - shaders/

One mod can contain many packages. Each package has its own id. The folder name must be the same as the id.

## Packs that are not packages

Two older kinds of shader pack continue to work. They are not packages.

- **Folder packs.** A pack in the folder `Zomboid/viewpoint-shaderpacks/<name>/`. The player puts it there. It has no
  consent and no descriptor of the package kind.
- **Iris packs.** A shader pack made for Minecraft, as a `.zip` or a folder in the same folder. Viewpoint reads it in place.

The **Graphics**, **Shaderpacks** page lists them beside the packages. See [Shaderpacks for players](https://project-viewpoint.github.io/viewpoint-docs/players/shaderpacks.md).

## Legacy and Unmanaged are flags

**Legacy.** A model pack in the older Viewpoint model pack format has no descriptor. The mod's Lua registers a manifest:

```lua
Viewpoint.ModelPacks.register("MyPackMod", "media/models/pack.json")
```

Viewpoint shows this pack as a resource pack with the id `legacy.<modId>` and the *legacy* flag. The version and the
game range come from `mod.info`. A legacy pack follows the player's order and switch, as all packages do. See
[Legacy model packs](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/legacy-model-packs.md).

**Unmanaged.** A mod that has `javaJarFile` in `mod.info` and requires Viewpoint is loaded by ZombieBuddy. Viewpoint
does not load it. Viewpoint shows it on a card, with a label that comes from `mod.info` only:

- Amber: **Unmanaged: runs outside Viewpoint's controls (hooks cannot be listed, ordered or vetoed)**
- Red, when the mod starts before Viewpoint: **loads before Viewpoint**

Viewpoint does not read the jar of an Unmanaged mod. Viewpoint cannot order it, switch it off, or show what it does. To
change it into an addon, see [Migrating from ZombieBuddy](https://project-viewpoint.github.io/viewpoint-docs/patching/migrating-from-zombiebuddy.md).

> **Note**
>
> The Unmanaged flag comes from how the mod loads, not from its code. Put the same code in an addon, and Viewpoint checks,
> orders and switches it.

## What the player sees

Each kind has a page of its own in the settings window: **Advanced**, **Addons**; **Graphics**, **Resource Packs**; and
**Graphics**, **Shaderpacks**. The first two have an **Inactive** column and an **Active** column. When two packages change the same thing, the package nearer the top of the
Active column wins. The Shaderpacks page has no order. See [Order](https://project-viewpoint.github.io/viewpoint-docs/concepts/order.md) and
[Managing addons](https://project-viewpoint.github.io/viewpoint-docs/players/managing-addons.md).

## Ids

Make an id from lower-case letters and digits. You can put `-` and `.` between them.

- Use 2 to 64 characters.
- Start and end the id with a letter or a digit.
- Do not put two dots together.
- Do not start the id with the name of a Windows device (`con`, `nul`, `com1` and others), also before a dot.
- Do not start the id with `legacy.` or `legacy-`. Viewpoint uses this start for the older model packs that it finds in
  mods.

Examples: `example.lean`, `my-tiles`.

Start your id with your reversed domain or your name, as `example.lean` does. Then two authors do not use the same id.
Viewpoint refuses a second package whose id differs from an installed id only in the case of the letters.

### The encoded id

Settings keys and GLSL names cannot hold `.` or `-`. In these places Viewpoint writes both as `_`:

| For the id `example.lean` | You see |
| --- | --- |
| A setting of an addon | `addon.example_lean.angle` |
| An option of a Shaderpack | `pack.example_lean.warmth` |
| A shader value of an addon | `uAddon_example_lean_angle` |

Viewpoint refuses a package when its encoded id is the same as the encoded id of an installed package. For example,
`my-tiles` and `my.tiles` cannot be installed together.

If Viewpoint does not accept an id, the card tells you. Use a short lower-case id, with your name as the first part.

---

Previous: [Sample walkthrough](https://project-viewpoint.github.io/viewpoint-docs/start/sample-walkthrough.md) | Next: [Descriptor](https://project-viewpoint.github.io/viewpoint-docs/concepts/descriptor.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
