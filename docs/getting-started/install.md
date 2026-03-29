# Installation

Install the prebuilt `cnegc` binary from GitHub Releases. No build tools required for checking and IR dumping. Native output needs Clang.

## Download

Go to [github.com/cnegative/cnegative/releases ↗](https://github.com/cnegative/cnegative/releases) and pick the archive for your platform:

| Platform | Archive |
| --- | --- |
| <span class="badge linux">Linux</span> | `cnegc-<tag>-linux-x86_64.zip` |
| <span class="badge mac">macOS</span> | `cnegc-<tag>-macos-arm64.zip` |
| <span class="badge win">Windows</span> | `cnegc-<tag>-windows-x86_64.zip` |

## Linux & macOS

```shell
unzip cnegc-v0.2.0-dev-linux-x86_64.zip
mkdir -p "$HOME/.local/bin"
cp release/cnegc/cnegc "$HOME/.local/bin/"
chmod +x "$HOME/.local/bin/cnegc"
```

If `~/.local/bin` isn't on your `PATH`, add this to your shell config:

```shell
export PATH="$HOME/.local/bin:$PATH"
```

## Windows

```powershell
# Extract to a stable folder, e.g. C:\tools\cnegc\
# Add that folder to your user PATH
cnegc.exe  # verify it works
```

## What's in the release

- `cnegc` / `cnegc.exe`
- `LICENSE`, `README.md`
- `docs/how-to-run-and-build.md`

::: info native output requires clang
`check`, `ir`, and `llvm-ir` need only `cnegc`. To emit objects or link binaries, you also need `clang-18` or `clang` on your `PATH`.
:::

## After install

- use [Quick Start](/getting-started/quickstart) to write the first program
- use [Build & Run](/getting-started/build) for source builds, tests, and command details
