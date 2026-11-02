# Migrate to version 2

> Change an older model pack into a resource pack, replace the lines of each facing with one group bind, and join the models of the states of an object into one model.

Version 1 manifests and older model packs are deprecated. They continue to work. A new pack starts at version 2: see
[Format](https://docs.projectviewpoint.org/resource-packs/format.md). This page tells you how to change an existing pack, one step at a time. You can stop
after any step.

| Step | What you get |
| --- | --- |
| 1. Make a resource pack | A card with a version, an author and an icon. The player sees what the pack contains. |
| 2. Use group binds | One line for all the facings of an object, in place of one line for each sprite. |
| 3. Join the state models | One model for a lamp that is on and off. It uses less memory, and it changes at once. |

## 1. Make a resource pack

An older pack is a mod whose Lua calls `Viewpoint.ModelPacks.register`. Viewpoint shows it as a *legacy* pack.

1. Make the file `media/viewpoint/resourcepacks/<id>/pack.properties`. See [Descriptor](https://docs.projectviewpoint.org/concepts/descriptor.md) for the
   id and the common keys.
2. Add `models=` with the path of your manifest. The path is relative to the folder of the pack.
3. Move the manifest, the OBJ, MTL and PNG files into the folder of the pack, or set `models=` to their current path.
   All the files must stay in the folder of the version of your mod or in `common/`.
4. Remove the call to `Viewpoint.ModelPacks.register` from your Lua.
5. Start the game. Open **Graphics**, **Resource Packs**. Your pack shows as a resource pack, without the *legacy* flag.

```properties title="media/viewpoint/resourcepacks/example.pack/pack.properties"
format=1
id=example.pack
name=Example pack
version=1.0.0
author=Example
game.min=42.21
models=models/manifest.txt
```

The manifest does not change. For more, see [Legacy model packs](https://docs.projectviewpoint.org/resource-packs/legacy-model-packs.md).

## 2. Use group binds

A piece of furniture has a sprite for each facing. A version 1 manifest has a line for each sprite, each with its own
turn:

```properties title="Before: version 1"
model.chair=chair.obj
bind.furniture_seating_indoor_02_0=chair,0,0,0,0,1
bind.furniture_seating_indoor_02_1=chair,270,0,0,0,1
bind.furniture_seating_indoor_02_2=chair,180,0,0,0,1
bind.furniture_seating_indoor_02_3=chair,90,0,0,0,1
```

```properties title="After: version 2"
format=2
model.chair=chair.obj
group.furniture_seating_indoor_02/Wooden Chair=chair,0,0,0,0,1
```

1. Add `format=2` to the manifest.
2. Find the name of the object: its `GroupName` and its `CustomName` in the properties of its tiles (TileZed shows
   them). Write them with a space between them, for example `Wooden Chair`.
3. Find the line of the sprite that faces south. Copy its model and values into one `group.<tileset>/<name>=` line,
   with the turn of the south-facing sprite.
4. Remove the lines of the other facings.
5. Start the game. The log says how many sprites the groups of your pack bind:
   `model pack example.pack: its groups bind 4 sprites`.

- Keep a `bind.` line for a sprite whose model is different. It is stronger than the group.
- If your model is not made to face south, add its turn to the group line. For a model that faces east, the turn is 90.
- If the log says `no single-square sprite in ...`, the name is wrong, or the object has more than one square. Keep a
  `bind.` line for each sprite of an object that has more than one square.

## 3. Join the state models

If your pack has two models for one object, for example a lamp that is off and the same lamp with a bright shade, a
bind can show only one of them. Put the two looks into one model.

1. Open the two models in your editor, for example Blender. Import the second model into the scene of the first.
2. Delete the parts of the second model that are the same as the first: the base, the stand.
3. Rename the parts that change. Add `[!lit]` to the name of the part from the off model, for example `Shade[!lit]`.
   Add `[lit]` to the name of the part from the on model, for example `Shade[lit]`.
4. Keep the materials and the textures of the two models: each material uses the texture of its own `map_Kd`. To use
   less memory, put the two textures into one texture, in different areas, and move the UVs of each part into its area.
5. For a part that must glow, give its material an emission colour. Blender writes it as `Ke` in the MTL.
6. Export one OBJ and one MTL. Make sure that the OBJ keeps the names of the parts: each part starts with a line
   `o <name>` or `g <name>`. Blender writes `o <name>` for each object.
7. In the manifest, remove the second model and its binds. Keep one bind, to the joined model.

```text title="lamp.obj, after"
mtllib lamp.mtl
o Base
f ...
o Shade[!lit]
f ...
o Shade[lit]
f ...
```

Check it in the game: switch the lamp on and off. The shade changes in about a tenth of a second. If both shades show
at the same time, the names do not have the tags, or a name has both tags.

> **Tip**
>
> Only the parts that change are in the model two times. A lamp that changes only its shade costs the shade two times,
> not the whole lamp. See [Model states](https://docs.projectviewpoint.org/resource-packs/model-states.md) for the objects that can be lit.

## What to check

| Check | Where |
| --- | --- |
| The pack shows as a resource pack, not *legacy* | **Graphics**, **Resource Packs** |
| No line of the manifest is ignored | `console.txt`: `model pack <id>: ... lines left out` names each one |
| The groups bind the sprites you expect | `console.txt`: `its groups bind N sprites` |
| The textures of a model fit together | `console.txt`: `drawn at 1/N size` shows when they are too large |

---

Previous: [Legacy model packs](https://docs.projectviewpoint.org/resource-packs/legacy-model-packs.md) | Next: [Format](https://docs.projectviewpoint.org/shaderpacks/format.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
