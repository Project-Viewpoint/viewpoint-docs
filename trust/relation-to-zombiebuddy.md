# ZombieBuddy policy & signatures

> How the ZombieBuddy policy and an optional .zbs signature affect an addon.

ZombieBuddy loads Viewpoint and each mod that has `javaJarFile`. Viewpoint loads addons. Viewpoint obeys two ZombieBuddy
settings: the policy, and the signatures. No other ZombieBuddy approval applies to addons.

## The ZombieBuddy policy

ZombieBuddy has a policy for jars that the player has not approved: `prompt`, `deny-new` or `allow-all`. Viewpoint reads
it one time, when the game starts.

| Policy | Addons with Java |
| --- | --- |
| `deny-new`, a policy that Viewpoint does not know, or a policy that Viewpoint cannot read | **Cannot start.** The card gives the cause. Resource packs continue to work. |
| `allow-all` or `prompt` | Viewpoint's consent controls the start. |

Only these two policies hand the decision to the player. A newer, stricter ZombieBuddy policy stops the addons until
Viewpoint knows it. Viewpoint is never more permissive than ZombieBuddy.

With `allow-all`, ZombieBuddy ignores the setting for unsigned mods and the `.zbs` file. Viewpoint does not: it still
applies the rules below to each addon, and a `.zbs` that is not correct still stops it.

## An optional signature

You can put a `.zbs` file next to the jar, with the name of the jar: `lean.jar.zbs`. Viewpoint checks it with the
ZombieBuddy signature check.

| The `.zbs` file | Result |
| --- | --- |
| Is correct | The **Trust** tab shows *Signed by X*. |
| Is not correct | The addon **never starts**. |
| Cannot be checked now, for example when the computer is offline | The addon does not start. The card says **its signature could not be checked**. Click **Rescan** to try again. Viewpoint also tries again after a minute. |
| Is missing | The **Trust** tab shows *Unsigned*. If ZombieBuddy refuses unsigned mods, the addon does not start. |

The check reads the Steam profile of the signer, and this can take some seconds. Viewpoint does it in the background. The
card shows **Checking** until it is done, and the game does not wait. For the rest of the session, Viewpoint keeps the
keys it fetched, so the next jar of the same signer needs no new request. For the authors in the ZombieBuddy list,
Viewpoint takes the keys from that list (ZombieBuddy keeps a copy on the disk), so a computer that is offline can still
check their jars. If a signer changes their key, Viewpoint asks Steam once more. If a signer revokes a key, a jar that
was checked with it stays valid until you restart the game. The `.zbs` file must be in the package's folder, and it must
be smaller than 64 KiB.

*X* is the SteamID64 that the `.zbs` file declares, and the file is correct for that SteamID64. Viewpoint does not
compare it with the account that uploaded the mod to the Workshop. A signature tells who signed the file. It does not
tell who uploaded it, and it does not tell what the file does.

## What does not apply

- Viewpoint's label is not a ZombieBuddy approval. A ZombieBuddy approval is not a label.
- The ZombieBuddy approval of a jar does not apply to addons.
- The ZombieBuddy list of authors that the player trusts does not apply to addons. Viewpoint uses only the keys in it, to
  check a signature.

## For addon authors

- Do not set `javaJarFile` for an addon.
- If you have a ZombieBuddy build and an addon build of the same code, give them different mod ids.
- Do not refer to ZombieBuddy from an addon. Viewpoint refuses the jar. This includes `WatchesAPI`.
- Two ZombieBuddy annotations are the exception. Viewpoint reads `@Patch` and `@Exposer.LuaClass` in an addon jar and
  runs them as hooks and as exports. See [Migrating from ZombieBuddy](https://project-viewpoint.github.io/viewpoint-docs/patching/migrating-from-zombiebuddy.md).
- A Shaderpack has no jar. ZombieBuddy has no part in it.

> **Note**
>
> A signature is optional. If you sign, you must sign each new version of the jar. A signature that is not correct stops
> the addon.

---

Previous: [Updates & changelogs](https://project-viewpoint.github.io/viewpoint-docs/trust/updates-and-changelogs.md) | Next: [Assets & budgets](https://project-viewpoint.github.io/viewpoint-docs/performance/assets-and-budgets.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
