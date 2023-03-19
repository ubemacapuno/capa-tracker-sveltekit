import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = async function (event) {
	const session = await event.locals.getSession();
	if (!session?.user) throw redirect(303, '/');

	return {
		session: await event.locals.getSession()
	};
} satisfies PageServerLoad;
