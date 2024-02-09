# Tabletop RPG Tools🧰🛠️
(hopefully) the last tool that you'll need for your rpg adventure🦄

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: another [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) use by `web` app
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@repo/tailwind-config`: `tailwind-config` configuration file for [Tailwind CSS](https://tailwindcss.com/)

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Building packages/ui

This app is set up to produce compiled styles for `ui` components into the `dist` directory. The component `.tsx` files are consumed by the Next.js apps directly using `transpilePackages` in `next.config.js`. This was chosen for several reasons:

- Make sharing one `tailwind.config.js` to apps and packages as easy as possible.
- Make package compilation simple by only depending on the Next.js Compiler and `tailwindcss`.
- Ensure Tailwind classes do not overwrite each other. The `ui` package uses a `ui-` prefix for it's classes.
- Maintain clear package export boundaries.

### Utilities

This Turborepo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Pre-reqs

### PNPM
This monorepo uses [PNPM](https://pnpm.io) since [Bun](https://bun.sh/) still isn't fully supported by Turborepo yet, nor does it have the test api in place. Plan is to move over to Bun asap.

Read on how to install `PNPM` in their [official docs](https://pnpm.io/installation).

## How to run

``` bash
pnpm dev
```
