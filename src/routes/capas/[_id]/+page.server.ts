import type { PageServerLoad } from './$types';
import { capas } from '$db/models/capas/collection';
import { Capas } from '$db/models/capas/actions';
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

export const actions = {
	create: Capas.create,
	update: Capas.update,
	delete: Capas.delete
};
