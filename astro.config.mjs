import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import db from "@astrojs/db";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [db(), svelte()],
  output: "server",
  adapter: cloudflare()
});