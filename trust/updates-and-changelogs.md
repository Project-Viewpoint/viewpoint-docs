# Updates & changelogs

> Which updates need consent again, which only show a dot, and how to write a useful changelog.

The player gives consent to one version of a package. When the package changes, Viewpoint compares it with the version
that the player accepted. If the new version asks for more, the player must give consent again.

## What needs consent again

After one of these changes, the package stays **off** until the player gives consent again. This is also true if the
package was active before.

| Change | Consent again |
| --- | --- |
| A higher label level, or a new Amber or Red reason | Yes |
| A new permission | Yes |
| A new class in `hooks.targets` | Yes |
| A new hooked member of Viewpoint | Yes |
| A new hook, or a stronger kind (`OBSERVE` < `ARGS` < `RETURN` < `SKIP`) | Yes |
| A new host in `downloads.hosts` | Yes |
| A larger `files.quotaMiB` | Yes |
| A new kind of asset | Yes |
| A new Lua file, or a new item in the Lua line | Yes |
| `side` changes from `client` to `gameplay` | Yes |
| A new package in `requires` | Yes |
| A new export (`@LuaExport`) or a new Lua global | Yes |
| A new snippet point or a new draw point | Yes |
| A new claim kind: camera, view, shot resolver, reticle or cursor | Yes |
| A new package in `exports` | Yes |
| A new member of Viewpoint that the addon uses, reflects or hooks | Yes |
| For a Shaderpack: a new `base`, or a new package in `requires` | Yes |
| A signature that is removed or changed | Yes |
| Other changes, for example GLSL code that changes with no change of level | No. The card shows a dot. |

A package that needs consent again never starts without it. This is also true after a restart. A Red addon asks for its
second confirmation each time.

## The dot

Each change puts a **dot** on the card, also when the package is off. A package that you never accepted has no dot:
there is nothing to compare it with. To read what changed, click **Info** and open the **Changelog** tab. The dot goes when
you accept the package, or when you open **Info** for a package that your consent still covers. It does not go
when the package only starts, also not at the start of the game: a package that your consent covers starts, and the dot
stays until you have seen what changed. Opening **Info** for a package that asks for more does not give consent.
The **Changelog** tab shows:

1. the changelog, from the accepted version to the new version;
2. the changes, in these groups: permissions; hooks and the parts of Viewpoint that the package uses; exports, drawing
   and claims; downloads, files and requirements; the label, its reasons and the signature; assets, Lua and shader
   code; the package itself (its version, its descriptor and its jar).

Each change that asks for more has a mark. The card also says why it is off, for example: *An update asks for more than
you accepted. It stays off until you accept it.*

## When an update has an effect

Viewpoint starts a package from the files that it found at that time. Files that it finds later apply at the next
enable. An addon also keeps the jar that it loaded, in memory: a jar that you replace on the disk cannot change what
runs. The card shows *Update available. It applies at the next enable or restart.* It shows this also when only the jar
changed and the descriptor is the same. The next enable reads the new files, and compares them with the player's consent.
A new package always starts **Inactive**.

An update that asks for more never starts by itself. If the package runs, the old version goes on running, and the card
says that the update applies when the player switches the package on again and accepts it. If the package is off, it
stays off, also at the next start of the game, until the player accepts it.

## Write a changelog

Name the file with `changelog=CHANGELOG.md`:

```markdown title="CHANGELOG.md"
## 1.2.0

Lean now eases in over a quarter of a second.
It asks for the `downloads` permission to fetch the curve table (github.com).

## 1.1.0

Fixed the lean snapping when the player turns.
```

Rules:

- Start each section with `## <version>`, for example `## 1.2.0`. Text after the version on the same line, for example a
  date, is allowed. A short version such as `## 1.2` is the same as `## 1.2.0`. A heading such as `## v1.2` or
  `## [1.2.0]` has no version that Viewpoint can read, so Viewpoint does not show its section.
- Viewpoint shows only the sections with a version that is newer than the one that the player accepted, and not newer
  than the new version. If Viewpoint does not know the version that the player accepted, it shows every section up to the
  new version. It does not show text before the first section, or a section with no version.
- Viewpoint reads the first 64 KiB of the file and shows at most 8000 characters. Put the newest section first: the
  rest of a longer file is not read.
- Viewpoint shows the text as **plain text**. It shows links, but does not open them. It removes control characters and
  format characters, for example right-to-left overrides and zero-width characters.
- Write what changed for the player.
- If you ask for more, write what you added and why. The player reads this line before they decide.

> **Tip**
>
> A good changelog does not remove the consent dialog. It tells the player why you need more. Then the player can decide
> quickly.

---

Previous: [Labels](https://docs.projectviewpoint.org/trust/labels.md) | Next: [ZombieBuddy policy & signatures](https://docs.projectviewpoint.org/trust/relation-to-zombiebuddy.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
