// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
const site = import.meta.env.DEV ? 'http://localhost:4321' : 'https://orion538.github.io';
const base = import.meta.env.DEV ? '' : 'astro-tech-blog/';

export default defineConfig({
  site: site,
  base: base,
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
