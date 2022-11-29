//We are utilizing the Mongo database and want this code to ONLY run "server-side", 
//so we want to name this file: page.server.ts
import type {PageServerLoad} from './$types'
import { capaReports } from "$capas"
import db from "$lib/db"

export const load: PageServerLoad = async function() {
	const data = await capaReports.find({}, {_id:0, limit: 50, projection: {
		capaNumber: 1
	}}).toArray();

	console.log('data', data);

	return {
		capaReports: JSON.parse(JSON.stringify(data))
	}
}