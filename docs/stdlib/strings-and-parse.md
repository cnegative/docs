# Strings & Parse

Start here if you want to do practical text work without leaving the beginner path.

## `std.strings`

```cneg
import std.strings as strings;
```

- `strings.len(str) -> int`
- `strings.copy(str) -> str`
- `strings.concat(str, str) -> str`
- `strings.eq(str, str) -> bool`
- `strings.starts_with(str, str) -> bool`
- `strings.ends_with(str, str) -> bool`

### Example

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

::: warning ownership
`strings.copy(...)` and `strings.concat(...)` return owned strings. Free them when you are done.
:::

## `std.parse`

```cneg
import std.parse as parse;
```

- `parse.to_int(str) -> result int`
- `parse.to_bool(str) -> result bool`

### Example

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

::: tip use `result` directly
Parsing is fallible. The API stays explicit instead of quietly defaulting on bad input.
:::
