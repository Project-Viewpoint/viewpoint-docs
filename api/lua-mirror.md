# Lua mirror

> Read the view state and the settings that an addon shares, from the game's Lua.

`Viewpoint.Addons` is a mirror for reading. A Lua mod can read two things: the view state, and the settings that an addon
shares. Viewpoint changes nothing through these functions.

To call the Java functions of your own addon from Lua, use exports. See [Lua exports](https://docs.projectviewpoint.org/api/lua-exports.md). The
exports of an addon are in `Viewpoint.Addons["<id>"]`. The functions on this page are in `Viewpoint.Addons` itself.

## The functions

| Function | Gives |
| --- | --- |
| `Viewpoint.Addons.viewState()` | A table with the fields below. `nil` the first time, and after a pause of two seconds without a call. |
| `Viewpoint.Addons.terrainHeight(x, y)` | The ground height at the point, or `nil`. `nil` also for a number that is not finite. |
| `Viewpoint.Addons.setting(addonId, name)` | The current value of one setting of one addon: a boolean, a number or a string. `nil` if the addon is off, the setting does not exist, or the addon did not share it (see below). |

Viewpoint builds the view state only while it is asked for. Call `viewState()` each frame to keep it. The first call, or the
first call after a pause of two seconds, answers `nil`, and the next frame has the table.

An addon shares a setting with `<name>.lua=true` in its `settings.properties`. Every other setting answers `nil`. Any mod
can read a shared setting, so share only what you want every mod to see.

The table of the view state:

```lua
local v = Viewpoint.Addons.viewState()

if v and v.on then
    print(v.mode)               -- "FIRST_PERSON" or "THIRD_PERSON"
    print(v.eye.x, v.eye.y, v.eye.z, v.eye.yaw, v.eye.pitch)
    print(v.fov)
    print(v.crosshair.x, v.crosshair.y, v.crosshair.z)         -- the ray's origin
    print(v.crosshair.dx, v.crosshair.dy, v.crosshair.dz)      -- its direction
    print(v.versions.game, v.versions.viewpoint, v.versions.api)
    print(v.freeCamera, v.cursorCaptured)
    print(v.sceneOrigin.x, v.sceneOrigin.y, v.sceneOrigin.z)
    if v.crosshairHit then print(v.crosshairHit.x, v.crosshairHit.y, v.crosshairHit.z) end -- nil if it meets nothing
    if v.cursorHit then print(v.cursorHit.x, v.cursorHit.y, v.cursorHit.z) end             -- under the free cursor
end
```

The fields and units are the same as in [`ViewState`](https://docs.projectviewpoint.org/api/view-state.md). The coordinates are the game's world
coordinates.

## Rules

- Call the functions on the main thread. The game's Lua runs there.
- There are no callbacks. Ask each frame, or when your own trigger occurs.
- You do not need an addon. The Lua of all mods can call these functions.
- `setting` gives the value that the player has set now. This includes a value that has an effect only at the next
  enable.
- The table that you get is a copy. If you change it, nothing changes in Viewpoint.
- `Viewpoint.Addons` is one table that every mod shares, and it also holds the [exports](https://docs.projectviewpoint.org/api/lua-exports.md) of the addons by
  their ids. Lua lets a mod write to it. A mod that does can change what a different mod reads from it. Viewpoint does
  not protect the table.

---

Previous: [Settings & keys](https://docs.projectviewpoint.org/api/settings-and-keys.md) | Next: [Lua exports](https://docs.projectviewpoint.org/api/lua-exports.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
