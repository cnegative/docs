# Standard Library Overview

The `cnegative` standard library is intentionally small.

That is good for beginners: you can learn it without feeling like you need a huge ecosystem map first.

## How to use this section

If you are new, do not try to read every module in one pass.

Read in this order:

1. [Strings & Parse](/stdlib/strings-and-parse)
2. [Files & IO](/stdlib/files-and-io)
3. [Math & Process](/stdlib/math-and-process)
4. [Env, Path & Time](/stdlib/env-path-time)
5. [Net](/stdlib/net)
6. [X11](/stdlib/x11)

That order goes from “ordinary small programs” to “host/platform experiments”.

## Current modules

- `std.math` for small integer helpers
- `std.strings` for string helpers
- `std.parse` for turning text into typed values
- `std.fs` for file and directory work
- `std.io` for simple terminal input and output
- `std.env` for environment variables
- `std.path` for path manipulation
- `std.time` for basic timing
- `std.net` for blocking IPv4 TCP/UDP plus a few text helpers
- `std.process` for target/process helpers
- `std.x11` for an experimental Linux-only real-window stress-test path

::: info not a giant runtime
This is not a full batteries-included platform yet. The current stdlib is the first practical slice.
:::

::: warning experimental host module
`std.x11` is intentionally tiny and Linux-only right now. It exists to stress-test real host window integration before a broader interop story exists.
:::

## What is owned and what must be freed?

Some stdlib functions return owned runtime strings. Those should be released with `free`.

Current owned-string stdlib producers include:

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
- `std.net.recv(...)` on success
- the `host` and `data` fields from successful `std.net.udp_recv_from(...)`

## Beginner recommendation

If you are writing your first few programs, start with:

- `std.io`
- `std.strings`
- `std.fs`
- `std.parse`

You can ignore `std.net` and `std.x11` until the basics feel comfortable.

## Tiny example

```cneg
import std.fs as fs;
import std.io as io;

fn:int main() {
    let ok:result bool = fs.write_text("build/demo.txt", "42");
    if ok.ok == false {
        return 1;
    }

    io.write_line("done");
    return 0;
}
```
