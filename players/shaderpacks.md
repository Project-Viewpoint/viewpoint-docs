# Shaderpacks

> For players. Find a Shaderpack, turn it on, and understand what its card tells you.

A Shaderpack changes the whole look of the game: the light, the sky, the colours and the effects. It's made of graphics code
and contains no Java. You'll find them in the settings window under **Graphics**, **Shaderpacks**.

## What's on the page

Every pack you have is in one list:

- the packs that come with Viewpoint;
- Viewpoint packs and Minecraft shader packs you've put in `Zomboid/viewpoint-shaderpacks/`;
- Shaderpacks that came in a mod. These ask for your consent first.

The pack you're using sits at the top in green. Only one pack can draw the world at a time. Each card shows the name, a
description, and the version and author, and there's a search box above the list.

Added a Minecraft pack while the game is running? Click the **Rescan** button beside the search box to pick it up.

## Use a Shaderpack

1. Enable Viewpoint in the game's mod list, along with the mod the pack came in if it came in one, then start the game.
2. Open **Graphics**, **Shaderpacks**.
3. Point at the pack's card and click the green tick, or double-click the card.
4. If the pack came in a mod, read the dialog and accept it.

To stop using a pack, just activate another one. The pack's own options are in **Graphics**, **Shader Options**.

A Shaderpack redraws the whole frame, so it can cost your graphics card far more than an addon does. The
[Cost](#cost) section shows how to check.

## If your pack gets turned off

If you switch off the package for the pack you're using, or its mod gets removed, Viewpoint falls back to the `default` pack
for the moment and the **Graphics** page tells you why. Your choice stays saved, so your pack comes back as soon as you turn
it on again.

## What the card might say

| The card says | What it means |
| --- | --- |
| **Waiting for \<pack\>** | This pack builds on another pack that isn't on yet. Turn that one on. |
| **Inactive: requires its base** | The mod doesn't say which pack this one builds on. Ask the author. |
| **A packaged version is installed** | A pack in your folder has the same name and author as one from a mod. You can delete the copy in your folder. |
| **Made for \<version\>: N of the files it replaces have changed since** (planned) | The pack was made for an older Viewpoint. It may still work, but some effects can look different. |

## Reading the label

A Shaderpack's label says **Shaderpack: GLSL only. It contains no Java.** It also shows the pack's licence, or **No licence
given**. There's a second line too:

> Has shader code: Viewpoint checks its size and form. Faulty shader code can stall or crash the graphics driver.

Viewpoint can't check what graphics code actually computes. If a pack makes the game stall or crash, switch to the `default`
pack on the same page.

## Cost

While a pack with passes of its own is in use, a line above the list shows what it costs: the video memory its own targets
use, and the time its passes take on your graphics card each frame, broken down by stage. The time is an average over about
the last second. For a pack from a mod, **Info**, **Performance** shows the same line.

For the full picture, compare your frame rate against the **Default** pack. If you'd like more detail, see
[Measuring your addon](https://docs.projectviewpoint.org/performance/measuring-your-addon.md).

> **Tip**
>
> If a pack runs slowly on your graphics card, try a lower setting in its Quality list, or turn some effects off in
> **Shader Options**.

Addons and resource packs are covered in [Managing addons](https://docs.projectviewpoint.org/players/managing-addons.md).

---

Previous: [Managing addons](https://docs.projectviewpoint.org/players/managing-addons.md) | Next: [API reference](https://docs.projectviewpoint.org/reference/api.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
