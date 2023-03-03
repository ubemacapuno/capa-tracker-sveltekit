import { OPENAI_KEY } from '$env/static/private';
import { oneLine, stripIndent } from 'common-tags';
import type { RequestHandler } from './$types';
import type { CreateCompletionRequest } from 'openai';

export const POST: RequestHandler = async ({ request }) => {
	try {
		if (!OPENAI_KEY) {
			throw new Error('Bro, you need an OPENAI_KEY . . .');
		}

		const requestData = await request.json();

		if (!requestData) {
			throw new Error('Request data missing');
		}

		const { context } = requestData;

		if (!context) {
			throw new Error('Context not provided!');
		}

		const prompt = stripIndent`
    ${oneLine`
    You are an enthusiastic Quality Assurance/Compliance Analyst in the manufacturing industry who loves explaining things to visitors and external auditors from regulatory agencies (Example: FDA). Provide an explanation or summary of the context below that a new visitor that may not be very familiar with the manufacturing industry would understand.
    `}
    
    Context: """${context.trim()}"""

    Answer:
    `;

		const completionOpts: CreateCompletionRequest = {
			model: 'text-davinci-003',
			prompt,
			max_tokens: 256,
			temperature: 0.9,
			stream: true
		};
	} catch (err) {
		console.log('Error', err);
	}
	return new Response();
};
