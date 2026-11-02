# Model providers

> Choose the model of a world object, or put a model on a bone of a character, from your addon.

A resource pack puts a model on a sprite with a fixed rule. A provider puts a model with code. Use a provider when the
model depends on something that a manifest cannot say.

**Permission:** `models`. The models come from the manifest that your descriptor names with `models=`. See
[Format](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/format.md#models).

```properties
permissions=models
models=models/manifest.txt
```

## ModelProvider: world objects

A `ModelProvider` answers for the sprites that you name. It answers with a `ModelRef`: a model from the manifest of
your addon, placed on the square of the object.

```java
AddonModels models = ctx.models();
ModelRef open = models.model("crate-open", 0, 0, 0, 0, 1);
ModelRef shut = models.model("crate", 0, 0, 0, 0, 1);

models.provide((object, sprite) -> {
    IsoObject crate = (IsoObject) object;

    return crate.getContainer() != null && crate.getContainer().isEmpty() ? open : shut;
}, "furniture_storage_01_5");
```

This provider is not complete. See [When the answer changes](#when-the-answer-changes).

- **Names.** Name the sprites when you register. A name that ends with `*` names all the sprites whose names start with
  the text before it. Viewpoint asks your provider only for the sprites that you name. Every other sprite skips the
  providers.
- **When.** Viewpoint asks when it builds the level of the object, within the ring where it draws the models of the
  packs. It keeps the answer until it builds that level again: when the game changes something on the level, or when
  you call `models.changed(object)`. A change of the items in a container is not one of these changes.
- **Answers.** A `ModelRef` from `models.model(...)`, `ModelRef.NONE` to let the next provider answer, or `ModelRef.ART`
  to show the art of the game.
- **Order.** If several providers name the same sprite, Viewpoint asks them in the order of the player. The first answer
  that is not `ModelRef.NONE` wins. If no provider answers, Viewpoint uses the model of the resource packs. Then it uses
  the art of the game. See [Order](https://project-viewpoint.github.io/viewpoint-docs/concepts/order.md).
- **Make your models once.** Call `models.model(...)` before you answer, for example in `enable`. The answer runs on the
  main thread while a level is built, and must not allocate.
- For a model that depends only on whether the object is lit, or that is the same for all the facings of an object, a
  resource pack of version 2 is easier. See [Model states](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/model-states.md).

> **Caution**
>
> These are faults of the addon, and Viewpoint stops the addon for them: a throw, a `null` answer, a `ModelRef` that
> another addon made or that you made yourself, and a model id that your manifest does not have (when Viewpoint first
> draws it). Then it asks the next provider. For an `AttachmentProvider`, a `ModelRef` from `models.model(...)` is also a
> fault: use `models.attachment(...)`.

## When the answer changes

Viewpoint keeps your answer until it builds the level again. The game does not tell Viewpoint when the items of a container
change, so the crate above keeps its old model. You must tell Viewpoint: call `models.changed(object)` when your answer
changes. To know when it changes, use a [hook](https://project-viewpoint.github.io/viewpoint-docs/patching/managed-patching.md).

```properties
permissions=models,hooks
models=models/manifest.txt
hooks.targets=zombie.inventory.ItemContainer
```

```java title="CrateHooks.java"
public final class CrateHooks {
    private static final String CRATE = "furniture_storage_01_5";
    private static AddonModels models;

    private CrateHooks() {}

    /** Call this in {@code enable} with {@code ctx.models()}. */
    static void start(AddonModels addonModels) {
        models = addonModels;
    }

    @Hook.After(target = "zombie.inventory.ItemContainer", method = "AddItem",
            descriptor = "(Lzombie/inventory/InventoryItem;)Lzombie/inventory/InventoryItem;")
    public static void added(ItemContainer container, InventoryItem item, InventoryItem result) {
        if (container.getItems().size() == 1) {
            changed(container);
        }
    }

    @Hook.After(target = "zombie.inventory.ItemContainer", method = "Remove",
            descriptor = "(Lzombie/inventory/InventoryItem;)V")
    public static void removed(ItemContainer container, InventoryItem item) {
        if (container.isEmpty()) {
            changed(container);
        }
    }

    @Hook.After(target = "zombie.inventory.ItemContainer", method = "DoRemoveItem",
            descriptor = "(Lzombie/inventory/InventoryItem;)V")
    public static void doRemoved(ItemContainer container, InventoryItem item) {
        if (container.isEmpty()) {
            changed(container);
        }
    }

    private static void changed(ItemContainer container) {
        IsoObject crate = container.getParent();

        if (crate != null && crate.getSprite() != null && CRATE.equals(crate.getSprite().getName())) {
            models.changed(crate);
        }
    }
}
```

- **Call `changed` only when the answer changes.** Each call builds the level of the object again. These handlers call it
  only when a crate becomes empty, or stops being empty, and only for the sprite of your provider. The hooks run for
  each container of the game, also for the inventory of the player.
- **What these hooks see.** When the player moves an item, the game calls these three methods. The game has other methods
  that change a container, for example `AddItem(String)` and `removeAllItems()`. To follow them, hook them too. A change
  that you do not hook shows when the game next builds the level.
- **The hooks wait for a safe point.** Until then, nothing calls `changed`. See
  [When hooks install](https://project-viewpoint.github.io/viewpoint-docs/patching/managed-patching.md#when-hooks-install).

## AttachmentProvider: characters

An `AttachmentProvider` puts a model on a bone of a character that Viewpoint draws: a hat, a pack, a lamp on a belt.

```java
AddonModels models = ctx.models();
ModelRef hat = models.attachment("cowboy-hat", "Bip01_Head", 0, 0.1f, 0, 0, 90, 0, 1);

models.attach(character -> ((IsoGameCharacter) character).isZombie() ? hat : ModelRef.NONE);
```

- **The attachment.** `models.attachment(id, bone, x, y, z, turnX, turnY, turnZ, scale)` makes a model of your manifest
  on a bone of the game's skeleton, for example `Bip01_Head`, `Bip01_Spine1` or `Bip01_R_Hand`. The model keeps the axes
  of its OBJ file, put on the axes of the bone. Viewpoint turns it about the x, then the y, then the z axis of the bone
  by the degrees that you give, scales it, then moves it by the offset. The units are those of the resource packs: one
  is the side of a square. On a character that does not have the bone, the model is not drawn.
- **Answers.** A `ModelRef` from `models.attachment(...)`, or `ModelRef.NONE` for no attachment. `ModelRef.ART` is the
  same as `ModelRef.NONE`.
- **When.** Viewpoint asks each provider once for each character that it draws, in each frame. A crowd asks many times
  each frame: keep the answer cheap, and make your attachments before you answer, for example in `enable`.
- **Many on one bone.** Viewpoint draws every answer. Many providers, of your addon or of other addons, can put models
  on the same bone. To put two models on a character, add two providers.
- The model follows the bone in all the poses of the character, also in a crowd far away. On the player's own head in
  first person, it only casts a shadow, as a hat of the game does.
- The model comes from the manifest of your addon. It counts in `memory.packMiB`. See
  [Assets & budgets](https://project-viewpoint.github.io/viewpoint-docs/performance/assets-and-budgets.md).
- An attachment shows all its parts. The `[lit]` and `[!lit]` tags of [Model states](https://project-viewpoint.github.io/viewpoint-docs/resource-packs/model-states.md) are
  for world objects only, and an attachment does not glow.

## Cost

Both types are on a hot path of the game. Viewpoint measures them and shows the time on the **Performance** tab.

- Keep your answers fast. A slow `ModelProvider` makes the levels slower to build. A slow `AttachmentProvider`
  makes each frame slower.
- Each attachment is one more model that Viewpoint draws, with its shadow.
- With no provider, the providers add no cost.

> **Tip**
>
> Use `ModelProvider` only for sprites that need code. Use a resource pack for the others. The pack path has no code, and
> the label stays simple.

---

Previous: [Aim & shots](https://project-viewpoint.github.io/viewpoint-docs/api/aim-and-shots.md) | Next: [Shader values](https://project-viewpoint.github.io/viewpoint-docs/api/shader-values.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
