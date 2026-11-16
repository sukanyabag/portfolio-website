# Portfolio

A React + Vite portfolio that reads all of its content from one JSON file.
You edit the JSON. You never touch the components.

## Run it

This machine has [Bun](https://bun.sh) but no Node, so the commands use `bun`.
With Node installed, `npm install` / `npm run dev` work the same way.

```bash
bun install
bun run dev        # http://localhost:5173
bun run build      # static site in dist/
bun run preview    # serve dist/ locally
```

## Updating content

Everything lives in **`public/portfolio.json`**.

- **In dev**, save the file and the page updates in place (no refresh).
- **After deploying**, edit `dist/portfolio.json` on your host (or redeploy) and visitors get the new data on their next visit. The file is fetched at runtime with `cache: 'no-store'`, so no rebuild is needed.
- **Optional, update without redeploying at all:** host the JSON anywhere (a GitHub raw URL, a gist, an API) and point the site at it:

  ```bash
  # .env
  VITE_DATA_URL=https://raw.githubusercontent.com/<you>/<repo>/main/portfolio.json
  ```

If you save broken JSON, the site keeps showing the last good version and shows a small error banner.

### How this compares to the reference repo

`Subhadeep0506/shadcn-personal-portfolio` keeps its data in `src/data/resume.tsx`, a TypeScript object that's **imported at build time**. Icons are React components inside the data, and changing anything means rebuilding. This project moves the same idea to a plain JSON file that's **fetched at runtime**, with icons referenced by name (`"icon": "github"`), so the data file stays pure data.

## JSON reference

| Key | What it controls |
| --- | --- |
| `meta` | Browser tab `title`, SEO `description`, and an `updated` date shown in the footer. |
| `theme` | `defaultMode` (`"dark"` / `"light"`) and three colours: `accent`, `accent2`, `accent3`. The whole palette (background glow, gradients, buttons) follows these. |
| `sections` | **Order, visibility and titles.** Each entry: `id`, `title`, `icon`, `nav` (show in the nav bar), `visible`, optional `kicker` (subtitle). Reorder the array to reorder the page. |
| `profile` | `name`, `initials`, `greeting`, `role`, `tagline`, `location`, `locationLink`, `avatar` (image path, leave empty to show initials), `available` + `availabilityText`, `resumeUrl`, `summary` (Markdown), `now` (list). |
| `stats` | Small number cards under the hero: `{ "value", "label" }`. |
| `contact` | `email`, `phone`, `title`, `text`, and `socials: [{ name, url, icon }]`. |
| `experience` | `{ company, role, href, logo, location, start, end, tags[], highlights[] }`. An `end` of "Present" marks the job as current. |
| `projects` | `{ title, category, period, pitch, description, metrics: [{ value, label }], tags[], links: [{ label, url, icon }], featured, image }`. `pitch` is the one-line value statement; `metrics` render as result tiles. `featured` makes the card full-width with results on the right. `image` is optional. Filter chips are built from the tags. |
| `skills` | `[{ category, items[] }]`, or a flat `["Python", "React"]`. |
| `education` | `{ school, degree, href, logo, start, end, details }`. |
| `publications` | `{ title, venue, date, authors, url }`. |
| `patents` | Same shape as `publications`: `{ title, venue, date, url }`. |
| `honors`, `community` | `{ title, org, date, description, url }`. |
| `certifications` | `{ name, issuer, date, url }`. |

**Images:** drop files in `public/` (for example `public/me.jpg`) and reference them as `"/me.jpg"`.

**Company logos:** live in `public/logos/` and are set per entry with `"logo": "/logos/name.png"` in `experience` and `education`. A square PNG or SVG works best; leave `logo` empty to show the first letter instead.

**Icon names:** `github`, `linkedin`, `x`, `twitter`, `medium`, `youtube`, `globe`, `link`, `mail`, `phone`, `map`, `file`, `resume`, `download`, `book`, `award`, `briefcase`, `folder`, `code`, `sparkles`, `graduation`, `user`, `send`, `home`, `scroll`, `trophy`, `heart`. Unknown names fall back to a link icon. Add more in `src/components/Icon.jsx`.

### Custom free-text sections

Any section with `"type": "markdown"` renders its `content` as Markdown in a glass card, without code changes:

```json
{ "id": "speaking", "title": "Speaking", "type": "markdown", "nav": false,
  "content": "**PyCon India 2025:** *Evaluating agents without lying to yourself*" }
```

## Extras

- **⌘K / Ctrl+K** opens a command menu (jump to sections, open projects and socials, copy email, switch theme). Built from the JSON too.
- Light/dark toggle, remembered per visitor.
- Respects `prefers-reduced-motion`.

## Project layout

```
public/portfolio.json      ← your content
src/data/DataContext.jsx   ← fetches the JSON, live-reloads in dev
src/App.jsx                ← maps sections[] to components
src/sections/              ← Hero, About, Experience, Projects, Skills, Lists, Contact
src/components/            ← Glass, Nav, CommandPalette, Background, Cover, Icon, Reveal
src/styles.css             ← tokens + the glass recipe
vite.config.js             ← dev plugin that watches portfolio.json
```
