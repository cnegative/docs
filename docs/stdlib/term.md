# `std.term`

`std.term` is the low-level terminal module.

If you only want normal line-based input and output, start with `std.io`.

Use `std.term` when you need things like:

- checking whether the program is attached to a real terminal
- reading the terminal size
- clearing the screen or the current line
- moving, saving, and restoring the cursor
- switching to the alternate screen buffer
- entering raw mode
- reading raw bytes or timed input events
- reacting to key, mouse, resize, and paste events
- changing colors and styles
- keeping a back buffer and only repainting changed cells

This is the foundation layer for future TUI libraries. It is not the final widget framework.

## Import

```cneg
import std.term as term;
```

## The short mental model

Think about `std.term` as three low-level jobs:

1. control the terminal
2. read structured input
3. render a buffer efficiently

That means most terminal programs built on `std.term` follow this shape:

1. check that you are in a real terminal
2. switch modes if needed
3. read bytes or events
4. update your own state
5. write directly, or repaint through buffers
6. restore the terminal before exiting

If you keep that flow in mind, the API reads much more naturally.

## Current API

### Terminal state and capability checks

- `term.is_tty() -> bool`
- `term.columns() -> result int`
- `term.rows() -> result int`
- `term.term_name() -> result str`
- `term.supports_truecolor() -> bool`
- `term.supports_256color() -> bool`
- `term.supports_unicode() -> bool`
- `term.supports_mouse() -> bool`

`term.term_name()` returns an owned string on success, so free it when you are done.

### Screen and cursor control

- `term.write(str) -> void`
- `term.flush() -> void`
- `term.clear() -> void`
- `term.clear_line() -> void`
- `term.clear_line_left() -> void`
- `term.clear_line_right() -> void`
- `term.move_cursor(int, int) -> void`
- `term.save_cursor() -> void`
- `term.restore_cursor() -> void`
- `term.hide_cursor() -> void`
- `term.show_cursor() -> void`
- `term.enter_alt_screen() -> void`
- `term.leave_alt_screen() -> void`
- `term.set_scroll_region(int, int) -> void`
- `term.reset_scroll_region() -> void`

`move_cursor(row, column)` and `set_scroll_region(top, bottom)` use zero-based numbers at the language level. The runtime converts them to the terminal's one-based escape-sequence format.

Use this group when you want to:

- clear the screen
- move around manually
- switch into the alternate screen
- hide the cursor while drawing

### Raw input

- `term.enter_raw_mode() -> result bool`
- `term.leave_raw_mode() -> result bool`
- `term.read_byte() -> result int`
- `term.read_byte_timeout(int) -> result int`
- `term.read_event() -> result term.Event`
- `term.read_event_timeout(int) -> result term.Event`
- `term.read_paste() -> result str`
- `term.enable_mouse() -> void`
- `term.disable_mouse() -> void`
- `term.enable_bracketed_paste() -> void`
- `term.disable_bracketed_paste() -> void`

`read_byte_timeout(...)` and `read_event_timeout(...)` are the polling-friendly versions. Pass `0` if you want an immediate "nothing ready" result instead of blocking.

Use this group when you want to:

- build a live key loop
- react to resize and mouse input
- detect bracketed paste cleanly
- avoid blocking forever while waiting for input

### Style and colors

- `term.set_style(int, int, int) -> void`
- `term.reset_style() -> void`
- `term.rgb(int, int, int) -> int`
- `term.COLOR_DEFAULT`
- `term.COLOR_BLACK` through `term.COLOR_WHITE`
- `term.COLOR_BRIGHT_BLACK` through `term.COLOR_BRIGHT_WHITE`
- `term.ATTR_NONE`
- `term.ATTR_BOLD`
- `term.ATTR_DIM`
- `term.ATTR_ITALIC`
- `term.ATTR_UNDERLINE`
- `term.ATTR_BLINK`
- `term.ATTR_REVERSE`
- `term.ATTR_STRIKETHROUGH`

Use `rgb(r, g, b)` when you want truecolor and pass the returned value into `set_style(...)`.

This part is intentionally simple:

