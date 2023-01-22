//We are utilizing the Mongo database and want this code to ONLY run "server-side", 
//so we want to name this file: page.server.ts
import type {PageServerLoad} from './$types'
import { capas } from "$db/models/capas/collection"
import { Capas } from "$db/models/capas/actions"
import { redirect } from '@sveltejs/kit';
import { fix_pojo } from '$utilities/fix_pojo';

export const load = async function (event) {
	const session = await event.locals.getSession();
  	if (!session?.user) throw redirect(303, '/');
	const all_capas = await capas.find({}, { sort: { order: 1 } }).toArray()

	return {
		capas: fix_pojo(all_capas),
		session: await event.locals.getSession()
	}
} satisfies PageServerLoad

export const actions = {
	create: Capas.create,
	update: Capas.update,
	delete: Capas.delete
}
