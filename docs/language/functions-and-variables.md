# Functions & Variables

Start here if you are new to `cnegative`.

Most programs begin with two things:

- functions
- named values inside those functions

## Functions

Functions use the form `fn:return_type`.

```cneg
fn:int add(a:int, b:int) {
    return a + b;
}
```

Read that as:

- `fn:int` means “function returning int”
- `add` is the function name
- `a:int` and `b:int` are typed parameters

Public functions use `pfn` instead of `fn`.

```cneg
pfn:int mul(a:int, b:int) {
    return a * b;
}
```

## Return rule

Non-void functions must return explicitly on every path.

Valid:

```cneg
fn:int main() {
    return 0;
}
```

Also valid:

```cneg
fn:void log_value(x:int) {
    print(x);
}
```

::: tip why this rule exists
`cnegative` does not use implicit tail returns for non-void functions. That makes control flow easier to audit in longer code.
:::

## Variables

Variables are declared with `let`.

```cneg
let x:int = 10;
```

If reassignment is allowed, use `let mut`.

```cneg
let mut y:int = 20;
y = 21;
```

Read this as:

- `let` means immutable binding
- `let mut` means mutable binding
- `:int` is the explicit type annotation

## Small example

```cneg
fn:int main() {
    let a:int = 2;
    let mut b:int = 3;
    b = b + 1;
    return a + b;
}
```

What happens here:

- `a` never changes
- `b` is allowed to change
- both values stay typed as `int`

## Common beginner mistakes

### Forgetting the type

This is invalid:

```cneg
let x = 10;
```

Write:

```cneg
let x:int = 10;
```

### Reassigning an immutable binding

This is invalid:

```cneg
let x:int = 10;
x = 11;
```

Use `let mut` if the value should change.

### Forgetting the semicolon

Simple statements end with `;`.

```cneg
let x:int = 10;
print(x);
```

## Next step

Continue to [Types & Control Flow](/language/types-and-control-flow).
