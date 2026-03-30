# Types & Control Flow

Once functions and variables make sense, the next step is understanding:

- what values exist
- how conditions work
- how loops work

## Built-in types

| Type | Meaning |
| --- | --- |
| `int` | 64-bit signed integer |
| `u8` | unsigned 8-bit byte-sized integer |
| `bool` | `true` or `false` |
| `str` | string value |
| `void` | no return value |
| `ptr T` | pointer to `T` |
| `result T` | fallible value |

`byte` is just another spelling of `u8`.

## The most important control-flow rule

Conditions must already be boolean.

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

That rule applies to:

- `if`
- `while`
- the condition inside `if` expressions

::: warning explicit conditions only
If a condition is not `bool`, the compiler reports `E3005`.
:::

## Ordinary `if` / `else`

```cneg
if x > 5 {
    print(x);
} else {
    print(0);
}
```

Use this when you want control flow.

## `if` expressions

`cnegative` also supports a narrow value-producing `if` form:

```cneg
let kind:int = if x > 5 { 1 } else { 0 };
```

Use this when you want to choose one value or another.

Current rules:

- `else` is required
- both branches must produce a value
- both branches must resolve to the same type

## Loops

### While

Use `while` when the condition should be checked each time.

```cneg
while x < 10 {
    x = x + 1;
}
```

### Range `for`

Use this for simple counted loops.

```cneg
for i:int in 0..10 {
    print(i);
}
```

### Infinite loop

Use `loop` when you want a plain repeat-forever block.

```cneg
loop {
}
```

## Integer rule today

- `int` is the normal arithmetic type
- `int` supports `+`, `-`, `*`, `/`, and `%`
- `u8` is the byte-sized storage/value type
- `byte` is just another spelling of `u8`
- integer literals fit into `u8` automatically when a `u8` is expected
- fitting integer literals also compare cleanly against `u8` and `byte` values
- arithmetic still stays `int`-only for now

## A small example with both `int` and `byte`

```cneg
fn:int main() {
    let x:int = 9;
    let b:byte = 0;

    if x % 2 == 1 {
        print(x);
    }

    if b == 0 {
        return 0;
    }

    return 1;
}
```

## Next step

Continue to [Structs & Arrays](/language/structs-and-arrays).
