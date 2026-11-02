# Descriptor

> All keys of addon.properties and pack.properties, and what Viewpoint does with each key.

The descriptor is one text file: `addon.properties` for an addon, `pack.properties` for a resource pack or a Shaderpack.
It is a Java properties file in UTF-8. A comment is a full line that starts with `#`. A `#` after a value is part of the
value.

The folder of the file tells Viewpoint the kind: `addons/`, `resourcepacks/` or `shaderpacks/`. See
[Package kinds](https://project-viewpoint.github.io/viewpoint-docs/concepts/package-kinds.md).

```properties title="addon.properties"
format=1
id=example.lean
name=Lean
version=1.2.0
author=Example
description=Lean round corners.
icon=icon.png
license=MIT
game.min=42.21
game.max=42.21
viewpoint.min=0.1.7
viewpoint.max=0.2.99
api=1.0
jar=lean.jar
entry=com.example.lean.LeanAddon
side=client
requires=example.core@1.0
conflicts=other.lean
settings=settings.properties
changelog=CHANGELOG.md
permissions=hooks,files,downloads,lua,camera
hooks.targets=zombie.characters.IsoPlayer
files.quotaMiB=16
downloads.hosts=github.com,objects.githubusercontent.com
lua.globals=Lean
exports=com.example.lean.api
```

Viewpoint ignores a key that it does not know, and writes it to the log. If `format` is newer than the format that
Viewpoint reads, the package is **Incompatible**. The card tells you this.

Viewpoint **refuses** a package when a required key is missing or a value is not valid. For example: an id that does not
follow the [rules for ids](https://project-viewpoint.github.io/viewpoint-docs/concepts/package-kinds.md#ids), a version that is not dotted numbers, a path that goes out of
the package folder (with `..`), or a permission that Viewpoint does not know. The card names each key and tells why. The
player cannot switch on a refused package. Viewpoint also refuses a descriptor that is larger than 64 KiB.

## Common keys

All descriptors use these keys.

| Key | Required | Meaning |
| --- | --- | --- |
| `format` | Yes | The format of the descriptor: `1`. |
| `id` | Yes | The id of the package (see [Ids](https://project-viewpoint.github.io/viewpoint-docs/concepts/package-kinds.md#ids)). The folder name must be the same. |
| `name` | Yes | The name on the card. |
| `version` | Yes | The version of the package: major, minor and patch, each of at most three digits (`MMM.NNN.PPP`, for example `1.2.0`). Consent is for one version. |
| `author` | No | The name of the author on the card. |
| `description` | No | One or two lines on the card. |
| `icon` | No | A PNG file in the package folder. If there is no icon, the card shows a tile with a letter. |
| `license` | No | The name of the licence, on the **Overview** tab. A Shaderpack card shows it also on the label. |
| `game.min` | Yes | The oldest game build that can run the package, for example `42.21`. |
| `game.max` | No | The newest game build. If you do not set it, all newer builds are accepted. |
| `viewpoint.min`, `viewpoint.max` | No | The range of Viewpoint versions. |
| `requires` | No | Packages that must be active, as `id` or `id@min`, with commas between them. |
| `conflicts` | No | Packages that must not be active at the same time, as ids with commas between them. |
| `changelog` | No | A file of `## <version>` sections, shown as plain text. |

## Addon keys

Only `addon.properties` uses these keys. Another descriptor ignores them.

| Key | Required | Meaning |
| --- | --- | --- |
| `side` | No | `client` (the default) or `gameplay`. See [`side`](#side). |
| `api` | Yes | The API version that you compiled against: `1.0`. See [Versions & compatibility](https://project-viewpoint.github.io/viewpoint-docs/concepts/versions-and-compatibility.md). |
| `jar` | Yes | The name of the jar in the package folder. Do not use `javaJarFile`. |
| `entry` | Yes | The class that implements `Addon`. |
| `settings` | No | A `settings.properties` file. See [Settings & keys](https://project-viewpoint.github.io/viewpoint-docs/api/settings-and-keys.md). |
| `permissions` | No | A list of the permissions that the addon asks for, with commas between them. See [Permissions](https://project-viewpoint.github.io/viewpoint-docs/trust/permissions.md). |
| `hooks.targets` | With `hooks` | The classes that the addon can hook, with commas between them. A game class or a listed class of Viewpoint. See [Hookable targets](https://project-viewpoint.github.io/viewpoint-docs/patching/hookable-targets.md). |
| `files.quotaMiB` | No | The space for the files folder of the addon, in MiB. The default is 64. More than 64 needs the player's consent. |
| `draw.gpuMiB` | No | The video memory for the `Gpu` objects of the addon, in MiB, 1 or more. The default is 64. More than 128 needs the permission `vram`. See [Draw callbacks](https://project-viewpoint.github.io/viewpoint-docs/api/draw-callbacks.md). |
| `downloads.hosts` | With `downloads` | The hosts that the addon can download from, with commas between them. |
| `lua.globals` | No | Names of Lua globals for your exports, with commas between them. Without it, the exports are in `Viewpoint.Addons["<id>"]`. |
| `exports` | No | The Java packages that other addons can link to. See [Services](https://project-viewpoint.github.io/viewpoint-docs/api/services.md). |

## Asset keys

An addon and a resource pack use these keys. A Shaderpack does not.

| Key | Required | Meaning |
| --- | --- | --- |
| `models`, `tiles`, `sounds`, `data` | No | The assets. `models` is the path of a model manifest. The other three are folders. See [Format](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/format.md). |

## Shaderpack keys

A Shaderpack uses the common keys, and the keys of its pack. It has no `jar`, `entry`, `api` or `permissions`. It can
also set `library`, the Viewpoint version that you made the pack for. See [Shaderpack format](https://project-viewpoint.github.io/viewpoint-docs/shaderpacks/format.md).

## Version ranges

A version is dotted numbers, for example `42.21` or `0.1.7`. Viewpoint compares the numbers one by one. A missing number
is 0.

- `game.min` and `game.max` are game builds. A game build has two numbers, as `42.21`. `viewpoint.min` and
  `viewpoint.max` are Viewpoint versions. The range includes both limits.
- `requires=example.core@1.0` means `example.core`, version 1.0 or later, with the same major version.
- `api=1.0` means the same major version, and a minor version of 1.0 or more in Viewpoint.

A package outside its ranges is **Incompatible**. Its card names the range.

## `side`

Viewpoint runs only on the client. Your code runs on the client also when the server does not list your mod.

| Value | Use it when the addon | What occurs |
| --- | --- | --- |
| `client` | Changes only what the player sees or hears | The addon runs in single player and on all servers. |
| `gameplay` | Changes something that the server must also agree with | The addon runs in single player. On a server that does not list the addon's mod, Viewpoint suspends the addon for that session. |

## Permissions and their keys

`permissions` lists the services that the addon will ask Viewpoint for. Some permissions have keys of their own:

| Permission | Keys |
| --- | --- |
| `hooks` | `hooks.targets` |
| `files` | `files.quotaMiB` (optional) |
| `downloads` | `downloads.hosts` |
| `lua` | `lua.globals` (optional) |
| `draw` | `draw.gpuMiB` (optional) |
| `vram` | `draw.gpuMiB` more than 128 |
| `camera`, `combat`, `models`, `shaders` | None |

If you call a service without its permission, your code gets a `SecurityException`. If a hook target is not in
`hooks.targets`, the addon cannot start. The card tells you this before the player sees a consent dialog. See
[Permissions](https://project-viewpoint.github.io/viewpoint-docs/trust/permissions.md).

## Encoded keys

A setting of an addon is saved as `addon.<encoded id>.<name>`. An option of a Shaderpack is saved as
`pack.<encoded id>.<option>`. A shader value is `uAddon_<encoded id>_<name>`. The encoded id writes `.` and `-` as `_`.
See [Package kinds](https://project-viewpoint.github.io/viewpoint-docs/concepts/package-kinds.md#the-encoded-id).

## The descriptor of a resource pack

```properties title="pack.properties"
format=1
id=example.tiles
name=Example tiles
version=1.0.0
author=Example
game.min=42.21
tiles=tiles
sounds=sounds
```

It uses the common keys and the asset keys. It has no `jar`, `entry`, `api` or `permissions`, because it has no code.

> **Tip**
>
> The [Descriptor keys](https://project-viewpoint.github.io/viewpoint-docs/reference/descriptor-keys.md) page has all keys in one table.

---

Previous: [Package kinds](https://project-viewpoint.github.io/viewpoint-docs/concepts/package-kinds.md) | Next: [Lifecycle & threads](https://project-viewpoint.github.io/viewpoint-docs/concepts/lifecycle-and-threads.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
