# Downloads

> AddonDownloads gets a file from the internet. The player accepts each download.

Use `AddonDownloads` to get a file from the internet. Do not open network connections yourself: `java.net` makes the
label **Red**. Viewpoint asks the player **each time**, and shows the full address.

**Permission:** `downloads`, with the hosts in `downloads.hosts`. The file goes into your [`AddonFiles`](https://docs.projectviewpoint.org/api/files.md)
folder, so you also need the `files` permission.

```properties
permissions=files,downloads
files.quotaMiB=16
downloads.hosts=github.com,objects.githubusercontent.com
```

## Ask for a download

```java title="DownloadPart.java"
DownloadRequest request = DownloadRequest.get("https://github.com/example/lean/releases/download/v1/extra.dat", "extra.dat")
        .declaredBytes(120_000);

ctx.downloads().request(request)
        .then(result -> System.out.println("[Sample] " + result.status() + " from " + result.finalHost()))
        .otherwise(error -> System.out.println("[Sample] " + error.getMessage()));
```

A test compiles this code against the API and runs it in an addon.

- Use an `https` URL with a host name: no user name, no port, no address of numbers, no hidden character. Viewpoint
  refuses the others with an `IllegalArgumentException` at the call.
- Use a host that is in `downloads.hosts`. If the server redirects to a different host, put that host in the list also.
  Viewpoint follows at most three redirects, and judges each one as it judges the first address.
- Give the file a name with the same rules as [`AddonFiles`](https://docs.projectviewpoint.org/api/files.md#names).
- Set `declaredBytes` to the size of the file. The player sees it.

`request(DownloadRequest)` gives a `Pending<DownloadResult>`. Its callbacks run on the main thread. A refusal is not an
error. It is a result with a `status`.

| `DownloadResult` member | Meaning |
| --- | --- |
| `status()` | One of the values below. |
| `name()` | The name of the file in your folder. |
| `bytes()` | The size that Viewpoint wrote. |
| `finalHost()` | The host that sent the file, after the redirects. Empty if no host answered. |
| `reason()` | Why the download did not end in `OK`, in one sentence. Empty for `OK`. |

| `status()` | Meaning |
| --- | --- |
| `OK` | The file is in your folder. |
| `DENIED` | The player did not accept the download. |
| `DENIED_SESSION` | The player did not accept too many times. The addon cannot ask again in this session. |
| `NOT_SHOWN` | Viewpoint could not show the prompt. |
| `TOO_LARGE` | The file is larger than the limit. |
| `FAILED` | The download did not complete. |

## What the player sees

Each call shows a dialog. The dialog shows:

- the name and the label of the addon;
- the **full URL**, with emphasis on the host;
- the destination: `viewpoint-addons/<id>/<name>`;
- the size, if you set `declaredBytes`.

The player clicks **Deny** or **Accept**. Esc is a Deny. Deny works at once. Accept is grey for the first half second
after the player first sees the question, and takes a click only after the pointer has rested on it for a moment. If
several addons ask, the window says "Question 2 of 3", and each question starts again. The address is shown in full, with
the host in colour; a long address scrolls.

If the player does not answer in 60 seconds, the result is `DENIED`. That includes a question that the game could not show
yet (the setup or a crash report was on the screen).

The player answers with the **mouse**. A player with only a controller cannot accept a download in this version: the
question denies itself after 60 seconds, and your addon gets `DENIED`.

Ask only when the player needs the file. If your addon asks too frequently, Viewpoint shows fewer prompts:

- One question of your addon waits at a time, and three in all. Another call gets `NOT_SHOWN`.
- After a denial, or after a question that nobody answered, a call in the next 30 seconds gets `DENIED` at once.
- After the player denies three questions, your addon gets `DENIED_SESSION` until the game starts again. A question that nobody
  answered is not one of the three.
- The player answers with the mouse. If the game cannot show the question, you get `NOT_SHOWN` at once.

## Limits

| Limit | Value |
| --- | --- |
| One file | 256 MiB, and it must also fit in your files quota. |
| The quota | Viewpoint holds it for the file as the size is known: at once for a size you declare or the server says, else as the bytes come. If the quota ends, the status is `TOO_LARGE`. Declare `declaredBytes`. |
| At a time | At most 3 accepted downloads at a time: the one that runs and the ones that wait for it. The next gets `FAILED`. |
| One download | 10 minutes in all once it starts, whatever the speed of the server. The time that it waits for the one before is not counted. |
| Redirects | 3 |
| Request | A plain `GET`. You cannot set headers, a body, a method or cookies. |

## Errors

| You see | Cause | Fix |
| --- | --- | --- |
| `SecurityException` | The descriptor does not have the `downloads` permission. | Add `downloads` to `permissions`, and the hosts to `downloads.hosts`. |
| `IllegalArgumentException` | The address, its host or the name is not accepted. | Use an `https` URL on a host from `downloads.hosts`, and a name by the rules of `AddonFiles`. |
| `IllegalStateException` | You called from a thread that is not the main thread. | Call `AddonDownloads` on the main thread. |
| `FAILED` | The download stopped, the host has no public address, or it took too long. `reason()` says. | Read `reason()` and `console.txt`. |
| `FAILED` after a redirect | The server redirects to a host that is not in `downloads.hosts`. | Add that host to `downloads.hosts`. The player must then give consent again. |
| `TOO_LARGE` | The file is larger than the limit or your quota. | Use a smaller file, or ask for a larger `files.quotaMiB`. |

The addon's **Files** tab shows each download: the file, the address, and the time.

## What Viewpoint does not promise

- Viewpoint connects only to public addresses: not to the player's own computer or network. It looks up the host before it
  connects, and the connection looks it up again. The Java cache of names keeps the answer between the two for 30 seconds. If
  the player's Java runs with that cache off, a server that answers a different address the second time can still reach a
  private address. The protection that remains is that the player sees every host.
- The player reads the address. Two host names that look alike in the font (`rn` and `m`) are for the player to tell apart.
- A network that only has IPv6, and translates the names of IPv4 hosts (NAT64), cannot download: Viewpoint cannot tell
  which address such a name leads to. The status is `FAILED`, and the reason says so. Few player computers are on such a
  network.
- Viewpoint does not check what the file is. It keeps the file under the rules of `AddonFiles`, and never loads code from it.

---

Previous: [Files](https://docs.projectviewpoint.org/api/files.md) | Next: [Assets](https://docs.projectviewpoint.org/api/assets.md) | All pages: [llms.txt](https://docs.projectviewpoint.org/llms.txt)
