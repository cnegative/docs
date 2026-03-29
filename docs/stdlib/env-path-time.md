# Env, Path & Time

These modules help with practical program context: environment variables, path manipulation, and timing.

## `std.env`

```cneg
import std.env as env;
```

- `env.has(str) -> bool`
- `env.get(str) -> result str`

`env.get(...)` returns an owned string on success.

## `std.path`

```cneg
import std.path as path;
```

- `path.join(str, str) -> str`
- `path.file_name(str) -> str`
- `path.stem(str) -> str`
- `path.extension(str) -> str`
- `path.is_absolute(str) -> bool`
- `path.parent(str) -> result str`

These helpers understand both `/` and `\\` separators.

## `std.time`

```cneg
import std.time as time;
```

- `time.now_ms() -> int`
- `time.sleep_ms(int) -> void`

### Example

```cneg
import std.env as env;
import std.path as path;
import std.time as time;

fn:int main() {
    let start:int = time.now_ms();
    let file:str = path.join("build", "demo.txt");

    if env.has("PATH") == false {
        free file;
        return 1;
    }

    time.sleep_ms(10);
    free file;
    return 0;
}
```

::: tip good beginner rule
Use `std.path` instead of hardcoding separators yourself. It keeps examples clearer and more portable.
:::
