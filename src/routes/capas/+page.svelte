<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	import { form_action } from '$lib/forms/enhance';
	import { superForm } from 'sveltekit-superforms/client';
	import Switch from '$lib/components/Switch.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;
	$: ({ capas } = data);

	//TODO: Incorporate Table Component
	// $: formatted_capas = capas?.map(({ capaNumber, _id }) => ({
	// 	capaNumber: {
	// 		text: capaNumber,
	// 		path: `/capas/${_id}`
	// 	},
	// 	action: {
	// 		_id,
	// 		delete_action: `/capas?/delete`
	// 	}
	// }));

	//Variables for the dropdown selections:
	let capaStatusOptions = ['Pending', 'Approved', 'Rejected', 'Closed'];
	let capaPhaseOptions = [
		'Initiation',
		'Risk Assessment',
		'Containment & Correction',
		'C/P Actions',
		'Implementation',
		'VOE',
		'Closure'
	];

	//Filter types
	let filter: 'all' | 'open' | 'closed' | 'late' = 'all';
	let allSelected = 'selected-filter';
	let openSelected = '';
	let closedSelected = '';
	let lateSelected = '';

	let tabSelected = (filter: string) => {
		if (filter === 'all') {
			openSelected = '';
			closedSelected = '';
			allSelected = 'selected-filter';
			lateSelected = '';
		} else if (filter === 'closed') {
			allSelected = '';
			openSelected = '';
			closedSelected = 'selected-filter';
			lateSelected = '';
		} else if (filter === 'open') {
			allSelected = '';
			closedSelected = '';
			openSelected = 'selected-filter';
			lateSelected = '';
		} else if (filter === 'late') {
			allSelected = '';
			closedSelected = '';
			openSelected = '';
			lateSelected = 'selected-filter';
		}
	};

	//Reactive filter
	$: filteredCapas = capas.filter((capa) => {
		if (filter === 'open') {
			return capa.capaStatus !== 'Closed' && capa.capaStatus !== 'Rejected';
		}
		if (filter === 'closed') {
			return capa.capaStatus === 'Closed';
		}
		if (filter === 'late') {
			return (
				new Date(capa.currentPhaseDueDate) < new Date() &&
				capa.capaStatus !== 'Closed' &&
				capa.capaStatus !== 'Rejected'
			);
		}
		return true;
	});

	//Function for resetting form input after submission
	const clearFormInput = async (event) => {
		event.target.reset();
	};

	// Client SuperForms API:
	const { form } = superForm(data.form);

	let showDebug = false;
</script>

