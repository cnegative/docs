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
- `std.net` for blocking IPv4 TCP/UDP plus a few text helpers
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
- `std.net.recv(...)` on success
- the `host` and `data` fields from successful `std.net.udp_recv_from(...)`

## Recommended reading order

1. [Strings & Parse](/stdlib/strings-and-parse)
2. [Math & Process](/stdlib/math-and-process)
3. [Files & IO](/stdlib/files-and-io)
4. [Env, Path & Time](/stdlib/env-path-time)
5. [Net](/stdlib/net)

## Example

```cneg
import std.net as net;

fn:int main() {
    let listener:result int = net.tcp_listen("127.0.0.1", 34567);
    if listener.ok == false {
        return 1;
    }

    if listener.ok {
        let closed:result bool = net.close(listener.value);
        if closed.ok == false {
            return 2;
        }
    }

    return 0;
}
```
