//We are utilizing the Mongo database and want this code to ONLY run "server-side", 
//so we want to name this file: page.server.ts
import type {PageServerLoad} from './$types'
import { capaReports } from "$capas"
import db from "$lib/db"

//"GET" may not be needed for the function to work properly
//But this is the "GET" request for getting the capaReports from the db:
export const load: PageServerLoad = async function() {
	const data = await capaReports.find({}, {_id:0, limit: 50, projection: {
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
	console.log('data', JSON.parse(JSON.stringify(data)));
	return {
		capaReports: JSON.parse(JSON.stringify(data))
	}
}