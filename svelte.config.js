import adapter from '@sveltejs/adapter-node';
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $db: './src/lib/db',
      $capas: './src/lib/models/capas'
    }
  },
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;