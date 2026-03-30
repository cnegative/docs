# Strings & Ownership

Strings are one of the first places where beginners ask:

> “When do I need to `free` this?”

That is a good question.

The answer in `cnegative` is intentionally simple:

- string literals are just fixed program text
- some runtime operations create owned strings
- owned strings should be freed when you are done with them

## Start with the easy case: string literals

```cneg
let greeting:str = "hello";
```

That literal is part of the program itself.

You can pass it around and compare it, but it is not the same thing as a heap-created runtime string.

## What is an owned string?

An owned string is a string value that the runtime created for you.

Because the runtime created it, you are responsible for freeing it later.

The good beginner rule is:

> if the runtime had to make a new string for you, free it when you are done

## The simplest owned-string example

```cneg
fn:int main() {
    let copied:str = str_copy("hello");
    print(copied);
    free copied;
    return 0;
}
```

What happened here:

- `"hello"` is a literal
- `str_copy(...)` creates a new owned string
- `free copied;` releases that owned string

## Another common example: concatenation

```cneg
fn:int main() {
    let left:str = str_copy("hello");
    let joined:str = str_concat(left, " world");
    print(joined);
    free left;
    free joined;
    return 0;
}
```

Both `left` and `joined` are owned here, so both should be freed.

## Input example

`input()` also creates a new runtime string:

```cneg
fn:int main() {
    let name:str = input();
    print(name);
    free name;
    return 0;
}
```

## Current owned string producers

Right now, owned runtime strings come from:

- `input()`
- `str_copy(s)`
- `str_concat(a, b)`
- `std.io.read_line()`
- `std.strings.copy(s)`
- `std.strings.concat(a, b)`
- `std.fs.read_text(path)` on success
- `std.fs.cwd()` on success
- `std.env.get(name)` on success
- `std.path.join(...)`
- `std.path.file_name(...)`
- `std.path.stem(...)`
- `std.path.extension(...)`
- `std.path.parent(...)` on success
- `std.net.join_host_port(...)`
- `std.net.recv(...)` on success
- the `host` and `data` fields from successful `std.net.udp_recv_from(...)`
- `std.process.platform()`
- `std.process.arch()`

::: tip you do not need to memorize the full list
The practical beginner rule is enough:
if the runtime created a new string for you, free it when you are done.
:::

## What if I free a literal?

In the current runtime, freeing a string literal is a safe no-op.

That does not mean you should rely on it as a style. It just means the runtime will not explode if you make that mistake.

## Beginner summary

- literals like `"hello"` are easy
- copied/concatenated/read/input strings are usually owned
- owned strings should be freed

::: warning current boundary
This is still a deliberately small ownership model, not a giant string runtime with many hidden rules.
:::

## Next step

If you want practical helper modules next, go to [Standard Library Overview](/stdlib/overview).
