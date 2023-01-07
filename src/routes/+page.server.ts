import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.getSession()
  };
}; 

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get("theme");
		const redirectTo = url.searchParams.get("redirectTo");

		if (theme) {
			cookies.set("colortheme", theme, {
				path: "/",
				maxAge: 60 * 60 * 24 * 365,
			});
		}

		throw redirect(303, redirectTo ?? "/");
	},
};