# Roadmap

Near-term compiler work. This list reflects the current priorities, not a release schedule.

## Up next

1. **Standard library surface** — expand the runtime and stdlib now that owned strings, constants, recovery, and typed IR optimization are in place.
2. **Next compiler phase** — continue compiler work beyond the current frontend, optimizer, and LLVM pipeline.
3. **Tooling ergonomics** — tighten install, release, and everyday compiler workflow.

## Recently completed

- string ownership beyond `input()` through `str_copy(...)` and `str_concat(...)`
- module-level `const` and `pconst`
- parser recovery for continued syntax diagnostics
- typed IR optimization before LLVM lowering
- initial stdlib modules across math, strings, parse, files, IO, env, path, time, blocking `std.net`, and process helpers

::: tip contributions welcome
Open an issue or pull request on [GitHub ↗](https://github.com/cnegative/cnegative) to discuss ideas or report bugs.
:::
