# GlobalFinancialReserve — GitHub Pages Ready

A React/Vite financial dashboard demonstration prepared for GitHub Pages.

> **Demo only:** This project is a fictional educational UI. It does not connect to a real bank, investment account, payment processor, or financial institution.

## Run locally

```bash
npm install
npm run dev
```

To verify a production build locally:

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Upload the **contents of this project folder** to the repository root.
3. Commit and push to the `main` branch.
4. Open **Settings → Pages**.
5. Set **Build and deployment → Source** to **GitHub Actions**.
6. The included workflow in `.github/workflows/deploy.yml` will install dependencies, build the Vite app, and deploy `dist`.

The app uses `HashRouter`, so routes such as `#/dashboard` continue to work on GitHub Pages without server-side rewrite configuration.

## Project structure

- `src/` — React application
- `public/` — static assets and GitHub Pages fallback
- `.github/workflows/deploy.yml` — automatic GitHub Pages deployment
- `vite.config.js` — GitHub Pages-compatible relative asset paths
- `tailwind.config.js` — ESM-compatible Tailwind configuration
- `.env.example` — optional environment variable template

## Demo login

The application uses local dummy authentication/data for demonstration purposes. Check `src/lib/dummyData.js` for the demo credentials and sample records.
