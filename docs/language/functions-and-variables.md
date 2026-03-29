# Functions & Variables

Start here if you are new to `cnegative`. This page covers the two most common building blocks: functions and local variables.

## Functions

Functions use `fn:return_type`. Private functions use `fn`. Exported functions use `pfn`.

```cneg
fn:int add(a:int, b:int) {
    return a + b;
}

pfn:int mul(a:int, b:int) {
    return a * b;
}
```

### Return rule

Non-void functions must return explicitly on every path.

```cneg
fn:int main() {
    return 0;
}
```

```cneg
fn:void log_value(x:int) {
    print(x);
}
```

::: tip explicit return is intentional
`return sum;` is slightly more verbose than an implicit tail expression, but much clearer in long code.
:::

## Variables

Variables are declared with `let`. Add `mut` if reassignment is allowed.

```cneg
let x:int = 10;
let mut y:int = 20;
y = 21;
```

### Rules

- type annotations are explicit
- `let` is immutable
- `let mut` is mutable
- simple statements end with `;`

## Small example

```cneg
fn:int main() {
    let a:int = 2;
    let mut b:int = 3;
    b = b + 1;
    return a + b;
}
```

## Next step

Continue to [Types & Control Flow](/language/types-and-control-flow).