- color and style are just terminal rendering state
- you set them before output
- you reset them when you are done

### Width helpers

- `term.codepoint_width(int) -> int`
- `term.string_width(str) -> int`
- `term.decode_codepoint(str, int) -> result int`
- `term.next_codepoint_offset(str, int) -> result int`

These helpers are useful when you want to do terminal layout math and not just count bytes.

That matters because terminal width is about displayed columns, not source bytes.

The two decode helpers matter if you want to build text renderers in `cnegative` itself:

- `decode_codepoint(text, offset)` gives you the codepoint at a byte offset
- `next_codepoint_offset(text, offset)` tells you where the next codepoint starts

That is the bridge between raw UTF-8 strings and higher-level TUI drawing code.

### Screen buffers

- `term.Cell { code:int; fg:int; bg:int; attrs:int; wide:bool }`
- `term.Buffer { width:int; height:int; cells:ptr term.Cell }`
- `term.Clip { row:int; column:int; height:int; width:int }`
- `term.buffer_new(int, int) -> result ptr term.Buffer`
- `term.buffer_resize(ptr term.Buffer, int, int, term.Cell) -> result bool`
- `term.buffer_free(ptr term.Buffer) -> result bool`
- `term.buffer_clear(ptr term.Buffer, term.Cell) -> result bool`
- `term.buffer_set(ptr term.Buffer, int, int, term.Cell) -> result bool`
- `term.buffer_get(ptr term.Buffer, int, int) -> result term.Cell`
- `term.render_diff(ptr term.Buffer, ptr term.Buffer) -> result bool`
- `term.render_diff_clip(ptr term.Buffer, ptr term.Buffer, term.Clip) -> result bool`

`buffer_set(...)` now auto-detects wide codepoints and normalizes the stored cell for the renderer.

This is the part you use when you stop thinking in terms of "print this now" and start thinking in terms of "what should the screen look like next?"

### Event type

```cneg
term.Event {
    kind:int,
    code:int,
    modifiers:int,
    row:int,
    column:int
}
```

Current event kinds:

- `term.EVENT_KEY`
- `term.EVENT_MOUSE`
- `term.EVENT_RESIZE`
- `term.EVENT_PASTE`

Current modifier bits:

- `term.MOD_SHIFT`
- `term.MOD_ALT`
- `term.MOD_CTRL`

Useful key constants:

- `term.KEY_ESCAPE`
- `term.KEY_ENTER`
- `term.KEY_TAB`
- `term.KEY_BACKSPACE`
- `term.KEY_UP`
- `term.KEY_DOWN`
- `term.KEY_LEFT`
- `term.KEY_RIGHT`
- `term.KEY_HOME`
- `term.KEY_END`
- `term.KEY_PAGE_UP`
- `term.KEY_PAGE_DOWN`
- `term.KEY_INSERT`
- `term.KEY_DELETE`
- `term.KEY_F1` through `term.KEY_F12`

Useful mouse constants:

- `term.MOUSE_LEFT`
- `term.MOUSE_MIDDLE`
- `term.MOUSE_RIGHT`
- `term.MOUSE_RELEASE`
- `term.MOUSE_MOVE`
- `term.MOUSE_SCROLL_UP`
- `term.MOUSE_SCROLL_DOWN`

## A practical way to read this module

If you are an intermediate developer, this is the easiest way to approach `std.term`:

1. learn screen control first
2. then learn timed input
3. then learn styles
4. then learn buffers and diff rendering

In other words:

- first make the terminal move
- then make it react
- then make it look better
- finally make it efficient

## What to learn first

Read the module in this order:

1. `is_tty()`
2. `columns()` and `rows()`
3. `write()` and `flush()`
4. `clear()`, `clear_line()`, and `move_cursor()`
5. `enter_raw_mode()` and `leave_raw_mode()`
6. `read_byte_timeout(0)`
7. `read_event_timeout(0)`
8. `set_style()` and `rgb(...)`
9. `codepoint_width()` and `string_width()`
10. `Cell`, `Buffer`, `Clip`, and `render_diff()`

That order keeps the mental model simple.

