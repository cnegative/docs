# Quick Start

This page is the fastest beginner path:

1. write one file
2. check it
3. build it
4. run it

You do not need to understand pointers, LLVM, or the full stdlib to get started.

## First program

Create `add.cneg`:

```cneg
fn:int add(a:int, b:int) {
    return a + b;
}

fn:int main() {
    let result:int = add(2, 3);
    print(result);
    return 0;
}
```

What each part means:

- `fn:int add(...)` declares a function returning `int`
- `a:int` means parameter `a` has type `int`
- `let result:int = ...;` creates a local value
- `print(result);` prints the value
- `return 0;` ends `main`

## Step 1: check the file

```shell
cnegc check add.cneg
```

This only runs:

- lexing
- parsing
- semantic analysis

It does not build a binary.

## Step 2: build and run

```shell
cnegc build add.cneg build/add
./build/add
5
```

::: tip what `build` needs
`check`, `ir`, and `llvm-ir` only need `cnegc`.
`build` needs `clang-18` or `clang` in `PATH`.
:::

## First mistakes beginners usually hit

### 1. Using the wrong case for types

`str` is valid.
`Str` is not.

```cneg
let name:str = input();
```

### 2. Forgetting explicit return

This is invalid:

```cneg
fn:int main() {
    print(1);
}
```

This is valid:

```cneg
fn:int main() {
    print(1);
    return 0;
}
```

### 3. Using non-boolean conditions

This is invalid:

```cneg
let x:int = 3;
if x {
    print(x);
}
```

This is valid:

```cneg
let x:int = 3;
if x > 0 {
    print(x);
}
```

## Results in one sentence

`result T` means “this operation might fail”.

```cneg
fn:result int divide(a:int, b:int) {
    if b == 0 {
        return err;
    }
    return ok a / b;
}
```

To read `.value`, first prove the result is ok:

```cneg
fn:int main() {
    let r:result int = divide(10, 2);
    if r.ok {
        print(r.value);
    }
    return 0;
}
```

::: warning `.value` is guarded on purpose
Using `r.value` without a preceding `if r.ok` guard reports `E3024`.
:::

## Strings in one sentence

Some strings are runtime-owned and should be freed when you are done with them.

```cneg
fn:int main() {
    let copied:str = str_copy("hello");
    let joined:str = str_concat(copied, " world");
    print(joined);
    free copied;
    free joined;
    return 0;
}
```

## Where to go next

If this page made sense, continue in this order:

1. [Functions & Variables](/language/functions-and-variables)
2. [Types & Control Flow](/language/types-and-control-flow)
3. [Memory & Results](/language/memory-and-results)
4. [Strings & Ownership](/language/strings-and-ownership)
