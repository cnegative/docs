# Standard Library Overview

The `cnegative` standard library is still intentionally small. It exists to make common beginner tasks practical without hiding the language's explicit style.

## Current modules

- `std.math` for small integer helpers
- `std.strings` for string helpers
- `std.parse` for turning text into typed values
- `std.fs` for file and directory work
- `std.io` for simple terminal input and output
- `std.env` for environment variables
- `std.path` for path manipulation
- `std.time` for basic timing
- `std.net` for a very small network-adjacent helper surface
- `std.process` for target/process helpers

::: info not a giant runtime
This is not a full batteries-included platform yet. The current stdlib is the first practical slice.
:::

## What is owned and what must be freed?

Some stdlib functions return owned runtime strings. Those can and should be released with `free`.

Current owned-string stdlib producers:

- `std.process.platform(...)`
- `std.process.arch(...)`
- `std.strings.copy(...)`
- `std.strings.concat(...)`
- `std.fs.read_text(...)` on success
- `std.fs.cwd(...)` on success
- `std.io.read_line()`
- `std.env.get(...)` on success
- `std.path.join(...)`
- `std.path.file_name(...)`
- `std.path.stem(...)`
- `std.path.extension(...)`
- `std.path.parent(...)` on success
- `std.net.join_host_port(...)`

## Recommended reading order

1. [Strings & Parse](/stdlib/strings-and-parse)
2. [Math & Process](/stdlib/math-and-process)
3. [Files & IO](/stdlib/files-and-io)
4. [Env, Path & Time](/stdlib/env-path-time)
5. [Net](/stdlib/net)

## Example

```cneg
import std.strings as strings;
import std.fs as fs;

fn:int main() {
    let cwd:result str = fs.cwd();
    if cwd.ok == false {
        return 1;
    }

    if cwd.ok {
        print(strings.len(cwd.value));
        free cwd.value;
    }

    return 0;
}
```
