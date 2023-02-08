import { capas } from '$db/models/capas/collection';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = async function ({ params }) {
	if (!params._id) {
		throw redirect(302, '/capas');
	}

	const capa = await capas.findOne({
		_id: params._id
	});

	return {
		capa
	};
} satisfies PageServerLoad;