## A small screen-control example

```cneg
import std.term as term;

fn:int main() {
    if term.is_tty() {
        term.enter_alt_screen();
        term.save_cursor();
        term.clear();
        term.move_cursor(0, 0);
        term.write("hello from std.term");
        term.restore_cursor();
        term.leave_alt_screen();
        term.flush();
    }

    return 0;
}
```

## A small polling example

```cneg
import std.term as term;

fn:int main() {
    let raw:result bool = term.enter_raw_mode();

    if raw.ok {
        term.enable_mouse();
        term.enable_bracketed_paste();

        let event:result term.Event = term.read_event_timeout(0);

        if event.ok {
            if event.value.kind == term.EVENT_PASTE {
                let pasted:result str = term.read_paste();

                if pasted.ok {
                    free pasted.value;
                }
            }
        }

        term.disable_bracketed_paste();
        term.disable_mouse();
        let restored:result bool = term.leave_raw_mode();

        if restored.ok == false {
            return 1;
        }
    }

    return 0;
}
```

## A small color example

```cneg
import std.term as term;

fn:int main() {
    let accent:int = term.rgb(12, 120, 220);
    term.set_style(accent, term.COLOR_DEFAULT, term.ATTR_BOLD);
    term.write("highlighted");
    term.reset_style();
    term.write("\n");
    term.flush();
    return 0;
}
```

## The buffer mental model

Think about rendering with two buffers:

- `back`: what you want the terminal to look like next
- `front`: what the terminal currently looks like

Then call `render_diff(back, front)`.

That helper:

- compares the two buffers
- moves the cursor only where needed
- skips redundant cursor moves across adjacent changed cells
- writes only changed cells
- copies the rendered cells into `front`
- resets the style and flushes output

If you only want to repaint part of the screen, use `render_diff_clip(back, front, clip)` instead.

This is the primitive layer for building a real TUI renderer on top.

If your program is tiny, you may never need buffers at all.  
If your program has a full screen, panels, status bars, or repeated redraws, buffers become the right model.

## Important detail: raw mode

Raw mode turns off the usual cooked terminal behavior.

That usually means:

- no line buffering
- no automatic echo
- input becomes immediate instead of waiting for Enter

Important rule:

- if `enter_raw_mode()` succeeds, leave it again with `leave_raw_mode()`

That restore step matters more than almost anything else in terminal programming. A broken raw terminal is one of the easiest ways to make a tool feel unreliable.

## Important detail: `Buffer` is mostly a runtime handle

`term.Buffer` exposes:

- `width`
- `height`
- `cells`

But for normal code, treat it as a runtime-owned buffer handle and use:

- `buffer_clear(...)`
- `buffer_resize(...)`
- `buffer_set(...)`
- `buffer_get(...)`
- `render_diff(...)`
- `render_diff_clip(...)`

The raw `cells` pointer is there because the runtime really is storing an array of cells underneath, not because beginner code should manipulate it directly first.

## Important detail: wide cells are still primitive

`codepoint_width(...)` and `string_width(...)` now exist, and `buffer_set(...)` auto-detects wide codepoints, but this is still a primitive model:

- no full grapheme-cluster layout yet
- no widget-level text wrapping yet
- no higher-level text shaping yet

## Current scope

The current slice includes:

- terminal detection
- terminal size
- terminal capability checks
- ANSI-style screen and cursor control
- alternate screen
- scroll-region helpers
- raw mode
- raw and timed input reads
- normalized key, mouse, resize, and paste events
- Unix resize detection that is signal-backed before size re-query
- bracketed paste reads
- style and color helpers
- width helpers
- UTF-8 stepping helpers for higher-level text drawing
- cell and buffer types
- buffer resize
- diff-based rendering
- clipped diff-based rendering

Not here yet:

- layout primitives
- full widget primitives inside `std.term` itself

What changed recently is the layering:

- `std.term` still stays low-level
- higher-level terminal libraries can build on top of it later

::: warning low-level module
`std.term` is still a primitive layer. It does not give you layouts, widgets, panels, or a full-screen app framework yet.
:::
