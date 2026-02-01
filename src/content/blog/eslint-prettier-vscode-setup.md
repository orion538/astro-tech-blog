---
title: 'Configuring ESLint and Prettier in VS Code for Automatic Code Formatting'
description: 'Set up automatic code formatting and linting in your Astro project with ESLint and Prettier integration using the new flat config format'
pubDate: 'Jan 23 2026'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Clean, consistently formatted code is essential for maintainability and collaboration. This guide shows you how to configure ESLint and Prettier in VS Code to automatically format your code on save using the modern ESLint flat config format.

## Prerequisites

Before starting, ensure you have:

- Node.js and npm installed
- Visual Studio Code
- An Astro project (or any JavaScript/TypeScript project)

## Step 1: Install Required Packages

First, install ESLint, Prettier, and the necessary plugins:

```bash
npm install --save-dev @eslint/js @typescript-eslint/parser typescript-eslint eslint eslint-plugin-astro eslint-plugin-prettier eslint-config-prettier prettier prettier-plugin-astro globals
```

## Step 2: Configure ESLint

ESLint 9+ uses a new flat config format. Create `eslint.config.js` in your project root:

```javascript
import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import astroPlugin from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // Global ignores
  {
    ignores: ['node_modules/', 'dist/', 'build/', '.astro/', '*.config.mjs'],
  },

  // Base config for all files
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,astro}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2026,
        ...globals.browser,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },

  // TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  // Astro files
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsparser,
        extraFileExtensions: ['.astro'],
      },
    },
    plugins: {
      astro: astroPlugin,
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
    },
  },

  // Prettier config (should be last)
  prettierConfig,
];
```

This new flat config format:

- Uses ES modules instead of JSON
- Provides better type checking and IDE support
- Allows for more flexible configuration
- Is the recommended format for ESLint 9+

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
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "astro"],
  "prettier.enable": true,
  "prettier.requireConfig": true
}
```

## Step 5: Recommend Extensions

Update `.vscode/extensions.json` to recommend the necessary extensions:

```json
{
  "recommendations": [
    "astro-build.astro-vscode",
    "unifiedjs.vscode-mdx",
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

With the flat config format, ignore patterns are now defined directly in `eslint.config.js` (see Step 2), but you can still create `.prettierignore` for Prettier:

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

Automatic code formatting saves time and eliminates debates about code style. With this setup using the modern ESLint flat config format, your code will be consistently formatted across your entire team, and you can focus on writing great features instead of worrying about formatting.

## Why Flat Config?

The new flat config format introduced in ESLint 9 offers several advantages:

- **Better IDE support**: JavaScript files provide better autocomplete and type checking
- **More flexible**: Easier to compose and extend configurations
- **Simpler**: No more confusing override chains and inheritance
- **Future-proof**: The legacy `.eslintrc.*` format is deprecated and will be removed in future versions

If you're upgrading from the old format, the main differences are:

- Use `eslint.config.js` instead of `.eslintrc.json`
- Import plugins instead of using string references
- Define ignores in the config instead of `.eslintignore`
- Use `languageOptions` instead of `env` and `parserOptions` at the root level
