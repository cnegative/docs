# Quick Start

Write, check, and run your first `cnegative` program from scratch.

## Your first function

Create `add.cneg`:

```cneg
// add.cneg
fn:int add(a:int, b:int) {
    return a + b;
}

fn:int main() {
    let result:int = add(2, 3);
    print(result);
    return 0;
}
```

Check it (no Clang needed):

```shell
cnegc check add.cneg
```

Build and run:

```shell
cnegc build add.cneg build/add
./build/add
5
```

## Using result types

Fallible operations return `result T`. The `.value` field is only accessible after a guard:

```cneg
fn:result int divide(a:int, b:int) {
    if b == 0 {
        return err;
    }
    return ok a / b;
}

fn:int main() {
    let r:result int = divide(10, 2);
    if r.ok {
        print(r.value);  // only valid inside this guard
    }
    return 0;
}
```

::: danger unguarded .value is rejected
Accessing `r.value` without a preceding `if r.ok` guard is a compile-time error `E3024`.
:::

## Importing modules and public constants

```cneg
// numbers.cneg
pconst BASE:int = 5;
pconst SHIFT:int = BASE + 7;
```

```cneg
// main.cneg
import numbers as n;

const LOCAL:int = n.SHIFT + 8;

fn:int main() {
    return LOCAL;
}
```

## Owned strings beyond input

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

::: tip current ownership rule
Owned runtime strings currently come from `input()`, `str_copy(...)`, `str_concat(...)`, and several stdlib calls such as `std.io.read_line()`, `std.fs.read_text(...)`, `std.fs.cwd(...)`, `std.net.join_host_port(...)`, `std.process.platform()`, and `std.process.arch()`.
:::

If you want the module-by-module stdlib surface, continue with [Standard Library Overview](/stdlib/overview).
