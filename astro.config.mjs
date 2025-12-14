// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://narendran-1999.github.io',
  base: '/farc',
  output: 'static',
  integrations: [svelte()],
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',
    },
  },
});