# Bytes & Text

These two modules are the first practical dynamic-storage layer in `cnegative`.

They matter because fixed arrays and plain string literals stop being enough once you start building:

- terminal apps
- editors
- parsers
- file transforms
- anything that grows data while it runs

## The short split

- `std.bytes` is for growable raw bytes
- `std.text` is for building text and turning it into a final owned `str`

If you are new, read `std.text` first and come back to `std.bytes` when you start caring about raw byte data.

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

## Beginner recommendation

Learn these first:

1. `text.new()`
2. `text.append(...)`
3. `text.build(...)`
4. `bytes.new()`
5. `bytes.append(...)`
6. `bytes.view(...)`

That is enough to understand the model without turning this into a full collections course.

## The mental model

Think of the stack like this:

- `slice T` is the core language view type
- `std.bytes.Buffer` is growable owned byte storage
- `std.text.Builder` is text building on top of growable bytes

That is why these modules are important: they are the first place where slices become practical for real apps.
