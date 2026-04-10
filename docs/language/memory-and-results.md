# Memory & Results

This is usually the first page where `cnegative` starts to feel more low-level.

That is normal.

Do not try to learn everything here at once. Focus on two ideas:

1. `result T` is for operations that might fail
2. pointers are for explicit memory access

If you are a beginner, learn `result` first. Leave pointers second.

## Part 1: `result T`

`result T` means:

> “This tries to produce a `T`, but it might fail.”

Example:

```cneg
fn:result int divide(a:int, b:int) {
    if b == 0 {
        return err;
    }

    return ok a / b;
}
```

That function returns:

- `ok ...` when it worked
- `err` when it failed

### Reading the result

Check `.ok` first:

```cneg
fn:int main() {
    let r:result int = divide(10, 2);

    if r.ok {
        println(r.value);
    }

    return 0;
}
```

Important rule:

- `.ok` can always be read
- `.value` can only be read after proving the result is ok

::: warning guarded result access
Using `r.value` without a proven-ok check reports `E3024`.
:::

### Another valid proof pattern

This also works:

```cneg
fn:int main() {
    let r:result int = divide(10, 2);

    if r.ok == false {
        return 1;
    }

    println(r.value);
    return 0;
}
```

The compiler now understands both:

- `if r.ok { ... }`
- `if r.ok == false { return err; }` or `return 1;` style checks before later `.value`
- guarded `if` expressions like `if r.ok { r.value[0] } else { 0 }`
- guarded loops like `while r.ok { return r.value[0]; }`

### `try` for unwrap-or-return

When you are already inside a `result ...` function, `try` is the shorter pattern:

```cneg
fn:result int plus_one(a:int, b:int) {
    try value = divide(a, b);
    return ok (value + 1);
}
```

Simple meaning:

- call something that returns `result T`
- if it failed, return `err`
- if it worked, keep the inner `T` as a normal local binding

`main` can now use this too because `main` may return `result int` or `result u8`:

```cneg
fn:result int main() {
    try value = divide(20, 5);
    return ok value;
}
```

### Beginner mental model

Think of `result T` as:

- success path
- failure path

And you must check which path you are on before reading the value.

## Part 2: pointers

Pointers let you refer to memory explicitly.

Start with a normal value:

```cneg
let mut value:int = 10;
```

Get its address:

```cneg
let p:ptr int = addr value;
```

Important current rule:

- `addr` is for real mutable storage
- `addr` on an immutable `let` binding fails with `E3035`
- `addr` on a module constant fails with `E3036`

Read or write through the pointer:

```cneg
deref p = 11;
```

You can also use `.value` on a pointer:

```cneg
p.value = 12;
```

## Heap allocation

Use `alloc` when you want heap memory:

```cneg
let heap:ptr int = alloc int;
heap.value = 42;
free heap;
```

This is the basic rule:

- `alloc` creates heap memory
- `free` releases heap memory

::: warning `free` is explicit
If you allocate heap memory yourself, you are responsible for freeing it.
:::

## Zone allocation

`zone` is the temporary-memory form:

```cneg
fn:int main() {
    let mut total:int = 0;

    zone {
        let value:ptr int = zalloc int;
        deref value = 7;
        total = deref value;
    }

    return total;
}
```

Simple meaning:

- `zone { ... }` creates a temporary allocation scope
- `zalloc T` allocates inside that scope
- everything allocated with `zalloc` is released automatically when the zone ends

This is different from heap allocation:

- `alloc` is normal heap memory and still needs `free`
- `zalloc` is temporary zone memory and must not be freed manually

Current checked zone rules:

- `zalloc` outside a `zone` reports `E3041`
- returning a zone-owned value reports `E3042`
- `free` on zone memory reports `E3043`
- assigning a zone-owned value into outer storage reports `E3044`
- passing a zone-owned value into an ordinary function parameter reports `E3045`

This feature is meant to stay explicit and simple.
It is not hidden lifetime inference.

## One small stdlib note

Not every heap-backed thing is released with raw `free`.

Some stdlib modules manage their own heap-owned objects and give you a module-level release function instead. Right now the clearest examples are:

- `std.bytes.release(buffer)`
- `std.lines.release(buffer)`
- `std.text.release(builder)`

Use raw `free` for:

- heap pointers from `alloc`
- owned strings returned by the runtime

Do not use raw `free` for:

- `slice T` values
- `result T` wrappers
- zone-owned pointers from `zalloc`
- stdlib-owned buffer or builder objects

Those now get clearer diagnostics:

- `E3037`: `free` cannot release a `slice` value
- `E3038`: `free` cannot release a `result` wrapper directly
- `E3043`: `free` cannot release zone-owned memory

Use module `release(...)` functions for:

- stdlib-owned buffer or builder objects

## Beginner rule of thumb

If you are unsure:

- use ordinary values first
- use `result` whenever failure is possible
- only use pointers when you actually need explicit memory access
- use `zone` only for clearly temporary pointer data

That will keep your first programs much easier to reason about.

## Runtime memory codes

The tracked allocator now uses dedicated runtime memory codes too:

- `R4001`: allocation failed
- `R4002`: `realloc` on unmanaged pointer
- `R4003`: `free` on unmanaged pointer
- `R4004`: leak summary at shutdown
- `R4005`: individual leaked allocation detail
- `R4006`: allocation size overflow
- `R4008`: `realloc` failed and preserved the original pointer
- `R4009`: `realloc` size overflow
- `R4010`: double free detected
- `R4011`: `free` on an interior pointer instead of the allocation start
- `R4013`: use-after-free detected inside the allocator quarantine window
- `R4016`: buffer overflow detected by allocator guard checks
- `R4017`: buffer underflow detected by allocator guard checks

## Small combined example

```cneg
fn:result int divide(a:int, b:int) {
    if b == 0 {
        return err;
    }

    return ok a / b;
}

fn:int main() {
    let value:result int = divide(20, 5);
    if value.ok == false {
        return 1;
    }

    let heap:ptr int = alloc int;
    heap.value = value.value;
    print(heap.value);
    free heap;
    return 0;
}
```

## Next step

Continue to [Strings & Ownership](/language/strings-and-ownership).
