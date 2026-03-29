# Typed IR

After semantic analysis, checked source is lowered to a structured typed IR before LLVM lowering starts.

## Current properties

- independent IR node types instead of reusing the parser AST
- canonical module-qualified function, struct, and public constant names
- explicit return statements preserved from source
- structured control flow preserved for `if`, `while`, `loop`, and range `for`
- simple optimization passes run before backend lowering

## Dump the IR

```shell
cnegc ir examples/valid_consts_strings.cneg
```

## Example output

```text
module valid_consts_strings (...) {
    const valid_consts_strings.LOCAL:int = 20;

    fn valid_consts_strings.main() -> int {
        let joined:str = str_concat("hello", " world");
        if true {
            print(joined);
        }
        return 20;
    }
}
```

## What the optimizer currently does

- folds constant integer and boolean expressions
- folds string literal equality and inequality
- trims unreachable statements after `return`
- optimizes module constant initializers before backend lowering

::: info purpose of this stage
Typed IR is the compiler checkpoint where typing, symbol resolution, and simple canonical cleanup are already settled before LLVM emission.
:::
