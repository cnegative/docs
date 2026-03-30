# Build & Run

Build `cnegc` from source or use an existing binary. Covers prerequisites, build systems, all compiler commands, and the lexer benchmark.

## Using a prebuilt binary

| Command | Needs Clang? | Output |
| --- | --- | --- |
| `cnegc check <file>` | No | diagnostics only |
| `cnegc ir <file>` | No | typed IR text |
| `cnegc llvm-ir <file>` | No | LLVM IR text |
| `cnegc obj <file> [out]` | Yes | `.o` object file |
| `cnegc build <file> [out]` | Yes | linked binary |
| `cnegc bench-lexer <file> N` | No | timing output |

## Build from source

### Prerequisites

- A C compiler available as `cc` (for Make) or any C compiler (for CMake)
- `make` or CMake 3.20+
- `clang-18` or `clang` in `PATH` for the full test suite
- `bash` for `make test`
- `python3` only if you want the optional blocking TCP or UDP integration tests

### With make

```shell
make          # produces build/cnegc
make test     # runs the full test suite
make net-test # optional Python-based std.net integration test
make udp-test # optional Python-based std.net UDP integration test
```

### With CMake

```shell
cmake -S . -B out
cmake --build out   # produces out/build/cnegc
ctest --test-dir out --output-on-failure
```

If Python 3 is available:

```shell
cmake --build out --target net-test
cmake --build out --target udp-test
```

::: tip llvm-as is optional
Smoke tests use `llvm-as-18` or `llvm-as` when available, and fall back to `clang -c -x ir` otherwise.
:::

## Project rule: line cap

No source file may exceed 3 000 lines. Run `make check-lines` to verify before committing.

## Current compiler checkpoints

- `check` runs lexing, parsing, semantic analysis, and diagnostics
- `ir` dumps typed IR after simple optimization and constant folding
- `llvm-ir` shows the backend-ready LLVM text form
- `obj` and `build` use the host `clang` driver after LLVM text generation

::: tip optional network integration
`make test` and the default CMake/CTest path stay deterministic and do not launch multi-process network binaries. Use `make net-test` / `cmake --build out --target net-test` for the real blocking TCP server/client integration check, or `make udp-test` / `cmake --build out --target udp-test` for the UDP path.
:::
