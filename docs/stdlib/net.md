# `std.net`

`std.net` is the first tiny network-adjacent module in `cnegative`.

It is **not** a socket library yet. It exists to handle two common beginner tasks cleanly:

- validate a dotted IPv4 string
- build a `"host:port"` string

## Import

```cneg
import std.net as net;
```

## Current API

- `net.is_ipv4(str) -> bool`
- `net.join_host_port(str, int) -> str`

## Example

```cneg
import std.net as net;

fn:int main() {
    if net.is_ipv4("127.0.0.1") == false {
        return 1;
    }

    let endpoint:str = net.join_host_port("127.0.0.1", 8080);
    print(endpoint);
    free endpoint;
    return 0;
}
```

## What `is_ipv4(...)` accepts

- dotted decimal like `"127.0.0.1"`
- exactly four numeric parts
- each part in the `0..255` range

## What `is_ipv4(...)` rejects

- missing parts like `"127.0.0"`
- too many parts like `"1.2.3.4.5"`
- non-digits like `"127.0.one.1"`
- out-of-range parts like `"256.0.0.1"`

::: warning not full networking
There are no sockets, listeners, HTTP helpers, or DNS APIs here yet. `std.net` is only the first formatting/validation slice.
:::

::: tip ownership
`net.join_host_port(...)` returns an owned string. Free it after use.
:::
