# Math, Process & IPC

These modules are small, but useful.

They are not the first things most beginners need, but they become handy quickly once you start writing real tools.

## `std.math`

Use `std.math` for small integer helpers.

```cneg
import std.math as math;
```

Current API:

- `math.abs(int) -> int`
- `math.sign(int) -> int`
- `math.square(int) -> int`
- `math.cube(int) -> int`
- `math.is_even(int) -> bool`
- `math.is_odd(int) -> bool`
- `math.min(int, int) -> int`
- `math.max(int, int) -> int`
- `math.clamp(int, int, int) -> int`
- `math.gcd(int, int) -> int`
- `math.lcm(int, int) -> int`
- `math.distance(int, int) -> int`
- `math.between(int, int, int) -> bool`

## Small example

```cneg
import std.math as math;

fn:int main() {
    let sample:int = 20;
    let remainder:int = sample % 6;
    let bounded:int = math.clamp(20, 0, 7);

    if math.is_even(remainder + bounded) == false {
        return 1;
    }

    print(math.gcd(54, 24));
    return 0;
}
```

::: tip integer-only for now
`std.math` currently works on `int`. There is no floating-point surface yet, and `u8` arithmetic is still intentionally excluded.
:::

## `std.process`

Use `std.process` for small facts about the running target/process.

```cneg
import std.process as process;
```

Current API:

- `process.platform() -> str`
- `process.arch() -> str`
- `process.exit(int) -> void`

## Small example

```cneg
import std.process as process;

fn:int main() {
    let platform:str = process.platform();
    let arch:str = process.arch();

    print(platform);
    print(arch);

    free platform;
    free arch;
    return 0;
}
```

What to notice:

- `platform()` and `arch()` return owned strings
- that is why both are freed

## `std.ipc`

Use `std.ipc` when you want to talk to another program without FFI.

```cneg
import std.ipc as ipc;
```

Current API:

- `ipc.Child { handle:ptr u8 }`
- `ipc.spawn(str, slice str) -> result ptr ipc.Child`
- `ipc.stdin_write(ptr ipc.Child, str) -> result int`
- `ipc.stdin_write_line(ptr ipc.Child, str) -> result int`
- `ipc.stdin_close(ptr ipc.Child) -> result bool`
- `ipc.stdout_read(ptr ipc.Child, int) -> result str`
- `ipc.stdout_read_line(ptr ipc.Child, int) -> result str`
- `ipc.request_line(ptr ipc.Child, str, int) -> result str`
- `ipc.stderr_read(ptr ipc.Child, int) -> result str`
- `ipc.stderr_read_line(ptr ipc.Child, int) -> result str`
- `ipc.wait(ptr ipc.Child) -> result int`
- `ipc.kill(ptr ipc.Child) -> result bool`
- `ipc.release(ptr ipc.Child) -> result bool`

### Why this matters

This is the first cross-language interop layer in `cnegative`.

You can:

- spawn Python, Go, Rust, Node, or shell-style helper programs
- send text to their stdin
- read raw text chunks from stdout and stderr
- read one protocol line at a time for JSON-lines or line-based tools
- do a one-line request / one-line reply exchange with `request_line(...)`
- wait for exit status

The current slice is intentionally:

- blocking
- text-first
- explicit `program + args`, not one big shell command string

### Small example

```cneg
import std.ipc as ipc;
import std.process as process;
import std.strings as strings;

fn:result str python_program() {
    let platform:str = process.platform();
    if strings.eq(platform, "windows") {
        free platform;
        return ok "python";
    }
    free platform;
    return ok "python3";
}

fn:result int run() {
    try program = python_program();
    let args:str[2] = [
        "-c",
        `import json
import sys

line = sys.stdin.readline()
data = json.loads(line)
sys.stdout.write(json.dumps({"tag":"ok","text":data["text"].upper()}, separators=(",", ":")) + "\n")
sys.stderr.write("ready\n")`
    ];

    try child = ipc.spawn(program, args);
    try out = ipc.request_line(child, `{"text":"hello"}`, 256);
    if ipc.stdin_close(child).ok == false {
        free out;
        ipc.release(child);
        return err;
    }

    try err_text = ipc.stderr_read_line(child, 64);
    try status = ipc.wait(child);

    free err_text;
    free out;
    ipc.release(child);
    return ok status;
}
```

### Ownership note

- `stdout_read(...)` and `stdout_read_line(...)` return owned `str`
- `request_line(...)` also returns an owned `str`
- `stderr_read(...)` and `stderr_read_line(...)` return owned `str`
- `release(...)` frees the child handle and closes the pipes
- call `wait(...)` before `release(...)` when you care about the exit code

## Beginner recommendation

Start with:

- `math.min(...)`
- `math.max(...)`
- `math.clamp(...)`
- `process.platform()`

Come back to `std.ipc` when you start building tools that need to call other programs.

Those are the simplest helpers on this page.
