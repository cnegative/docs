# `std.net`

`std.net` is the first networking slice in `cnegative`.

It is deliberately small and beginner-first:

- blocking IPv4 TCP and UDP only
- raw socket/listener handles as `int`
- simple text helpers
- no async runtime
- no HTTP, TLS, or DNS convenience layer

If you are brand new to the language, you can skip this page for now and come back later.

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

## The easiest functions to understand first

Start with these:

- `net.is_ipv4(...)`
- `net.join_host_port(...)`

Example:

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

## What “blocking” means

Blocking means the program waits at that call until the operation finishes.

For example:

- `accept(...)` waits for a client
- `recv(...)` waits for data
- `udp_recv_from(...)` waits for one datagram

That is simpler for beginners than async/event-loop networking.

## TCP in one sentence

TCP is the connected path:

- connect to a peer
- send text
- receive text
- close the socket

## UDP in one sentence

UDP is the datagram path:

- bind a socket
- send one packet
- receive one packet
- check who sent it

## TCP example

```cneg
import std.net as net;

fn:int main() {
    let socket:result int = net.tcp_connect("127.0.0.1", 34567);
    if socket.ok == false {
        return 1;
    }

    let closed:result bool = net.close(socket.value);
    if closed.ok == false {
        return 2;
    }

    return 0;
}
```

## UDP example

```cneg
import std.net as net;

fn:int main() {
    let socket:result int = net.udp_bind("", 34567);
    if socket.ok == false {
        return 1;
    }

    let closed:result bool = net.close(socket.value);
    if closed.ok == false {
        return 2;
    }

    return 0;
}
```

## Ownership notes

- `net.join_host_port(...)` returns an owned string
- `net.recv(...)` returns an owned string on success
- `net.udp_recv_from(...)` returns a packet where `packet.host` and `packet.data` are both owned strings

::: warning raw handles
Socket and listener handles are plain `int` values right now. This is explicit and low-level by design.
:::

::: info platform model
Linux and macOS lower through POSIX/BSD sockets. Windows lowers through Winsock.
:::

::: warning not full networking
There is still no async/event loop model, HTTP client/server layer, TLS, or DNS convenience API here yet.
:::
