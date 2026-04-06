# Bytes, Text & Lines

These modules are the first practical dynamic-storage layer in `cnegative`.

They matter because fixed arrays and plain string literals stop being enough once you start building:

- terminal apps
- editors
- parsers
- file transforms
- anything that grows data while it runs

## The short split

- `std.bytes` is for growable raw bytes
- `std.lines` is for growable owned lines of text
- `std.text` is for building text and turning it into a final owned `str`

If you are new, read `std.text` first, then `std.lines`, then come back to `std.bytes` when you start caring about raw byte data.

## `std.bytes`

```cneg
import std.bytes as bytes;
```

`std.bytes.Buffer` is a heap-owned growable byte container.

Current API:

- `bytes.Buffer { data:ptr u8; length:int; capacity:int }`
- `bytes.new() -> result ptr bytes.Buffer`
- `bytes.with_capacity(int) -> result ptr bytes.Buffer`
- `bytes.release(ptr bytes.Buffer) -> result bool`
- `bytes.clear(ptr bytes.Buffer) -> result bool`
- `bytes.length(ptr bytes.Buffer) -> int`
- `bytes.capacity(ptr bytes.Buffer) -> int`
- `bytes.push(ptr bytes.Buffer, u8) -> result bool`
- `bytes.append(ptr bytes.Buffer, slice u8) -> result bool`
- `bytes.get(ptr bytes.Buffer, int) -> result u8`
- `bytes.set(ptr bytes.Buffer, int, u8) -> result bool`
- `bytes.view(ptr bytes.Buffer) -> slice u8`

### What to notice

- `Buffer` itself is a heap-owned runtime object
- release it with `bytes.release(...)`
- `bytes.view(...)` does not copy the data
- `bytes.view(...)` returns a non-owning `slice u8`

### Small example

```cneg
import std.bytes as bytes;

fn:result int run() {
    try buffer = bytes.new();

    let seed:byte[3] = [1, 2, 3];
    if bytes.append(buffer, seed).ok == false {
        bytes.release(buffer);
        return err;
    }

    let view:slice byte = bytes.view(buffer);
    let size:int = view.length;

    bytes.release(buffer);
    return ok size;
}
```

## `std.text`

```cneg
import std.text as text;
```

`std.text.Builder` is a heap-owned growable text builder.

Current API:

- `text.Builder { data:ptr u8; length:int; capacity:int }`
- `text.new() -> result ptr text.Builder`
- `text.with_capacity(int) -> result ptr text.Builder`
- `text.release(ptr text.Builder) -> result bool`
- `text.clear(ptr text.Builder) -> result bool`
- `text.length(ptr text.Builder) -> int`
- `text.capacity(ptr text.Builder) -> int`
- `text.append(ptr text.Builder, str) -> result bool`
- `text.push_byte(ptr text.Builder, u8) -> result bool`
- `text.build(ptr text.Builder) -> result str`
- `text.view(ptr text.Builder) -> slice u8`

### What to notice

- the builder object is released with `text.release(...)`
- the final string from `text.build(...)` is a normal owned runtime string
- so the final string is freed with raw `free`

That split is important:

- `text.release(builder)` releases the builder object
- `free built_string;` releases the built result string

### Small example

```cneg
import std.io as io;
import std.text as text;

fn:result int run() {
    try builder = text.new();

    if text.append(builder, "hello").ok == false {
        text.release(builder);
        return err;
    }
    if text.push_byte(builder, 33).ok == false {
        text.release(builder);
        return err;
    }

    let made:result str = text.build(builder);
    if made.ok == false {
        text.release(builder);
        return err;
    }

    io.write_line(made.value);
    free made.value;
    text.release(builder);
    return ok 0;
}
```

## `std.lines`

```cneg
import std.lines as lines;
```

`std.lines.Buffer` is a heap-owned growable list of lines.

Current API:

- `lines.Buffer { data:ptr str; length:int; capacity:int }`
- `lines.new() -> result ptr lines.Buffer`
- `lines.with_capacity(int) -> result ptr lines.Buffer`
- `lines.release(ptr lines.Buffer) -> result bool`
- `lines.clear(ptr lines.Buffer) -> result bool`
- `lines.length(ptr lines.Buffer) -> int`
- `lines.capacity(ptr lines.Buffer) -> int`
- `lines.get(ptr lines.Buffer, int) -> result str`
- `lines.set(ptr lines.Buffer, int, str) -> result bool`
- `lines.push(ptr lines.Buffer, str) -> result bool`
- `lines.insert(ptr lines.Buffer, int, str) -> result bool`
- `lines.remove(ptr lines.Buffer, int) -> result bool`

### What to notice

- the buffer owns copies of inserted lines
- `lines.release(...)` frees that owned storage
- `lines.get(...)` returns a borrowed `str`
- do not `free` the result of `lines.get(...)`
- that borrowed string stops being valid after `set`, `remove`, `clear`, or `release`

### Small example

```cneg
import std.io as io;
import std.lines as lines;

fn:result int run() {
    try buffer = lines.new();

    if lines.push(buffer, "alpha").ok == false {
        lines.release(buffer);
        return err;
    }
    if lines.insert(buffer, 1, "beta").ok == false {
        lines.release(buffer);
        return err;
    }

    let picked:result str = lines.get(buffer, 0);
    if picked.ok == false {
        lines.release(buffer);
        return err;
    }

    io.write_line(picked.value);
    lines.release(buffer);
    return ok 0;
}
```

## Beginner recommendation

Learn these first:

1. `text.new()`
2. `text.append(...)`
3. `text.build(...)`
4. `lines.new()`
5. `lines.push(...)`
6. `lines.get(...)`
7. `bytes.new()`
8. `bytes.append(...)`
9. `bytes.view(...)`

That is enough to understand the model without turning this into a full collections course.

## The mental model

Think of the stack like this:

- `slice T` is the core language view type
- `std.bytes.Buffer` is growable owned byte storage
- `std.lines.Buffer` is growable owned line storage
- `std.text.Builder` is text building on top of growable bytes

That is why these modules are important: they are the first place where slices and growable runtime storage become practical for real apps.
