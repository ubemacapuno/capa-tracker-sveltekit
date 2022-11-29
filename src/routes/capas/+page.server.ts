// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;
import type {PageServerLoad} from './$types'
import db from "$lib/db"
// export async function GET() {
//   const cars = await db.collection('cars').find().toArray()
//   return {
//     status: 200,
//     body: { cars }
//   }
// }

export const load: PageServerLoad = async function() {
	const capas = db.collection('capas').find().toArray;

	return {
		status: 200,
    body: { capas }
	}
}