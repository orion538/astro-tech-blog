---
title: 'Configuring ESLint and Prettier in VS Code for Automatic Code Formatting'
description: 'Set up automatic code formatting and linting in your Astro project with ESLint and Prettier integration'
pubDate: 'Jan 23 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Clean, consistently formatted code is essential for maintainability and collaboration. This guide shows you how to configure ESLint and Prettier in VS Code to automatically format your code on save.

## Prerequisites

Before starting, ensure you have:
- Node.js and npm installed
- Visual Studio Code
- An Astro project (or any JavaScript/TypeScript project)

## Step 1: Install Required Packages

First, install ESLint, Prettier, and the necessary plugins:

```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-astro @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier-plugin-astro
```

## Step 2: Configure ESLint

Create `.eslintrc.json` in your project root:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:astro/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "env": {
    "node": true,
    "es2024": true,
    "browser": true
  },
  "overrides": [
    {
      "files": ["*.astro"],
      "parser": "astro-eslint-parser",
      "parserOptions": {
        "parser": "@typescript-eslint/parser",
        "extraFileExtensions": [".astro"]
      }
    }
  ]
}
```

## Step 3: Configure Prettier

Create `.prettierrc.json` in your project root:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro"
      }
    }
  ]
}
```

## Step 4: Configure VS Code

Create or update `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[astro]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": [
    "javascript",
    "typescript",
    "astro"
  ],
  "prettier.requireConfig": true
}
```

## Step 5: Recommend Extensions

Update `.vscode/extensions.json` to recommend the ESLint and Prettier extensions:

```json
{
  "recommendations": [
    "astro-build.astro-vscode",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
  ]
}
```

## Step 6: Add NPM Scripts

Update your `package.json` to include linting and formatting scripts:

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.ts,.astro",
    "lint:fix": "eslint . --ext .js,.ts,.astro --fix",
    "format": "prettier --write \"**/*.{js,ts,astro,json,md}\"",
    "format:check": "prettier --check \"**/*.{js,ts,astro,json,md}\""
  }
}
```

## Step 7: Create Ignore Files

Create `.eslintignore`:

```
node_modules
dist
.astro
*.config.mjs
```

Create `.prettierignore`:

```
node_modules
dist
.astro
package-lock.json
```

## How It Works

With this configuration:

1. **On Save**: VS Code automatically formats your code using Prettier and fixes ESLint issues
2. **Language-Specific**: Each file type uses the appropriate formatter
3. **Consistent**: Your entire team shares the same formatting rules via the repository
4. **Command Line**: Run `npm run format` to format all files or `npm run lint:fix` to fix linting issues

## Testing Your Setup

1. Open any `.ts`, `.js`, or `.astro` file
2. Make some formatting mistakes (remove semicolons, add extra spaces)
3. Save the file (Ctrl+S or Cmd+S)
4. Watch as your code is automatically formatted!

## Conclusion

Automatic code formatting saves time and eliminates debates about code style. With this setup, your code will be consistently formatted across your entire team, and you can focus on writing great features instead of worrying about formatting.
