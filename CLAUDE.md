# Reading List

A reading list built with Vue 3 (3.5) and TypeScript. No backend, the data is kept in `localStorage`. Read `SPEC.md` before you build anything.

The app lives in the folder `app`. The folder `core` is the shared, tested logic.

## Commands

Run them in the folder `app`:

- `npm run dev`: dev server
- `npm run test:unit -- --run`: tests once
- `npm run build`: type check and build
- Logic tests, in the folder `core`: `npm run test:run` and `npm run check`

## Rules

- **Do not change** the files in `app/src/core` (`types.ts`, `books.ts`, `storage.ts`, `seed.json`). They are copies of the folder `core`, they are tested and the same in every framework. Only build the view layer. If you think the logic must change, stop and ask.
- Use the filter, validation and list functions from `core`. Do not write them again in a component.
- No `any`. Type props, inputs and events.
- Keep components small. One component per file.
- No UI library, no CSS framework, no state library, no router. Plain CSS in the component styles of the framework.
- Install a package only after you told me why, and only if the framework docs recommend it.
- Run the type check, the tests and the build before you say a task is done.

## Framework rules (Vue 3)

- Single file components with `<script setup lang="ts">`. Composition API only, no Options API.
- Local state with `ref`, derived values with `computed`. Props with `defineProps`, events with `defineEmits`.
- Use `v-model` for form fields and `:key` in every `v-for`.
- Import with the `@/` alias for `src/`, for example `import { filterBooks } from "@/core/books"`.
- Component styles use `<style scoped>`. The CSS custom properties are defined once, in a global stylesheet.

## Quality rules

- Every interactive element must work with the keyboard and show a visible focus.
- Dialogs open with the focus inside, close with Escape and return the focus to the button that opened them.
- Colors and spacing come from one place (CSS custom properties), do not invent new values.
- Check the layout at 360px and at 1280px.
