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
	{#if capa.capaStatus !== 'Closed' && capa.capaStatus !== 'Rejected' && new Date(capa.currentPhaseDueDate) < new Date()}
		<div class="text-warning">
			<h3 class="card-title">
				<a href="/capas/{capa._id}">⚠️ {capa.capaNumber} PAST DUE!</a>
			</h3>
		</div>
	{:else if capa.capaStatus === 'Rejected'}
		<div class="text-error">
			<h3 class="card-title"><a href="/capas/{capa._id}">⛔ {capa.capaNumber}</a></h3>
			<p>{capa.capaStatus}. No Action Needed.</p>
		</div>
	{:else if capa.capaStatus !== 'Closed'}
		<h3 class="card-title"><a href="/capas/{capa._id}">{capa.capaNumber}</a></h3>
	{:else}
		<div class="text-accent">
			<h3 class="card-title">✅ {capa.capaNumber}</h3>
			<p>{capa.capaStatus}. No Action Needed.</p>
		</div>
	{/if}

	<p class="text-lg">Status: {capa.capaStatus}</p>
	<p class="text-lg">Phase: {capa.capaPhase}</p>
	<p class="text-lg">Date Created: {capa.dateCapaCreated}</p>
	<p class="text-lg">Date Approved: {capa.dateCapaApproved}</p>
	<p class="text-lg">Phase Due Date: {capa.currentPhaseDueDate}</p>
	<p class="text-lg">Problem Statement: {capa.problemStatement}</p>
	<p class="text-lg">Impacted Product: {capa.productImpacted}</p>
	<div class="btn-group">
		<button on:click={() => (isEditModalOpen = true)} type="button" class="btn btn-primary"
			>Edit</button
		>
		<a href="/capas" class="btn btn-error" type="submit">Back</a>
	</div>
{:else}
	<h3>Capa not found</h3>
	<a href="/capas">Back to capas</a>
{/if}

<Modal bind:isModalOpen={isEditModalOpen}>
	{#if isEditModalOpen}
		<p>MODAL</p>
		<span class="self-center py-2 text-accent">Added on {capa.documentCreated}</span>
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
					class="modal-select select max-w-xs"
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
					class="modal-select select max-w-xs p-2"
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
