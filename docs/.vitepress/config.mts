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
          { text: 'Quick Start', link: '/getting-started/quickstart' },
          { text: 'Build & Run', link: '/getting-started/build' }
        ]
      },
      {
        text: 'Language',
        items: [
          { text: 'Overview', link: '/language/spec' },
          { text: 'Functions & Variables', link: '/language/functions-and-variables' },
          { text: 'Types & Control Flow', link: '/language/types-and-control-flow' },
          { text: 'Structs & Arrays', link: '/language/structs-and-arrays' },
          { text: 'Modules & Constants', link: '/language/modules-and-constants' },
          { text: 'Memory & Results', link: '/language/memory-and-results' },
          { text: 'Strings & Ownership', link: '/language/strings-and-ownership' }
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
      message: 'cnegative docs track the current v0.2.0-dev compiler surface.',
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
