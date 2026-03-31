# cnegative

A minimal, hackable systems language for learning explicit low-level programming.

`cnegative` is meant for people who want to understand how low-level programs work without jumping straight into the full weight of C or C++ on day one.

It keeps the surface small, makes rules visible, and avoids hidden behavior where possible.

::: info current status
This is **v0.4.0**. The language and compiler are under active development, but the current surface is already large enough for real small tools and learning projects.
:::

## Who this is for

`cnegative` is a good fit if you want:

- a beginner path into systems programming
- explicit control over values, memory, and errors
- a language you can read end to end without a huge standard library
- a compiler you can inspect and learn from

It is not trying to be:

- a giant batteries-included platform
- a high-level scripting language
- a polished replacement for C, C++, Rust, or Zig

## The mental model

Think of `cnegative` like this:

1. Values have explicit types.
2. Conditions must be real `bool` values.
3. Non-void functions return explicitly.
4. Public API is marked explicitly.
5. Heap-backed values that you own should be freed explicitly.

If you keep those five ideas in mind, most of the language will feel straightforward.

## What to learn first

If you are new, do not start with the compiler pages.

Start in this order:

1. [Quick Start](/getting-started/quickstart)
2. [Functions & Variables](/language/functions-and-variables)
3. [Types & Control Flow](/language/types-and-control-flow)
4. [Memory & Results](/language/memory-and-results)
5. [Strings & Ownership](/language/strings-and-ownership)
6. [Standard Library Overview](/stdlib/overview)

After that, move into modules, structs, arrays, and compiler internals.

## What to ignore for now

If you are just learning the language, you can safely ignore these on your first pass:

- LLVM IR
- typed IR
- `std.term` low-level terminal control, timed key/mouse/resize/paste events, capability queries, styles, and diff rendering
- `std.x11`
- TCP/UDP helpers in `std.net`
- release/build pipeline details

Those are useful later. They are not needed to write your first small program.

## A first example

```cneg
fn:int main() {
    let a:int = 2;
    let b:int = 3;
    let sum:int = a + b;
    print(sum);
    return 0;
}
```

What is happening here:

- `fn:int main()` says `main` returns an `int`
- `let` creates named values
- types are written explicitly
- `print(sum);` prints the value
- `return 0;` ends the program successfully

## Core rules at a glance

- Semicolons are required for simple statements, import lines, and struct fields.
- Conditions must be `bool`.
- Non-void functions must return explicitly on every path.
- Visibility is explicit: `pfn`, `pstruct`, and `pconst` are the public forms.
- `byte` is just an alias for `u8`.

::: warning common beginner mistake
`if x {}` is rejected when `x` is an `int`. Write a real boolean expression like `if x > 0 {}`.
:::

## What exists today

- `fn`, `pfn`, `struct`, `pstruct`, `const`, and `pconst`
- `int`, `u8`, `bool`, `str`, `void`, `ptr T`, and `result T`
- `byte` as a readable alias for `u8`
- `if`, `while`, `loop`, range `for`, and narrow `if` expressions
- arrays, structs, indexing, and field access
- imports, qualified calls, qualified types, and qualified public constants
- `alloc`, `addr`, `deref`, `free`, `ok`, `err`, `print`, `input`, `str_copy`, and `str_concat`
- stdlib modules for math, strings, parsing, files, IO, terminal control, env, paths, time, networking, process helpers, and the experimental Linux-only `std.x11`
- typed IR, LLVM IR, object generation, and linked binaries

## Platform support

| Feature | Linux x86_64 | macOS arm64 | Windows x86_64 |
| --- | --- | --- | --- |
| Compiler (C) | <span class="badge linux">YES</span> | <span class="badge mac">YES</span> | <span class="badge win">YES</span> |
| LLVM path | <span class="badge linux">YES</span> | <span class="badge mac">YES</span> | <span class="badge win">YES</span> |
| Lexer hot-path ASM | <span class="badge linux">YES</span> | <span class="badge mac">YES</span> | fallback C |
| Prebuilt release | <span class="badge linux">YES</span> | <span class="badge mac">YES</span> | <span class="badge win">YES</span> |
