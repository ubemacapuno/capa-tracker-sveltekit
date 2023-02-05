import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { capas } from '$db/models/capas/collection';
import type { PageServerLoad } from './$types';
import { fix_pojo } from '$utilities/fix_pojo';

export const load: PageServerLoad = async (event) => {
	const data = await capas.find({}, { sort: { order: 1 } }).toArray();

	return {
		capaReports: fix_pojo(data),
		session: await event.locals.getSession()
	};
};

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme');
		const redirectTo = url.searchParams.get('redirectTo');

		if (theme) {
			cookies.set('colortheme', theme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365
			});
		}

		throw redirect(303, redirectTo ?? '/');
	}
};
