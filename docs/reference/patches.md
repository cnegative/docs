# Patches

Patch releases track focused fixes and improvements on top of the last tagged
version.

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

- Current tracked release: `v0.4.3`
- Previous patch release: `v0.4.2-p`
- Main repo patch log: `patches.md`
