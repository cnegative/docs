import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/docs/',
  title: "cnegative",
  description: "A minimal, hackable systems language for learning explicit low-level programming.",
  appearance: 'dark',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Sans:wght@400;500;600&display=swap' }]
  ],
  markdown: {
    languageAlias: {
      cneg: 'c',
      cnegative: 'c'
    },
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Docs', link: '/' },
      { text: 'GitHub', link: 'https://github.com/cnegative/cnegative' }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Overview', link: '/' },
          { text: 'Installation', link: '/getting-started/install' },
          { text: 'First Program', link: '/getting-started/quickstart' },
          { text: 'Build & CLI', link: '/getting-started/build' }
        ]
      },
      {
        text: 'Language',
        items: [
          { text: 'Language Map', link: '/language/spec' },
          { text: 'Functions & Variables', link: '/language/functions-and-variables' },
          { text: 'Types & Control Flow', link: '/language/types-and-control-flow' },
          { text: 'Structs & Arrays', link: '/language/structs-and-arrays' },
          { text: 'Modules & Constants', link: '/language/modules-and-constants' },
          { text: 'Memory & Results', link: '/language/memory-and-results' },
          { text: 'Strings & Ownership', link: '/language/strings-and-ownership' }
        ]
      },
      {
        text: 'Standard Library',
        items: [
          { text: 'Overview', link: '/stdlib/overview' },
          { text: 'Strings & Parse', link: '/stdlib/strings-and-parse' },
          { text: 'Bytes & Text', link: '/stdlib/bytes-and-text' },
          { text: 'Files & IO', link: '/stdlib/files-and-io' },
          { text: 'Terminal', link: '/stdlib/term' },
          { text: 'Math & Process', link: '/stdlib/math-and-process' },
          { text: 'Env, Path & Time', link: '/stdlib/env-path-time' },
          { text: 'Net', link: '/stdlib/net' },
          { text: 'X11', link: '/stdlib/x11' }
        ]
      },
      {
        text: 'Compiler',
        items: [
          { text: 'Pipeline', link: '/compiler/pipeline' },
          { text: 'Typed IR', link: '/compiler/typed-ir' },
          { text: 'LLVM Backend', link: '/compiler/llvm' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Error Codes', link: '/reference/errors' },
          { text: 'Project Rules', link: '/reference/rules' },
          { text: 'Roadmap', link: '/roadmap' }
        ]
      }
    ],
    footer: {
      message: 'cnegative docs track the current v0.4.0 compiler surface.',
      copyright: 'Apache-2.0'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cnegative/cnegative' }
    ],
    editLink: {
      pattern: 'https://github.com/cnegative/docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
