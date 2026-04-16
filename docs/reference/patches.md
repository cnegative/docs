# Patches

Patch releases track focused fixes and improvements on top of the last tagged
version.

## v0.5.1

- made `result` a contextual keyword in type positions so it can be reused as a
  normal identifier or import alias elsewhere
- added targeted parse diagnostics for missing inner types after `result`,
  `ptr`, and `slice` prefixes
- expanded the `.value` proof system to understand immutable bool aliases of
  `.ok` and simple `&&` / `||` branch-proof patterns

## v0.5.0

- added source-level `null` and pointer equality against `null`
- allowed `main` to return `result int` and `result u8`, which makes top-level
  `try` usable in normal CLI programs
- added `std.strings.from_int(int)` and `std.text.append_int(...)` for direct
  integer-to-text formatting paths
- reworked printing so `print(...)` no longer appends a newline and
  `println(...)` is the newline form
- expanded arrays with constant-expression sizes and `[value; N]` repeat
  literals, and fixed the `ptr T[N]` parsing ambiguity so it now means
  `array[N] of ptr T`
- tightened result-guard handling for indexing and slicing after proven-ok
  flows
- added `zone { ... }` and `zalloc T` for explicit temporary scoped
  allocations, including phase-2 escape checks for returns, outer storage, and
  ordinary function-call boundaries

## v0.4.4

- reworked module loading around a clear search order: builtin `std.*`, project
  root, `vendor/`, then legacy relative fallback
- gave user modules canonical names from root-relative paths instead of plain
  basenames
- improved `E3017` so missing-import diagnostics now show searched paths and
  canonical-name conflicts directly
- added regression fixtures and smoke coverage for the new module rules

## v0.4.3

- added compile-time memory diagnostics for invalid `addr` and `free` misuse:
  `E3035`, `E3036`, `E3037`, and `E3038`
- hardened the tracked allocator with overflow checks, double-free detection,
  interior-pointer `free` detection, quarantine-backed use-after-free checks,
  and guard-based overflow/underflow reporting
- added dedicated runtime memory tests for the main allocator failure modes
- updated the docs so the current ownership and memory-diagnostic rules are
  easier to find

## v0.4.2-p

- fixed incorrect `defer` lowering across nested blocks so outer-scope cleanup
  does not run at the end of each loop iteration
- added regression coverage for that case with `valid_defer_loop.cneg`
- reduced compiler `check` time substantially by replacing the old allocator
  bookkeeping path with hashed tracked-allocation lookup
- improved semantic-analysis lookup paths for scope bindings and module symbols
- kept the patch release focused on compiler/runtime fixes rather than new
  language surface changes

## Notes

- Current tracked release: `v0.5.1`
- Previous tracked release: `v0.5.0`
- Main repo patch log: `patches.md`
