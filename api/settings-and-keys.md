# Settings & keys

> Write your settings in a file. Viewpoint shows the page, keeps the values and binds the keys.

You do not draw or save the settings of your addon. You write them in `settings.properties`. Viewpoint then:

- shows the settings behind the cog on the card of the addon, while it is active;
- keeps the values;
- lets the player bind the keys again.

No permission is necessary. Name the file in the descriptor: `settings=settings.properties`.

## The file

```properties title="settings.properties"
schemaVersion=1

enabled.type=toggle
enabled.label=Lean with the camera
enabled.default=true
enabled.apply=live

angle.type=number
angle.label=Angle
angle.default=12
angle.min=0
angle.max=30
angle.step=1
angle.unit=degrees
angle.shownWhen=enabled
angle.enabledWhen=enabled

side.type=choice
side.label=Side
side.choices=left,right,both
side.default=both
side.apply=activate

leanKey.type=key
leanKey.label=Lean
leanKey.default=Q
```

Each setting is a group of keys that start with the name of the setting. A name is `[A-Za-z][A-Za-z0-9]*`. A file has at
most 64 settings and is at most 64 KiB, in UTF-8. A label has at most 80 characters, a unit 16, and a choice 40.
Viewpoint takes out the characters that the player cannot see or that change the order of the text, and it writes `##` as
`#`.

If the file is wrong, Viewpoint does not start the addon and lists every problem together.

| Key | For | Meaning |
| --- | --- | --- |
| `<name>.type` | All | `toggle`, `number`, `choice` or `key`. |
| `<name>.label` | All | The text on the row. |
| `<name>.default` | All | The value before the player changes it. |
| `<name>.apply` | All | When a change has an effect: `live`, `activate` or `restart`. The default is `live`. |
| `<name>.shownWhen` | All | The row shows only while this condition is true. |
| `<name>.enabledWhen` | All | The player can change the row only while this condition is true. |
| `<name>.lua` | All | `true` lets the game's Lua read the value (see [Lua mirror](https://docs.projectviewpoint.org/api/lua-mirror.md)). The default is `false`. |
| `<name>.min`, `.max`, `.step`, `.unit` | `number` | The range of the slider, its step, and a unit after the value. |
| `<name>.choices` | `choice` | The values, with commas between them. |

### `apply`

| Value | When your code gets the new value |
| --- | --- |
| `live` | At once, through `onChange`. |
| `activate` | When the addon is switched on the next time. The row tells the player. |
| `restart` | When the game starts the next time. The row tells the player. |

### Conditions

`shownWhen` and `enabledWhen` take one of these:

- the name of a toggle: `enabled`;
- the name of a toggle with `!` before it: `!enabled`;
- a choice and one of its values: `side=left`.

### `schemaVersion`

This is the version of your file, a whole number from 1 to 1000. Viewpoint keeps it with the values. If the kept values come from a newer
`schemaVersion` than the installed addon has, the page is **read-only**. This occurs when the player goes back to an
older release. Then the older addon cannot write over the values of the newer one.

## Where the values are

Viewpoint keeps the values as `addon.<encoded id>.<name>` in `viewpoint-live.properties`. The encoded id writes `.` and
`-` as `_`. For the id `example.lean` and the setting `angle`, the key is `addon.example_lean.angle`. **Reset** on the
addon's settings page sets the defaults again. See [Package kinds](https://docs.projectviewpoint.org/concepts/package-kinds.md#the-encoded-id).

## Read the values

```java title="SettingsPart.java"
AddonSettings settings = ctx.settings();

boolean on = settings.toggle("enabled");
double angle = settings.number("angle");
String side = settings.choice("side");

settings.onChange("angle", () -> {
    System.out.println("angle is now " + settings.number("angle"));
});
```

- `toggle`, `number` and `choice` read the current value.
- Call these methods on the main thread only. A call from another thread, or after the addon is off, gets an `IllegalStateException`.
- If the name is not in the file, or the type is not correct, your code gets an `IllegalArgumentException`.
- `onChange(name, Runnable)` gives a `Registration`. The callback runs on the main thread, after Viewpoint keeps the value.
- A setting with `apply=activate` or `apply=restart` never calls `onChange` while the addon runs.

