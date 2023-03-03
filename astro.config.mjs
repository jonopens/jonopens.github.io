import { defineConfig } from 'astro/config';
import prefetch from '@astrojs/prefetch';

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.jonopens.com',
  integrations: [prism(), partytown(), prefetch(), prism(), react(), sitemap(), image()],
  markdown: {
    syntaxHighlight: 'prism'
  }
});