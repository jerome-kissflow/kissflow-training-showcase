# Kissflow Training Showcase

An interactive training presentation app for Kissflow platform onboarding. Designed for screen-sharing during live training sessions.

## Features

- **12 training sections** — Platform, Processes, Dataforms, Apps, Forms, Boards, Integrations, Analytics, Governance, Developer Hub, Academy, and more
- **146 slides** with speaker notes, fullscreen mode, and keyboard navigation
- **Kissflow branding** — official colors, logos, and images from kissflow.com
- **GitHub Pages** — deploy automatically on push to `main`

## Quick Start (local)

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

### Development (auto-reload)

```bash
npm run dev
```

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. **Settings → Pages → Source** → select **GitHub Actions**
3. Push to `main` — workflow deploys automatically

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step instructions.

Live URL: `https://jerome-kissflow.github.io/kissflow-training-showcase/`

## Android app

Install on phone or tablet: **[Mobile app for android/Kissflow-Training.apk](Mobile%20app%20for%20android/Kissflow-Training.apk)**

The Android app loads all content and styles from GitHub Pages — see [Mobile app for android/README.md](Mobile%20app%20for%20android/README.md).

## Customizing Content

Edit JSON files in `data/sections/`. Each slide supports:

- `type`: `"title"`, `"content"`, or `"grid"`
- `title`, `subtitle`, `bullets`, `image`, `notes`
- `items` (for grid slides): `{ icon, label, desc }`

Regenerate slide images: `node scripts/apply-slide-images.js`

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `Space` | Next slide |
| `←` | Previous slide |
| `F` | Toggle fullscreen |
| `N` | Toggle speaker notes |
| `Esc` | Back / exit fullscreen |

## License

MIT
