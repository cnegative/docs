# LLVM Backend

The LLVM backend lowers Typed IR to textual LLVM IR, then uses the host Clang toolchain to emit objects and link binaries.

## CLI

```shell
cnegc llvm-ir examples/valid_llvm_backend.cneg
cnegc obj     examples/valid_basic.cneg
cnegc build   examples/valid_basic.cneg
```

## Supported lowering

- `int`, `u8`, `bool`, `str`, arrays, structs, `ptr`, and `result` types.
- Local bindings with mutable reassignment.
- Arithmetic and comparison operators.
- Short-circuit `&&` and `||`.
- `if`, `while`, `loop`, and range `for`.
- Local function calls and imported module function calls.
- Module-level constants after typed IR folding.
- Struct literals, array literals, field access, indexing.
- `alloc`, `addr`, `deref`, `free`, `ok`, `err`, guarded `.value`.
- `print(...)`, `input()`, `str_copy(...)`, `str_concat(...)`, and string equality via embedded runtime helpers.
- `std.math`, `std.strings`, `std.parse`, `std.fs`, `std.io`, `std.time`, `std.env`, `std.path`, `std.net`, and `std.process` through embedded runtime helpers.
- Host-native target triple — not hardcoded to Linux.

## Runtime notes

::: info owned strings
Owned runtime strings now come from `input()`, `str_copy(...)`, `str_concat(...)`, `std.io.read_line(...)`, `std.strings.copy(...)`, `std.strings.concat(...)`, successful `std.fs.read_text(...)`, successful `std.fs.cwd(...)`, successful `std.env.get(...)`, `std.path.join(...)`, `std.path.file_name(...)`, `std.path.stem(...)`, `std.path.extension(...)`, successful `std.path.parent(...)`, `std.net.join_host_port(...)`, successful `std.net.recv(...)`, the `host` and `data` fields from successful `std.net.udp_recv_from(...)`, `std.process.platform(...)`, and `std.process.arch(...)`. Use `free` to release them. Freeing string literals is a safe no-op.
:::

String equality uses `strcmp` — content-based, not pointer identity.

`std.net` now includes blocking IPv4 TCP and UDP helpers as well as formatting/validation. `recv(...)` returns an owned runtime string, and successful `udp_recv_from(...)` returns a `std.net.UdpPacket` with owned `host` and `data` fields. Linux/macOS use POSIX/BSD sockets while Windows uses Winsock.

`u8` lowers as LLVM `i8`, `byte` is parsed as an alias for `u8`, matching `u8` comparisons use unsigned predicates, and printing `u8` widens through the normal print runtime helper.

Unsupported lowering operations report `E3021` before any LLVM IR text is printed.
