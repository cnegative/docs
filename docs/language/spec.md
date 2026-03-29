# Language Overview

`cnegative` is meant to be read in long codebases without hidden behavior. The beginner path is simple: learn declarations, learn control flow, then move into modules, memory, and ownership.

## Core rules first

- simple statements end with `;`
- non-void functions must use explicit `return ...;`
- conditions must be real `bool` values
- visibility is explicit with `pfn`, `pstruct`, and `pconst`

```cneg
fn:int main() {
    let x:int = 7;

    if x > 5 {
        return x;
    }

    return 0;
}
```

::: warning no implicit truthiness
`if x {}` is invalid when `x` is an `int`. Write an actual boolean expression like `if x > 0 {}`.
:::

## Learn the language in this order

1. [Functions & Variables](/language/functions-and-variables)
2. [Types & Control Flow](/language/types-and-control-flow)
3. [Structs & Arrays](/language/structs-and-arrays)
4. [Modules & Constants](/language/modules-and-constants)
5. [Memory & Results](/language/memory-and-results)
6. [Strings & Ownership](/language/strings-and-ownership)
7. [Standard Library Overview](/stdlib/overview)

## Current implemented surface

- `fn`, `pfn`, `struct`, `pstruct`, `const`, and `pconst`
- `int`, `bool`, `str`, `void`, `ptr T`, and `result T`
- `if`, `while`, `loop`, and range `for`
- arrays, structs, indexing, field access, and qualified module access
- `alloc`, `addr`, `deref`, `free`, `ok`, `err`, `print`, `input`, `str_copy`, and `str_concat`
- builtin stdlib modules for math, strings, parsing, files, IO, environment, paths, time, basic network formatting, and process helpers

## What to read next

If you want to write code immediately, start with [Quick Start](/getting-started/quickstart). If you want the language in a clean order, continue with [Functions & Variables](/language/functions-and-variables). If you want the practical helper surface, jump to [Standard Library Overview](/stdlib/overview).
