# cnegative

A minimal, hackable systems language for learning explicit low-level programming. Designed as a stepping stone before C, C++, or lower-level systems work.

## What is cnegative?

`cnegative` keeps manual control, reduces hidden behavior, and prefers words over symbolic shortcuts when that improves clarity. It compiles to native code through LLVM.

The compiler ships today with structured diagnostics, parser recovery, typed IR lowering, typed IR optimization, LLVM IR emission, object + binary linking through the host Clang toolchain, and a small blocking TCP/UDP slice in `std.net`.

::: info current status
This is **v0.3.0**. The language and compiler are under active development. The surface is intentionally small.
:::

## Core rules at a glance

- Semicolons required for import declarations, simple statements, and struct fields.
- Non-void functions must use explicit `return` on every path.
- Conditions must be actual `bool` values — no implicit integer truthiness.
- Visibility is explicit: `pfn`, `pstruct`, and `pconst` for public exports.

::: warning no implicit truthiness
`if x {}` is rejected when `x` is an `int`. Write `if x > 0 {}` instead.
:::

## Quick example

```cneg
// hello.cneg
const GREETING:str = "hello";

fn:int main() {
    let name:str = input();
    let prefix:str = str_concat(GREETING, ", ");
    let message:str = str_concat(prefix, name);
    print(message);
    free name;
    free prefix;
    free message;
    return 0;
}
```

```shell
$ cnegc build hello.cneg build/hello
$ ./build/hello
hello, alice
```

## What exists today

- explicit `fn`, `pfn`, `struct`, `pstruct`, `const`, and `pconst`
- `int`, `u8`, `bool`, `str`, `void`, `ptr T`, and `result T`
- `byte` as a readable alias for `u8`
- `if`, `while`, `loop`, and range `for`
- arrays, structs, indexing, and field access
- imports, qualified calls, qualified types, and qualified public constants
- `alloc`, `addr`, `deref`, `free`, `ok`, `err`, `print`, `input`, `str_copy`, and `str_concat`
- initial stdlib modules: `std.math`, `std.strings`, `std.parse`, `std.fs`, `std.io`, `std.time`, `std.env`, `std.path`, `std.net`, and `std.process`
- beginner-first blocking IPv4 TCP and UDP helpers in `std.net`
- typed IR dumps with simple optimization already applied
- LLVM IR, object files, and linked binaries

## Standard library docs

The stdlib now has its own section in the docs:

- [Overview](/stdlib/overview)
- [Math & Process](/stdlib/math-and-process)
- [Strings & Parse](/stdlib/strings-and-parse)
- [Files & IO](/stdlib/files-and-io)
- [Env, Path & Time](/stdlib/env-path-time)
- [Net](/stdlib/net)

## Platform support

| Feature | Linux x86_64 | macOS arm64 | Windows x86_64 |
| --- | --- | --- | --- |
| Compiler (C) | <span class="badge linux">YES</span> | <span class="badge mac">YES</span> | <span class="badge win">YES</span> |
| LLVM path | <span class="badge linux">YES</span> | <span class="badge mac">YES</span> | <span class="badge win">YES</span> |
| Lexer hot-path ASM | <span class="badge linux">YES</span> | <span class="badge mac">YES</span> | fallback C |
| Prebuilt release | <span class="badge linux">YES</span> | <span class="badge mac">YES</span> | <span class="badge win">YES</span> |
