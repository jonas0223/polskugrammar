# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Polish Grammar Practice (artifacts/polish-grammar)
- **Type**: Expo mobile app (React Native)
- **Purpose**: Polish grammar practice for CEFR A1–A2 learners
- **Key features**:
  - 12 grammar modules (pronouns, noun cases, verb conjugation, negation, questions, numbers, adjectives, prepositions, past tense, everyday phrases)
  - Multiple exercise formats: multiple choice, fill-in-the-blank, matching, sentence builder, error correction
  - Spaced repetition review queue for mistakes
  - Progress tracking with XP, streaks, per-module accuracy
  - 4-tab navigation: Dashboard, Learn, Review, Progress
- **State**: AsyncStorage via ProgressContext (no backend needed)
- **Key files**:
  - `data/modules.ts` — all lesson content and exercise data
  - `contexts/ProgressContext.tsx` — progress state, streaks, XP, review queue
  - `components/ExerciseCard.tsx` — all exercise type renderers
  - `app/(tabs)/` — tab screens (dashboard, learn, review, progress)
  - `app/lesson/[moduleId].tsx` — lesson browser per module
  - `app/lesson/study.tsx` — lesson intro + exercise flow
