# pranaypawar.com

Personal site for Pranay Pawar, built from the Figma design "v4 — Dark (Monaco style)".

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · Vercel.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing content

All copy lives in `src/content/`:

| File | What it holds |
| --- | --- |
| `site.ts` | Name, contact details, nav, stats, client logos in the moving strip, ventures |
| `projects.ts` | The 13 case studies (each gets a page at `/work/<slug>`) |
| `experience.ts` | Roles, milestones, education, company list |
| `services.ts` | Services, process, engagement models, FAQ, skills, principles |

Text in `[square brackets]` is a placeholder for real details (GetHire dates, project results, quotes).

**Images:**
- Logos go in `public/logos/`.
- Project images go in `public/work/<slug>/`. Set `cover` and `gallery` in `projects.ts`.
- To show your photo in the hero, add `public/me.jpg` and set `PHOTO` in `src/components/Hero.tsx`.

## Contact form

The form posts to a server action, `src/app/actions.ts`, which emails you through [Resend](https://resend.com).

Set these environment variables in Vercel:

| Variable | Required | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | The form doesn't send without it. |
| `CONTACT_TO` | No | Defaults to the email in `site.ts`. |
| `CONTACT_FROM` | No | For example `Pranay Pawar <hello@pranaypawar.com>` once the domain is verified in Resend. |

Without a key, the form asks visitors to email you directly.

## Deploy

1. Import the GitHub repo in Vercel. It detects the framework automatically.
2. Add the env vars above.
3. Point `pranaypawar.com` at the Vercel project.

## Motion

| Element | Behaviour |
| --- | --- |
| Hero | Rotating word, slow floating chips, faint drifting glow, pointer parallax on the portrait |
| Strips | Client logo strip (45 s loop) and services ticker (60 s). Both pause on hover. |
| Scroll | Content fades up as it enters the screen |
| Hover | Buttons, nav pill, project cards, service rows and cards, role cards, chips |
| Accessibility | Everything respects `prefers-reduced-motion` |
