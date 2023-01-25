import { start_mongo } from '$db/mongo';
import { Handle } from '@sveltejs/kit';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';

export const handle = SvelteKitAuth({
	providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })]
});

export const themeToggleHandle = (async ({ event, resolve }) => {
	let theme: string | null = null;

	const newTheme = event.url.searchParams.get('theme');
	const cookieTheme = event.cookies.get('colortheme');

	if (newTheme) {
		theme = newTheme;
	} else if (cookieTheme) {
		theme = cookieTheme;
	}

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
		});
	}

	return await resolve(event);
}) satisfies Handle;

start_mongo()
	.then(() => {
		console.log('Mongo DB Started!');
	})
	.catch((e) => {
		console.error(e);
	});
