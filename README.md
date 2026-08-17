# Daniel Prado de Campos — Research Portfolio

A bilingual (English/Portuguese) academic portfolio focused on wearable biomedical instrumentation, sEMG, assistive technology, precision livestock and medical thermography.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production check

```bash
npm run lint
npm run build
```

## Deploy on Vercel

1. Import this GitHub repository in Vercel.
2. Keep the detected framework as **Next.js**.
3. No environment variables are required.
4. Deploy.

After the first deployment, replace the placeholder domain in `app/layout.tsx`, `app/sitemap.ts` and `app/robots.ts` with the final Vercel or custom domain.

## Content maintenance

- Publication records: `data/publications.ts`
- Bilingual copy and featured projects: `components/research-site.tsx`
- Visual system: `app/globals.css`
- Images: `public/images`

Research information was reviewed against the public Lattes CV updated on 5 May 2026. Publication figures are used in context and link back to their respective papers.
