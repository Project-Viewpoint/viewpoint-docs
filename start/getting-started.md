# Getting started

> Make the smallest addon, put it in a mod and switch it on.

This page makes an addon that writes a line to the game's log when it switches on and off. The addon has three
parts: a descriptor, a jar with one class, and a mod folder. The code on this page is the code of
`minimaladdon` in the source repository. [`sampleaddon`](https://docs.projectviewpoint.org/start/sample-walkthrough.md) has a part for each service.

## What you need

- Viewpoint, in the game's mod list.
- `viewpoint-api.jar`. Each Viewpoint release has this jar, with its sources and javadoc. It contains only
  `viewpoint.api.*`. Compile against it. Do not put it in your mod.
- A JDK and a build tool. The example uses Gradle.

> **Note**
>
> Compile for Java 17 (`--release 17`). Viewpoint refuses a jar that contains its own copy of `viewpoint.api`.

## The folder

An addon is in a Project Zomboid mod. Viewpoint looks for it in the mod's version folder first, then in `common/`.

- ViewpointMinimalAddon/
  - common/
    - mod.info
    - media/viewpoint/addons/example.minimal/
      - addon.properties
      - minimal.jar
      - icon.png optional
      - settings.properties optional
      - CHANGELOG.md optional

The name of the folder under `addons/` must be the same as the addon's `id`.

`mod.info` is the usual file of the game. Put it in `common/` or in the version folder: the game does not read one at the
root of the mod. Require Viewpoint. **Do not set `javaJarFile`.** If you set it, ZombieBuddy
loads the jar, and Viewpoint shows the mod as Unmanaged. Name the jar with `jar=` in `addon.properties`.

```properties title="mod.info"
name=Viewpoint Minimal Addon
id=ViewpointMinimalAddon
require=Viewpoint
description=The smallest addon of Viewpoint's guide.
```

## The descriptor

```properties title="addon.properties"
format=1
id=example.minimal
name=Minimal
version=0.1.0
author=Viewpoint
description=Writes a line to the log when it switches on and off.
license=MIT
game.min=42.21
api=1.0
jar=minimal.jar
entry=example.minimal.MinimalAddon
side=client
```

An addon must have `game.min`, `api`, `jar` and `entry`. The [Descriptor](https://docs.projectviewpoint.org/concepts/descriptor.md) page gives all keys.
This addon asks for no permission, because it uses no service that needs one.

## The class

```java title="MinimalAddon.java"
package example.minimal;

import viewpoint.api.Addon;
import viewpoint.api.AddonContext;

/** The smallest addon: it writes a line to the log when it starts, when its hooks are live and when it stops. */
public final class MinimalAddon implements Addon {
    @Override
    public void enable(AddonContext ctx) {
        System.out.println("[Minimal] " + ctx.id() + " is on");
        ctx.onHooksLive(() -> System.out.println("[Minimal] hooks are live"));
    }

    @Override
    public void disable() {
        System.out.println("[Minimal] off");
    }
}
```

`enable` runs on the game's main thread when the player switches the addon on. The callback that you give to
`onHooksLive` also runs on the main thread. This addon has no hooks, so Viewpoint calls it at once. A `disable` method is
not necessary. When the player switches the addon off, Viewpoint closes each `Registration` that it gave you, in
reverse order. Keep a `Registration` only to close it before that.

## The build

```kotlin title="build.gradle.kts"
plugins {
    java
}

java {
    toolchain.languageVersion = JavaLanguageVersion.of(25)
}

tasks.withType<JavaCompile> {
    options.release = 17
}

dependencies {
    compileOnly(files("libs/viewpoint-api.jar"))
}

tasks.jar {
    archiveFileName = "minimal.jar"
}
```

`compileOnly` keeps the API out of your jar. Copy `build/libs/minimal.jar` into the folder of `addon.properties`.

## Switch it on

1. In the game's mod list, enable `ViewpointMinimalAddon` and `Viewpoint`.
2. Start the game. Viewpoint reads the mod list only when the game starts.
3. Open the settings window. Go to **Advanced**, **Addons**.
4. Find the **Minimal** card in the **Inactive** column. A new addon always starts there.
5. Put the pointer on the card and click the green tick, or double-click the card.
6. Read the label and the consent dialog. Click to accept.
7. Make sure that the card is in the **Active** column.
8. Look in the game's `console.txt`. It shows `[Minimal] example.minimal is on` and `[Minimal] hooks are live`.
9. Click the red minus on the card. The file shows `[Minimal] off`.

After you switch it off, none of the code of the addon runs. If you change the jar, the next enable loads the new
jar. If the new jar asks for more, the player must give consent again. See
[Lifecycle & threads](https://docs.projectviewpoint.org/concepts/lifecycle-and-threads.md) and [Updates & changelogs](https://docs.projectviewpoint.org/trust/updates-and-changelogs.md).

## Next

- Add a [setting and a key](https://docs.projectviewpoint.org/api/settings-and-keys.md).
- Read the [view state](https://docs.projectviewpoint.org/api/view-state.md) of every frame.
- Hook a game method with [managed patching](https://docs.projectviewpoint.org/patching/managed-patching.md).
- Add an [offset to the camera](https://docs.projectviewpoint.org/api/camera-layers.md) with a layer.
- Make a [Shaderpack](https://docs.projectviewpoint.org/shaderpacks/format.md) or a [resource pack](https://docs.projectviewpoint.org/resource-packs/format.md) in place of an addon, if you
  have no code. See [Package kinds](https://docs.projectviewpoint.org/concepts/package-kinds.md).

## If it does not appear

| You see | Cause | Fix |
| --- | --- | --- |
| No card | The mod was off when the game started, or the folder name is not the `id`. | Enable the mod and start the game again. Make the folder name the same as the `id`. |
| **Incompatible** | `game.min`, `game.max`, `viewpoint.min`, `viewpoint.max` or `api` does not agree with this installation. | Read the card. It names the range. Correct the range or the build. |
| **Failed** | The jar did not load, or `entry` is not a class that implements `Addon`. | Read the card and `console.txt`. They give the cause. |
| Nothing occurs when you click the green tick | The check refused the jar, or the ZombieBuddy policy blocks addons with Java. | Read the card. It gives the cause. See [ZombieBuddy policy & signatures](https://docs.projectviewpoint.org/trust/relation-to-zombiebuddy.md). |

---

Previous: [Introduction](https://docs.projectviewpoint.org/start/introduction.md) | Next: [Sample walkthrough](https://docs.projectviewpoint.org/start/sample-walkthrough.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
