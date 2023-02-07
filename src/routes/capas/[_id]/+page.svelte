<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ capa } = data);
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
{:else}
	<h3>Capa not found</h3>
	<a href="/companies">Back to capas</a>
{/if}
