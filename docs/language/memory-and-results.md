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
        print(r.value);
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

    print(r.value);
    return 0;
}
```

The compiler now understands both:

- `if r.ok { ... }`
- `if r.ok == false { return err; }` or `return 1;` style checks before later `.value`

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

## One small stdlib note

Not every heap-backed thing is released with raw `free`.

Some stdlib modules manage their own heap-owned objects and give you a module-level release function instead. Right now the clearest examples are:

- `std.bytes.release(buffer)`
- `std.text.release(builder)`

Use raw `free` for:

- heap pointers from `alloc`
- owned strings returned by the runtime

Use module `release(...)` functions for:

- stdlib-owned buffer or builder objects

## Beginner rule of thumb

If you are unsure:

- use ordinary values first
- use `result` whenever failure is possible
- only use pointers when you actually need explicit memory access

That will keep your first programs much easier to reason about.

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
