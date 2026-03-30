# Language Overview

This page is the map of the language, not the full reference.

If you are new, read it once to understand the shape of `cnegative`, then move into the smaller tutorial pages.

## The basic idea

`cnegative` is intentionally explicit.

That means:

- types are written out
- conditions must be `bool`
- functions return explicitly
- public API is marked explicitly
- ownership rules are visible instead of hidden

The goal is not “fewest keystrokes”.
The goal is “small rules, easy to reason about”.

## Four rules to remember

1. Simple statements end with `;`
2. Non-void functions must `return ...;`
3. Conditions must be `bool`
4. Public declarations use `pfn`, `pstruct`, and `pconst`

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
`if x {}` is invalid when `x` is an `int`.
Write `if x > 0 {}` instead.
:::

## Learn the language in this order

1. [Functions & Variables](/language/functions-and-variables)
2. [Types & Control Flow](/language/types-and-control-flow)
3. [Structs & Arrays](/language/structs-and-arrays)
4. [Modules & Constants](/language/modules-and-constants)
5. [Memory & Results](/language/memory-and-results)
6. [Strings & Ownership](/language/strings-and-ownership)
7. [Standard Library Overview](/stdlib/overview)

That order is intentional. It moves from “ordinary code” into “systems code”.

## Current implemented surface

- `fn`, `pfn`, `struct`, `pstruct`, `const`, and `pconst`
- `int`, `u8`, `bool`, `str`, `void`, `ptr T`, and `result T`
- `byte` as a readable alias for `u8`
- `if`, `while`, `loop`, range `for`, and narrow `if` expressions
- arrays, structs, indexing, field access, and qualified module access
- `alloc`, `addr`, `deref`, `free`, `ok`, `err`, `print`, `input`, `str_copy`, and `str_concat`
- builtin stdlib modules for math, strings, parsing, files, IO, environment, paths, time, blocking IPv4 TCP/UDP, process helpers, and an experimental Linux-only `std.x11` window path

## What to ignore on your first pass

You do not need these right away:

- compiler internals
- LLVM backend details
- experimental `std.x11`
- blocking networking APIs

Those are real parts of the project, but they are not the beginner path.

## What to read next

If you want to start writing code immediately, go to [Quick Start](/getting-started/quickstart).

If you want the language in the clean learning order, continue with [Functions & Variables](/language/functions-and-variables).
