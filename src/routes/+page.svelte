<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ capaReports } = data);
</script>

<svelte:head>
	<title>CAPA Tracker - Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#if !$page.data.session}
	<div class="card bg-base-300 max-w-3xl shadow-xl mx-1">
		<div class="card-body">
			<strong class="text-warning text-3xl">Please sign in for complete access!</strong>
			<p class="mt-5 text-error text-md italic">
				*NOTE: CAPA Tracker is under construction and authentication may become disconnected from
				production, preventing login access!*
			</p>
			<button class="mt-10 btn btn-primary" on:click={() => signIn('github')}>Sign In</button>
		</div>
	</div>
{:else}
	<div class="card bg-base-300 max-w-3xl shadow-xl mx-1">
		<div class="card-body">
			<h1 class="text-3xl font-bold text-primary">Dashboard</h1>
			<p>Signed in as <span class="text-accent">{$page.data.session.user?.name ?? 'User'}</span></p>

			<div class="mt-5 bg-base-200 stats-vertical w-full">
				<div class="stat">
					<div class="stat-title">Total CAPAs Open</div>
					<div class="stat-value">
						{capaReports.filter(
							(capaReport) =>
								capaReport.capaStatus !== 'Closed' && capaReport.capaStatus !== 'Rejected'
						).length}
					</div>
				</div>
				<div class="stat text-error">
					<div class="stat-title">CAPAs Overdue</div>
					<div class="stat-value">
						{capaReports.filter(
							(capaReport) =>
								new Date(capaReport.currentPhaseDueDate) < new Date() &&
								capaReport.capaStatus !== 'Closed' &&
								capaReport.capaStatus !== 'Rejected'
						).length}
					</div>
				</div>
				<div class="stat text-accent">
					<div class="stat-title">Total CAPAs Closed</div>
					<div class="stat-value">
						{capaReports.filter((capaReport) => capaReport.capaStatus === 'Closed').length}
					</div>
				</div>
				<div class="stat">
					<div class="stat-title">Total CAPAs</div>
					<div class="stat-value">{capaReports.length}</div>
				</div>
			</div>
			<div class="max-w-md">
				<a href="/capas" class="my-6 btn btn-primary">View CAPAs</a>
			</div>
		</div>
	</div>
{/if}
