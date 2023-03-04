<script lang="ts">
	import type { CreateCompletionResponse } from 'openai';
	import { SSE } from 'sse.js';
	let context = '';
	let loading = false;
	let error = false;
	let answer = '';

	const handleSubmit = async () => {
		loading = true;
		error = false;
		answer = '';

		const eventSource = new SSE('/api/explain', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ context })
		});

		context = '';

		eventSource.addEventListener('error', (e) => {
			error = true;
			loading = false;
			//Toast
			alert('Something went wrong!');
		});

		eventSource.addEventListener('message', (e) => {
			try {
				loading = false;

				if (e.data === '[DONE]') {
					return;
				}

				const completionResponse: CreateCompletionResponse = JSON.parse(e.data);

				const [{ text }] = completionResponse.choices;

				answer = (answer ?? '') + text;
			} catch (err) {
				error = true;

				loading = false;

				console.error(err);
				//Toast
				alert('Something went wrong!');
			}
		});

		eventSource.stream();
	};
</script>

<div class="mx-2 card bg-base-300 shadow-xl max-w-3xl">
	<div class="card-body">
		<h1 class="text-3xl font-bold text-primary">ChatBot Assistant</h1>
		<p>
			The CAPATracker ChatBot Assistant is familiar with quality assurance and compliance as it
			relates to the manufacturing industry.
		</p>

		<form
			class="flex flex-col align-center gap-1 py-2"
			on:submit|preventDefault={() => handleSubmit()}
		>
			<label class="font-bold" for="context">Ask any questions you want explained:</label>
			<textarea class="textarea" name="context" rows="5" bind:value={context} />
			<button class="btn btn-primary my-1">Explain it</button>
			<div class="pt-4">
				<h2 class="text-lg font-bold mb-2">Explanation:</h2>
				<div>
					{#if answer}
						<p class="italic text-accent">{answer}</p>
					{/if}
				</div>
			</div>
		</form>
	</div>
</div>
