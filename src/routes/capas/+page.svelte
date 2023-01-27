<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';
	import { form_action } from '$lib/forms/enhance';

	export let data: PageData;
	$: ({ capas } = data);
	let isModalOpen: 'add-capa-modal' | null | false = null;
	// let isCreateModalOpen = false; //TODO: Update UI to maybe have a modal for this
	let isEditModalOpen = false;

	//Variable declaration for the current capa
	//Used to bring up the respective "capa" in the edit modal.
	let currentCapa = {
		_id: '',
		capaNumber: '',
		dateCapaCreated: '',
		capaStatus: '',
		capaPhase: '',
		problemStatement: '',
		dateCapaApproved: '',
		currentPhaseDueDate: '',
		productImpacted: '',
		documentCreated: ''
	};

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
</script>

<h1 class="text-3xl font-bold">Add and View CAPAs</h1>

<div class="my-4 card w-80 bg-neutral text-primary-content self-center">
	<div class="card-body p-3">
		<h3 class="card-title text-accent">Capas</h3>
		<form
			method="POST"
			action="?/create"
			use:enhance={form_action({ message: 'CAPA creation' }, async (res) => await invalidateAll())}
			class="flex flex-col align-center gap-1 p-2"
			on:submit|preventDefault={(e) => ((isModalOpen = null), clearFormInput(e))}
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
		</form>
	</div>
</div>

<ul class="flex justify-evenly">
	<li>
		<button id={allSelected} on:click={() => ((filter = 'all'), tabSelected(filter))}>All</button>
	</li>
	<li>
		<button id={openSelected} on:click={() => ((filter = 'open'), tabSelected(filter))}>Open</button
		>
	</li>
	<li>
		<button id={lateSelected} on:click={() => ((filter = 'late'), tabSelected(filter))}>Late</button
		>
	</li>
	<li>
		<button id={closedSelected} on:click={() => ((filter = 'closed'), tabSelected(filter))}
			>Closed</button
		>
	</li>
</ul>

{#each filteredCapas as capa}
	<div class="my-4 card w-80 bg-neutral text-primary-content self-center">
		<div class="card-body p-3">
			<h3 class="card-title text-accent">{capa.capaNumber}</h3>
			{#if capa.capaStatus !== 'Closed' && new Date(capa.currentPhaseDueDate) < new Date()}
				<div class="text-warning">
					<p class="font-bold">CAPA PAST DUE!</p>
					<p>Status: {capa.capaStatus}</p>
					<p>Phase Due Date: {capa.currentPhaseDueDate}</p>
				</div>
			{:else if capa.capaStatus !== 'Closed'}
				<p>Status: {capa.capaStatus}</p>
				<p>Phase Due Date: {capa.currentPhaseDueDate}</p>
			{:else}
				<p class="font-bold">{capa.capaStatus}</p>
			{/if}

			<div class="btn-group flex justify-center">
				<button
					on:click={() => ((isEditModalOpen = true), (currentCapa = capa))}
					type="button"
					class="btn btn-primary">Open</button
				>
				<form
					method="POST"
					action="?/delete"
					use:enhance={form_action(
						{ message: 'CAPA deletion' },
						async (res) => await invalidateAll()
					)}
				>
					<input type="hidden" name="_id" value={capa._id} />
					<button class="btn btn-error" type="submit">Delete</button>
				</form>
			</div>
		</div>
	</div>
{:else}
	<div class="flex justify-center">
		<p class="my-4 text-accent font-bold">No Capas Found</p>
	</div>
{/each}

<Modal bind:isModalOpen={isEditModalOpen}>
	{#if isEditModalOpen}
		<form
			class="flex flex-col"
			method="POST"
			action="?/update"
			use:enhance={form_action({ message: 'CAPA Update' }, async () => {
				await invalidateAll(), (isEditModalOpen = false);
			})}
		>
			<div class="flex flex-row mb-1 justify-between">
				<label for="capaNumber" class="label p-1">
					<span class="label-text">Number</span>
				</label>
				<input type="hidden" name={'_id'} value={currentCapa._id} />
				<input
					type="text"
					name="capaNumber"
					class="input w-full max-w-xs"
					value={currentCapa.capaNumber}
				/>
			</div>

			<div class="flex flex-row mb-1 justify-between">
				<label for="capaStatus" class="label p-1">
					<span class="label-text">Status</span>
				</label>
				<input type="hidden" name={'_id'} value={currentCapa._id} />
				<select
					class="select w-full max-w-xs"
					name="capaStatus"
					id="capaStatus"
					bind:value={currentCapa.capaStatus}
				>
					{#each capaStatusOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</div>

			<div class="flex flex-row mb-1 justify-between">
				<label for="capaPhase" class="label p-1">
					<span class="label-text">Phase</span>
				</label>
				<input type="hidden" name={'_id'} value={currentCapa._id} />
				<select
					class="select w-full max-w-xs"
					name="capaPhase"
					id="capaPhase"
					bind:value={currentCapa.capaPhase}
				>
					{#each capaPhaseOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</div>

			<div class="flex flex-row mb-1 justify-between">
				<label for="dateCapaCreated" class="label p-1">
					<span class="label-text">Created</span>
				</label>
				<input type="hidden" name={'_id'} value={currentCapa._id} />
				<input
					type="date"
					name="dateCapaCreated"
					class="input w-full max-w-xs"
					value={currentCapa.dateCapaCreated}
				/>
			</div>

			<div class="flex flex-row mb-1 justify-between">
				<label for="dateCapaCreated" class="label p-1">
					<span class="label-text">Approved</span>
				</label>
				<input type="hidden" name={'_id'} value={currentCapa._id} />
				<input
					type="date"
					name="dateCapaApproved"
					class="input w-full max-w-xs"
					value={currentCapa.dateCapaApproved}
				/>
			</div>

			<div class="flex flex-row mb-1 justify-between">
				<label for="currentPhaseDueDate" class="label p-1">
					<span class="label-text">Due</span>
				</label>
				<input type="hidden" name={'_id'} value={currentCapa._id} />
				<input
					type="date"
					name="currentPhaseDueDate"
					class="input w-full max-w-xs"
					value={currentCapa.currentPhaseDueDate}
				/>
			</div>

			<div class="flex flex-row mb-1 justify-between">
				<label for="productImpacted" class="label p-1">
					<span class="label-text">Product</span>
				</label>
				<input type="hidden" name={'_id'} value={currentCapa._id} />
				<input
					type="text"
					name="productImpacted"
					class="input w-full max-w-xs"
					value={currentCapa.productImpacted}
				/>
			</div>

			<div class="flex flex-col mb-1">
				<label for="capaStatus" class="label p-1">
					<span class="label-text">Problem Statement</span>
				</label>
				<input type="hidden" name={'_id'} value={currentCapa._id} />
				<textarea
					name="problemStatement"
					class="input w-full"
					value={currentCapa.problemStatement}
				/>
			</div>

			<button class="mt-2 btn btn-primary" type="submit">Update</button>
			<span class="self-center py-2 text-primary"
				>Initially made on {currentCapa.documentCreated}</span
			>
		</form>
	{/if}
</Modal>

<style>
	#selected-filter {
		color: #1fb2a6;
		text-decoration: underline;
		font-weight: bold;
	}
</style>
