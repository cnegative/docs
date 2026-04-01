# Typed IR

After semantic analysis, checked source is lowered to a structured typed IR before LLVM lowering starts.

## Current properties

- independent IR node types instead of reusing the parser AST
- builtin primitive types currently include `int`, `u8`, `bool`, `str`, and `void`
- composite types currently include arrays, `ptr T`, `result T`, and `slice T`
- canonical module-qualified function, struct, and public constant names
- canonical module-qualified builtin stdlib calls such as `std.math.gcd(...)`, `std.bytes.append(...)`, `std.strings.concat(...)`, `std.text.build(...)`, `std.fs.file_size(...)`, `std.path.extension(...)`, `std.net.join_host_port(...)`, `std.net.udp_recv_from(...)`, and `std.process.platform(...)`
- explicit return statements preserved from source
- structured control flow preserved for `if`, `while`, `loop`, and range `for`
- simple optimization passes run before backend lowering

## Dump the IR

```shell
cnegc ir examples/valid_consts_strings.cneg
```

## Example output

```text
module valid_consts_strings (...) {
    const valid_consts_strings.LOCAL:int = 20;

    fn valid_consts_strings.main() -> int {
        let joined:str = str_concat("hello", " world");
        if true {
            print(joined);
        }
        return 20;
    }
}
```

Builtin stdlib calls remain visible in the IR instead of disappearing too early:

```text
let cwd:result str = std.fs.cwd();
let endpoint:str = std.net.join_host_port("127.0.0.1", 8080);
let packet:result std.net.UdpPacket = std.net.udp_recv_from(socket.value, 64);
let parsed:result int = std.parse.to_int("42");
let remainder:int = sample % 6;
let bounded:int = std.math.clamp(99, 0, 7);
let factor:int = std.math.gcd(54, 24);
let platform:str = std.process.platform();
let view:slice int = slice data;
```

## What the optimizer currently does

- folds constant integer and boolean expressions
- folds string literal equality and inequality
- trims unreachable statements after `return`
- optimizes module constant initializers before backend lowering

::: info purpose of this stage
Typed IR is the compiler checkpoint where typing, symbol resolution, and simple canonical cleanup are already settled before LLVM emission.
:::
