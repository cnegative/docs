# Strings & Ownership

`str` values exist today, but ownership is still intentionally small and explicit.

## String literals

String literals are static program data:

```cneg
let greeting:str = "hello";
```

They are not heap-owned runtime strings.

## Owned string producers

Right now, owned runtime strings come from:

- `input()`
- `str_copy(s)`
- `str_concat(a, b)`

## Example

```cneg
fn:int main() {
    let copied:str = str_copy("hello");
    let joined:str = str_concat(copied, " world");
    print(joined);
    free copied;
    free joined;
    return 0;
}
```

## Input

```cneg
fn:int main() {
    let name:str = input();
    print(name);
    free name;
    return 0;
}
```

## Ownership rule

If a string came from `input()`, `str_copy(...)`, or `str_concat(...)`, it is owned runtime memory and should be released with `free`.

If a string is a literal like `"hello"`, freeing it is a safe no-op in the current runtime.

::: tip current boundary
This is not a full general-purpose string runtime yet. The ownership surface is explicit, small, and intentionally narrow.
:::

## Next step

Go to [Compiler Pipeline](/compiler/pipeline) if you want to see how source moves through `cnegc`.
