# Lua exports

> An addon gives some of its Java functions to Lua, with names, types and a time limit.

An addon can give some functions of its Java to Lua. The Lua of **any** mod can call them. You mark a function with
`@LuaExport`. The card of the addon lists the functions, and says what they can reach.

**Permission:** `lua`. Without it, the addon does not start.

```properties title="addon.properties"
permissions=lua
lua.globals=Fireworks
```

## Mark a function

Put `@LuaExport` on a public static method. Or put it on a class: then all the public static methods that the class
declares are exports.

```java title="Fireworks.java"
@LuaExport
public final class Fireworks {
    private Fireworks() {}

    public static int launch(String color, int count) {
        // ...
        return count;
    }

    @LuaExport(name = "stop")
    public static void cancelAll() {
        // ...
    }
}
```

`name` is the name that Lua uses: for a method, in place of its Java name; for a class, in place of its simple name.
Lua has no overloads. If two methods have the same Lua name, Viewpoint refuses both.

A mod that you port from ZombieBuddy can keep its `@Exposer.LuaClass` classes: Viewpoint reads them as exports of
their public static methods. See [Migrating from ZombieBuddy](https://project-viewpoint.github.io/viewpoint-docs/patching/migrating-from-zombiebuddy.md).

A method that is not public and static is not an export. The instance methods of a class are never exports.

## The names

Lua finds each export as `Viewpoint.Addons["<id>"].<Class>.<method>`:

```lua
local n = Viewpoint.Addons["example.fireworks"].Fireworks.launch("red", 3)
```

If `lua.globals` lists the name of a class, Lua also finds the class under that global name:

```lua
local n = Fireworks.launch("red", 3)
```

Viewpoint **refuses a global**, and writes the reason in `console.txt`, in these cases:

- the global already exists when your addon starts;
- another mod sets the global at the top level of its Lua. A statement in an `if` or `do` of a file counts, because it
  runs when the file loads. A `local` does not. `X = ...`, `X.y = ...`, `function X()`, `_G.X = ...` and
  `_G["X"] = ...` all set `X`.
- Viewpoint could not read the Lua of another mod completely.

A name in `lua.globals` that no exported class has is written in `console.txt` too, and the addon starts.

A refused global does not stop the addon. The name `Viewpoint.Addons["<id>"]` always works. Write your Lua with that name
if you must not depend on a global.

> **Caution**
>
> Viewpoint cannot see a name that another mod makes with `_G[expression]`, `rawset`, `setfenv` or `loadstring`.

## The types

A function can take and give only these types. Any other type refuses the function. The other functions of the addon
stay.

| Type | In Lua |
| --- | --- |
| `boolean`, `Boolean` | A boolean. |
| `byte`, `short`, `int`, `long` (and their boxes) | A whole number in the range of the type. `long` goes up to 2^53: Lua numbers are `double`. A `long` result past 2^53 is an error in the Lua that called, not a rounded number. |
| `float`, `double` (and their boxes) | A number. A `float` result is the number that it prints as (`0.1f` is `0.1`). |
| `char`, `Character` | A string of one character. |
| `String` | A string. A string passes as it is. It can hold a NUL byte, `..` or anything else. |
| `LuaTable` | A table. See [Tables](#tables). |
| `LuaHandle` | A number. See [Handles](#handles). |
| A game class of the list below | An object of the game, as it is. |
| `void` | Nothing. Only as a result. |

A `nil` of Lua gives `null` for a box, a `String`, a `LuaTable`, a `LuaHandle` or a game class. For a primitive type it is
an error.

The game classes that a function can pass are: `IsoPlayer`, `IsoZombie`, `IsoGameCharacter`, `IsoGridSquare`,
`IsoObject`, `InventoryItem`, `HandWeapon` and `BaseVehicle`. The list can grow. Ask for a class that you need.

A function cannot use `Object`, an array, a list, a map, a stream, a reader, a writer or a class of your own. A varargs
function (`String...`) is an array, so it is refused.

### Tables

`LuaTable` is a wrapper. It is not the table of the game. It reads and writes these values: `Boolean`, `Double` (every Lua
number), `String` and `LuaTable`. A key is a string or a whole number. A Lua value of another type (a function, an object
of the game) reads as `null`. A value of another type that you set is an error.

```java
public static LuaTable summary(LuaTable input) {
    LuaTable out = input.newTable();
    out.set("count", input.length());
    out.set("name", "summary");

    return out;
}
```

A `LuaTable` is good only while the call runs. Do not keep it.

### Handles

Lua cannot hold an object of your addon. Give it a handle instead. `ctx.handle(object)` makes a `LuaHandle`. Lua sees a
number. When Lua gives the number back to a function that takes a `LuaHandle`, Viewpoint finds the object again.

```java
public static LuaHandle open(String name) {
    return context.handle(new Session(name));
}

public static void close(LuaHandle session) {
    session.release();
}
```

- A number is chosen at random from the whole numbers that Lua holds exactly, so Lua cannot find a handle by counting. A
  number is not used for two handles in the life of the game, and the number of a handle of an earlier start of your addon
  names nothing in the next. The Lua of all the mods is one trust domain: a number that a mod has can be given to any
  function of your addon that takes a handle, so do not use a handle as a secret.
- `ctx.handle`, `release()` and the methods of a `LuaTable` work on the main thread of the game only. From another thread
  they throw an `IllegalStateException`.
- An addon can have 4096 handles at one time. More is an error. Call `release()` for the ones that you do not need.
- A handle that you released, a handle of another addon, and a number that no handle has are errors in the Lua that uses
  them.
- When the addon goes off, Viewpoint clears all its handles.

## The calls

- Lua calls an export on the main thread only. A call from another thread is an error.
- Viewpoint counts each call and adds its time to `addon.<id>.mainMs`. The Performance tab shows the sum.
- If an export **throws**, Viewpoint suspends the addon and gives a Lua error. Do not let an export throw for a wrong
  argument of the caller: check the arguments, and return a result that tells the caller.
- Treat every argument as if a stranger sent it. Any mod can call your exports. For a path, use [`AddonFiles`](https://project-viewpoint.github.io/viewpoint-docs/api/files.md).
  For an address, use [`AddonDownloads`](https://project-viewpoint.github.io/viewpoint-docs/api/downloads.md). Their rules apply to an argument from Lua too.

## The errors that Lua sees

An error is a Lua error. A Lua author can use `pcall` to catch it. The text names the function and what to change:

| The text | The cause |
| --- | --- |
| `argument 1 of Viewpoint.Addons["x"].C.m must be a whole number, not a string` | The type of an argument is wrong. |
| `... must be a whole number from -128 to 127` | The number is out of range for the type. |
| `... must not be nil` | A `nil` for a primitive type. |
| `... takes 2 arguments, not 1` | The number of arguments is wrong. |
| `... must be a handle number that this addon made and has not released` | The handle is gone, or is not from this addon. |
| `... can only be called on the main thread of the game` | A call from another thread. |
| `... failed: <the exception>. The addon is suspended` | The export threw. |
| `... addon x is suspended because one of its functions failed` | A call after a throw. |
| `... addon x is off` | The addon is off. A function that Lua kept in a variable gives this error too. |

## At the start of the game

A mod runs its top-level Lua while the game loads. The exports must be there before that. So at the first Lua start of the
game, Viewpoint waits for your addon. It checks the addon and starts it, and then it installs the exports. This wait is
**about 5 seconds** for all the addons together. Viewpoint tests the time between the starts of addons, so a slow
`enable` can pass it. An addon that needs the wait:

- holds the `lua` permission, and
- the player has it on, with the consent for its jar.

While it waits, Viewpoint writes "Viewpoint is checking N addons" in `console.txt` and shows it as a notice.

If an addon is not ready after 5 seconds, it starts at the first frame. This is also true when Viewpoint could not
finish finding the packages in time: then every addon with exports is late. Its exports are then there **after** the top-level
Lua of the mods ran. The card of the addon says "Its Lua functions came late at this start." A Lua mod can call your
functions later, from an event.

The game starts its Lua again at some times: when the player joins or leaves a server, changes an option, loads a world
with another set of mods, or returns to the menu. Each time, the Lua is new and empty, and Viewpoint installs the exports
again. This second time there is no wait: the addon is on already.

> **Note**
>
> You do not need to do anything for the second start. Do not keep a Lua function from an earlier start: after a restart
> of the Lua it is not in the new Lua.

## When the addon goes off

Each export becomes a stub. It gives the error "addon x is off". Viewpoint clears the handles. The class loader of the
addon can then unload. Do not keep a `LuaTable` or a `LuaHandle` in a static field of a class that the game keeps.

---

Previous: [Lua mirror](https://project-viewpoint.github.io/viewpoint-docs/api/lua-mirror.md) | Next: [Files](https://project-viewpoint.github.io/viewpoint-docs/api/files.md) | All pages: [llms.txt](https://project-viewpoint.github.io/viewpoint-docs/llms.txt)
