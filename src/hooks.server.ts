// import { start_mongo } from "./lib/db";
import { start_mongo } from "$db"; //using "aliased" version in svelte.config.js
import { Handle } from "@sveltejs/kit"

export const handle = (async ({ event, resolve }) => {
	let theme: string | null = null;

	const newTheme = event.url.searchParams.get("theme");
	const cookieTheme = event.cookies.get("colortheme");

	if (newTheme) {
		theme = newTheme;
	} else if (cookieTheme) {
		theme = cookieTheme;
	}

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) =>
				html.replace('data-theme=""', `data-theme="${theme}"`),
		});
	}

	return await resolve(event);
}) satisfies Handle;

start_mongo().then(() => {
    console.log("Mongo DB Started!")
}).catch(e => {console.error(e)})