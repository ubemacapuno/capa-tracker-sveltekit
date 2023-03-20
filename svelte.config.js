import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			runtime: 'nodejs18.x'
		}),
		alias: {
			$db: './src/db',
			$capas: './src/lib/models/capas',
			$utilities: './src/utilities',
			$elements: './src/elements'
		}
	}
};

export default config;
