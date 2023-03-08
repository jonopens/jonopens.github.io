import { defineConfig } from 'astro/config';
import prefetch from '@astrojs/prefetch';
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: 'https://www.jonopens.com',
  integrations: [partytown(), prefetch(), react(), sitemap(), image(), mdx({
    drafts: true,
  })],
  markdown: {
    syntaxHighlight: 'prism',
    drafts: true,
  },
  output: "server",
  adapter: cloudflare()
});