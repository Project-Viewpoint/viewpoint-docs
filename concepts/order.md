# Order

> What the order of the Active column controls, and how requirements and conflicts limit it.

The Active column is a list. The top of the list is first. The player drags a card to move it. Viewpoint saves the
order, and which packages are on, in the settings file of Viewpoint (`Zomboid/viewpoint-live.properties`, the key
`addons.active`). Edit it only with the game closed.

## What the order controls

| For | The order controls |
| --- | --- |
| **Hook handlers** | The handlers of one hook run from top to bottom when the game method starts, and from bottom to top when it ends. A handler that skips or replaces the call stops the handlers below it. |
| **Resource packs** | When two packs change the same sprite, state or tile, the pack nearer the top wins. |
| **Legacy model packs** | They are resource packs. The same rule applies. |
| **Camera layers** | The layers add together in this order. |
| **Claims** | Only one addon at a time holds the camera, the view, the cursor, the shot resolver or the reticle. The addon nearer the top wins. The others wait. Their cards show who holds the claim. |
| **Model and attachment providers** | When several providers answer for the same sprite, Viewpoint asks them in this order. The first that answers wins. Then come the resource packs, then the art of the game. Attachment providers are asked in this order too, and Viewpoint draws every answer. |
| **Sway and extension points** | The sway of the addons, and the contributions to an extension point, come in this order. |
| **Shader snippets** | The snippets of the addons run in this order at a point of a shader. |
| **Shaderpacks** | Nothing. Shaderpacks are not in the Active column. Only `base=` in a descriptor puts one pack on another. |
| **All other services** | Nothing. Two addons that use different services do not depend on their order. |

Viewpoint does not change the order for you. A package is in the correct position only if the player put it there.

## Requirements and conflicts

- `requires=example.core@1.0`: `example.core` must be **Active**, at version 1.0 or later, with the same major
  version. Until it is, the player cannot switch your addon on. Viewpoint names the missing package. If the player
  switches `example.core` off, Viewpoint first asks to switch off the addons that require it.
- `conflicts=other.lean`: the two packages cannot be active at the same time. Viewpoint tells the player which one is
  active.
- A requirement does not set the position of a package in the list.
- A cycle of `requires` is refused.

## Hook order

When the game calls a hooked method:

1. The `Before` handlers run from top to bottom. They stop at the first handler that skips or replaces the call.
2. The handlers below that handler are *pre-empted*. Their `Before` and `After` do not run. The card counts them.
3. The game method runs, if no handler skipped it.
4. The `After` handlers run from bottom to top. The pre-empted handlers do not run in this step.

Viewpoint keeps a copy of the handler list from the start of the call. A veto or a new order during the call does not
change which `After` handlers run for that call. See [Managed patching](https://docs.projectviewpoint.org/patching/managed-patching.md).

## The first position

When the player switches a package on, it goes to the top of the Active column. The player can then drag it to a
different position.

---

Previous: [Versions & compatibility](https://docs.projectviewpoint.org/concepts/versions-and-compatibility.md) | Next: [View state](https://docs.projectviewpoint.org/api/view-state.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
