# 📼 Lost Bangla Memes

> A digital archive of old Bangladeshi viral memes — preserved for nostalgia.

Live site: `https://mortalmaruf.github.io/lost-bangla-memes`

---

## Setup

```bash
npm install
npm run dev       # local preview at localhost:5173
```

---

## Deploy to GitHub Pages

1. Push this repo to GitHub as `lost-bangla-memes`
2. branchions will auto-build and deploy on every push to `main`
3. In repo Settings → Pages → Source: set to `gh-pages` branbranch

---

## File Structure

```
lost-bangla-memes/
├── src/
│   ├── App.jsx       ← all meme data + components
│   └── index.css     ← all styles
├── index.html
├── vite.config.js
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml  ← auto-deploy on push
```
