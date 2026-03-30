# Math & Process

These modules are small, but useful.

They are not the first things most beginners need, but they become handy quickly once you start writing real tools.

## `std.math`

Use `std.math` for small integer helpers.

```cneg
import std.math as math;
```

Current API:

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

## Small example

```cneg
import std.math as math;

fn:int main() {
    let sample:int = 20;
    let remainder:int = sample % 6;
    let bounded:int = math.clamp(20, 0, 7);

    if math.is_even(remainder + bounded) == false {
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

Use `std.process` for small facts about the running target/process.

```cneg
import std.process as process;
```

Current API:

- `process.platform() -> str`
- `process.arch() -> str`
- `process.exit(int) -> void`

## Small example

```cneg
import std.process as process;

fn:int main() {
    let platform:str = process.platform();
    let arch:str = process.arch();

    print(platform);
    print(arch);

    free platform;
    free arch;
    return 0;
}
```

What to notice:

- `platform()` and `arch()` return owned strings
- that is why both are freed

## Beginner recommendation

Start with:

- `math.min(...)`
- `math.max(...)`
- `math.clamp(...)`
- `process.platform()`

Those are the simplest helpers on this page.
