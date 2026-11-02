# Files

> AddonFiles gives an addon one folder, with name rules, a quota, and results on the main thread.

Use `AddonFiles` to keep files. Do not use `java.io.File` or `java.nio.file`: they make the label **Red**.
`AddonFiles` gives your addon one folder with a quota. It gives the results on the main thread.

**Permission:** `files`. Without it, each call gives a `SecurityException` to your code.

```properties
permissions=files
files.quotaMiB=16
```

## The folder

Your folder is `Zomboid/viewpoint-addons/<id>/`. You cannot name a file outside it. Viewpoint never loads code from this
folder.

On the addon's **Files** tab, the player can:

- open the folder;
- see its size and the download log;
- delete it.

## Use it

```java title="FilesPart.java"
AddonFiles files = ctx.files();

files.read("counter.txt")
        .then(bytes -> {
            int n = Integer.parseInt(new String(bytes, StandardCharsets.US_ASCII));
            files.write("counter.txt", Integer.toString(n + 1).getBytes(StandardCharsets.US_ASCII));
        })
        .otherwise(error -> files.write("counter.txt", "1".getBytes(StandardCharsets.US_ASCII)));
```

The first time, the file is not there: the read fails, and `otherwise` writes the first number. A test compiles this code and
runs it against the real `AddonFiles`.

| Method | Result |
| --- | --- |
| `read(name)` | `Pending<byte[]>`. Fails if the file does not exist. |
| `write(name, bytes)` | `Pending<Void>`. Viewpoint copies `bytes` at the call. If the game stops during a write, the old file stays complete. |
| `delete(name)` | `Pending<Void>`. A file that is not there is not an error. |
| `exists(name)` | `Pending<Boolean>`. |
| `list(prefix)` | `Pending<List<String>>`. The names that start with the prefix, in order. A file that the player put in the folder, with a name that is not a valid name, is not in the list. |
| `usage()` | `Pending<AddonFiles.Usage>`. The `bytes` and the `files` in the folder, and the `quotaBytes`. |

### `Pending<T>`

Viewpoint does the disk work on a different thread. `Pending<T>` gives you the result.

| Member | Meaning |
| --- | --- |
| `then(Consumer<T>)` | Runs if the work is successful. Gives the same `Pending`. |
| `otherwise(Consumer<Throwable>)` | Runs if the work fails. Gives the same `Pending`. |
| `isDone()` | `true` when the work is complete. |

The callbacks run on the **main thread**, in a frame after the work is complete. You can chain `then` and `otherwise`. If
the addon goes off before a callback runs, Viewpoint does not run that callback.

## Names

- Use lower-case letters, digits, `-` and `_`.
- Use `/` to put a file in a subfolder. Keep the names short and the subfolders few.
- Use one extension from this list: `png`, `jpg`, `json`, `txt`, `csv`, `properties`, `ogg`, `wav`, `obj`, `mtl`,
  `bin`, `dat`.

If Viewpoint does not accept a name, the call throws `IllegalArgumentException` immediately. You get no `Pending`. Use a
simple lower-case name with an extension from the list.

## Limits

| Limit | Value |
| --- | --- |
| The folder | 64 MiB by default. A larger `files.quotaMiB` needs the player's consent. |
| One file | 16 MiB |
| Files and folders together | 1,000. A folder that a delete leaves empty goes with it. |

If a write goes over a limit, its `Pending` fails with an error. Viewpoint does not delete files to make space.

Viewpoint also limits what waits. At most 256 calls wait for their result, and at most 32 MiB of data is in transfer (a
write that has not finished, or a read that you have not taken). A call over a limit throws `IllegalStateException`; make
the next call in the callback of an earlier one. The errors name your file, never a path on the player's computer.

Call `AddonFiles` and its `Pending` on the main thread. From any other thread a call throws `IllegalStateException`.

A link, a junction or a special file in your folder is not followed. A call that meets one fails. Your addon cannot make
one.

---

Previous: [Lua exports](https://project-viewpoint.github.io/viewpoint-docs/api/lua-exports.md) | Next: [Downloads](https://project-viewpoint.github.io/viewpoint-docs/api/downloads.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
