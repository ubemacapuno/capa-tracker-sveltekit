import type { PageServerLoad } from './$types';
import { capas } from '$db/models/capas/collection';
import { Capas } from '$db/models/capas/actions';
import { fix_pojo } from '$utilities/fix_pojo';

export const load = async function () {
	const all_capas = await capas.find({}, { sort: { order: 1 } }).toArray();

	return {
		capas: fix_pojo(all_capas)
	};
} satisfies PageServerLoad;

export const actions = {
	create: Capas.create,
	update: Capas.update,
	delete: Capas.delete
};
