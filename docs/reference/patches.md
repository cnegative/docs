# Patches

Patch releases track focused fixes and improvements on top of the last tagged
version.

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

- Base release: `v0.4.2`
- Patch release tag: `v0.4.2-p`
- Main repo patch log: `patches.md`
