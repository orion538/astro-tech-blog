---
title: 'Setting Up an Astro Blog with GitHub Pages'
description: 'A complete walkthrough of setting up an Astro blog with automated GitHub Pages deployment'
pubDate: 'Jan 23 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
---

Today I set up a new blog using Astro and GitHub Pages. Here's a complete walkthrough of all the steps performed.

## Prerequisites

First, I needed to install Node.js since it wasn't available on the system. I used Windows Package Manager (winget) to install the LTS version:

```powershell
winget install OpenJS.NodeJS.LTS
```

This installed Node.js v24.13.0 along with npm 11.6.2.

**Important**: After installing Node.js on Windows, you may need to restart your terminal or refresh the PATH environment variable before npm becomes available:

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

Alternatively, simply close and reopen your terminal.

## Creating the Blog Directory

I created a new directory for the blog project:

```powershell
mkdir blog
cd blog
```

## Initializing Astro

With Node.js installed, I used npm to create a new Astro project:

```powershell
npm create astro@latest .
```

During the interactive setup, I selected:

- **Template**: Blog template (second option)
- **Dependencies**: Yes (recommended)
- **Git repository**: Yes (optional but helpful)

The Astro CLI automatically installed all necessary dependencies including:

- `astro` - The core framework
- `@astrojs/mdx` - MDX support for rich content
- `@astrojs/rss` - RSS feed generation
- `@astrojs/sitemap` - Automatic sitemap creation
- `sharp` - Image optimization

## Setting Up GitHub Actions Deployment

To enable automatic deployment to GitHub Pages, I created a GitHub Actions workflow file:

```powershell
mkdir .github\workflows -Force
```

Then created `.github/workflows/deploy.yml` with the following configuration:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

This workflow:

1. Triggers on every push to the `main` branch
2. Builds the Astro site using `npm run build`
3. Uploads the `dist` folder as a Pages artifact
4. Deploys to GitHub Pages automatically

## Next Steps

To complete the setup:

1. **Push to GitHub**:

   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Enable GitHub Pages**: Go to repository Settings → Pages → Source and select "GitHub Actions"

3. **Start local development**:

   ```bash
   npm run dev
   ```

4. **Write new posts**: Create markdown files in `src/content/blog/`

## Benefits of This Setup

- **Zero-config deployment**: Every push automatically builds and deploys
- **Fast performance**: Astro generates static HTML for lightning-fast loading
- **Great DX**: Write posts in Markdown or MDX with full component support
- **Free hosting**: GitHub Pages provides reliable, free hosting
- **Version control**: All content is tracked in Git

## Conclusion

With just a few commands and configuration files, I now have a fully functional blog that automatically deploys to GitHub Pages. The Astro blog template provides a clean, fast foundation for documenting code learnings and technical explorations.
