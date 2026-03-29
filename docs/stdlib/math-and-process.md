# Math & Process

These modules are small, but useful in real programs.

## `std.math`

```cneg
import std.math as math;
```

- `math.abs(int) -> int`
- `math.min(int, int) -> int`
- `math.max(int, int) -> int`
- `math.clamp(int, int, int) -> int`

### Example

```cneg
import std.math as math;

fn:int main() {
    let bounded:int = math.clamp(20, 0, 7);
    print(bounded);
    return 0;
}
```

::: tip integer-only for now
`std.math` currently works on `int`. There is no floating-point surface yet.
:::

## `std.process`

```cneg
import std.process as process;
```

- `process.platform() -> str`
- `process.arch() -> str`
- `process.exit(int) -> void`

`process.platform()` and `process.arch()` return owned strings. Free them after use.

### Example

```cneg
import std.process as process;
import std.strings as strings;

fn:int main() {
    let platform:str = process.platform();
    let arch:str = process.arch();

    if strings.len(platform) == 0 {
        free platform;
        free arch;
        return 1;
    }

    free platform;
    free arch;
    process.exit(0);
    return 1;
}
```