<h1 class="text-3xl font-bold">Add and View CAPAs</h1>
<div class="flex-container">
	<div class="add-capas my-4 card w-80 bg-base-300 self-center">
		<div class="card-body p-3">
			<!-- <h3 class="card-title text-accent">Capas</h3> -->
			<!-- <form
				method="POST"
				action="?/create"
				use:enhance={form_action(
					{ message: 'CAPA creation' },
					async (res) => await invalidateAll()
				)}
				class="flex flex-col align-center gap-1 p-2"
				on:submit|preventDefault={(e) => clearFormInput(e)}
			>
				<div>
					<label for="capaNumber" class="label p-1 label-text text-primary-content">
						CAPA Number
					</label>
					<input type="text" name="capaNumber" class="mb-4 input w-full max-w-s" />
				</div>

				<label for="dateCapaCreated" class="label p-1 label-text text-primary-content">
					Date Created
				</label>
				<input type="date" name="dateCapaCreated" class="mb-4 input w-full max-w-s" />

				<label for="capaStatus" class="label p-1 label-text text-primary-content"> Status </label>
				<select class="select w-full max-w-xs" name="capaStatus" id="capaStatus">
					{#each capaStatusOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>

				<label for="capaPhase" class="label p-1 label-text text-primary-content"> Phase </label>
				<select class="select w-full max-w-xs" name="capaPhase" id="capaStatus">
					{#each capaPhaseOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>

				<label for="problemStatement" class="label p-1 label-text text-primary-content">
					Problem Statement
				</label>
				<textarea rows="3" name="problemStatement" class="textarea textarea-bordered mb-4" />

				<label for="dateCapaApproved" class="label p-1 label-text text-primary-content">
					Date Approved
				</label>
				<input type="date" name="dateCapaApproved" class="mb-4 input w-full max-w-s" />

				<label for="currentPhaseDueDate" class="label p-1 label-text text-primary-content">
					Phase Due Date
				</label>
				<input type="date" name="currentPhaseDueDate" class="mb-4 input w-full max-w-s" />

				<label for="productImpacted" class="label p-1 label-text text-primary-content">
					Product Impacted
				</label>
				<input type="text" name="productImpacted" class="mb-4 input w-full max-w-s" />
				<input type="hidden" name="documentCreated" value={new Date(Date.now()).toLocaleString()} />
				<button class="btn btn-primary" type="submit">Submit</button>
			</form> -->
			<!-- SuperForms test-->
			<h3 class="card-title text-accent">CAPAs</h3>

			<form
				method="POST"
				action="?/create"
				use:enhance={form_action(
					{ message: 'CAPA creation' },
					async (res) => await invalidateAll()
				)}
				class="flex flex-col align-center gap-1 p-2"
				on:submit|preventDefault={(e) => clearFormInput(e)}
			>
				<div>
					<label for="capaNumber" class="label p-1 label-text text-primary-content">
						CAPA Number
					</label>
					<input
						type="text"
						name="capaNumber"
						bind:value={$form.capaNumber}
						class="mb-4 input w-full max-w-s"
					/>
				</div>

				<label for="dateCapaCreated" class="label p-1 label-text text-primary-content">
					Date Created
				</label>
				<input
					type="date"
					name="dateCapaCreated"
					bind:value={$form.dateCapaCreated}
					class="mb-4 input w-full max-w-s"
				/>

				<label for="capaStatus" class="label p-1 label-text text-primary-content"> Status </label>
				<select
					class="select w-full max-w-xs"
					name="capaStatus"
					bind:value={$form.capaStatus}
					id="capaStatus"
				>
					{#each capaStatusOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>

				<label for="capaPhase" class="label p-1 label-text text-primary-content"> Phase </label>
				<select
					class="select w-full max-w-xs"
					name="capaPhase"
					bind:value={$form.capaPhase}
					id="capaStatus"
				>
					{#each capaPhaseOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>

				<label for="problemStatement" class="label p-1 label-text text-primary-content">
					Problem Statement
				</label>
				<textarea
					rows="3"
					name="problemStatement"
					bind:value={$form.problemStatement}
					class="textarea textarea-bordered mb-4"
				/>

				<label for="dateCapaApproved" class="label p-1 label-text text-primary-content">
					Date Approved
				</label>
				<input
					type="date"
					name="dateCapaApproved"
					bind:value={$form.dateCapaApproved}
					class="mb-4 input w-full max-w-s"
				/>

				<label for="currentPhaseDueDate" class="label p-1 label-text text-primary-content">
					Phase Due Date
				</label>
				<input
					type="date"
					name="currentPhaseDueDate"
					bind:value={$form.currentPhaseDueDate}
					class="mb-4 input w-full max-w-s"
				/>

				<label for="productImpacted" class="label p-1 label-text text-primary-content">
					Product Impacted
				</label>
				<input
					type="text"
					name="productImpacted"
					bind:value={$form.productImpacted}
					class="mb-4 input w-full max-w-s"
				/>
				<input type="hidden" name="documentCreated" value={new Date(Date.now()).toLocaleString()} />
				<button class="btn btn-primary" type="submit">Submit</button>
			</form>
			<p class="text-warning">
				<a
					class="link link-accent"
					href="https://superforms.vercel.app/get-started"
					target="_blank"
					rel="noreferrer">Superforms</a
				> Debugger:
			</p>
			<Switch bind:checked={showDebug} />
			{#if showDebug}
				<SuperDebug data={$form} />
			{/if}
		</div>
	</div>

	<div class="capa-cards">
		<div class="bg-neutral" id="filter-group">
			<button
				class="btn btn-xl"
				id={allSelected}
				on:click={() => ((filter = 'all'), tabSelected(filter))}>All</button
			>
			<button
				class="btn btn-xl"
				id={openSelected}
				on:click={() => ((filter = 'open'), tabSelected(filter))}>Open</button
			>
			<button
				class="btn btn-xl"
				id={lateSelected}
				on:click={() => ((filter = 'late'), tabSelected(filter))}>Late</button
			>
			<button
				class="btn btn-2xl"
				id={closedSelected}
				on:click={() => ((filter = 'closed'), tabSelected(filter))}>Closed</button
			>
		</div>

		{#each filteredCapas as capa}
			<div class="my-4 card w-80 bg-base-300 text-primary-content self-center">
				<div class="card-body p-3">
					{#if capa.capaStatus !== 'Closed' && capa.capaStatus !== 'Rejected' && new Date(capa.currentPhaseDueDate) < new Date()}
						<div class="text-warning">
							<h3 class="card-title">
								<a href="/capas/{capa._id}">⚠️ {capa.capaNumber} PAST DUE!</a>
							</h3>
							<p>{capa.capaStatus}</p>
							<p>Phase Due Date: {capa.currentPhaseDueDate}</p>
						</div>
					{:else if capa.capaStatus === 'Rejected'}
						<div class="text-error">
							<h3 class="card-title"><a href="/capas/{capa._id}">⛔ {capa.capaNumber}</a></h3>
							<p>{capa.capaStatus}. No Action Needed.</p>
						</div>
					{:else if capa.capaStatus !== 'Closed'}
						<h3 class="card-title"><a href="/capas/{capa._id}">{capa.capaNumber}</a></h3>
						<p>{capa.capaStatus}</p>
						<p>Phase Due Date: {capa.currentPhaseDueDate}</p>
					{:else}
						<div class="text-accent">
							<h3 class="card-title"><a href="/capas/{capa._id}">✅ {capa.capaNumber}</a></h3>
							<p>{capa.capaStatus}. No Action Needed.</p>
						</div>
					{/if}

					<div class="flex justify-end">
						<a class="btn btn-primary" href="/capas/{capa._id}">View</a>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex justify-center">
				<p class="my-4 text-accent font-bold">No Capas Found</p>
			</div>
		{/each}
	</div>
</div>

<style>
	#selected-filter {
		color: #1fb2a6;
		text-decoration: underline;
		font-weight: bold;
	}

	.flex-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#filter-group {
		width: 100%;
		display: flex;
		justify-content: space-between;
		border-radius: 1rem;
	}

	@media (min-width: 768px) {
		/* CSS rules to apply when screen width is 768 pixels or higher */
		.flex-container {
			display: flex;
			flex-direction: row;
		}

		.modal-select {
			width: 100%;
		}
		.capa-cards,
		.add-capas {
			margin: 1rem;
			align-self: flex-start;
		}
	}
</style>
