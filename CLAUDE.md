# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint on the codebase

### Testing
No test framework is currently configured.

## Project Architecture

This is a Next.js 15 application using the App Router with TypeScript and Tailwind CSS.

### Key Structure
- `/src/app/` - Next.js App Router directory
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Home page component
  - `globals.css` - Global styles
- `/public/` - Static assets (SVG icons)
- TypeScript configuration uses path aliases (`@/*` maps to `./src/*`)

### Tech Stack
- **Framework**: Next.js 15.3.5 with App Router
- **Styling**: Tailwind CSS v4 with PostCSS
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **Language**: TypeScript with strict mode
- **Linting**: ESLint with Next.js configuration

### Architecture Notes
- Uses Next.js App Router (not Pages Router)
- Implements responsive design with Tailwind CSS
- Font optimization using `next/font/google`
- Static asset optimization with `next/image`
- Dark mode support via CSS variables and Tailwind classes