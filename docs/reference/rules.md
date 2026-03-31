# Project Rules

Enforced rules that keep the compiler codebase consistent and auditable.

## Implementation rules

- Compiler and tooling code is written in C.
- Performance-critical hot paths are reserved for assembly once profiling proves they matter.
- No source file may exceed 3 000 lines.
- Developer-facing memory leak tracking must be enabled from the start.
- Diagnostics must be specific, stable, and documented.
- Statement-terminator rules stay explicit: semicolons required for simple statements.

## Enforced checks

```shell
make check-lines  # rejects files over the 5000-line cap
```

The compiler uses a tracked allocator and prints live allocations on shutdown if any memory is left unreleased.