## Settings pages

Each addon with settings has a page in the settings window. The player opens it with the cog on the card of the addon,
while the addon is active. The page shows your settings as rows. You do not draw it. If you want more than the rows of the file, your addon can build the
page from subtabs, sections, buttons and value rows:

- a **subtab** is a part of the page, with a title at the top of the page. The player clicks the title to see the rows of that
  subtab;
- a **section** is a group of rows with a title;
- a **setting row** shows a setting from `settings.properties`;
- a **button** has a label, and its callback runs on the main thread;
- a **value row** shows a value of your addon. Viewpoint reads it on the main thread when the page is open.

```java title="SettingsPart.java"
settings.page()
        .tab("Lean")
        .section("Camera")
        .setting("enabled")
        .setting("angle")
        .section("Tools")
        .button("Reset the lean", () -> lean.reset())
        .value("Lean now", () -> lean.degrees() + " degrees")
        .tab("Keys")
        .setting("leanKey");
```

`ctx.settings().page()` gives the same page at each call, so a second call adds rows to it. The methods return the page.

- Call the methods on the main thread only. A call after the addon is off gets an `IllegalStateException`.
- A page has at most 100 rows. Each subtab and each section is a row too. A section title and a label have at most 80
  characters, a subtab title and a button 40, a value 200. Viewpoint cleans the texts as it does the labels of the file, and
  cuts them.
- A page has at most 8 subtabs. A subtab holds the rows that follow it, up to the next subtab. Sections divide a subtab as
  they divide a page. Rows that come before the first subtab go on a first subtab, **General**.
- `setting(name)` gives an `IllegalArgumentException` for a name that is not in the file, or for one that the page already shows.
- A setting that you do not put on the page follows the sections, in a group **Other settings**. On a page with subtabs,
  **Other settings** is the last subtab. The player can always reach it, a key too.
- A button runs at the start of the next frame, on the main thread, after the player clicks it. At most eight clicks wait. A
  second click on the same button within 0.3 seconds is a double click: the callback runs once. A callback that throws
  suspends the addon, as any handler does.
- Viewpoint asks for the text of a value row about ten times a second, only while the page is open and drawn. The text is
  short: it is a value, not a log. All the value rows of a page get 2 milliseconds a round. When they take more, the rows
  that are left keep their last text and are read first in the next round, so a slow row is shown late.

A page has no drawing code of your own. Keep the texts short. If your addon builds no page, the player sees the settings of the
file in the order of the file.

## Keys

A setting of type `key` is a key binding. It shows in the group of your addon, **Addons**, under the id of your addon.
The group never has the name that your addon chooses, so it cannot look like one of Viewpoint's. The player binds the key
again with the same editor as for Viewpoint's keys.

Your key only listens. When the player presses it, the game still gets the press. Your addon cannot take a key from the
game.

The default of a key must be free. If it is one of these, the key starts **unbound** and the card of your addon says so:

- Esc, or Shift, Ctrl or Alt alone;
- a key that the game binds;
- a key that Viewpoint binds, or that a different addon binds.

If the player has saved a key that a different binding now holds too, Viewpoint keeps it and says so on the card. The
default keys of an addon are shown to the player before the first run. An update that changes one is shown as a change.

```java title="SettingsPart.java"
KeyAction lean = settings.key("leanKey");

lean.onPress(() -> System.out.println("lean pressed"));
lean.onRelease(() -> System.out.println("lean released"));
```

| `KeyAction` member | Meaning |
| --- | --- |
| `onPress(Runnable)` | Runs on the main thread when the key goes down. Gives a `Registration`. |
| `onRelease(Runnable)` | Runs on the main thread when the key goes up. Gives a `Registration`. |
| `isDown()` | `true` while the key is down. |

A key does not operate in these conditions:

- a text box has the focus;
- Viewpoint's window uses the keyboard;
- the game's own UI uses the keyboard.

> **Note**
>
> Viewpoint makes the key bindings when the addon goes on, and removes them when it goes off. Viewpoint keeps the key that
> the player set. It uses that key again the next time.

---

Previous: [View state](https://docs.projectviewpoint.org/api/view-state.md) | Next: [Lua mirror](https://docs.projectviewpoint.org/api/lua-mirror.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
