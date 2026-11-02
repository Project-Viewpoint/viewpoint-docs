# Managing addons

> For players. Install addons and resource packs, turn them on and off, put them in order, and see what they do.

Addons and resource packs add to Viewpoint, and you stay in charge of them from the settings window. You can turn any of
them on or off while you play, without restarting the game, and you can see what each one does before you say yes.

You'll find them in two places:

- **Addons** are in **Advanced**, **Addons**.
- **Resource packs** are in **Graphics**, **Resource Packs**.

Shaderpacks work a little differently and have [their own page](https://docs.projectviewpoint.org/players/shaderpacks.md).

## Install an addon

1. Get the mod that contains the addon, usually from the Steam Workshop.
2. Enable that mod and Viewpoint in the game's mod list.
3. Start the game. Viewpoint only looks for addons in mods that were on when the game started. If an addon offers
   functions to Lua, you may see "Viewpoint is checking N addons" for a few seconds.
4. Open the settings window and go to **Advanced**, **Addons**.
5. Your new addon is in the **Inactive** column. Every new addon starts there, so nothing runs until you choose.

## Find your way around the page

The page has a search box and two columns. **Inactive** on the left holds what's installed but off. **Active** on the
right holds what's on, with the top card going first.

Each card shows the name, a description and a line like `v1.2.0 · by Someone`. If a description gets cut off, rest the
pointer on it for a couple of seconds to read the rest. A grey square just means the author didn't include a picture.

Point at a card and its buttons appear:

| Button | What it does |
| --- | --- |
| Green tick, where the picture was (Inactive) | Turns it on |
| Red minus, where the picture was (Active) | Turns it off |
| **Info**, top right | Shows everything about the addon |
| **Settings**, the cog at the bottom right (only when active) | Opens the addon's own settings |

Double-clicking a card also turns it on or off.

Beside the search box, **Addon VRAM Usage** adds up the video memory your active addons asked for when they started. It's
what they're allowed to use, not what they're using right now, and Viewpoint doesn't put a limit on it. An addon that
draws and doesn't name an amount counts as 64 MiB.

If Viewpoint refuses something, such as turning on an addon when an addon it needs is off, a line at the top of the page
tells you why and then fades after a few seconds.

Two small marks are worth knowing. A **dot** beside the name means the addon has changed since you accepted it. A **word**
beside the name, such as **Suspended**, means it's in a state other than plain on or off. Point at the word to find out why.

## Turn an addon on

1. Click the green tick, or double-click the card.
2. Read the dialog. It shows the addon's label, the reasons for that label, and everything the addon asks for. Long lists
   scroll, and nothing is ever cut.
3. To say no, click **Cancel** or press **Esc**. To say yes, wait for **Accept** to light up, rest the pointer on it for a
   moment, and click.
4. The card moves to the **Active** column.

The short wait on **Accept** is deliberate, so that a stray click can't agree to something you haven't read. If the addon
changes on disk while you're reading, Viewpoint shows you the dialog again.

A **Red** addon asks twice: after **Accept...** you get a second button, **Switch on a Red addon**, with the same wait.
That's because a Red addon can do things outside Viewpoint's control.

Your yes covers that version only. If an update asks for more, Viewpoint asks you again.

Viewpoint remembers what was on and in what order, and turns it all back on next time you start the game. There are two
exceptions. An addon that needs your consent again stays off until you click its green tick, and an addon that **Failed** to
start isn't tried again automatically.

## Turn an addon off

Click the red minus or double-click the card. The addon stops straight away. Any hooks it put into the game come out at the
next safe moment, which is the main menu, a loading screen, or a paused single-player game with the window open. The card
tells you when that has happened.

## Choose the order

Drag a card up or down in the **Active** column, or use the arrows on its left. An arrow is dim when the card can't go any
further that way. When you drag, drop on the top half of another card to land above it, or the bottom half to land below it.

Order matters when two addons want the same thing. If they change the same model, tile or hook, the one nearer the top
wins. Some things can only belong to one addon at a time, like the camera or the reticle. The addon nearer the top gets it,
and the other addon's card tells you who has it. [Order](https://docs.projectviewpoint.org/concepts/order.md) has the details.

## See what an addon does

Click **Info** on the card to get these tabs:

| Tab | What you'll find |
| --- | --- |
| Overview | The description, the author, and the versions it supports |
| Trust | Its label and why it got it, what it does with Lua and shaders, its signature, and the ZombieBuddy policy |
| Permissions | What it asks for |
| Hooks | Each place it hooks into the game or Viewpoint, how often that runs, how long it takes, and how many calls were skipped |
| Files | Its folder, its storage limit, and what it downloaded this session |
| Changelog | What changed since you accepted it, and the author's own notes |
| Performance | What it costs to run |

Many addons also have a settings page, behind the cog on an active card. Some split it into sections. Click a title at the
top of the page to switch between them.

### Block a single hook

If one hook is causing trouble, you can block just that one and keep the rest of the addon.

1. Open **Info**, then **Hooks**.
2. Find the hook and click **Veto**.

From the next safe moment, the game runs as if the addon never had that hook. **Allow again** undoes it.

## What the labels mean

Every addon gets a label from Viewpoint's automatic check of its Java code. It describes what the check found in this
version. It isn't a promise about what the code will do, and Lua isn't checked at all.

| Label | How it looks | What it means |
| --- | --- | --- |
| **Normal** | Like any other card | The code only uses parts of Viewpoint that have been reviewed. |
| **Amber** | Amber name and icon | The code uses things that haven't been reviewed, which includes drawing with OpenGL. Turn it on if you trust the author. |
| **Red** | Red name and icon, on a red card | The code can do things outside Viewpoint's control. It stays off until you allow it, so only do that for authors you trust. |

Point at the icon or the name to read what the label means. The full wording is on the
[Labels](https://docs.projectviewpoint.org/trust/labels.md#the-texts-that-the-player-sees) page.

A card may also tell you that an addon draws over the whole screen, or that any mod's Lua can call its Java. It's worth
reading those lines before you turn it on.

You might also see two other marks. **Unmanaged** is a mod that loads its own Java outside Viewpoint, so Viewpoint can't
turn it off or show you what it does. **Cannot be checked** is an addon that Viewpoint couldn't check, so it won't start.

## What the states mean

| State | What's going on |
| --- | --- |
| Incompatible | It doesn't match your game or your version of Viewpoint. The card says which version it needs. |
| Refused | Its files are wrong, or its requirements go round in a circle. It won't start, and the card says why. |
| Inactive | It's off. If the card gives a reason, something is holding it back, like a required package that's off. |
| Checking | Viewpoint is checking the jar and its signature in the background. It carries on when that's done. |
| Awaiting consent | You clicked the green tick, and it's waiting for your answer. |
| Active | It's on. |
| Active: hooks pending | It's on, and its hooks go into the game at the next safe moment. |
| Failed | It didn't start. The card says why. |
| Suspended | Viewpoint stopped it for this session, because it hit an error or the server doesn't list it. Turn it on again to restart it. |
| Needs an update | It uses a part of Viewpoint that no longer exists, so it won't start. Ask the author for an update. |

## Accept an update

When an addon updates, its card gets a **dot**. Click **Info** and open **Changelog** to see the author's notes and a list
of what changed, with a mark on anything that asks for more than before.

- **If it asks for more,** the addon stays off and the card says why. Click the green tick to read the dialog and accept.
  The dot goes away when you accept.
- **If it doesn't,** the addon keeps running as it was. It picks up the new files the next time you turn it on or restart
  the game. Until then the card says *Update available. It applies at the next enable or restart.* The dot goes away once
  you've opened **Info**.

## Downloads

An addon has to ask you before **every** download. The dialog shows the addon's ID and name, the host, the full address,
where the file will be saved, and its size. The file's real extension is picked out in orange, so `photo.png.exe` can't pass
itself off as a picture.

Nothing is kept until you click **Accept**. If you click **Deny** too many times, the addon can't ask again until you
restart the game. You can see each download in the addon's **Files** tab.

## Check what an addon costs

**Info**, **Performance** shows the memory and video memory the addon uses next to what Viewpoint estimated from its files,
how long its hooks and drawing take, and its history over your last 8 sessions.

To measure its cost on your graphics card, click **Measure GPU cost**. For about 20 seconds Viewpoint draws the addon's
models and hides them in turn, so stay still until it finishes. The result carries over to later sessions.

The history stays in a file on your computer and never leaves it. **Clear the usage file** deletes the history of all addons.

## Resource packs

Resource packs change models and art, and contain no code. They live in **Graphics**, **Resource Packs**, and the page works
just like the Addons page, with the same two columns, the same buttons and the same ordering. If two packs change the same
sprite, the one nearer the top wins. Older Viewpoint model packs appear here too, with a *legacy* flag.

## Playing on a server

- Addons that only change what you see or hear (`side=client`) stay on when you join a server.
- Addons that change gameplay (`side=gameplay`) are **Suspended** if the server doesn't list them.
- Hooks only go into the game at the main menu or on a loading screen.

> **Note**
>
> Viewpoint shows a disclaimer in the settings window and the first time you turn on an addon. Please read it before you turn
> one on.

---

Previous: [Migrating from Java](https://docs.projectviewpoint.org/shaderpacks/migrating-from-java.md) | Next: [Shaderpacks](https://docs.projectviewpoint.org/players/shaderpacks.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
