# Structs & Arrays

After functions and control flow, the next beginner step is grouped data.

This page covers two ideas:

- a **struct** groups named fields
- an **array** groups many values of the same type

## Structs

Use a struct when one value needs several named pieces inside it.

```cneg
struct Point {
    x:int;
    y:int;
}
```

Read that as:

- `Point` is the type name
- `x` and `y` are named fields
- each field ends with `;`

Create a value with a struct literal:

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

Use `pstruct` instead of `struct` when the type should be public to other modules.

## Arrays

Use an array when you want a fixed number of values with the same type.

```cneg
let xs:int[3] = [1, 2, 3];
```

Read that as:

- `int[3]` means “array of three `int` values”
- `[1, 2, 3]` is the array literal

Read by index:

```cneg
let first:int = xs[0];
```

Write by index:

```cneg
let mut xs:int[3] = [1, 2, 3];
xs[1] = 10;
```

## When to use which?

Use a struct when:

- the parts have different meanings
- names matter
- you want code like `player.score`

Use an array when:

- every item has the same type
- order matters more than names
- you want code like `values[2]`

## One small example with both

```cneg
struct Player {
    score:int;
    history:int[3];
}

fn:int main() {
    let recent:int[3] = [4, 7, 9];
    let player:Player = Player {
        score:recent[2],
        history:recent
    };

    return player.history[1];
}
```

## Common beginner mistakes

### 1. Forgetting field names in a struct literal

This is invalid:

```cneg
let p:Point = Point { 1, 2 };
```

Write:

```cneg
let p:Point = Point {
    x:1,
    y:2
};
```

### 2. Using the wrong array length

This is invalid:

```cneg
let xs:int[3] = [1, 2];
```

The array literal must match the declared length.

### 3. Indexing something that is not an array

Only indexable values can use `[index]`.

## What the compiler checks

- struct field names must exist
- struct field values must match the field type
- array literal size must match the declared length
- indexing only works on indexable values

## Next step

Continue to [Modules & Constants](/language/modules-and-constants).
