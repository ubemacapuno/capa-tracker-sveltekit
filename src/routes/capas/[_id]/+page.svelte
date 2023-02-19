<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { form_action } from '$lib/forms/enhance';
	import Modal from '$lib/components/Modal.svelte';

	export let data: PageData;
	$: ({ capa } = data);

	let isEditModalOpen = false;
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
</script>

{#if capa}
	<div class="my-4 card w-80 bg-neutral text-primary-content self-center">
		<div class="card-body p-3">
			{#if capa.capaStatus !== 'Closed' && capa.capaStatus !== 'Rejected' && new Date(capa.currentPhaseDueDate) < new Date()}
				<div class="text-warning">
					<h3 class="card-title">
						⚠️ {capa.capaNumber} PAST DUE!
					</h3>
				</div>
			{:else if capa.capaStatus === 'Rejected'}
				<div class="text-error">
					<h3 class="card-title">⛔ {capa.capaNumber}</h3>
					<p>{capa.capaStatus}. No Action Needed.</p>
				</div>
			{:else if capa.capaStatus !== 'Closed'}
				<h3 class="card-title">{capa.capaNumber}</h3>
			{:else}
				<div class="text-accent">
					<h3 class="card-title">✅ {capa.capaNumber}</h3>
					<p>{capa.capaStatus}. No Action Needed.</p>
				</div>
			{/if}

			<p class="text-lg"><span class="text-accent">Status:</span> {capa.capaStatus}</p>
			<p class="text-lg"><span class="text-accent">Phase:</span> {capa.capaPhase}</p>
			<p class="text-lg"><span class="text-accent">Date Created:</span> {capa.dateCapaCreated}</p>
			<p class="text-lg"><span class="text-accent">Date Approved:</span> {capa.dateCapaApproved}</p>
			<p class="text-lg"><span class="text-accent">Due Date:</span> {capa.currentPhaseDueDate}</p>
			<p class="text-lg">
				<span class="text-accent">Impacted Product:</span>
				{capa.productImpacted}
			</p>
			<div class="text-lg text-accent">
				Problem Statement:
				<div class="text-primary-content">
					{capa.problemStatement}
				</div>
			</div>
			<div class="flex justify-between py-2">
				<div class="btn-group">
					<a href="/capas" class="btn btn-secondary" type="submit">Back</a>
					<button on:click={() => (isEditModalOpen = true)} type="button" class="btn btn-primary"
						>Edit</button
					>
				</div>
				<form
					method="POST"
					action="?/delete"
					use:enhance={form_action(
						{ message: 'CAPA deletion' },
						async (res) => await invalidateAll()
					)}
				>
					<input type="hidden" name="_id" value={capa._id} />
					<button class="trash btn btn-circle btn-error" type="submit">🗑️</button>
				</form>
			</div>
		</div>
	</div>
{:else}
	<h3>Capa not found</h3>
	<a href="/capas">Back to capas</a>
{/if}

<Modal bind:isModalOpen={isEditModalOpen}>
	{#if isEditModalOpen}
		{capa.capaNumber}
		<span class="self-center text-accent">Added on {capa.documentCreated}</span>
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
				<input type="hidden" name={'_id'} value={capa._id} />
				<input
					type="text"
					name="capaNumber"
					class="input w-full max-w-xs"
					value={capa.capaNumber}
				/>
			</div>

			<div class="flex flex-row mb-1 justify-between">
				<label for="capaStatus" class="label p-1">
					<span class="label-text">Status</span>
				</label>
				<input type="hidden" name={'_id'} value={capa._id} />
				<select
					class="input w-full max-w-xs"
					name="capaStatus"
					id="capaStatus"
					bind:value={capa.capaStatus}
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
				<input type="hidden" name={'_id'} value={capa._id} />
				<select
					class="input w-full max-w-xs"
					name="capaPhase"
					id="capaPhase"
					bind:value={capa.capaPhase}
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
				<input type="hidden" name={'_id'} value={capa._id} />
				<input
					type="date"
					name="dateCapaCreated"
					class="input w-full max-w-xs"
					value={capa.dateCapaCreated}
				/>
			</div>

			<div class="flex flex-row mb-1 justify-between">
				<label for="dateCapaCreated" class="label p-1">
					<span class="label-text">Approved</span>
				</label>
				<input type="hidden" name={'_id'} value={capa._id} />
				<input
					type="date"
					name="dateCapaApproved"
					class="input w-full max-w-xs"
					value={capa.dateCapaApproved}
				/>
			</div>

			<div class="flex flex-row mb-1 justify-between">
				<label for="currentPhaseDueDate" class="label p-1">
					<span class="label-text">Due</span>
				</label>
				<input type="hidden" name={'_id'} value={capa._id} />
				<input
					type="date"
					name="currentPhaseDueDate"
					class="input w-full max-w-xs"
					value={capa.currentPhaseDueDate}
				/>
			</div>

			<div class="flex flex-row mb-1 justify-between">
				<label for="productImpacted" class="label p-1">
					<span class="label-text">Product</span>
				</label>
				<input type="hidden" name={'_id'} value={capa._id} />
				<input
					type="text"
					name="productImpacted"
					class="input w-full max-w-xs"
					value={capa.productImpacted}
				/>
			</div>

			<div class="flex flex-col mb-1">
				<label for="capaStatus" class="label p-1">
					<span class="label-text">Problem Statement</span>
				</label>
				<input type="hidden" name={'_id'} value={capa._id} />
				<textarea name="problemStatement" class="input w-full" value={capa.problemStatement} />
			</div>

			<button class="mt-2 btn btn-primary" type="submit">Update</button>
		</form>
	{/if}
</Modal>
