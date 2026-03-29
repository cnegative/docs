# LLVM Backend

The LLVM backend lowers Typed IR to textual LLVM IR, then uses the host Clang toolchain to emit objects and link binaries.

## CLI

```shell
cnegc llvm-ir examples/valid_llvm_backend.cneg
cnegc obj     examples/valid_basic.cneg
cnegc build   examples/valid_basic.cneg
```

## Supported lowering

- `int`, `bool`, `str`, arrays, structs, `ptr`, and `result` types.
- Local bindings with mutable reassignment.
- Arithmetic and comparison operators.
- Short-circuit `&&` and `||`.
- `if`, `while`, `loop`, and range `for`.
- Local function calls and imported module function calls.
- Module-level constants after typed IR folding.
- Struct literals, array literals, field access, indexing.
- `alloc`, `addr`, `deref`, `free`, `ok`, `err`, guarded `.value`.
- `print(...)`, `input()`, `str_copy(...)`, `str_concat(...)`, and string equality via embedded runtime helpers.
- Host-native target triple — not hardcoded to Linux.

## Runtime notes

::: info owned strings
`input()`, `str_copy(...)`, and `str_concat(...)` produce owned runtime strings. Use `free` to release them. Freeing string literals is a safe no-op.
:::

String equality uses `strcmp` — content-based, not pointer identity.

Unsupported lowering operations report `E3021` before any LLVM IR text is printed.
