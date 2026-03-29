# Memory & Results

This is where `cnegative` starts to feel like a systems language: explicit pointers, explicit allocation, and explicit fallible values.

## Pointers

```cneg
let mut value:int = 10;
let p:ptr int = addr value;
deref p = 11;
```

Allocate on the heap with `alloc` and release with `free`:

```cneg
let heap:ptr int = alloc int;
heap.value = 42;
free heap;
```

### Pointer tools

- `addr x` gets the address of `x`
- `deref p` reads or writes through a pointer
- `p.value` accesses the pointed value
- `free p;` releases heap memory

## Result values

Use `result T` for fallible operations.

```cneg
fn:result int divide(a:int, b:int) {
    if b == 0 {
        return err;
    }

    return ok a / b;
}
```

Read `.ok` freely:

```cneg
if r.ok {
    print(1);
}
```

Read `.value` only after proving the result is ok:

```cneg
if r.ok {
    return r.value;
}
```

::: warning guarded result access
Using `r.value` without a proven-ok guard reports `E3024`.
:::

## Next step

Continue to [Strings & Ownership](/language/strings-and-ownership).
