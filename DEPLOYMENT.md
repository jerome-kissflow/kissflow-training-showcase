# Deploy to GitHub Pages

## 1. Create GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it e.g. `kissflow-training-showcase`
3. Leave it empty (no README)

## 2. Push code

```bash
cd "/Users/jerome/Cursor/Kissflow Training"
git init
git add .
git commit -m "Add Kissflow training showcase"
git branch -M main
git remote add origin https://github.com/jerome-kissflow/kissflow-training-showcase.git
git push -u origin main
```

## 3. Enable GitHub Pages

1. Open your repo on GitHub
2. Go to **Settings → Pages**
3. Under **Build and deployment → Source**, select **GitHub Actions**

The workflow `.github/workflows/deploy.yml` runs automatically on every push to `main`.

## 4. Access your site

After the workflow completes (Actions tab → green check):

`https://jerome-kissflow.github.io/kissflow-training-showcase/`

## Workflow

On each push to `main`:

1. Validates training content JSON
2. Runs `npm run build` → generates `public/data/content.json`
3. Deploys the `public/` folder to GitHub Pages

## Local development

```bash
npm install
npm start
```

Open http://localhost:3000 — the Node server serves content via `/api/content` and `/data/content.json`.

To preview the static GitHub Pages build locally:

```bash
npm run build
npx serve public
```

## Manual deploy

**Actions → Deploy to GitHub Pages → Run workflow**
