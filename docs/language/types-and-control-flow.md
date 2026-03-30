# Types & Control Flow

Once declarations make sense, the next step is understanding the built-in types and the rule that drives control flow: conditions must be `bool`.

## Primitive and composite types

| Type | Meaning |
| --- | --- |
| `int` | 64-bit signed integer |
| `u8` | unsigned 8-bit byte-sized integer |
| `bool` | `true` or `false` |
| `str` | string value |
| `void` | no return value |
| `ptr T` | pointer to `T` |
| `result T` | fallible value |

`byte` is a source-level alias for `u8`.

## If and else

```cneg
if x > 5 {
    print(x);
} else {
    print(0);
}
```

The condition must already be boolean.

Valid:

```cneg
if x > 5 {
    print(x);
}
```

Invalid:

```cneg
if x {
    print(x);
}
```

## Loops

### While

```cneg
while x < 10 {
    x = x + 1;
}
```

### Range for

```cneg
for i:int in 0..10 {
    print(i);
}
```

### Infinite loop

```cneg
loop {
}
```

## Boolean discipline

`cnegative` rejects implicit truthiness on purpose. That keeps the code easier to audit and makes mistakes visible early.

::: warning explicit conditions only
If a condition is not `bool`, the compiler reports `E3005`.
:::

## Integer rule today

- `int` is the general arithmetic type.
- `int` currently supports `+`, `-`, `*`, `/`, and `%`.
- `u8` is the byte-sized storage/value type.
- `byte` is just another spelling of `u8`.
- Integer literals fit into `u8` automatically when a `u8` is expected.
- Arithmetic still stays `int`-only for now.
- Equality and ordered comparisons work for matching `u8` values.

## Next step

Continue to [Structs & Arrays](/language/structs-and-arrays).
