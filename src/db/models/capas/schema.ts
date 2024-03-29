import { zod_to_jsonschema } from '$utilities/zod_to_jsonschema';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const statuses = ['Pending', 'Approved', 'Rejected', 'Closed'] as const;
const phases = [
	'Initiation',
	'Risk Assessment',
	'Containment & Correction',
	'Investigation',
	'C/P Actions',
	'Implementation',
	'VOE',
	'Closure'
] as const;

// Validation schema for capas
export const capas_schema = z.object({
	_id: z.string(),
	capaNumber: z.string().min(1),
	dateCapaCreated: z.string(),
	capaStatus: z.enum(statuses),
	capaPhase: z.enum(phases),
	problemStatement: z.string().min(1),
	dateCapaApproved: z.string(),
	currentPhaseDueDate: z.string(),
	productImpacted: z.string(),
	//TODO: Figure out why z.date() doesn't accept the date-string provided from frontend:
	//TODO: Why is the default fallback not working?
	documentCreated: z.string().default(() => '')
});

export const capas_raw_schema_json = zodToJsonSchema(capas_schema, {
	$refStrategy: 'none'
});

export type Capa = z.infer<typeof capas_schema>;

export const capas_json_schema = zod_to_jsonschema(capas_raw_schema_json);
