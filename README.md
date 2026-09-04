# Shopify Template (Hydrogen)

> **TEMPLATE — not a live brand.**  
> Placeholder storefront for Philip (and clones) to spin up product-brand sites.  
> Strip/rename branding before shipping anything customer-facing.

A deliberately simple [Shopify Hydrogen](https://shopify.dev/custom-storefronts/hydrogen) + React Router starter:

- Home (hero + featured products stub)
- Collections list + collection detail stubs
- Product detail stub
- Cart drawer + cart page stubs
- Shared header / footer layout
- Branding tokens (name, color, logo slot) in one file

No real brand assets. No production payment wiring beyond Hydrogen’s stub cart/checkout hooks against mock data until you link a store.

---

## Requirements

- Node.js **22.x or 24.x**
- npm 10+

## Local run

```bash
npm install
cp .env.example .env   # optional; SESSION_SECRET is enough for mock.shop
npm run dev
```

Open [http://localhost:43123](http://localhost:43123) (port is set in `package.json`).

Useful scripts:

| Script | What it does |
| --- | --- |
| `npm run dev` | Local Hydrogen / MiniOxygen server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

---

## Connect a Shopify store

Out of the box this app uses **[mock.shop](https://mock.shop)** demo catalog data (no Shopify login required).

To point at a real store:

1. Install the [Hydrogen sales channel](https://apps.shopify.com/hydrogen) on the store.
2. From this project:

   ```bash
   npx shopify hydrogen link
   npx shopify hydrogen env pull
   ```

3. Restart `npm run dev`. Your catalog replaces mock.shop.

Environment variables live in `.env` (gitignored). See `.env.example` for the expected keys. Never commit Storefront API tokens.

Checkout / payments only work end-to-end after a real storefront is linked and Oxygen (or another host) is configured. This TEMPLATE does not set that up for you.

Docs: [Getting started with Hydrogen](https://shopify.dev/docs/storefronts/headless/hydrogen/getting-started)

---

## Rename for a new brand

1. **Clone** this repo (or use it as a GitHub / Origin template).
2. Edit **`app/lib/branding.js`** — single source of truth:

   - `name` — wordmark / titles
   - `tagline`, `hero.*` — home copy
   - `color.*` — CSS variables applied on `<body>`
   - `logo.src` — set to e.g. `'/logo.svg'` (file in `public/`), or leave `null` for the text wordmark

3. Drop a logo into `public/` (there is a dashed `logo-placeholder.svg` to steal dimensions from).
4. Update `package.json` `name` / `description`.
5. Remove or restyle the red/green **TEMPLATE** banner in `app/components/TemplateBanner.jsx` when you go live.
6. Search the repo for `TEMPLATE` and `Brand Name` to catch leftovers.

Optional: rename the git remotes / repo slug to match the brand.

---

## What’s intentionally dumb

- Minimal nav: Home · Collections · Cart
- Account / blog / search routes still exist in the Hydrogen skeleton but are off the primary nav
- Stub callouts on home, collection, product, and cart so it’s obvious this is starter UI
- No custom checkout, subscriptions, or CMS

Keep it boring. Add complexity only when a brand needs it.

---

## Project map

```
app/
  lib/branding.js          ← rename here first
  components/              ← layout, cart drawer, banner, logo slot
  routes/
    _index.jsx             ← home hero + featured stubs
    collections.*          ← collection stubs
    products.$handle.jsx   ← product stub
    cart.jsx               ← cart page stub
public/logo-placeholder.svg
.env.example
```

---

## License / ownership

Internal starter for cloning. Replace branding before any public launch.
