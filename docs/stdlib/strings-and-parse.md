# Strings & Parse

These are good first stdlib modules because they solve simple, familiar problems:

- work with text
- turn text into typed values

## `std.strings`

Use `std.strings` when you want small text helpers without leaving the beginner path.

```cneg
import std.strings as strings;
```

Current API:

- `strings.len(str) -> int`
- `strings.copy(str) -> str`
- `strings.concat(str, str) -> str`
- `strings.eq(str, str) -> bool`
- `strings.starts_with(str, str) -> bool`
- `strings.ends_with(str, str) -> bool`

## Small example

```cneg
import std.strings as strings;

fn:int main() {
    let left:str = strings.copy("hello");
    let joined:str = strings.concat(left, " world");

    if strings.starts_with(joined, "hello") == false {
        free left;
        free joined;
        return 1;
    }

    print(joined);
    free left;
    free joined;
    return 0;
}
```

What to notice:

- `strings.copy(...)` creates an owned string
- `strings.concat(...)` creates another owned string
- both should be freed

::: warning ownership
`strings.copy(...)` and `strings.concat(...)` return owned strings. Free them when you are done.
:::

## `std.parse`

Use `std.parse` when you have text and want to turn it into a typed value.

```cneg
import std.parse as parse;
```

Current API:

- `parse.to_int(str) -> result int`
- `parse.to_bool(str) -> result bool`

## Small example

```cneg
import std.parse as parse;

fn:int main() {
    let value:result int = parse.to_int("42");
    if value.ok {
        return value.value;
    }
    return 0;
}
```

What to notice:

- parsing can fail
- that is why the return type is `result int`
- you check `.ok` before using `.value`

::: tip parsing stays explicit
`cnegative` does not silently invent fallback values for bad input. The parse either succeeds or it does not.
:::

## Beginner recommendation

Start with these functions first:

- `strings.len(...)`
- `strings.eq(...)`
- `strings.copy(...)`
- `parse.to_int(...)`

That is enough for many first CLI programs.
