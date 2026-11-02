# Services

> Publish a service for other addons, find the services of other addons, and add to an extension point.

`ctx.services()` lets one addon give a feature to other addons. Use it in place of a hook on the classes of another addon.
Viewpoint refuses a hook on a class of another addon.

No permission is necessary. A new `exports=` package needs the player's consent. See [Consent](#consent-and-levels).

## Publish a service

A service has an id, a type and an implementation. The type is a Java interface.

```java title="CurvesAddon.java"
public final class CurvesAddon implements Addon {
    @Override
    public void enable(AddonContext ctx) {
        ctx.services().publish("example.curves:table", CurveTable.class, new Table());
    }
}
```

`publish` gives a `Registration`. Viewpoint closes it when the addon goes off. The id of a service is the id of your
addon, a colon and a name: `example.curves:table` for the addon `example.curves`. The colon is not in the id of an addon, so
another addon cannot take your name, even an addon whose id starts like yours. The name has at most 100 characters: `a-z`,
`0-9`, `.`, `_` and `-`. An id has one publisher at a time. An addon can publish 64 services.

The type must be one of these:

- an interface of `viewpoint.api`;
- an interface in a package that you name in `exports=` in the descriptor.

```properties title="addon.properties"
exports=com.example.curves.api
```

Put the types that other addons use in one small package. Do not put your own work classes in it.

## Find a service

```java title="LeanAddon.java"
ctx.services().lookup("example.curves:table", CurveTable.class)
        .ifPresent(table -> use(table));
```

`lookup` gives an `Optional`. If the service is not there, or it was published as a different type, the result is empty. It is
not an error. Thus your addon can
work with the other addon or without it.

If you want the other addon to be there, put it in `requires`:

```properties
requires=example.curves@1.0
```

An addon that uses types from the `exports=` package of another addon must have that addon in `requires`. Viewpoint then
lets your code link to those types. Viewpoint does not let your jar hold a class of that package.

## Extension points

An extension point lets many addons add to one feature. The addon that owns the feature reads the contributions. The
other addons give them.

```java
// An addon adds its part
ctx.services().contribute("example.aim.modifiers", AimModifier.class, new MyModifier());

// The owner reads all parts, in the order of the player
for (AimModifier part : ctx.services().contributions("example.aim.modifiers", AimModifier.class)) {
    angle = part.apply(angle);
}
```

`contributions` gives the parts in the order of the Active column. The part of the addon nearer the top comes first. See
[Order](https://docs.projectviewpoint.org/concepts/order.md). The id of an extension point is the choice of the addon that owns it. An addon can have 16 parts.

## Consent and levels

- A new `exports=` package or a new `requires` needs the player's consent again.
- An addon that links to another addon takes the highest level of the addons it links to. If a publisher is Red, the
  card of the consumer says **uses code of X (Red)**.
- The card of the consumer also says what each addon that it links to can do, for example **example.curves (downloads,
  files)**. A change of this is shown as a change.
- A cycle of `requires` is refused.
- When the player switches off a publisher, Viewpoint first switches off the addons that require it. The player sees a
  question before this happens.
- When a publisher is suspended, because its code threw, the addons that require it are suspended in the same step. They
  start again together when the player switches the publisher on again.
- A service of a type of `viewpoint.api` needs no `requires`. Such a service does not give the consumer a level: the player
  agreed to the publisher on its own.

> **Caution**
>
> A service is code of another author that runs in your addon's calls. Treat what it gives as untrusted.

## What you get

`lookup` and `contributions` do not give you the object of the other addon. They give an object of the same interface that
calls it for you. You can keep it. These rules apply to it:

- It works only while the registration is open. After the other addon is off, each call throws an `IllegalStateException`
  with the text "no longer there". Do not use it after that. Look up the service again when the other addon is back.
- You can call it only on the main thread. A call from another thread throws an `IllegalStateException`.
- The time of a call is the time of the addon that gave the service, not yours.
- If the code of the service throws an exception that its interface declares, you get that exception. If it throws an
  `IllegalArgumentException`, a `NullPointerException` or an `IllegalStateException`, you get the same kind of exception with the
  text. This is how a service says no to a bad argument, and it is not a fault of the addon that gave it.
- Any other exception is a strike for the addon that gave the service. Your call gets an `IllegalStateException` with the
  text of the error and no cause. At the third strike of a session, Viewpoint suspends that addon.

## Threads

Publish, look up and contribute on the main thread. A call from another thread gets an `IllegalStateException`. Calls to a service run on the thread of the caller. Viewpoint does
not move a call to another thread.

---

Previous: [Assets](https://docs.projectviewpoint.org/api/assets.md) | Next: [Camera layers](https://docs.projectviewpoint.org/api/camera-layers.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
