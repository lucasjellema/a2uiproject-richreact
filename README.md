# RichReact AI UI Project

Based on [this well written article](https://blog.logrocket.com/a2ui-better-way-ship-agents/) by Emmanuel John and [the companioning github repo](https://github.com/emmanuelhashy/a2uiproject) I have created a simple demonstration of a fairly rich A2UI application – one that is based on a rich collection of over 70 React components. It is easy to install and run locally, to inspect and edit and use as inspiration for things you may want to try out yourself.



## 🚀 What this application does

This is a rich React-based AI UI demo application.  
It connects to the Gemini-like AI service (local/remote model backend) and renders interactions in a modern frontend experience:

- user asks questions or issues prompts
- frontend sends the prompt to `geminiService.ts` backend adapter
- backend adapter calls AI inference endpoint
- results are displayed in the UI in real-time
- includes support for structured response handling and notifications (base for “rich” interactions)

## 🧩 Architecture and tech stack

### Core frontend
- App.tsx — main React component + prompt form + chat/result UI
- main.tsx — bootstraps app with React 18
- index.css, App.css — visual styling
- assets — static assets

### AI service integration
- geminiService.ts — wrapper for calling AI API / model endpoint
- Endpoint and request logic handled here so UI stays clean

### Build system
- Vite + TypeScript
- React 18, ES modules, fast HMR dev experience

### Project config
- package.json — dependencies + scripts
- tsconfig.json, tsconfig.app.json, tsconfig.node.json — TypeScript compile settings
- vite.config.ts — Vite app config
- eslint.config.js — linting rules and quality checks

### Optional data
- data.json — sample data payloads or constants (if used by the app)

---

## 🏃‍♀️ How to run

1. Clone repository:
   - `git clone <repo-url>`
   - `cd a2uiproject-richreact`

2. Install:
   - `pnpm install` (or `npm install` / `yarn` if you prefer)

3. Dev server:
   - `pnpm dev` (or `npm run dev`)

4. Open:
   - `http://localhost:5173` (or port shown in terminal)

5. Build (production):
   - `pnpm build`
   - `pnpm preview`

---



## 🛠️ How it is made up

- **React**: single-page UI interactive app
- **TypeScript**: static typing, safer refactor, cleaner components
- **Vite**: fast dev reload, bundling, optimized production build
- **API service layer**: `geminiService.ts` is a single source of AI integration
- **CSS**: minimal style layer for layout and UX

## 🧩 Adding support for more A2UI components

The available components are listed in the README of the A2UI bridge Mantine provider.
That file documents the A2UI JSON structure for each component the client-side renderer can process, e.g. Button, Chip, ColorInput, Blockquote, and more.

The LLM will only generate these components if it knows they are available. It learns about available components through the prompt in:

- `src/geminiService.ts`, function `generateUIFromPrompt()`

### Add components step-by-step

1. Open `src/geminiService.ts` and locate `generateUIFromPrompt()`.
2. Find the component list in the prompt text, then add one or more entries.

Example for `ColorInput`:

```json
ColorInput: { "ColorInput": { "label": { "literalString": "Color Label" }, "placeholder": { "literalString": "Pick a color" }, "format": "hex", "defaultValue": "#000000", "swatches": ["#000000", "#FFFFFF"] } }
```

3. Save file.
4. Restart dev server:
   - stop current process with `CTRL + C`
   - run `npm run dev`
5. Ask the LLM to generate A2UI output with the newly added components and verify the UI renders them correctly.

If this works, you can use a rich set of components as long as you stick to React + Mantine on the client side.
---

## 📌 Notes
- If the AI service endpoint is not configured, edit `geminiService.ts`.
- Add .env or config as needed for API key / backend URL.
- For UI changes, modify App.tsx and rebuild.

---

## 🧪 Quick sanity checks

- `npm run lint` (if available)
- `npm run test` (if available; project may not have tests configured)

---

### ✅ Summary

This app is a small rich-text AI React demo; run with Vite and integrate through `geminiService.ts`.  
The text above provides everything needed for dev, architecture explanation, and run instructions.