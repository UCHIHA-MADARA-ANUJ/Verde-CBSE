# Deploying Project Verde to Vercel

The app is a standard Next.js 14 App Router project. No adapter, no custom
server, no build hacks.

## One-time setup

1. Push this branch to GitHub (already done).
2. On <https://vercel.com/new>, import `UCHIHA-MADARA-ANUJ/Verde-CBSE`.
3. Vercel auto-detects Next.js. Leave every field at its default:

   | Setting          | Value          |
   | ---------------- | -------------- |
   | Framework        | Next.js        |
   | Build command    | `next build`   |
   | Install command  | `npm ci`       |
   | Output directory | *(default)*    |
   | Node version     | 20.x           |

4. Click **Deploy**.

That is the whole process. `vercel.json` already pins the framework, the
install command and the `bom1` (Mumbai) region, which is the closest edge to
the project's audience.

## Environment variables

None are required. The site builds and runs with an empty environment.

The only optional variable is `NEXT_PUBLIC_SITE_URL`, and you only need it if
you attach a custom domain — otherwise the canonical URL is derived from
`VERCEL_PROJECT_PRODUCTION_URL`, which Vercel injects for you. See
`.env.example`.

## What gets deployed

| Route            | Rendering                             |
| ---------------- | ------------------------------------- |
| `/`              | Static (prerendered at build)         |
| `/robots.txt`    | Static                                |
| `/sitemap.xml`   | Static                                |
| `/api/health`    | Static                                |
| `/api/stats`     | Static                                |
| `/api/weather`   | Static                                |
| `/api/contact`   | Serverless function (dynamic)         |
| `/api/telemetry` | Serverless function (dynamic)         |

The home page is fully prerendered, so the first byte comes off the CDN.

## The 3D scenes

The three WebGL scenes are plain static HTML documents in `public/scenes/`,
each loading a vendored copy of three.js from `public/vendor/`. They are *not*
bundled by webpack and they are *not* fetched from a CDN, so the site has no
third-party runtime dependencies and works behind a firewall.

Caching is configured in `next.config.mjs`:

- `/vendor/*` — `max-age=31536000, immutable` (the three.js build never changes)
- `/scenes/*` — `max-age=86400, must-revalidate`, plus `X-Frame-Options: SAMEORIGIN`

## Verifying before you push

```bash
npm run verify     # tsc --noEmit && next lint && next build
```

All three must pass. The current state of the branch does.

## Local production preview

```bash
npm run build
npm start          # http://localhost:3000
```
