# Error Codes

`cnegc` diagnostics use stable error codes so errors can be documented and referenced consistently. All diagnostics show source path, line, and column.

## Parse errors (E1xxx)

| Code | Description |
| --- | --- |
| E1001 | Expected token missing in current grammar position |
| E1002 | Unexpected token for current grammar rule |
| E1003 | Invalid type syntax |
| E1004 | Invalid character during lexing |
| E1005 | Unterminated string literal |

## Semantic errors (E3xxx)

| Code | Description |
| --- | --- |
| E3001 | Duplicate function name |
| E3002 | Unknown name |
| E3003 | Duplicate local binding in the same scope |
| E3004 | Type mismatch |
| E3005 | Control-flow condition is not `bool` |
| E3006 | Assignment to immutable binding |
| E3007 | Non-void function does not return on every path |
| E3008 | Incorrect function call arity |
| E3009 | Unknown or invalid field access |
| E3010 | Invalid indexing target |
| E3011 | Array literal size mismatch |
| E3012 | Unknown declared type or module-qualified type without matching import |
| E3013 | Duplicate struct name |
| E3014 | Invalid call target or module-as-value usage |
| E3015 | `err` used without an expected `result` type |
| E3016 | Duplicate import alias |
| E3017 | Module file could not be resolved or loaded |
| E3018 | Cyclic module import |
| E3019 | `free` requires a pointer or string value |
| E3020 | Internal typed IR lowering invariant failed |
| E3021 | LLVM backend does not support the requested feature yet |
| E3022 | External backend toolchain step failed |
| E3023 | Public API exposes a private type |
| E3024 | `result.value` used without a proven-ok guard |
| E3025 | Module-level constant initializer uses a runtime-only operation |
| E3026 | Cyclic module-level constant definition |
| E3027 | Duplicate or conflicting top-level constant name |
| E3028 | Integer literal is out of range for the target type |

## Diagnostic style

- Show source path, line, and column.
- One clear primary sentence per diagnostic.
- Prefer describing both expected and actual types for mismatches.
- Reject ambiguous truthiness in conditions with `E3005`.
- Report missing struct fields directly at the literal or access site.
- Recover after common syntax mistakes when possible so multiple real errors can be reported in one pass.
