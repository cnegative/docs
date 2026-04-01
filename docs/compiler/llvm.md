# LLVM Backend

The LLVM backend lowers Typed IR to textual LLVM IR, then uses the host Clang toolchain to emit objects and link binaries.

## CLI

```shell
cnegc llvm-ir examples/valid_llvm_backend.cneg
cnegc obj     examples/valid_basic.cneg
cnegc build   examples/valid_basic.cneg
```

## Supported lowering

- `int`, `u8`, `bool`, `str`, arrays, slices, structs, `ptr`, and `result` types.
- Local bindings with mutable reassignment.
- Arithmetic and comparison operators, including integer `%`.
- Short-circuit `&&` and `||`.
- `if`, `while`, `loop`, and range `for`.
- Local function calls and imported module function calls.
- Module-level constants after typed IR folding.
- Struct literals, array literals, field access, indexing.
- `alloc`, `addr`, `deref`, `free`, `ok`, `err`, guarded `.value`.
- `print(...)`, `input()`, `str_copy(...)`, `str_concat(...)`, and string equality via embedded runtime helpers.
- `std.math`, `std.bytes`, `std.strings`, `std.text`, `std.parse`, `std.fs`, `std.io`, `std.term`, `std.time`, `std.env`, `std.path`, `std.net`, `std.process`, and the experimental Linux-only `std.x11` through embedded runtime helpers.
- Host-native target triple — not hardcoded to Linux.

## Runtime notes

::: info owned strings
Owned runtime strings now come from `input()`, `str_copy(...)`, `str_concat(...)`, `std.io.read_line(...)`, `std.strings.copy(...)`, `std.strings.concat(...)`, successful `std.text.build(...)`, successful `std.term.read_paste(...)`, successful `std.term.term_name(...)`, successful `std.fs.read_text(...)`, successful `std.fs.cwd(...)`, successful `std.env.get(...)`, `std.path.join(...)`, `std.path.file_name(...)`, `std.path.stem(...)`, `std.path.extension(...)`, successful `std.path.parent(...)`, `std.net.join_host_port(...)`, successful `std.net.recv(...)`, the `host` and `data` fields from successful `std.net.udp_recv_from(...)`, `std.process.platform(...)`, and `std.process.arch(...)`. Use `free` to release them. Freeing string literals is a safe no-op.
:::

String equality uses `strcmp` — content-based, not pointer identity.

`std.net` now includes blocking IPv4 TCP and UDP helpers as well as formatting/validation. `recv(...)` returns an owned runtime string, and successful `udp_recv_from(...)` returns a `std.net.UdpPacket` with owned `host` and `data` fields. Linux/macOS use POSIX/BSD sockets while Windows uses Winsock.

`std.bytes` lowers to a growable byte-buffer runtime layer. `Buffer` is a heap-owned container with `new`, `with_capacity`, `release`, `clear`, `length`, `capacity`, `push`, `append`, `get`, `set`, and `view` helpers. `view(...)` returns a non-owning `slice u8` over current contents.

`std.text` lowers to a text-builder layer on top of that byte runtime. `Builder` has the same storage shape, but `append(...)` copies bytes from a `str`, `push_byte(...)` appends one byte, `view(...)` returns a `slice u8`, and `build(...)` returns a new owned `str`.

`std.term` is the first low-level terminal/TUI slice. It lowers terminal size queries, terminal capability checks, cursor movement, save/restore cursor, line erase, alternate-screen toggles, scroll-region helpers, raw-mode enter/leave, raw and timed byte/event reads, normalized key/mouse/resize/paste events, style/color changes including packed RGB colors, width helpers, buffer resize, and screen-buffer diff rendering to embedded terminal helpers. `std.term.read_event(...)` and `std.term.read_event_timeout(...)` return `std.term.Event { kind, code, modifiers, row, column }` for key, mouse, resize, and paste-start input. On Unix, resize polling is now signal-backed through `SIGWINCH` before the runtime re-queries rows and columns. `std.term.read_paste(...)` and `std.term.term_name(...)` return owned strings on success. `std.term.render_diff(...)` compares a desired back buffer against a front buffer, renders only the changed cells, reuses the current cursor position across adjacent changed cells, and copies the rendered cells into `front`, while `std.term.render_diff_clip(...)` limits that work to a `std.term.Clip` region. Wide cells now auto-normalize during `buffer_set(...)` and use an internal continuation placeholder so the renderer skips the trailing slot. That module is the foundation layer for future TUI libraries, not a final widget toolkit.

The experimental Linux-only `std.x11` module lowers to embedded X11 runtime helpers for `open_window(...)`, `pump(...)`, and `close(...)`. When those builtins appear in typed IR, the backend links `-lX11` automatically.

`std.math` is still integer-only, but it now covers sign helpers, parity helpers, min/max/clamp/between, and number helpers such as `gcd`, `lcm`, and `distance`.

`u8` lowers as LLVM `i8`, `byte` is parsed as an alias for `u8`, matching `u8` comparisons use unsigned predicates, and printing `u8` widens through the normal print runtime helper.

`slice T` lowers as `{ ptr, i64 }`. When source uses an array where a matching `slice T` is expected, the backend materializes a pointer to the first element plus the array length, then uses aggregate extraction plus pointer arithmetic for `.length`, indexing, and subslicing.

Unsupported lowering operations report `E3021` before any LLVM IR text is printed.

## Backend layout

- builtin stdlib validation and lowering currently live in `src/backend/llvm_text.c`
- embedded runtime helper emission is split by domain under `src/backend/stdlib/`
- the experimental Linux-only X11 runtime helpers currently live in `src/backend/stdlib/x11.c`
