# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev`: Vite dev server with HMR
- `npm run build`: production build to `dist/`
- `npm run lint`: ESLint (flat config in `eslint.config.js`: recommended JS, react-hooks, react-refresh)
- `npm run preview`: serve the built `dist/`

There is no test framework and there are no tests. Plain JavaScript/JSX (no TypeScript), React 19, react-router-dom v7, Vite 8.

## What the app is

A "digital care package" builder. The user moves through three routed steps:

1. `/` (`OpeningPage`): enter to/from (planned; the inputs are not built yet)
2. `/fill-the-box` (`FillTheBoxPage`): pick items (letter, song, photo, …) to put in the box
3. `/arrival` (`ArrivalPage`): the recipient's view, with a reveal/open animation planned

## Architecture

**State.** `src/context/PackageContext.jsx` holds all package state (`to`, `from`, `items`) in a React context. It wraps the router in `App.jsx`, so the state persists across route changes. Read and write it through the `usePackage()` hook. `addItem(item)` **toggles**: it adds the item, or removes it if an item with the same `id` is already in the box. Nothing is persisted, so a page reload clears the package.

**Layout slots.** Every route renders inside `components/Layout.jsx` via `<Outlet />`. The layout draws three colored background panels (`.box-1` top banner, `.box-2` large left, `.box-3` right column) on a CSS grid. A transparent `.content` grid is stacked on top with the same proportions (20%/80% rows, 65%/35% columns). **Pages must render a fragment containing `.in-box-1`, `.in-box-2` and `.in-box-3` divs** so their content lands on the matching panel. The grid rules are in `components/Layout.css`. Page-specific styles (such as the item cards) are in `src/App.css`.

**Box visual.** `components/BoxDisplay.jsx` takes `state="open" | "closed"` and swaps between the SVGs in `src/assets/box/`.

**Items.** The item catalog (`availableItems`: `id`, `name`, imported SVG icon) is defined inline at the top of `FillTheBoxPage.jsx`. Icons live in `src/assets/`.

## Gotchas

- `App.jsx` imports pages from `./Pages/...`, but the directory is `src/pages/`. This works on Windows (where development happens) but fails on case-sensitive filesystems such as Linux CI or deploy hosts. Use lowercase `pages` in new imports.
