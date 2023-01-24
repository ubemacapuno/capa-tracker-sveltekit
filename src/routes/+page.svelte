<script lang="ts">
	import { signIn} from "@auth/sveltekit/client"
	import { page } from "$app/stores"
	import type { PageData } from './$types';

	export let data: PageData;
    $: ({capaReports} = data)
</script>

<svelte:head>
	<title>CAPA Tracker - Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


{#if !$page.data.session}
	<div class="flex flex-col justify-center">
		<h1 class="text-3xl text-warning font-bold">Please sign in for complete access!</h1>
		<p class="mt-5 text-error text-md italic">*NOTE: CAPAtracker is in development! The authentication service may become disconnected, preventing login access!</p>
		<button class="mt-10 btn btn-primary" on:click={() => signIn("github")}>Login</button>
	</div>

{:else}

	<h1 class="text-3xl font-bold text-primary">Dashboard</h1>
	<p>Signed in as <span class="text-accent">{$page.data.session.user?.name ?? "User"}</span></p>
	
	<div class="mt-5 bg-base-200 stats stats-vertical w-full">
		<div class="stat">
			<div class="stat-title">Total CAPAs Open</div>
			<div class="stat-value">
				{capaReports
					.filter(capaReport => capaReport.capaStatus !== "Closed")
					.length
				}
			</div>
		</div>
		<div class="stat text-error">
			<div class="stat-title">CAPAs Overdue</div>
			<div class="stat-value">
				{capaReports
					.filter(capaReport => new Date(capaReport.currentPhaseDueDate) < new Date())
					.length

					-
					
				capaReports.
					filter(capaReport => capaReport.capaStatus === "Closed").length 
				}
			</div>
		</div>
		<div class="stat text-accent">
			<div class="stat-title">Total CAPAs Closed</div>
			<div class="stat-value">
				{capaReports
					.filter(capaReport => capaReport.capaStatus === "Closed")
					.length
				}
			</div>
		</div>
		<div class="stat">
			<div class="stat-title">Total CAPAs</div>
			<div class="stat-value">{capaReports.length}</div>
		</div>	
	</div>
{/if}
