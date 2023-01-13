import { zod_to_jsonschema } from '$utilities/zod_to_jsonschema'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

// Validation schema for capas
export const capas_schema = z.object({
	_id: z.string(),
	capaNumber: z.string(),
	dateCapaCreated: z.string(),
    capaStatus: z.string(),
    capaPhase: z.string(),
    problemStatement: z.string(),
    dateCapaApproved: z.string(),
    currentPhaseDueDate: z.string(),
    productImpacted:  z.string(),
})

export const capas_raw_schema_json = zodToJsonSchema(capas_schema, {
	$refStrategy: 'none'
})

export type Capa = z.infer<typeof capas_schema>

export const capas_json_schema = zod_to_jsonschema(capas_raw_schema_json)
