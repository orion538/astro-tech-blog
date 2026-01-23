// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
const isDevelopment = import.meta.env.MODE === 'development';
const site = isDevelopment
  ? 'http://localhost:4321/'
  : 'https://orion538.github.io/astro-tech-blog/';
const base = isDevelopment ? '/' : '/astro-tech-blog';

export default defineConfig({
  site: site,
  base: base,
  integrations: [mdx(), sitemap()],
});
