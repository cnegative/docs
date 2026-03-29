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

### With make

```shell
make          # produces build/cnegc
make test     # runs the full test suite
```

### With CMake

```shell
cmake -S . -B out
cmake --build out   # produces out/build/cnegc
ctest --test-dir out --output-on-failure
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
