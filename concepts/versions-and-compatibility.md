# Versions & compatibility

> The versions of the API, what stays the same in 1.x, what occurs when Viewpoint removes an internal member, and what occurs when a build does not agree.

## The API version

`viewpoint-api.jar` contains only `viewpoint.api.**`. It has its own version, with semantic versioning. This version is
not the same as the Viewpoint version.

- **In 1.x,** changes only add. New types and new methods come with a `default` body. An interface that addons
  implement never gets a new abstract method.
- **Deprecated members** stay for two releases. Then they are removed.
- **Use `viewpoint.api` when you can.** You can also use or hook some of Viewpoint's internal members. They are in the
  [Viewpoint internals list](https://docs.projectviewpoint.org/reference/viewpoint-internals.md). Internal members can change in each release, and they
  give your addon an Amber or Red label. Viewpoint does not load a jar that uses an internal member that is not in the
  list.

At run time, Viewpoint uses only its own copy of the API. Viewpoint refuses a jar that contains `viewpoint.api` classes.

## Tell Viewpoint the API version

Set `api=1.0` in the descriptor to the version that you compiled against. Viewpoint accepts the addon if the major
version is the same and its own minor version is the same or higher.

## Ask what is available

`Version.API` is the API version of the installed Viewpoint. To use a feature that comes after 1.0, and also run on
1.0, ask for the feature first:

```java
if (Version.has("view.pose", 2)) {
    // the second generation of the pose is available
}
```

`has(capability, generation)` tells you if a generation of a capability is available. The javadoc of the type that adds
a capability gives its name and generations.

The passes of a Shaderpack have a version also. Ask for it with `Version.has("passes", generation)`.

## Internal members change

The members of Viewpoint on the internals list have no promise of stability. Each release can add, deprecate or remove
members. [Internals changes](https://docs.projectviewpoint.org/reference/internals-changes.md) lists the changes of each release.

| The member is | What occurs |
| --- | --- |
| **Deprecated** | The addon works. The card shows the replacement and the Amber reason **uses deprecated internals**. |
| **Removed** | The addon shows **Needs an update: uses \<member\>, removed in \<release\>; use \<replacement\>**. It does not start. |

A removed member stays in the list as a record, so that the card can tell the author what to use. Test your addon with
each release that your players use.

## The game and Viewpoint

Set `game.min`, `game.max`, `viewpoint.min` and `viewpoint.max` to the builds that you tested. Outside this range the
package is **Incompatible**, and the player cannot switch it on. The card names the limit.

Viewpoint supports one game build. On a different game build, Viewpoint stays off, and all addons stay off with it.
Your ranges do not change this.

## Errors

| You see | Cause | Fix |
| --- | --- | --- |
| **Failed: built for another API** | Your code needs a class or method that this API does not have. Java throws a `LinkageError` during `enable`. | Compile against the API version that you set in `api`. Use `Version.has` before you use a newer feature. |
| **Incompatible** | A range in the descriptor does not agree with this installation. | Read the card. Correct the range, or update the game or Viewpoint. |
| **Needs an update** | The addon uses an internal member that Viewpoint has removed. | Read the card. It names the replacement. |

## Old jars

A jar that you compile for API 1.0 loads in all 1.x versions.

---

Previous: [Lifecycle & threads](https://docs.projectviewpoint.org/concepts/lifecycle-and-threads.md) | Next: [Order](https://docs.projectviewpoint.org/concepts/order.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
