# Compiler Pipeline

Source goes through a multi-stage pipeline. Each stage can be inspected independently with the CLI.

## Stages

<div class="pipeline">
  <span class="pipeline-step">Source</span><span class="pipeline-arrow">→</span>
  <span class="pipeline-step">Lexer</span><span class="pipeline-arrow">→</span>
  <span class="pipeline-step">Parser</span><span class="pipeline-arrow">→</span>
  <span class="pipeline-step">AST</span><span class="pipeline-arrow">→</span>
  <span class="pipeline-step">Sema</span><span class="pipeline-arrow">→</span>
  <span class="pipeline-step">Typed IR</span><span class="pipeline-arrow">→</span>
  <span class="pipeline-step">IR Optimize</span><span class="pipeline-arrow">→</span>
  <span class="pipeline-step">LLVM IR</span><span class="pipeline-arrow">→</span>
  <span class="pipeline-step">Object</span><span class="pipeline-arrow">→</span>
  <span class="pipeline-step">Binary</span>
</div>


| Stage | CLI flag | Source dir |
| --- | --- | --- |
| Lexer | — | `src/lex/` |
| Parser + AST | — | `src/parse/` |
| Semantic analysis | `check` | `src/sema/` |
| Typed IR lowering | `ir` | `src/ir/` |
| Typed IR optimization | `ir` | `src/ir/` |
| LLVM IR | `llvm-ir` | `src/backend/` |
| Object file | `obj` | via clang |
| Binary | `build` | via clang |

## Directory layout

```text
include/cnegative/   — public compiler headers
src/support/         — memory, source, diagnostics
src/lex/             — token and lexer logic
src/parse/           — AST and parser
src/sema/            — semantic checking
src/ir/              — typed IR lowering and optimization
src/backend/         — LLVM text backend and toolchain glue
src/cli/             — command entry point
src/asm/             — profiled hot-path assembly
cmake/               — build and test scripts
.github/workflows/   — CI workflows
```

## Current compiler behavior

- parser recovery keeps reporting after common syntax mistakes
- typed IR runs before LLVM and now folds simple constant expressions
- object and binary emission still use the host `clang` driver
