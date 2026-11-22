# Focusboard

A calm, responsive task dashboard built with React, Vite, and Lucide React. Tasks are stored in the browser so your workspace stays available after a refresh.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`.

## Features

- Create, edit, complete, reprioritize, and delete tasks.
- Search by task title and filter by status or priority.
- Live task totals, in-progress and completed counts.
- Three Focus Notes with previous, next, and direct slide controls.
- Responsive sidebar navigation and layouts for mobile, tablet, and desktop.
- Keyboard-accessible controls, visible focus styles, and reduced-motion support.
- Browser persistence using the `focusboard-tasks` localStorage key.

The sample tasks are loaded only when that key has no saved value. Existing saved tasks, including an intentionally empty task list, are kept.
