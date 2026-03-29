# Modules & Constants

Modules let you split code across files. Constants let you keep shared fixed values at module scope.

## Imports

Imports resolve local `.cneg` files relative to the importing file.

```cneg
import numbers as n;
```

Public items are accessed through the module name or alias:

```cneg
fn:int main() {
    return n.add(2, 3);
}
```

## Public visibility

Current export forms are explicit:

- `pfn` for functions
- `pstruct` for structs
- `pconst` for module-level constants

## Module-level constants

```cneg
const LIMIT:int = 8;
pconst GREETING:str = "hello";
```

Imported public constants are qualified:

```cneg
import numbers as n;

const LOCAL:int = n.BASE + 4;
```

## Constant rules

- constant initializers must stay compile-time
- runtime calls are rejected in constant initializers
- runtime memory operations are rejected in constant initializers
- cyclic constant definitions are rejected

::: info current compiler behavior
Constants are lowered into typed IR and folded before LLVM lowering.
:::

## Next step

Continue to [Memory & Results](/language/memory-and-results).
