# Files & IO

These modules cover the first practical “real program” tasks:

- read and write files
- print text
- read a line from the terminal

## `std.fs`

Use `std.fs` for local file and directory work.

```cneg
import std.fs as fs;
```

Current API:

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

## Small example

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

What to notice:

- file operations can fail, so many return `result ...`
- `strings.copy(...)` created owned text, so it is freed

## `std.io`

Use `std.io` for terminal-style input/output.

```cneg
import std.io as io;
```

Current API:

- `io.write(str) -> void`
- `io.write_line(str) -> void`
- `io.read_line() -> str`

## Small example

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

## Beginner recommendation

If you are new, start with:

- `io.write_line(...)`
- `io.read_line()`
- `fs.write_text(...)`
- `fs.read_text(...)`

That gives you enough to build small text tools very quickly.
