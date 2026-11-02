# Migrating from Java

> Change a mod that copies a shader pack into the player's folder into a Shaderpack that Viewpoint manages.

Some mods have a jar with one job: it copies a shader pack into `Zomboid/viewpoint-shaderpacks`. These mods load their
Java through ZombieBuddy. Viewpoint shows them as **Unmanaged**. A Shaderpack does the same job with no Java. The player
can then switch it off, see its label, and update it with the mod.

## What changes

| | Installer jar | Shaderpack |
| --- | --- | --- |
| Where the pack is | Copied into the player's folder | In the mod, in `media/viewpoint/shaderpacks/<id>/` |
| Java | A jar that ZombieBuddy loads | None |
| Player control | None | Activate from the list, no restart |
| Label | Unmanaged | **Shaderpack: GLSL only. It contains no Java.** |
| Updates | The mod copies the files again | The player sees a dot and the **Changelog** tab |

## The procedure

1. Make the folder `media/viewpoint/shaderpacks/<id>/` in your mod. Put it in `common/`, or in the version folder.
2. Move your `pack.properties` and your `shaders/` folder into it. Add `textures/` if the pack has images.
3. Add the package keys to `pack.properties`: `format`, `id`, `version` and `game.min`. Add `icon`, `license` and
   `changelog` if you can. See [Format](https://project-viewpoint.github.io/viewpoint-docs/shaderpacks/format.md).
4. Make the folder name the same as the `id`.
5. Remove the installer jar. Remove `javaJarFile` from `mod.info`. Keep `require=Viewpoint`.
6. Remove the code that copied files. Nothing copies the pack now.
7. Switch the mod on. Open **Graphics**, **Shaderpacks**. Find the card of your pack.
8. Put the pointer on the card and click the green tick, or double-click the card. Accept the dialog. Look at the picture.

## The id

A package id uses lower-case letters, digits, `.` and `-`. The name of an old folder pack can use capital letters and `_`.
If your old name is not a correct id, choose a new id.

The options of the pack are saved as `pack.<encoded id>.<option>`. If the encoded id of the new package is the same as the
old name of the folder pack, the saved options of the player stay. If it is not the same, the player sets the options
again. See [Package kinds](https://project-viewpoint.github.io/viewpoint-docs/concepts/package-kinds.md#the-encoded-id).

## If the player still has the old copy

An old copy in `Zomboid/viewpoint-shaderpacks/` stays in the player's folder. When its name and author are the same as
those of your package, the card of the old copy says "a packaged version is installed". Tell the player in your
changelog to delete the old folder.

## If the pack builds on another pack

Put `base=` in `pack.properties`. If the base is a Shaderpack of another mod, add it to `requires`. See
[Format](https://project-viewpoint.github.io/viewpoint-docs/shaderpacks/format.md#build-on-another-pack).

## If your jar also changed library GLSL

Some jars also patched `Shaders.read` to change library GLSL as the game starts. A Shaderpack does this with files in
`shaders/`. A small change that must apply under any pack is a shader snippet. See
[Migrating from ZombieBuddy](https://project-viewpoint.github.io/viewpoint-docs/patching/migrating-from-zombiebuddy.md).

> **Note**
>
> The player sees the shader line on the card: "Has shader code: Viewpoint checks its size and form. Faulty shader code can
> stall or crash the graphics driver." Viewpoint cannot check what GLSL computes. Test your pack on more than one graphics
> card if you can.

---

Previous: [Library files](https://project-viewpoint.github.io/viewpoint-docs/shaderpacks/library-files.md) | Next: [Managing addons](https://project-viewpoint.github.io/viewpoint-docs/players/managing-addons.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
