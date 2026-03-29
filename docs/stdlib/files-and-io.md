# Files & IO

These modules cover the first useful slice of local file work and terminal IO.

## `std.fs`

```cneg
import std.fs as fs;
```

- `fs.exists(str) -> bool`
- `fs.cwd() -> result str`
- `fs.create_dir(str) -> result bool`
- `fs.remove_dir(str) -> result bool`
- `fs.read_text(str) -> result str`
- `fs.file_size(str) -> result int`
- `fs.copy(str, str) -> result bool`
- `fs.write_text(str, str) -> result bool`
- `fs.append_text(str, str) -> result bool`
- `fs.rename(str, str) -> result bool`
- `fs.move(str, str) -> result bool`
- `fs.remove(str) -> result bool`

### Example

```cneg
import std.strings as strings;
import std.fs as fs;

fn:int main() {
    let text:str = strings.copy("demo");
    let write_ok:result bool = fs.write_text("build/demo.txt", text);
    if write_ok.ok == false {
        free text;
        return 1;
    }

    let size:result int = fs.file_size("build/demo.txt");
    if size.ok == false {
        free text;
        return 2;
    }

    free text;
    return 0;
}
```

::: info metadata and file operations first
The current `std.fs` slice is practical, but still small. You get file text operations, current working directory, byte-size checks, file copy/move helpers, and basic directory creation/removal.
:::

## `std.io`

```cneg
import std.io as io;
```

- `io.write(str) -> void`
- `io.write_line(str) -> void`
- `io.read_line() -> str`

### Example

```cneg
import std.io as io;
import std.strings as strings;

fn:int main() {
    let name:str = io.read_line();
    let message:str = strings.concat("hello ", name);
    io.write_line(message);
    free name;
    free message;
    return 0;
}
```

::: warning ownership
`io.read_line()` returns an owned string. Free it after use.
:::
