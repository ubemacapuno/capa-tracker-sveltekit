import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { capas } from '$db/models/capas/collection';
import { Capas } from '$db/models/capas/actions';
import { fix_pojo } from '$utilities/fix_pojo';
import { capas_schema } from '$db/models/capas/schema';

const schema = capas_schema;

export const load = (async (event) => {
	// Server API:
	const form = await superValidate(event, schema);
	const all_capas = await capas.find({}, { sort: { order: 1 } }).toArray();

	// Always return { form } in load and form actions.
	return {
		form,
		capas: fix_pojo(all_capas)
	};
}) satisfies PageServerLoad;

export const actions = {
	create: Capas.create,
	update: Capas.update,
	delete: Capas.delete
};
