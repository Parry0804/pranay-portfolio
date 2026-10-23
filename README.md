# pranay-portfolio

Portfolio site for Pranay Pawar, built on the "Living Canvas" design system: a dark, slow-moving shader background, a 3D hero orb, smooth scroll, and subtle hover motion throughout.

Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion, Lenis, three.js, Resend.

## Run locally

```bash
npm install
npm run dev
```

## Contact form

The form sends email through Resend. Set these environment variables (locally in `.env.local`, or in Vercel project settings):

- `RESEND_API_KEY`: API key from resend.com
- `CONTACT_TO`: inbox that receives enquiries
- `CONTACT_FROM`: verified sender, e.g. `Website <hello@pranaypawar.com>`

Without a key, the form shows a friendly error and logs the enquiry on the server.

## Content

All copy lives in `src/content/`. Project images go in `public/work/<slug>/` and are wired up in `src/content/visuals.ts`. Projects without images show a typographic cover.
