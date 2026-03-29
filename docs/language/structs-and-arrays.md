# Structs & Arrays

After functions and control flow, the next beginner step is grouped data.

## Structs

Use `struct` for private types and `pstruct` for exported types. Fields end with `;`.

```cneg
pstruct Point {
    x:int;
    y:int;
}
```

Construct a value with a struct literal:

```cneg
fn:int main() {
    let p:Point = Point {
        x:1,
        y:2
    };

    return p.x;
}
```

Access fields with `.`:

```cneg
let score:int = user.score;
```

## Arrays

Arrays have an explicit element type and fixed length.

```cneg
let xs:int[3] = [1, 2, 3];
```

Read and write by index:

```cneg
let first:int = xs[0];
xs[1] = 10;
```

## What the compiler checks

- struct field names must exist
- array literal size must match the declared length
- indexing only works on indexable values

## Next step

Continue to [Modules & Constants](/language/modules-and-constants).
