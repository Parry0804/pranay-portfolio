# Project cover generator

Builds the concept covers in `public/work/<slug>/` (cover 2400×1500, thumb 1200×1500, detail 2400×1500)
from HTML/SVG mockups using each client's logo and colours. Art direction per project lives in `projects.mjs`.

```bash
npm i -D playwright   # once
node scripts/covers/gen.mjs /tmp/covers [slug,slug]
```

Then copy `<slug>-cover.jpg`, `-thumb.jpg` and `-detail.jpg` into `public/work/<slug>/` as `cover.jpg`, `thumb.jpg` and `detail.jpg`.
