import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { capaReports } from "$capas"
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const data = await capaReports.find({}, {limit: 500, projection: {
		capaNumber: 1,
		capaStatus: 1,
		capaPhase: 1,
		dateCapaCreated: 1,
		problemStatement: 1,
		dateCapaApproved: 1,
		currentPhaseDueDate: 1,
		productImpacted: 1,

	}}).toArray();

  return {
	capaReports: JSON.parse(JSON.stringify(data)),
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