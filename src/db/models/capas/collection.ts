import { update_schema } from '$db/utilities'
import db from '$db/mongo'
import { capas_json_schema, type Capa } from './schema'

const capas = db.collection<Capa>('capas')

update_schema('capas', capas_json_schema)

export { capas }
