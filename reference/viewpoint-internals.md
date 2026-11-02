# Viewpoint internals list

> The members of Viewpoint outside viewpoint.api that an addon can use or hook, and the level that each one gives.

Use `viewpoint.api` when you can. If the API does not have what you need, you can use or hook the members on this
page.

- Every member on this page has a level: **Amber** or **Red**. The level goes on the label of your addon.
- An addon that uses or hooks a member on this page is never **Normal**.
- Internal members can change in each Viewpoint release. Your addon can stop working after an update. Test it after
  each release. [Internals changes](https://project-viewpoint.github.io/viewpoint-docs/reference/internals-changes.md) lists what each release changed.
- Viewpoint does not load a jar that uses or hooks a member that is not on this page.
- A new member from this page in an update needs the consent of the player again. See
  [Updates & changelogs](https://project-viewpoint.github.io/viewpoint-docs/trust/updates-and-changelogs.md).

## The list

Viewpoint makes this list for each release, from the list that the maintainers review. The release build writes the
tables below. Do not edit them by hand.

Each class has a block. The heading of the block is the full name of the class. Under it, the block says whether the
class is public, and its level. A row in the block is one member. The columns are:

| Column | Meaning |
| --- | --- |
| **Member** | A field, or a method with its descriptor. |
| **Use or hook** | What you can do with the member. **Use** means that you call the method or read the field. It is possible only when the class and the member are public. **Hook** means that you put a hook on a method. It is possible for any access. **Reflect** means that you look up the member by name with reflection. It is possible for any access. |
| **Thread** | The thread on which the member runs: `main`, `render`, `any` or `worker`. It decides the kind of hook that you can use. See [Hooking Viewpoint](https://project-viewpoint.github.io/viewpoint-docs/patching/hooking-viewpoint.md#threads). |
| **Level** | **Amber** or **Red**. Reflection into any member is always Red. |
| **Since** | The Viewpoint release in which the member came on the list. |
| **Replacement** | The `viewpoint.api` type that does the same, if there is one. A deprecated member names its replacement here. |

A member can be **hook only**. You can hook it, but you cannot call it.

A field on this page is for reading. You cannot write to it. Use `viewpoint.api` to change the state of Viewpoint.

The list has 806 members in 167 classes.

#### `viewpoint.CombatHooks`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `skipIsoReticle(Lzombie/iso/sprite/IsoReticle;)Z` | hook | `any` | Red | alpha-0.1.7 |  |
| `zombieHit(Lzombie/characters/IsoZombie;Lzombie/inventory/types/HandWeapon;Lzombie/characters/IsoGameCharacter;Z)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.FP`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `cursorBefore` | reflect | `any` | Red | alpha-0.1.7 |  |
| `cursorMode` | reflect | `any` | Red | alpha-0.1.7 |  |
| `cursorMode()V` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `frames` | reflect | `any` | Red | alpha-0.1.7 |  |
| `gameLoaded()V` | hook | `any` | Red | alpha-0.1.7 |  |
| `renderWorld(Lzombie/iso/IsoCell;)Z` | hook | `any` | Red | alpha-0.1.7 |  |
| `resetCaches()V` | reflect | `any` | Red | alpha-0.1.7 |  |
| `switchView(Lzombie/characters/IsoGameCharacter;Z)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `toggle(Lzombie/characters/IsoGameCharacter;)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.Hooks`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `contextPick(IILzombie/iso/IsoObjectPicker$ClickObject;)Lzombie/iso/IsoObjectPicker$ClickObject;` | hook | `any` | Amber | alpha-0.1.7 |  |
| `gameRenderStarted()V` | hook | `any` | Red | alpha-0.1.7 |  |
| `mouseUpdated()V` | hook | `any` | Red | alpha-0.1.7 |  |
| `movementDone(Lzombie/characters/IsoPlayer;)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `skeletonPosed(Lzombie/core/skinnedmodel/animation/AnimationPlayer;)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.SceneDrawer`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `crosshair(ZZFF)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `drawFrame()V` | hook | `any` | Red | alpha-0.1.7 |  |
| `eye` | reflect | `any` | Red | alpha-0.1.7 |  |
| `failed` | reflect | `main` | Red | alpha-0.1.7 |  |
| `failed()Z` | reflect | `any` | Red | alpha-0.1.7 |  |
| `frame` | reflect | `any` | Red | alpha-0.1.7 |  |
| `lookAlong()V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `view` | reflect | `render` | Red | alpha-0.1.7 |  |

#### `viewpoint.camera.CameraCapture`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `blocks(Lzombie/iso/IsoCell;Lzombie/iso/IsoGridSquare;)B` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `squares(Lviewpoint/core/CameraSquares;Lzombie/iso/IsoCell;DDIF)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.camera.CameraRig`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `hold` | reflect | `any` | Red | alpha-0.1.7 |  |
| `limit` | reflect | `any` | Red | alpha-0.1.7 |  |
| `limit(FF)F` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `weights(Lviewpoint/camera/CameraInputs;F)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.camera.CameraSettings`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `AUTO_SWAP` | reflect | `any` | Red | alpha-0.1.7 |  |
| `DISTANCE` | reflect | `any` | Red | alpha-0.1.7 |  |
| `MOTION` | reflect | `any` | Red | alpha-0.1.7 |  |
| `ON_FOOT` | reflect | `any` | Red | alpha-0.1.7 |  |
| `SEATED` | reflect | `any` | Red | alpha-0.1.7 |  |
| `VEHICLE_DISTANCE` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.camera.CameraStep`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `farther` | reflect | `any` | Red | alpha-0.1.7 |  |
| `rig` | reflect | `any` | Red | alpha-0.1.7 |  |
| `settings(ZF)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.camera.CameraView`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `direction(Lviewpoint/core/CameraShot;FF[F[F)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `place(Lviewpoint/core/Frame;FF[F)Z` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `place(Lviewpoint/core/Frame;Lviewpoint/core/CameraShot;FF[F)Z` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.camera.Follow`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `lagH()F` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `lagX()F` | hook | `any` | Amber | alpha-0.1.7 |  |
| `lagY()F` | hook | `any` | Amber | alpha-0.1.7 |  |
| `update(DDDFFFFF)Z` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.camera.Impulses`

Public class. Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `shot(Lzombie/characters/IsoGameCharacter;)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.camera.PitchCurves`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `distance(F)F` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.camera.ThirdPerson`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `behind(Lzombie/characters/IsoGameCharacter;Z)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `capture(Lviewpoint/core/Frame;Lzombie/iso/IsoCell;Lzombie/characters/IsoGameCharacter;F)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `declare()V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `flip()V` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `flipping` | reflect | `any` | Red | alpha-0.1.7 |  |
| `poll(Lzombie/characters/IsoGameCharacter;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `step` | reflect | `main` | Red | alpha-0.1.7 |  |

#### `viewpoint.core.CameraShot`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `addBack` | use | `any` | Amber | alpha-0.1.7 |  |
| `addRight` | use | `any` | Amber | alpha-0.1.7 |  |
| `addUp` | use | `any` | Amber | alpha-0.1.7 |  |
| `clear()V` | use | `any` | Amber | alpha-0.1.7 |  |
| `distance` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `fovY` | use | `any` | Amber | alpha-0.1.7 |  |
| `limit` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `on` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `seated` | use | `any` | Amber | alpha-0.1.7 |  |
| `side` | use | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.core.CameraSquares`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `level` | use | `any` | Amber | alpha-0.1.7 |  |
| `on` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `side` | use | `any` | Amber | alpha-0.1.7 |  |
| `x` | use | `any` | Amber | alpha-0.1.7 |  |
| `y` | use | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.core.Frame`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `camX` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `camY` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `camZ` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `cameraShot` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `cameraSquares` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `corpseInstances` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `drawers` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `eyeLean` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `eyeX` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `eyeY` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `eyeZ` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `lootSquare` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `lootVehicle` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `modelItems` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `number` | use, reflect | `main` | use Amber, reflect Red | alpha-0.1.7 |  |
| `onCamera` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `scene` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `takenNanos` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `viewPitch` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `viewYaw` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.core.View`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `FOV` | reflect | `any` | Red | alpha-0.1.7 |  |
| `ON_TARGET` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `cameraUp` | use, reflect | `main` | use Amber, reflect Red | alpha-0.1.7 |  |
| `cameraX` | use, reflect | `main` | use Amber, reflect Red | alpha-0.1.7 |  |
| `cameraY` | use, reflect | `main` | use Amber, reflect Red | alpha-0.1.7 |  |
| `crosshairOnTarget` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `crosshairShown` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `crosshairX` | use, reflect | `render` | use Amber, reflect Red | alpha-0.1.7 |  |
| `crosshairY` | use, reflect | `render` | use Amber, reflect Red | alpha-0.1.7 |  |
| `enabled` | use, reflect | `render` | use Amber, reflect Red | alpha-0.1.7 |  |
| `fovY(Z)F` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |
| `frameFovY` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `ringX` | use, reflect | `render` | use Amber, reflect Red | alpha-0.1.7 |  |
| `ringY` | use, reflect | `render` | use Amber, reflect Red | alpha-0.1.7 |  |
| `shoulder` | reflect | `main` | Red | alpha-0.1.7 |  |
| `swayRight` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `swayUp` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `thirdPerson` | use, reflect | `main` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.core.WallSide`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `keep(Lzombie/characters/IsoGameCharacter;FFF[F)V` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.environment.Atmosphere`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `apply(Lviewpoint/render/SceneData;)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.far.FarTiles`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `of(Ljava/lang/String;)Lviewpoint/far/FarTiles$Tile;` | hook, reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.far.FarWorld`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `clear()V` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.far.Relief`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `current` | reflect | `any` | Red | alpha-0.1.7 |  |
| `current()Lviewpoint/render/FarRelief$Lift;` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.game.WorldText`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `pixel` | reflect | `any` | Red | alpha-0.1.7 |  |
| `screen` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.game.WorldToScreen`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `clip` | reflect | `any` | Red | alpha-0.1.7 |  |
| `eye` | reflect | `any` | Red | alpha-0.1.7 |  |
| `height` | reflect | `any` | Red | alpha-0.1.7 |  |
| `lift` | reflect | `any` | Red | alpha-0.1.7 |  |
| `originX` | reflect | `any` | Red | alpha-0.1.7 |  |
| `originY` | reflect | `any` | Red | alpha-0.1.7 |  |
| `originZ` | reflect | `any` | Red | alpha-0.1.7 |  |
| `panini` | reflect | `any` | Red | alpha-0.1.7 |  |
| `pixel(FFFF[F)Z` | reflect | `any` | Red | alpha-0.1.7 |  |
| `set(Lviewpoint/core/Frame;Lviewpoint/input/FreeCam$Place;FF)Z` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `viewProjection` | reflect | `any` | Red | alpha-0.1.7 |  |
| `width` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.gunplay.Ground`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `under(Lzombie/iso/IsoMovingObject;)D` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.gunplay.Gunplay`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `ON` | reflect | `any` | Red | alpha-0.1.7 |  |
| `RING` | reflect | `any` | Red | alpha-0.1.7 |  |
| `active(Lzombie/characters/IsoGameCharacter;Lzombie/inventory/types/HandWeapon;)Z` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `aimsFirearm(Lzombie/characters/IsoGameCharacter;Lzombie/inventory/types/HandWeapon;)Z` | hook | `any` | Amber | alpha-0.1.7 |  |
| `candidates(Lzombie/characters/IsoGameCharacter;Lzombie/inventory/types/HandWeapon;Lzombie/util/list/PZArrayList;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `fresh()Z` | reflect | `any` | Red | alpha-0.1.7 |  |
| `gather(Lzombie/characters/IsoGameCharacter;Lzombie/network/fields/hit/AttackVars;Lzombie/util/list/PZArrayList;)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `hitListMade(Lzombie/characters/IsoGameCharacter;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `pattern(Lzombie/inventory/types/HandWeapon;)D` | reflect | `any` | Red | alpha-0.1.7 |  |
| `reticle(Lzombie/iso/sprite/IsoReticle;)Z` | hook | `any` | Red | alpha-0.1.7 |  |
| `shotEnded()V` | use, hook | `any` | Amber | alpha-0.1.7 |  |
| `shotStarting(Lzombie/characters/IsoGameCharacter;Lzombie/inventory/types/HandWeapon;)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `snapshot()V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `swayRight()D` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `swayUp()D` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `update(Lzombie/characters/IsoGameCharacter;Lzombie/inventory/types/HandWeapon;)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.gunplay.Obstacles`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `stop(DDDDDDDD)D` | hook | `any` | Amber | alpha-0.1.7 |  |
| `stopped` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.gunplay.Reticle`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `set(Lzombie/iso/sprite/IsoReticle;D)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.gunplay.Shot`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `begin(Lzombie/characters/IsoGameCharacter;Lzombie/inventory/types/HandWeapon;D)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `bullet` | reflect | `any` | Red | alpha-0.1.7 |  |
| `bullet(DDDD)V` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `draw()V` | hook | `any` | Red | alpha-0.1.7 |  |
| `end()V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `hits` | reflect | `any` | Red | alpha-0.1.7 |  |
| `hits(II)V` | reflect | `any` | Red | alpha-0.1.7 |  |
| `muzzle` | reflect | `any` | Red | alpha-0.1.7 |  |
| `owner` | reflect | `any` | Red | alpha-0.1.7 |  |
| `resolving(Lzombie/characters/IsoGameCharacter;)Z` | reflect | `any` | Red | alpha-0.1.7 |  |
| `resolving(Lzombie/core/physics/BallisticsController;)Z` | reflect | `any` | Red | alpha-0.1.7 |  |
| `wall` | reflect | `any` | Red | alpha-0.1.7 |  |
| `weapon` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.gunplay.Sight`

Class that is not public (hook only). Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `set([DDDDD)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.gunplay.Sway`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `right` | reflect | `any` | Red | alpha-0.1.7 |  |
| `right()D` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `up` | reflect | `any` | Red | alpha-0.1.7 |  |
| `up()D` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.input.ArmsPitch`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `kickAcross` | reflect | `any` | Red | alpha-0.1.7 |  |
| `kickFlip` | reflect | `any` | Red | alpha-0.1.7 |  |
| `posed(Lzombie/core/skinnedmodel/animation/AnimationPlayer;)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.input.Camera`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `direction(FF[F)V` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |
| `eye(Lviewpoint/core/Frame;F[F)V` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.input.Controls`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `afterMovement(Lzombie/characters/IsoPlayer;)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `aim(Lzombie/characters/IsoPlayer;)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `beforeMovement(Lzombie/characters/IsoPlayer;)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `handPitch(Lzombie/characters/IsoGameCharacter;)F` | use, hook | `any` | Amber | alpha-0.1.7 |  |
| `lookAngle(Lzombie/characters/IsoGameCharacter;F)F` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `moveVector(Lzombie/characters/IsoPlayer;Lzombie/iso/Vector2;)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `moveX` | reflect | `any` | Red | alpha-0.1.7 |  |
| `moveY` | reflect | `any` | Red | alpha-0.1.7 |  |
| `orbits(Lzombie/characters/IsoPlayer;)Z` | hook | `any` | Amber | alpha-0.1.7 |  |
| `owns(Lzombie/characters/IsoGameCharacter;)Z` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `reticle(IIZ)I` | hook | `any` | Amber | alpha-0.1.7 |  |
| `rootMotion(Lzombie/characters/IsoPlayer;Lzombie/iso/Vector2;Z)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `turn(Lzombie/characters/IsoPlayer;FZ)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.input.CrosshairAim`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `camera([D)Z` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `off()V` | use, hook | `any` | Amber | alpha-0.1.7 |  |
| `pitch(Lzombie/characters/IsoGameCharacter;)F` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `snapshot(Lviewpoint/core/Frame;Lzombie/characters/IsoGameCharacter;Lviewpoint/render/FarRelief$Lift;)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `switched()V` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `yaw(Lzombie/characters/IsoGameCharacter;)F` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.input.Eye`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `HEAD_MOVEMENT` | reflect | `any` | Red | alpha-0.1.7 |  |
| `atHead(Lzombie/characters/IsoGameCharacter;Lviewpoint/core/Frame;FFF)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `eyeMotion` | reflect | `any` | Red | alpha-0.1.7 |  |
| `kept` | reflect | `any` | Red | alpha-0.1.7 |  |
| `place(Lzombie/characters/IsoGameCharacter;Lviewpoint/core/Frame;)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `put(Lzombie/characters/IsoGameCharacter;Lviewpoint/core/Frame;FF)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.input.EyeMotion`

Class that is not public (hook only). Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `update(FFFFFZF)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.input.FreeCam`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `active` | use, reflect | `main` | use Amber, reflect Red | alpha-0.1.7 |  |
| `centre()Lviewpoint/input/FreeCam$Place;` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |
| `physical` | use, reflect | `main` | use Amber, reflect Red | alpha-0.1.7 |  |
| `pitch` | reflect | `any` | Red | alpha-0.1.7 |  |
| `place` | reflect | `main` | Red | alpha-0.1.7 |  |
| `starting` | reflect | `any` | Red | alpha-0.1.7 |  |
| `view(Lviewpoint/core/Frame;FFF[F[F)Z` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |
| `x` | reflect | `any` | Red | alpha-0.1.7 |  |
| `y` | reflect | `any` | Red | alpha-0.1.7 |  |
| `yaw` | reflect | `any` | Red | alpha-0.1.7 |  |
| `z` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.input.FreeCam$Place`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `x` | reflect | `any` | Red | alpha-0.1.7 |  |
| `x()D` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `y` | reflect | `any` | Red | alpha-0.1.7 |  |
| `y()D` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `z` | reflect | `any` | Red | alpha-0.1.7 |  |
| `z()D` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.input.FreeLook`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `anchor` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.input.HeadLook`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `posed(Lzombie/core/skinnedmodel/animation/AnimationPlayer;)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.input.Locomotion`

Class that is not public (hook only). Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `update(IZF)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.input.Look`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `SPEED` | reflect | `any` | Red | alpha-0.1.7 |  |
| `behind(FFZ)V` | use | `any` | Amber | alpha-0.1.7 |  |
| `captured` | use, reflect | `render` | use Amber, reflect Red | alpha-0.1.7 |  |
| `hasLast` | reflect | `any` | Red | alpha-0.1.7 |  |
| `hold(FF)V` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `looking()Z` | reflect | `any` | Red | alpha-0.1.7 |  |
| `movedNanos` | reflect | `any` | Red | alpha-0.1.7 |  |
| `movedNanos()J` | reflect | `any` | Red | alpha-0.1.7 |  |
| `onUpdateMouseCursor()Z` | hook | `any` | Red | alpha-0.1.7 |  |
| `pitch` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `read(JZ)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `readBeforeDrawing()V` | hook | `any` | Red | alpha-0.1.7 |  |
| `wantCapture` | use, reflect | `main` | use Amber, reflect Red | alpha-0.1.7 |  |
| `wrap(F)F` | use | `any` | Amber | alpha-0.1.7 |  |
| `yaw` | use, reflect | `main` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.input.PadLook`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `bind(Lzombie/characters/IsoPlayer;)I` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.interact.InteractActions`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `aimed` | reflect | `any` | Red | alpha-0.1.7 |  |
| `forget()V` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.interact.LootBoxes`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `all()[F` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.interact.LootMenu`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `keyDown(IZ)Z` | use, hook | `any` | Amber | alpha-0.1.7 |  |
| `locked()Z` | reflect | `any` | Red | alpha-0.1.7 |  |
| `loot` | reflect | `any` | Red | alpha-0.1.7 |  |
| `loot()Z` | reflect | `any` | Red | alpha-0.1.7 |  |
| `mouse()V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `panelDue` | reflect | `any` | Red | alpha-0.1.7 |  |
| `panelDue()Z` | reflect | `any` | Red | alpha-0.1.7 |  |
| `player(Lzombie/characters/IsoGameCharacter;)Lzombie/characters/IsoPlayer;` | hook | `any` | Amber | alpha-0.1.7 |  |
| `rows` | reflect | `any` | Red | alpha-0.1.7 |  |
| `shown` | reflect | `any` | Red | alpha-0.1.7 |  |
| `snapshot(Lviewpoint/core/Frame;Lzombie/characters/IsoGameCharacter;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `target` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.interact.LootPanel`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `FONT` | reflect | `any` | Red | alpha-0.1.7 |  |
| `draw()V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `hint` | reflect | `any` | Red | alpha-0.1.7 |  |
| `hint(Lviewpoint/interact/LootRows;)Ljava/lang/String;` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `render()V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `rounded(IIIIIFFFF)V` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.interact.LootRows`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `rows` | reflect | `any` | Red | alpha-0.1.7 |  |
| `selected` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.interact.LootRows$Row`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `action` | reflect | `any` | Red | alpha-0.1.7 |  |
| `enabled` | reflect | `any` | Red | alpha-0.1.7 |  |
| `heading` | reflect | `any` | Red | alpha-0.1.7 |  |
| `icon` | reflect | `any` | Red | alpha-0.1.7 |  |
| `items` | reflect | `any` | Red | alpha-0.1.7 |  |
| `name` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.interact.LootTargets`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `aim(Lviewpoint/core/Frame;)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `aimed(Lviewpoint/core/Frame;Lzombie/characters/IsoPlayer;Lviewpoint/interact/LootTargets$Target;)Lviewpoint/interact/LootTargets$Target;` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `found` | reflect | `any` | Red | alpha-0.1.7 |  |
| `from(Lzombie/characters/IsoPlayer;)F` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `ray` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.interact.LootTargets$Target`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `containers` | reflect | `any` | Red | alpha-0.1.7 |  |
| `kind` | reflect | `any` | Red | alpha-0.1.7 |  |
| `locked` | reflect | `any` | Red | alpha-0.1.7 |  |
| `object` | reflect | `any` | Red | alpha-0.1.7 |  |
| `same(Lviewpoint/interact/LootTargets$Target;)Z` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `set(Lviewpoint/interact/LootTargets$Target;)V` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `square` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.interact.MouseTargets`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `contextPick(II)Lzombie/iso/IsoObjectPicker$ClickObject;` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `find(Lviewpoint/render/MousePick$Hit;Lzombie/iso/IsoCell;)Lzombie/iso/IsoObject;` | reflect | `any` | Red | alpha-0.1.7 |  |
| `frame(Z)V` | use, hook | `any` | Amber | alpha-0.1.7 |  |
| `vehicle()Lzombie/vehicles/BaseVehicle;` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.interact.PackBoxes`

Class that is not public (hook only). Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `of(Lzombie/iso/IsoObject;Lzombie/iso/IsoGridSquare;[F)Z` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.iris.IrisPack`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `preprocess(Lviewpoint/iris/IrisPack$Configured;Ljava/lang/String;Ljava/util/Map;)Lviewpoint/iris/Preprocessor$Result;` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `preprocess(Lviewpoint/iris/IrisPack$Configured;Ljava/lang/String;Ljava/util/Map;Ljava/util/Map;)Lviewpoint/iris/Preprocessor$Result;` | hook, reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.iris.Preprocessor$Result`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `errors` | reflect | `any` | Red | alpha-0.1.7 |  |
| `errors()Ljava/util/List;` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `text` | reflect | `any` | Red | alpha-0.1.7 |  |
| `text()Ljava/lang/String;` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.light.Flashlight`

Public class. Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `snapshot(Lviewpoint/core/Frame;Lzombie/characters/IsoGameCharacter;)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.light.Headlights`

Public class. Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `reach(Lzombie/vehicles/VehiclePart;)F` | hook | `any` | Amber | alpha-0.1.7 |  |
| `write([FLviewpoint/core/Frame;Lzombie/vehicles/VehiclePart;Lzombie/vehicles/VehicleLight;ZZI)Z` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.light.Lights`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `lift(Lviewpoint/render/SceneData;FF)F` | reflect | `any` | Red | alpha-0.1.7 |  |
| `snapshot(Lviewpoint/core/Frame;Lzombie/iso/IsoCell;)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.light.OwnedLight`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `lightAt(III)I` | reflect | `any` | Red | alpha-0.1.7 |  |
| `modelLightAt(III)I` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `modelSky(IIIZ)F` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.light.Torches`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `snapshot(Lviewpoint/core/Frame;Lzombie/characters/IsoGameCharacter;I)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.models.Characters`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `behind(Lzombie/iso/IsoMovingObject;FFFF)Z` | hook | `any` | Amber | alpha-0.1.7 |  |
| `inRange(Lzombie/iso/IsoMovingObject;FFF)Z` | hook | `any` | Amber | alpha-0.1.7 |  |
| `seatMatrix(Lorg/joml/Matrix4f;Lzombie/core/skinnedmodel/model/ModelSlotRenderData;FFF)Lorg/joml/Matrix4f;` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `seatedEye(Lviewpoint/core/Frame;Lzombie/core/skinnedmodel/model/ModelSlotRenderData;Lzombie/characters/IsoGameCharacter;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `snapshot(Lviewpoint/core/Frame;Lzombie/iso/IsoCell;Lzombie/characters/IsoGameCharacter;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `vehicles(Lviewpoint/core/Frame;Lzombie/iso/IsoCell;Lzombie/characters/IsoGameCharacter;)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.models.CorpseCapture`

Class that is not public (hook only). Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `draw(Lviewpoint/core/Frame;Lzombie/iso/objects/IsoDeadBody;Lviewpoint/models/CorpsePose;FIZF)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.models.CorpsePose`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `releasePlayer()V` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.models.Corpses`

Public class. Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `capture(Lviewpoint/core/Frame;)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.models.ModelCapture`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `add(Lviewpoint/render/ModelDraws;Lzombie/core/skinnedmodel/model/ModelInstanceRenderData;Lzombie/core/textures/Texture;Lorg/joml/Matrix4f;Lzombie/characters/IsoGameCharacter;ZLviewpoint/models/ModelCapture$Pose;Z)I` | hook | `any` | Amber | alpha-0.1.7 |  |
| `capture(Lviewpoint/core/Frame;Lzombie/core/skinnedmodel/model/ModelSlotRenderData;Lzombie/characters/IsoGameCharacter;ZZLviewpoint/models/ModelCapture$Pose;FFFF)Z` | hook | `any` | Red | alpha-0.1.7 |  |
| `collapse(Lviewpoint/render/ModelDraws;IILzombie/core/skinnedmodel/model/SkinningData;Lzombie/core/skinnedmodel/animation/AnimationPlayer;)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `model` | reflect | `any` | Red | alpha-0.1.7 |  |
| `place` | reflect | `any` | Red | alpha-0.1.7 |  |
| `placed(Lviewpoint/core/Frame;Lzombie/core/skinnedmodel/model/ModelSlotRenderData;Lzombie/characters/IsoGameCharacter;FFFF)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.models.ModelCapture$Pose`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `values()[Lviewpoint/models/ModelCapture$Pose;` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.models.ModelCull`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `headSquareSeen(Lzombie/characters/IsoZombie;Lzombie/characters/IsoPlayer;Z)Z` | hook | `any` | Amber | alpha-0.1.7 |  |
| `range` | reflect | `any` | Red | alpha-0.1.7 |  |
| `roomHidden(Lzombie/iso/IsoMovingObject;)Z` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `wanted(Lzombie/iso/IsoMovingObject;)Z` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.models.ModelMotion`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `follow(Lviewpoint/render/ModelDraws;ILjava/lang/Object;I)V` | reflect | `any` | Red | alpha-0.1.7 |  |
| `follow(Lviewpoint/render/ModelDraws;ILjava/lang/Object;IZ)V` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.models.Models`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `capturing` | use, reflect | `main` | use Amber, reflect Red | alpha-0.1.7 |  |
| `item(Lzombie/iso/objects/IsoWorldInventoryObject;Lzombie/iso/IsoGridSquare;)Lzombie/core/skinnedmodel/model/ItemModelRenderer$RenderStatus;` | hook | `any` | Amber | alpha-0.1.7 |  |
| `object(Lzombie/iso/IsoObject;Lzombie/iso/IsoGridSquare;I)Lzombie/core/skinnedmodel/model/IsoObjectModelDrawer$RenderStatus;` | hook | `any` | Amber | alpha-0.1.7 |  |
| `own(Lviewpoint/core/Frame;ILzombie/iso/IsoGridSquare;Lzombie/iso/IsoObject;Lzombie/inventory/InventoryItem;)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `sink` | reflect | `any` | Red | alpha-0.1.7 |  |
| `snapshot(Lviewpoint/core/Frame;I)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.models.RigidCapture`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `item(Lviewpoint/core/Frame;Lzombie/core/skinnedmodel/model/WorldItemModelDrawer;Lzombie/iso/IsoGridSquare;FFF)Z` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `object(Lviewpoint/core/Frame;Lzombie/core/skinnedmodel/model/IsoObjectModelDrawer;Lzombie/iso/IsoGridSquare;Lzombie/iso/IsoObject;)Z` | hook, reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.models.VehicleCapture`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `capture(Lviewpoint/core/Frame;Lzombie/core/skinnedmodel/model/ModelSlotRenderData;Lzombie/vehicles/BaseVehicle;)Z` | hook | `any` | Red | alpha-0.1.7 |  |
| `place` | reflect | `any` | Red | alpha-0.1.7 |  |
| `placed(Lviewpoint/core/Frame;Lzombie/core/skinnedmodel/model/ModelSlotRenderData;Lzombie/vehicles/BaseVehicle;)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.models.VehicleTilt`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `onRelief(Lorg/joml/Matrix4f;Lviewpoint/core/Frame;Lzombie/vehicles/BaseVehicle;FFF)Lorg/joml/Matrix4f;` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `seatView(Lviewpoint/core/Frame;Lzombie/vehicles/BaseVehicle;FFFF)V` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.packs.ModelPacks`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `bind(Ljava/lang/String;)Lviewpoint/packs/PackBind;` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |
| `bind(Lzombie/iso/sprite/IsoSprite;)Lviewpoint/packs/PackBind;` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.packs.ObjReader`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `parse(Ljava/util/List;)Lviewpoint/packs/ObjReader$Mesh;` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.packs.PackBind`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `<init>(Lviewpoint/render/PackModel;FFFFF)V` | use | `any` | Amber | alpha-0.1.7 |  |
| `cos` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `model` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `place(FFFZ[F)V` | use | `any` | Amber | alpha-0.1.7 |  |
| `scale` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `sin` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `turns(Lzombie/iso/sprite/IsoSprite;)Z` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `x` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `y` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `z` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.packs.PackLoads`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `load(Ljava/io/File;Ljava/nio/file/Path;)Lviewpoint/render/PackData;` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `want(Lviewpoint/render/PackModel;J)Z` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.platform.Build`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `VERSION` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.platform.BuildPin`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `supported` | reflect | `any` | Red | alpha-0.1.7 |  |
| `supported()Z` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.platform.Gl`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `bind(II)V` | use, reflect | `any` | Red | alpha-0.1.7 |  |
| `screenTriangle()V` | use, hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `triangles` | reflect | `any` | Red | alpha-0.1.7 |  |
| `triangles()I` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.platform.GlProgram`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `adopt(Lviewpoint/platform/ProgramLinker$Linked;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `create(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Lviewpoint/platform/GlProgram;` | hook | `any` | Red | alpha-0.1.7 |  |
| `delete()V` | hook | `any` | Red | alpha-0.1.7 |  |
| `forEach(Ljava/util/function/Consumer;)V` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `fromSources(Ljava/lang/String;Lviewpoint/platform/GlProgram$Sources;Ljava/util/Map;Ljava/util/Map;Ljava/util/List;)Lviewpoint/platform/GlProgram;` | hook | `any` | Red | alpha-0.1.7 |  |
| `has(Ljava/lang/String;)Z` | use, reflect | `any` | Red | alpha-0.1.7 |  |
| `id` | reflect | `any` | Red | alpha-0.1.7 |  |
| `id()I` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `lastError()Ljava/lang/String;` | use | `any` | Amber | alpha-0.1.7 |  |
| `link(Lviewpoint/platform/ShaderPacks$Active;Lviewpoint/platform/ProgramLinker$Linked;)Lviewpoint/platform/ProgramLinker$Linked;` | hook | `any` | Red | alpha-0.1.7 |  |
| `links()I` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `location(Ljava/lang/String;)I` | use, reflect | `any` | Red | alpha-0.1.7 |  |
| `pack` | reflect | `any` | Red | alpha-0.1.7 |  |
| `pack()Lviewpoint/platform/ShaderPacks$Active;` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `relinkAll(Lviewpoint/platform/ShaderPacks$Active;)Ljava/lang/String;` | hook | `any` | Red | alpha-0.1.7 |  |
| `sampler(Ljava/lang/String;I)V` | use, hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `set(Ljava/lang/String;F)V` | use, hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `set(Ljava/lang/String;FF)V` | use, hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `set(Ljava/lang/String;FFF)V` | use, hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `set(Ljava/lang/String;FFFF)V` | use, hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `set(Ljava/lang/String;Lorg/joml/Matrix3f;)V` | use, hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `set(Ljava/lang/String;Lorg/joml/Matrix4f;)V` | use, hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `setInt(Ljava/lang/String;I)V` | use, hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `setVec4s(Ljava/lang/String;Ljava/nio/FloatBuffer;)V` | use | `any` | Red | alpha-0.1.7 |  |
| `use()V` | use, hook, reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.platform.IrisPacks`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `active` | reflect | `any` | Red | alpha-0.1.7 |  |
| `active()Lviewpoint/platform/IrisPacks$Active;` | reflect | `any` | Red | alpha-0.1.7 |  |
| `drawn` | reflect | `any` | Red | alpha-0.1.7 |  |
| `drawn()Lviewpoint/platform/IrisPacks$Active;` | reflect | `any` | Red | alpha-0.1.7 |  |
| `use(Lviewpoint/iris/IrisPack;Ljava/util/Map;)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.platform.IrisPacks$Active`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `pack` | reflect | `any` | Red | alpha-0.1.7 |  |
| `pack()Lviewpoint/iris/IrisPack;` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.platform.KeyBind`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `chords` | reflect | `any` | Red | alpha-0.1.7 |  |
| `chords()Ljava/util/List;` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `down(Ljava/util/function/IntPredicate;)Z` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |
| `pressed()Z` | use, hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.platform.KeyBind$Kind`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `HOLD` | reflect | `any` | Red | alpha-0.1.7 |  |
| `PRESS` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.platform.KeyChord`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `held` | reflect | `any` | Red | alpha-0.1.7 |  |
| `held()Ljava/util/List;` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `key` | reflect | `any` | Red | alpha-0.1.7 |  |
| `key()I` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `name(I)Ljava/lang/String;` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.platform.KeyInput`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `physicallyDown(I)Z` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `target` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.platform.Onboarding`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `blocks()Z` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `show()V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `shown` | reflect | `main` | Red | alpha-0.1.7 |  |
| `shown()Z` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.platform.Pipeline`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `renderScale` | reflect | `any` | Red | alpha-0.1.7 |  |
| `taa` | reflect | `any` | Red | alpha-0.1.7 |  |
| `upscaler` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.platform.Pool`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `IRIS` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `RELIEF` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `cap()J` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `use(J)V` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.platform.ShaderPack`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `builtIn` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `id` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `shader(Ljava/lang/String;)Ljava/lang/String;` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.platform.ShaderPacks`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `active` | reflect | `main` | Red | alpha-0.1.7 |  |
| `active()Lviewpoint/platform/ShaderPacks$Active;` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `discover(Ljava/io/File;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `drawn` | reflect | `render` | Red | alpha-0.1.7 |  |
| `drawn()Lviewpoint/platform/ShaderPacks$Active;` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `useBuiltIn(Ljava/lang/String;Ljava/lang/String;)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `useBuiltIn(Ljava/lang/String;Ljava/lang/String;Ljava/util/Map;)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.platform.ShaderPacks$Active`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `pack` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.platform.Shaders`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `load(Ljava/lang/String;)Lviewpoint/platform/Shaders$Source;` | hook | `any` | Red | alpha-0.1.7 |  |
| `load(Ljava/lang/String;Lviewpoint/platform/ShaderPacks$Active;)Lviewpoint/platform/Shaders$Source;` | hook | `any` | Red | alpha-0.1.7 |  |
| `read(Ljava/lang/String;)Ljava/lang/String;` | hook | `any` | Red | alpha-0.1.7 |  |
| `read(Ljava/lang/String;Lviewpoint/platform/ShaderPack;[Z)Ljava/lang/String;` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.platform.Widgets`

Class that is not public (hook only). Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `pages(Ljava/lang/String;[Ljava/lang/String;I)I` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.render.AntiAliasPass`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `over(Lviewpoint/render/FrameContext;I)I` | hook, reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.ChunkMeshData`

Public class. Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `level` | use | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.render.CorpseTextures`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `made` | reflect | `any` | Red | alpha-0.1.7 |  |
| `made()Z` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.render.FarPass`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `gbuffer(Lviewpoint/render/FrameContext;)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.FarRelief`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `on` | reflect | `any` | Red | alpha-0.1.7 |  |
| `on(Z)V` | reflect | `any` | Red | alpha-0.1.7 |  |
| `texture` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.FarRelief$Field`

Public class. Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `metresAt(DD)F` | use | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.render.FarRelief$Lift`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `grid()Lviewpoint/render/FarRelief$Field;` | use | `any` | Amber | alpha-0.1.7 |  |
| `ground` | reflect | `any` | Red | alpha-0.1.7 |  |
| `ground()F` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `levels` | reflect | `any` | Red | alpha-0.1.7 |  |
| `levels()F` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `scene(DD)F` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.render.FarShadow`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `draw(Lviewpoint/render/FrameContext;IIZ)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.FlameDraws`

Public class. Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `add(Lzombie/core/textures/Texture;[F[F[FF[FZ)V` | use | `any` | Amber | alpha-0.1.7 |  |
| `full()Z` | use | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.render.FlashShadow`

Class that is not public (hook only). Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `aim(Lviewpoint/render/FrameContext;)Z` | hook | `any` | Amber | alpha-0.1.7 |  |
| `write(Ljava/nio/FloatBuffer;Lviewpoint/render/SceneData;I)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.render.FloorBakes`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `update(Lviewpoint/render/SceneData;Z)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.FrameContext`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `camera(Lviewpoint/platform/GlProgram;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `eyeX` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `eyeY` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `eyeZ` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `height` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `index` | reflect | `any` | Red | alpha-0.1.7 |  |
| `invViewProjection` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `jitteredProjection` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `outputDrawFbo` | reflect | `any` | Red | alpha-0.1.7 |  |
| `outputHeight` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `outputReadFbo` | reflect | `any` | Red | alpha-0.1.7 |  |
| `outputWidth` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `panini` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `pipeline` | reflect | `any` | Red | alpha-0.1.7 |  |
| `plainViewProjection` | reflect | `any` | Red | alpha-0.1.7 |  |
| `scene` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `view` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `viewProjection` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `viewport` | reflect | `any` | Red | alpha-0.1.7 |  |
| `width` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.render.FrameGenPass`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `capture(Lviewpoint/render/FrameContext;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `drawn` | reflect | `any` | Red | alpha-0.1.7 |  |
| `made` | reflect | `render` | Red | alpha-0.1.7 |  |
| `made()Lviewpoint/render/FrameGenPass;` | reflect | `any` | Red | alpha-0.1.7 |  |
| `midframe()V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.FrameUniforms`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `set(Lviewpoint/render/FrameContext;Lviewpoint/render/Targets;)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.IndirectPass`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `draw(Lviewpoint/render/FrameContext;Z)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.IrisFrame`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `draw(Lviewpoint/render/IrisPipeline;Lviewpoint/render/FrameContext;Lviewpoint/render/ShadowPass;Lviewpoint/render/ModelPass;Lviewpoint/render/FarPass;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `translucent(Lviewpoint/render/IrisPipeline;Lviewpoint/render/FrameContext;Lviewpoint/render/ShadowPass;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `values` | reflect | `any` | Red | alpha-0.1.7 |  |
| `values(Lviewpoint/render/IrisPipeline;Lviewpoint/render/FrameContext;)V` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.render.IrisGeometry`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `begin(Lviewpoint/render/IrisPipeline;Lviewpoint/render/IrisProgram;Ljava/util/Map;Lorg/joml/Matrix4f;Lorg/joml/Matrix4f;Ljava/lang/String;Lviewpoint/render/FrameContext;Z)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `surfaces(Lviewpoint/render/IrisPipeline;Ljava/util/Map;Lviewpoint/render/FrameContext;Lviewpoint/render/ShadowPass;Z)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `weather(Lviewpoint/render/IrisPipeline;Ljava/util/Map;Lviewpoint/render/FrameContext;Lviewpoint/render/ShadowPass;)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.IrisLibrary`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `fragment(Lviewpoint/iris/IrisAssembler$Source;)Ljava/lang/String;` | hook | `any` | Red | alpha-0.1.7 |  |
| `vertex(Lviewpoint/iris/IrisAssembler$Source;)Ljava/lang/String;` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.IrisMode`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `pipeline` | reflect | `any` | Red | alpha-0.1.7 |  |
| `pipeline()Lviewpoint/render/IrisPipeline;` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.IrisPipeline`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `programs` | reflect | `any` | Red | alpha-0.1.7 |  |
| `targets` | reflect | `any` | Red | alpha-0.1.7 |  |
| `uniforms` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.IrisProgram`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `checkUnits()V` | hook | `any` | Red | alpha-0.1.7 |  |
| `gl` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.IrisTargets`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `buffers` | reflect | `any` | Red | alpha-0.1.7 |  |
| `colour(Lviewpoint/render/IrisFormats$Format;IIZ)I` | reflect | `any` | Red | alpha-0.1.7 |  |
| `depth` | reflect | `any` | Red | alpha-0.1.7 |  |
| `depthOpaque` | reflect | `any` | Red | alpha-0.1.7 |  |
| `ensure(II)Ljava/lang/String;` | hook | `any` | Red | alpha-0.1.7 |  |
| `height` | reflect | `any` | Red | alpha-0.1.7 |  |
| `width` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.IrisTargets$Buffer`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `format` | reflect | `any` | Red | alpha-0.1.7 |  |
| `height` | reflect | `any` | Red | alpha-0.1.7 |  |
| `mipmap` | reflect | `any` | Red | alpha-0.1.7 |  |
| `read` | reflect | `any` | Red | alpha-0.1.7 |  |
| `texture` | reflect | `any` | Red | alpha-0.1.7 |  |
| `used` | reflect | `any` | Red | alpha-0.1.7 |  |
| `width` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.IrisUniforms`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `camera(Lviewpoint/render/FrameContext;)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `eyeSkySmooth` | reflect | `any` | Red | alpha-0.1.7 |  |
| `frames` | reflect | `any` | Red | alpha-0.1.7 |  |
| `hasPrevious` | reflect | `any` | Red | alpha-0.1.7 |  |
| `matrices(Lviewpoint/render/FrameContext;)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `modelView` | reflect | `any` | Red | alpha-0.1.7 |  |
| `previousFarProjection` | reflect | `any` | Red | alpha-0.1.7 |  |
| `previousModelView` | reflect | `any` | Red | alpha-0.1.7 |  |
| `previousProjection` | reflect | `any` | Red | alpha-0.1.7 |  |
| `previousX` | reflect | `any` | Red | alpha-0.1.7 |  |
| `previousY` | reflect | `any` | Red | alpha-0.1.7 |  |
| `previousZ` | reflect | `any` | Red | alpha-0.1.7 |  |
| `projection` | reflect | `any` | Red | alpha-0.1.7 |  |
| `seconds` | reflect | `any` | Red | alpha-0.1.7 |  |
| `update(Lviewpoint/render/FrameContext;ZFFFFZF)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `wetness` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.MeshArena`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `bindLight(ILviewpoint/platform/GlProgram;)V` | use, reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.Meshes`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `draw(Lviewpoint/render/SceneData;Lviewpoint/platform/GlProgram;B)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `draw(Lviewpoint/render/SceneData;Lviewpoint/platform/GlProgram;BIZZ)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `draw(Lviewpoint/render/SceneData;Lviewpoint/platform/GlProgram;B[Z)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `prepare(Lviewpoint/render/SceneData;)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.ModelDraws`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `BONE_FLOATS` | reflect | `any` | Red | alpha-0.1.7 |  |
| `COLOUR` | reflect | `any` | Red | alpha-0.1.7 |  |
| `INDICES` | reflect | `any` | Red | alpha-0.1.7 |  |
| `SPHERE` | reflect | `render` | Red | alpha-0.1.7 |  |
| `VALUES` | reflect | `render` | Red | alpha-0.1.7 |  |
| `add(Lzombie/core/skinnedmodel/model/ModelMesh;Lzombie/core/skinnedmodel/model/ModelInstance;Lzombie/core/textures/Texture;Lorg/joml/Matrix4f;IIII)I` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |
| `bones` | reflect | `any` | Red | alpha-0.1.7 |  |
| `bounds(IFFFF)V` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |
| `bounds(ILorg/joml/Matrix4f;Lorg/joml/Vector3f;Lorg/joml/Vector3f;F)V` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |
| `collapse(IFFF)V` | use | `any` | Amber | alpha-0.1.7 |  |
| `count` | reflect | `any` | Red | alpha-0.1.7 |  |
| `count()I` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `cull` | reflect | `any` | Red | alpha-0.1.7 |  |
| `fade(IFF)V` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `flags` | reflect | `render` | Red | alpha-0.1.7 |  |
| `flags(I)I` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `indices(I)V` | reflect | `any` | Red | alpha-0.1.7 |  |
| `instances` | reflect | `any` | Red | alpha-0.1.7 |  |
| `key(I)Ljava/lang/Object;` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `key(ILjava/lang/Object;)V` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `keys` | reflect | `any` | Red | alpha-0.1.7 |  |
| `light(IFFFF)V` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `look(Lviewpoint/render/CharacterTextures$Composited;IF)V` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `look(Lviewpoint/render/CorpseTextures;F)V` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `material` | reflect | `any` | Red | alpha-0.1.7 |  |
| `material(IFFFF)V` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `meshes` | reflect | `any` | Red | alpha-0.1.7 |  |
| `palette` | reflect | `any` | Red | alpha-0.1.7 |  |
| `palette(Ljava/nio/FloatBuffer;I)I` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `palette([FI)I` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `palette([FII)I` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `palette([Lorg/lwjgl/util/vector/Matrix4f;)I` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `palettes` | reflect | `any` | Red | alpha-0.1.7 |  |
| `refused(Lzombie/core/skinnedmodel/model/ModelMesh;)Z` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `reset()V` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `shadowPalette` | reflect | `any` | Red | alpha-0.1.7 |  |
| `stand(IIFFF)V` | use | `any` | Amber | alpha-0.1.7 |  |
| `uv(IFFFF)V` | use | `any` | Amber | alpha-0.1.7 |  |
| `values` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.ModelMeshes`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `source(Lzombie/core/skinnedmodel/model/ModelMesh;)Lviewpoint/render/ModelMeshes$Source;` | hook, reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.ModelPass`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `begin()V` | hook | `any` | Red | alpha-0.1.7 |  |
| `endFrame()V` | hook | `any` | Red | alpha-0.1.7 |  |
| `gbuffer(Lviewpoint/render/FrameContext;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `glass(Lviewpoint/render/FrameContext;Lviewpoint/render/ShadowPass;Lviewpoint/render/GlassWaterPass;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `iris(Lviewpoint/platform/GlProgram;Lorg/joml/Matrix4f;FZ)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `prepare(Lviewpoint/render/SceneData;JFFFF)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `shown(Lviewpoint/render/ModelDraws;I)Z` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.render.MousePick`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `aim` | use, reflect | `main` | use Amber, reflect Red | alpha-0.1.7 |  |
| `aimHit` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `ask` | use, reflect | `main` | use Amber, reflect Red | alpha-0.1.7 |  |
| `hit` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `read(Lviewpoint/render/FrameContext;ILorg/joml/Matrix4f;)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.MousePick$Ask`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `screenHeight()I` | use | `any` | Amber | alpha-0.1.7 |  |
| `screenWidth()I` | use | `any` | Amber | alpha-0.1.7 |  |
| `x` | reflect | `any` | Red | alpha-0.1.7 |  |
| `x()I` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `y` | reflect | `any` | Red | alpha-0.1.7 |  |
| `y()I` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.render.MousePick$Hit`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `<init>(Lviewpoint/render/MousePick$Ask;DDDFFFLviewpoint/render/MousePick$Moved;)V` | use | `any` | Amber | alpha-0.1.7 |  |
| `ask` | reflect | `main` | Red | alpha-0.1.7 |  |
| `ask()Lviewpoint/render/MousePick$Ask;` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `dirUp` | reflect | `any` | Red | alpha-0.1.7 |  |
| `dirUp()F` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `dirX` | reflect | `any` | Red | alpha-0.1.7 |  |
| `dirX()F` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `dirY` | reflect | `any` | Red | alpha-0.1.7 |  |
| `dirY()F` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `preview` | reflect | `any` | Red | alpha-0.1.7 |  |
| `preview()Lviewpoint/render/MousePick$Moved;` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `x` | reflect | `any` | Red | alpha-0.1.7 |  |
| `x()D` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `y` | reflect | `any` | Red | alpha-0.1.7 |  |
| `y()D` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `z` | reflect | `any` | Red | alpha-0.1.7 |  |
| `z()D` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.render.MousePick$Moved`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `<init>(FFFF)V` | use | `any` | Amber | alpha-0.1.7 |  |
| `NONE` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `slideEast` | reflect | `any` | Red | alpha-0.1.7 |  |
| `slideEast()F` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `slideSouth` | reflect | `any` | Red | alpha-0.1.7 |  |
| `slideSouth()F` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `squaresEast` | reflect | `any` | Red | alpha-0.1.7 |  |
| `squaresEast()F` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `squaresSouth` | reflect | `any` | Red | alpha-0.1.7 |  |
| `squaresSouth()F` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.render.PackArt`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `free(Lviewpoint/render/PackModel;)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `put(Lviewpoint/render/PackModel;Lviewpoint/render/PackData;J)Z` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.PackData`

Public class. Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `<init>([F[ILjava/lang/String;IIII[[B)V` | use | `any` | Amber | alpha-0.1.7 |  |
| `artHeight()I` | use | `any` | Amber | alpha-0.1.7 |  |
| `artWidth()I` | use | `any` | Amber | alpha-0.1.7 |  |
| `bytes()J` | use, hook | `any` | Amber | alpha-0.1.7 |  |
| `height()I` | use | `any` | Amber | alpha-0.1.7 |  |
| `indices()[I` | use | `any` | Amber | alpha-0.1.7 |  |
| `levels()[[B` | use | `any` | Amber | alpha-0.1.7 |  |
| `vertices()[F` | use | `any` | Amber | alpha-0.1.7 |  |
| `width()I` | use | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.render.PackDraws`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `draw(Lviewpoint/render/SceneData;Lviewpoint/platform/GlProgram;BIZ)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `drawTarget(Lviewpoint/render/SceneData;Lviewpoint/platform/GlProgram;IJ)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.PackDraws$Bucket`

Class that is not public (hook only). Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `add(Lviewpoint/render/PackModel;II)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.render.PackModel`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `bounds()[F` | use | `any` | Amber | alpha-0.1.7 |  |
| `obj` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `read(Lviewpoint/render/PackData;)V` | use, hook | `any` | Amber | alpha-0.1.7 |  |
| `state` | reflect | `any` | Red | alpha-0.1.7 |  |
| `state()I` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `state(I)V` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.render.PackModels`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `of(Ljava/io/File;)Lviewpoint/render/PackModel;` | use | `any` | Amber | alpha-0.1.7 |  |
| `publish()V` | use | `any` | Amber | alpha-0.1.7 |  |
| `upload(J)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.PackStages`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `draw(Lviewpoint/platform/PackPass;Lviewpoint/render/FrameContext;ILviewpoint/platform/PackPass$Stage;I)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `uniforms(Lviewpoint/platform/GlProgram;Lviewpoint/render/FrameContext;II)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.Panini`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `centreScale()F` | reflect | `any` | Red | alpha-0.1.7 |  |
| `d` | reflect | `any` | Red | alpha-0.1.7 |  |
| `halfX` | reflect | `any` | Red | alpha-0.1.7 |  |
| `halfY` | reflect | `any` | Red | alpha-0.1.7 |  |
| `of(FFF)Lviewpoint/render/Panini;` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `of(Lorg/joml/Matrix4f;F)Lviewpoint/render/Panini;` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `ofView(FFF)Lviewpoint/render/Panini;` | reflect | `any` | Red | alpha-0.1.7 |  |
| `on()Z` | use | `any` | Amber | alpha-0.1.7 |  |
| `strength()F` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `tanX` | reflect | `any` | Red | alpha-0.1.7 |  |
| `tanY` | reflect | `any` | Red | alpha-0.1.7 |  |
| `toFrame(FF[F)V` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `toScreen(FF[F)V` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.render.SceneData`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `flames` | use | `any` | Amber | alpha-0.1.7 |  |
| `fogB` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `fogEnd` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `fogG` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `fogR` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `fogStart` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `lightCount` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `lightKeys` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `lightning` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `lights` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `meshCount` | use | `any` | Amber | alpha-0.1.7 |  |
| `meshOffsets` | use | `any` | Amber | alpha-0.1.7 |  |
| `meshes` | use | `any` | Amber | alpha-0.1.7 |  |
| `mist` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `models` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `night` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `originX` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `originY` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `originZ` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `overcast` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `panini` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `projection` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `relief` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `relief(Lviewpoint/render/FarRelief$Lift;)V` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `skyB` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `skyG` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `skyR` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `skySunY` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `spots` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `sunB` | use | `any` | Amber | alpha-0.1.7 |  |
| `sunG` | use | `any` | Amber | alpha-0.1.7 |  |
| `sunR` | use | `any` | Amber | alpha-0.1.7 |  |
| `sunStrength` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `sunX` | use | `any` | Amber | alpha-0.1.7 |  |
| `sunY` | use | `any` | Amber | alpha-0.1.7 |  |
| `sunZ` | use | `any` | Amber | alpha-0.1.7 |  |
| `targetMesh` | reflect | `any` | Red | alpha-0.1.7 |  |
| `targetOwner` | reflect | `any` | Red | alpha-0.1.7 |  |
| `targetSquare` | reflect | `any` | Red | alpha-0.1.7 |  |
| `time` | use | `any` | Amber | alpha-0.1.7 |  |
| `torches` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `viewerX` | use | `any` | Amber | alpha-0.1.7 |  |
| `viewerY` | use | `any` | Amber | alpha-0.1.7 |  |
| `viewerZ` | use | `any` | Amber | alpha-0.1.7 |  |
| `windX` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `windZ` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `zenithB` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `zenithG` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `zenithR` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.render.ShadowPass`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `draw(Lviewpoint/render/FrameContext;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `drawCascades(Lviewpoint/render/SceneData;I)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.SpotDraws`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `flashOn` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `lampCount` | use | `any` | Amber | alpha-0.1.7 |  |
| `lamps` | use | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.render.SurfacePass`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `gbuffer(Lviewpoint/render/FrameContext;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `light(Lviewpoint/render/FrameContext;)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.TargetOutline`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `BLUE` | reflect | `any` | Red | alpha-0.1.7 |  |
| `GREEN` | reflect | `any` | Red | alpha-0.1.7 |  |
| `RED` | reflect | `any` | Red | alpha-0.1.7 |  |
| `composite(Lviewpoint/render/FrameContext;)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.Targets`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `albedo` | reflect | `any` | Red | alpha-0.1.7 |  |
| `depth` | reflect | `any` | Red | alpha-0.1.7 |  |
| `gbufferFbo` | reflect | `any` | Red | alpha-0.1.7 |  |
| `height` | reflect | `any` | Red | alpha-0.1.7 |  |
| `normal` | reflect | `any` | Red | alpha-0.1.7 |  |
| `velocity` | reflect | `any` | Red | alpha-0.1.7 |  |
| `velocity(Z)V` | reflect | `any` | Red | alpha-0.1.7 |  |
| `width` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.TemporalPass`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `begin(Lviewpoint/render/FrameContext;)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `historyIndex` | reflect | `any` | Red | alpha-0.1.7 |  |
| `historyValid` | reflect | `any` | Red | alpha-0.1.7 |  |
| `lastFrameNanos` | reflect | `any` | Red | alpha-0.1.7 |  |
| `previousOriginX` | reflect | `any` | Red | alpha-0.1.7 |  |
| `previousOriginY` | reflect | `any` | Red | alpha-0.1.7 |  |
| `previousOriginZ` | reflect | `any` | Red | alpha-0.1.7 |  |
| `previousViewProjection` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.UpscalePass`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `release()V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.VehiclePass`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `material(Lviewpoint/platform/GlProgram;Lviewpoint/render/ModelDraws;I)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.WeatherPass`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `overlay(Lviewpoint/render/FrameContext;)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.render.WorldRenderer`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `begin(Lviewpoint/render/SceneData;JFLorg/joml/Matrix4f;FFF)Z` | hook | `any` | Red | alpha-0.1.7 |  |
| `bindTarget()V` | use, reflect | `any` | Red | alpha-0.1.7 |  |
| `drawOutlines()V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `drawTranslucent(Lviewpoint/render/SceneData;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `drawWeather(Lviewpoint/render/SceneData;FFF)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `end` | reflect | `any` | Red | alpha-0.1.7 |  |
| `finish(Lviewpoint/render/SceneData;)V` | hook | `any` | Red | alpha-0.1.7 |  |
| `floors` | reflect | `any` | Red | alpha-0.1.7 |  |
| `frame` | reflect | `any` | Red | alpha-0.1.7 |  |
| `freeCamera` | use | `any` | Amber | alpha-0.1.7 |  |
| `handFromPlayer` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `handView` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `irisDrawn` | reflect | `any` | Red | alpha-0.1.7 |  |
| `isolate` | reflect | `any` | Red | alpha-0.1.7 |  |
| `models` | reflect | `any` | Red | alpha-0.1.7 |  |
| `off(I)Z` | hook | `any` | Amber | alpha-0.1.7 |  |
| `targets` | reflect | `any` | Red | alpha-0.1.7 |  |
| `targets()Lviewpoint/render/Targets;` | reflect | `any` | Red | alpha-0.1.7 |  |
| `temporal` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.visibility.Edges`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `ownerKind(Lzombie/iso/sprite/IsoSprite;)I` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.visibility.Owner`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `of(II)I` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `square(I)I` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.visibility.Rooms`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `hides(FFFFII)Z` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.world.ChunkCache`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `clear()V` | use, hook | `any` | Amber | alpha-0.1.7 |  |
| `entries` | reflect | `any` | Red | alpha-0.1.7 |  |
| `mark(Lviewpoint/world/ChunkCache$Level;I)V` | reflect | `any` | Red | alpha-0.1.7 |  |
| `markAll(I)V` | reflect | `any` | Red | alpha-0.1.7 |  |
| `meshOn(Lzombie/iso/IsoGridSquare;)Lviewpoint/render/ChunkMeshData;` | reflect | `any` | Red | alpha-0.1.7 |  |
| `packsOn(Lzombie/iso/IsoGridSquare;)Z` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `update(Lviewpoint/core/Frame;Lzombie/iso/IsoCell;IZ)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.world.Facades`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `kindOf(Lzombie/iso/sprite/IsoSprite;)I` | use, hook | `any` | Amber | alpha-0.1.7 |  |
| `ownArtOutside(Lzombie/iso/sprite/IsoSprite;)Z` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `roomTile(Lzombie/iso/RoomDef;Lzombie/iso/areas/IsoRoom;ZIIZ)Lzombie/iso/sprite/IsoSprite;` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.world.Flames`

Public class. Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `snapshot(Lviewpoint/core/Frame;Lzombie/iso/IsoCell;)V` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.world.FloorGather`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `isFloor(Lzombie/iso/IsoObject;)Z` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.world.MapRoofs`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `vanilla(Lzombie/iso/sprite/IsoSprite;)Z` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.world.PackGather`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `begin(Lviewpoint/world/Recipe;Z)V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `end()V` | hook | `any` | Amber | alpha-0.1.7 |  |
| `object(Lzombie/iso/IsoObject;Lzombie/iso/sprite/IsoSprite;FFFI)Z` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `place(Lviewpoint/packs/PackBind;Lzombie/iso/sprite/IsoSprite;FFFII)Lviewpoint/world/Recipe$Op;` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.world.Recipe`

Public class. Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `model(Lviewpoint/world/Recipe;Lviewpoint/packs/PackBind;ZFFFIIII)Lviewpoint/world/Recipe$Op;` | use, hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.world.Recipe$Batch`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `ops` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.world.Recipe$Op`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `dx` | reflect | `any` | Red | alpha-0.1.7 |  |
| `dy` | reflect | `any` | Red | alpha-0.1.7 |  |
| `flags` | reflect | `any` | Red | alpha-0.1.7 |  |
| `height` | reflect | `any` | Red | alpha-0.1.7 |  |
| `kind` | reflect | `any` | Red | alpha-0.1.7 |  |
| `owner` | reflect | `any` | Red | alpha-0.1.7 |  |
| `raw` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.world.RoofCook`

Class that is not public (hook only). Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `vertices(Lviewpoint/world/RoofSurface;Lviewpoint/world/RoofWindow;Lviewpoint/world/Recipe$Op;)[F` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.world.RoofGables`

Class that is not public (hook only). Level: Amber.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `vertices(Lviewpoint/world/RoofSurface;Lviewpoint/world/RoofWindow;Lviewpoint/world/Recipe$Op;)[F` | hook | `any` | Amber | alpha-0.1.7 |  |

#### `viewpoint.world.RoofGather`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `emitGables(IFFF[Lzombie/core/textures/Texture;I[Z)V` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.world.RoofLevels`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `piece(Ljava/lang/String;)Lviewpoint/world/RoofPiece;` | reflect | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.world.TileMesh`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `bounds` | use | `any` | Amber | alpha-0.1.7 |  |
| `data` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `vertCount` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.world.TileMeshes`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `create(Lzombie/iso/sprite/IsoSprite;Lzombie/core/textures/Texture;Lzombie/iso/sprite/IsoSprite;)Lviewpoint/world/TileMesh;` | hook | `any` | Amber | alpha-0.1.7 |  |
| `get(Lzombie/iso/sprite/IsoSprite;Lzombie/core/textures/Texture;Lzombie/iso/sprite/IsoSprite;)Lviewpoint/world/TileMesh;` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |
| `isPlant(Lzombie/iso/sprite/IsoSprite;)Z` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |
| `peek(Lzombie/iso/sprite/IsoSprite;Lzombie/core/textures/Texture;Lzombie/iso/sprite/IsoSprite;)Lviewpoint/world/TileMesh;` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |
| `plantCard(Lzombie/core/textures/Texture;)[F` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

#### `viewpoint.world.WallMesher`

Class that is not public (hook only). Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `back(Lviewpoint/world/HiddenFaces$Face;Lzombie/iso/IsoObject;Lviewpoint/world/TileMesh;Lzombie/core/textures/Texture;FFFFF[Z)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `wall(Lzombie/iso/IsoObject;Lzombie/iso/sprite/IsoSprite;Lviewpoint/world/TileMesh;Lzombie/core/textures/Texture;Lzombie/iso/IsoGridSquare;FFFZ[Z)Z` | hook | `any` | Red | alpha-0.1.7 |  |

#### `viewpoint.world.WorldMesher`

Public class. Level: Red.

| Member | Use or hook | Thread | Level | Since | Replacement |
| --- | --- | --- | --- | --- | --- |
| `batch(Lzombie/core/textures/TextureID;)Lviewpoint/world/Recipe$Batch;` | reflect | `any` | Red | alpha-0.1.7 |  |
| `drawnElsewhere(Lzombie/iso/IsoGridSquare;Lzombie/iso/IsoObject;Lzombie/iso/sprite/IsoSprite;FFFZZ[Z)Z` | hook | `any` | Amber | alpha-0.1.7 |  |
| `emit(Lviewpoint/world/Recipe$Batch;Lviewpoint/world/TileMesh;Lzombie/core/textures/Texture;FFF)V` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `emit(Lviewpoint/world/Recipe$Batch;Lviewpoint/world/TileMesh;Lzombie/core/textures/Texture;FFFI)V` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `emitFace(Lviewpoint/world/Recipe$Batch;Lviewpoint/world/TileMesh;Lzombie/core/textures/Texture;FFFFFIF)V` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `emitFace(Lviewpoint/world/Recipe$Batch;Lviewpoint/world/TileMesh;Lzombie/core/textures/Texture;FFFFFIFI)V` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `gather(Lzombie/iso/IsoChunk;IIZZZ)Lviewpoint/world/Recipe;` | hook | `any` | Red | alpha-0.1.7 |  |
| `hasModel(Lzombie/inventory/InventoryItem;)Z` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |
| `hasModel(Lzombie/iso/IsoObject;)Z` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |
| `lift` | reflect | `any` | Red | alpha-0.1.7 |  |
| `op(Lviewpoint/world/Recipe$Batch;ILviewpoint/world/TileMesh;Lzombie/core/textures/Texture;FFF)Lviewpoint/world/Recipe$Op;` | hook, reflect | `any` | hook Amber, reflect Red | alpha-0.1.7 |  |
| `owner` | reflect | `any` | Red | alpha-0.1.7 |  |
| `pending` | reflect | `any` | Red | alpha-0.1.7 |  |
| `pixelScale(Lzombie/core/textures/Texture;)F` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |
| `recipe` | reflect | `main` | Red | alpha-0.1.7 |  |
| `rise(Lzombie/iso/IsoObject;)F` | use, hook, reflect | `any` | use Amber, hook Amber, reflect Red | alpha-0.1.7 |  |
| `square` | reflect | `any` | Red | alpha-0.1.7 |  |
| `square(Lzombie/iso/IsoGridSquare;FFF[ZZ)V` | hook, reflect | `any` | Red | alpha-0.1.7 |  |
| `textureMapping(Lzombie/core/textures/Texture;)[F` | use, reflect | `any` | use Amber, reflect Red | alpha-0.1.7 |  |

## How to ask for a member

If you need a member that is not on the list, ask for it on the Viewpoint issue tracker. Say why `viewpoint.api` does
not have what you need. The maintainers add members on request, and they review each new member.

---

Previous: [Permissions](https://project-viewpoint.github.io/viewpoint-docs/reference/permissions.md) | Next: [Internals changes](https://project-viewpoint.github.io/viewpoint-docs/reference/internals-changes.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
