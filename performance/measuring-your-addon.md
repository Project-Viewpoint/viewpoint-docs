# Measuring your addon

> What the Performance tab and Viewpoint's profiler show about an addon, and how to measure its graphics cost.

The game is usually limited by the processor, not by the graphics card. Viewpoint shows the cost of each package to
the player. You can use the same values.

## The Performance tab

On the card of a package, open **Info**, then **Performance**.

| Row | What it shows |
| --- | --- |
| Assets | The assets by kind, and their sizes |
| Video memory | The estimate and the measured value |
| Memory | The estimate and the measured value |
| Processor | The time of your hooks on the main thread, the time of your work on the render thread, and the time of your work on other threads |
| Graphics card | The time of your draw callbacks and your shader snippets, as measured by Viewpoint. For a Shaderpack: the time of each pass. |
| History | The average and the range for the last 8 sessions |

The measured values:

- **Main thread:** the time of your handlers. Viewpoint measures a sample of the calls, and calculates the total.
  The profiler counter `addon.<id>.mainMs` gets the value each frame.
- **Render thread:** the time of your draw callbacks and your `RENDER` hooks. The profiler counter `addon.<id>.renderMs`
  gets the value each frame.
- **Graphics card:** the time of the work that your addon asks the graphics card for, at each draw point, in
  `addon.<id>.gpuMs`. If two addons put a snippet in the same shader, Viewpoint can time only that shader. The card then
  says "shared with N". Use **Measure GPU cost** to find the cost of each addon.
- **Other threads:** the time to decode your assets.
- **Memory and video memory:** the bytes of your package in the pools.

Viewpoint measures the time of draw callbacks. It cannot measure the time of your assets or your snippets one by one. To
find that cost, do the measurement below.

## Measure the graphics cost

1. Go to a scene where the game shows your assets.
2. On the **Performance** tab, click **Measure GPU cost**.
3. Do not move. The game shows **measuring, keep still**.
4. Wait. Viewpoint compares frames with your assets and your snippets on and off, 10 times.
5. Read the result on the tab. Viewpoint keeps the median difference, with the date.

## Shaderpacks

The card of a Shaderpack shows two values.

- **Video memory:** an estimate of the targets that the pack declares. It is the number of targets, times the size of the
  output, times the size of the format.
- **Time on the graphics card:** the time of each pass of the pack, measured while the pack is in use.

**Measure against base** is planned. It can come after API 1.0. It compares your pack with the pack that it builds on, in
the same scene. Use it to see what your changes cost.

## History

Viewpoint keeps the history in `Zomboid/viewpoint-addons/_manager/usage.properties`. It keeps the last 8 sessions for
each package, and the session that is still running. It removes a package that it has not seen for 90 days.

A session holds only: the day it ended (not the time), the number of frames to the nearest thousand, the mean time on the
main thread, the memory and video memory that the package held, how many assets it held, and the first eight characters of
the hash of its jar. Viewpoint writes the file every five minutes while you play and when the game exits. The file stays on
the player's computer and nothing sends it anywhere. It is in the cache folder that players often zip for a bug report: a
player can delete it at any time.

## Viewpoint's profiler

Your hooks, your draw callbacks and your work on the render thread show in Viewpoint's profiler, in the group `ADDONS`. Open the *Profiling* page or the profiler window.
Compare a frame with your addon on and a frame with your addon off.

An addon with no active hooks, no callbacks and no assets adds no cost to the frame.

> **Tip**
>
> Measure in the scenes where the game is slowest: a street with many zombies, a car that moves, rain. A hook that costs
> 0.05 ms in an empty field can cost ten times more in a mall.

---

Previous: [Assets & budgets](https://docs.projectviewpoint.org/performance/assets-and-budgets.md) | Next: [Format](https://docs.projectviewpoint.org/resource-packs/format.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
