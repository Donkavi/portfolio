# Kavindu Senevirathna — Portfolio

Personal portfolio for **Don Kavindu Chamith Senevirathna**, Senior Software Engineer (Sri Lanka).

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger/SplitText, Framer Motion, Lenis smooth scroll, Lucide and Simple Icons.

## Scripts

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint
```

## Editing content

All copy lives in **`src/data/portfolio.ts`** — profile, experience, skills (and how they connect), projects, education, certifications and the Sri Lanka photography. Types are in `src/types/portfolio.ts`.

Fields left empty on purpose (nothing in the CV/LinkedIn to fill them with):

| Field | Effect while empty |
| --- | --- |
| `profile.links.github.href` | GitHub link hidden in Contact + JSON-LD |
| `projects[].github` / `projects[].live` | "Source" / "Live" buttons hidden |
| `projects[].screenshots` | An abstract illustration (labelled "Illustration") is shown instead |

Set `NEXT_PUBLIC_SITE_URL` to the real domain when deploying — it feeds canonical URLs and Open Graph.

Not published on purpose: phone number, street address and referees' details from the CV.

## Assets

- `public/images/profile/portrait-cutout.png` — background removed locally from the original photo (ONNX segmentation via `@imgly/background-removal-node`); `portrait-street.jpg` is the untouched original; `headshot.jpg` is a crop. A higher-resolution original photo would make the hero portrait sharper on retina screens.
- `public/images/sri-lanka/sigiriya.jpg` — [Unsplash License](https://unsplash.com/license); photographer credited on the page.
- `src/lib/sri-lanka-map.ts` — island outline from Natural Earth (public domain).
- Brand logos — [Simple Icons](https://simpleicons.org) (CC0).

## Structure

```
src/
  app/            layout (fonts, SEO, JSON-LD), page, OG image, icon
  components/     hero, about, experience, skills, projects, education,
                  sri-lanka, contact, navigation, animations, ui, providers
  data/           portfolio.ts — single source of content
  hooks/ lib/ types/
```

Motion respects `prefers-reduced-motion` (intro, smooth scroll, pins and parallax are disabled). Mouse parallax, magnetic buttons and the cursor ring only run on fine-pointer devices.
