# Modules & Constants

This page covers two beginner questions:

1. how do I split code across files?
2. when should I use `let` and when should I use `const`?

## Modules

Modules are just other `.cneg` files that you import.

```cneg
import numbers as n;
```

After importing, you use the module name or alias to reach public items:

```cneg
fn:int main() {
    return n.add(2, 3);
}
```

Only public declarations are visible from another module.

Current import resolution order is:

1. builtin `std.*` modules
2. the project root, which is the directory containing the entry file
3. `vendor/` under that project root
4. a legacy fallback relative to the importing file's directory

That means if you run:

```cneg
// src/main.cneg
import app.logic as logic;
```

then `app.logic` resolves to `src/app/logic.cneg`. If you import
`vendorlib.echo`, the loader next checks `src/vendor/vendorlib/echo.cneg`.

Canonical module names come from those root-relative paths, not just the file
basename. So `feature/helper.cneg` and `shared/helper.cneg` stay distinct as
`feature.helper` and `shared.helper`.

Current public forms are:

- `pfn` for functions
- `pstruct` for structs
- `pconst` for module-level constants

## `let` vs `const`

This is the beginner version:

- use `let` for values created inside a function
- use `const` for fixed values at module scope

### `let`

`let` is for local values:

```cneg
fn:int main() {
    let x:int = 10;
    return x;
}
```

That value belongs to the function body.

### `const`

`const` is for fixed values defined at module scope:

```cneg
const LIMIT:int = 8;
```

That value is not created fresh every time `main` runs. It is part of the module itself.

### `pconst`

Use `pconst` when other modules should see the constant:

```cneg
pconst BASE:int = 5;
```

Then another file can use it:

```cneg
import numbers as n;

const LOCAL:int = n.BASE + 4;
```

## Simple rule of thumb

Ask:

- “Is this value just part of one function?” -> use `let`
- “Is this a fixed named value for the whole file/module?” -> use `const`
- “Should another module be able to use it?” -> use `pconst`

## Small example

```cneg
// numbers.cneg
pconst BASE:int = 5;
pfn:int add(a:int, b:int) {
    return a + b;
}
```

```cneg
// main.cneg
import numbers as n;

const LOCAL:int = n.BASE + 2;

fn:int main() {
    let value:int = n.add(LOCAL, 3);
    return value;
}
```

## Constant rules

- constants are module-level only
- constant initializers must stay compile-time
- runtime calls are rejected in constant initializers
- runtime memory operations are rejected in constant initializers
- cyclic constant definitions are rejected

::: info current compiler behavior
Constants are folded before LLVM lowering, so they behave like fixed compile-time values.
:::

## Common beginner mistakes

### 1. Trying to use `const` like `let`

This is not how `const` is used:

```cneg
fn:int main() {
    const X:int = 1;
    return X;
}
```

In `cnegative`, `const` is a module-level concept. Inside functions, use `let`.

### 2. Forgetting that imports only expose public items

If a function or constant is not declared with `pfn` or `pconst`, another module cannot use it.

## Next step

Continue to [Memory & Results](/language/memory-and-results).
