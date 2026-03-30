# Env, Path & Time

These modules help with the environment around your program:

- environment variables
- file paths
- time

## `std.env`

Use `std.env` when you want to read environment variables.

```cneg
import std.env as env;
```

Current API:

- `env.has(str) -> bool`
- `env.get(str) -> result str`

`env.get(...)` returns an owned string on success.

## `std.path`

Use `std.path` when you want path helpers instead of hand-building strings.

```cneg
import std.path as path;
```

Current API:

- `path.join(str, str) -> str`
- `path.file_name(str) -> str`
- `path.stem(str) -> str`
- `path.extension(str) -> str`
- `path.is_absolute(str) -> bool`
- `path.parent(str) -> result str`

These helpers understand both `/` and `\\` separators.

## `std.time`

Use `std.time` for simple timing helpers.

```cneg
import std.time as time;
```

Current API:

- `time.now_ms() -> int`
- `time.sleep_ms(int) -> void`

## Small example

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

What to notice:

- `path.join(...)` returns an owned string
- that is why `file` is freed
- `env.has(...)` is the simpler check when you only need yes/no

::: tip beginner rule
Use `std.path` instead of hardcoding separators yourself. It keeps examples clearer and more portable.
:::
