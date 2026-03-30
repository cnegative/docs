# `std.net`

`std.net` is now the first real networking slice in `cnegative`.

It stays deliberately small and beginner-first:

- blocking IPv4 TCP and UDP only
- raw socket/listener handles as `int`
- simple text helpers still available
- no async runtime and no DNS layer

## Import

```cneg
import std.net as net;
```

## Current API

- `net.is_ipv4(str) -> bool`
- `net.join_host_port(str, int) -> str`
- `net.tcp_connect(str, int) -> result int`
- `net.tcp_listen(str, int) -> result int`
- `net.accept(int) -> result int`
- `net.send(int, str) -> result int`
- `net.recv(int, int) -> result str`
- `net.UdpPacket { host:str; port:int; data:str }`
- `net.udp_bind(str, int) -> result int`
- `net.udp_send_to(int, str, int, str) -> result int`
- `net.udp_recv_from(int, int) -> result net.UdpPacket`
- `net.close(int) -> result bool`

## Example

```cneg
import std.net as net;
import std.strings as strings;

fn:int main() {
    let endpoint:str = net.join_host_port("127.0.0.1", 8080);
    if strings.eq(endpoint, "127.0.0.1:8080") == false {
        free endpoint;
        return 1;
    }

    free endpoint;
    return 0;
}
```

## Blocking TCP example

```cneg
import std.net as net;
import std.strings as strings;

fn:int main() {
    let socket:result int = net.tcp_connect("127.0.0.1", 34567);
    if socket.ok == false {
        return 1;
    }

    if socket.ok {
        let sent:result int = net.send(socket.value, "ping");
        if sent.ok == false {
            let closed:result bool = net.close(socket.value);
            if closed.ok == false {
                return 2;
            }
            return 3;
        }

        let reply:result str = net.recv(socket.value, 32);
        if reply.ok == false {
            let closed:result bool = net.close(socket.value);
            if closed.ok == false {
                return 4;
            }
            return 5;
        }

        if reply.ok {
            if strings.eq(reply.value, "pong") == false {
                free reply.value;
                let closed:result bool = net.close(socket.value);
                if closed.ok == false {
                    return 6;
                }
                return 7;
            }

            free reply.value;
        }

        let closed:result bool = net.close(socket.value);
        if closed.ok == false {
            return 8;
        }
    }

    return 0;
}
```

## Blocking UDP example

```cneg
import std.net as net;
import std.strings as strings;

fn:int main() {
    let socket:result int = net.udp_bind("", 34567);
    if socket.ok == false {
        return 1;
    }

    if socket.ok {
        let packet:result net.UdpPacket = net.udp_recv_from(socket.value, 64);
        if packet.ok == false {
            let closed:result bool = net.close(socket.value);
            if closed.ok == false {
                return 2;
            }
            return 3;
        }

        if packet.ok {
            if strings.eq(packet.value.data, "ping") == false {
                free packet.value.host;
                free packet.value.data;
                let closed:result bool = net.close(socket.value);
                if closed.ok == false {
                    return 4;
                }
                return 5;
            }

            free packet.value.host;
            free packet.value.data;
        }

        let closed:result bool = net.close(socket.value);
        if closed.ok == false {
            return 6;
        }
    }

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

## Current behavior

- `tcp_connect(host, port)` opens a blocking IPv4 TCP client connection.
- `tcp_listen(host, port)` opens a blocking IPv4 TCP listener.
- `accept(listener)` blocks until one client connects.
- `send(socket, text)` blocks until the full string is written or the send fails.
- `recv(socket, max_bytes)` blocks until a chunk arrives or the peer closes.
- `udp_bind(host, port)` opens a blocking IPv4 UDP socket bound to a local address.
- `udp_send_to(socket, host, port, text)` sends one full UDP datagram.
- `udp_recv_from(socket, max_bytes)` blocks until one datagram arrives and returns a `UdpPacket`.
- `close(handle)` closes a socket or listener.

::: warning raw handles
Current socket and listener handles are plain `int` values. This is explicit and low-level by design, but it means the language does not yet give you an opaque socket type.
:::

::: tip ownership
`net.join_host_port(...)` returns an owned string. Free it after use.
`net.recv(...)` also returns an owned string on success.
`net.udp_recv_from(...)` returns a packet where `packet.host` and `packet.data` are both owned strings and should be freed after use.
:::

::: info platform model
Linux and macOS lower through POSIX/BSD sockets. Windows lowers through Winsock.
:::

::: warning not full networking
There is still no async/event loop model, HTTP client/server layer, TLS, or DNS convenience API here yet.
:::
