# Math & Process

These modules are small, but useful in real programs.

## `std.math`

```cneg
import std.math as math;
```

- `math.abs(int) -> int`
- `math.sign(int) -> int`
- `math.square(int) -> int`
- `math.cube(int) -> int`
- `math.is_even(int) -> bool`
- `math.is_odd(int) -> bool`
- `math.min(int, int) -> int`
- `math.max(int, int) -> int`
- `math.clamp(int, int, int) -> int`
- `math.gcd(int, int) -> int`
- `math.lcm(int, int) -> int`
- `math.distance(int, int) -> int`
- `math.between(int, int, int) -> bool`

### Example

```cneg
import std.math as math;

fn:int main() {
    let sample:int = 20;
    let remainder:int = sample % 6;
    let bounded:int = math.clamp(20, 0, 7);

    if !math.is_even(remainder + bounded) {
        return 1;
    }

    print(math.gcd(54, 24));
    return 0;
}
```

::: tip integer-only for now
`std.math` currently works on `int`. There is no floating-point surface yet, and `u8` arithmetic is still intentionally excluded.
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
