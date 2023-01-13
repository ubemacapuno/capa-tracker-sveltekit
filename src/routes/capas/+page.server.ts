//We are utilizing the Mongo database and want this code to ONLY run "server-side", 
//so we want to name this file: page.server.ts
import type {PageServerLoad} from './$types'
import { capas } from "$db/models/capas/collection"
import { Capas } from "$db/models/capas/actions"
import { redirect } from '@sveltejs/kit';
import { fix_pojo } from '$utilities/fix_pojo';

export const load: PageServerLoad = async function(event) {
	const session = await event.locals.getSession();
  	if (!session?.user) throw redirect(303, '/');
	const all_capas = await capas.find({}, {limit: 500, projection: {
		capaNumber: 1,
		capaStatus: 1,
		capaPhase: 1,
		dateCapaCreated: 1,
		problemStatement: 1,
		dateCapaApproved: 1,
		currentPhaseDueDate: 1,
		productImpacted: 1,

	}}).toArray();

	// console.log('data', data);
	console.log('data', JSON.parse(JSON.stringify(all_capas)));
	console.log('data but POJO', fix_pojo(all_capas));

	return {
		capas: fix_pojo(all_capas),
		session: await event.locals.getSession()
	}
}

export const actions = {
	create: Capas.create,
	update: Capas.update,
	delete: Capas.delete
}
