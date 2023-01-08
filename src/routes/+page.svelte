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
	<div class="max-w-md">
		<h1 class="mb-10 text-3xl font-bold text-accent">Dashboard</h1>
		
		<div class="bg-base-200 stats stats-vertical">
			<div class="stat">
				<div class="stat-title">Total CAPAs</div>
				<div class="stat-value text-primary">{capaReports.length}</div>
			</div>	
			<div class="stat">
				<div class="stat-title">Signed in as</div>
				<div class="stat-value text-primary">{$page.data.session.user?.name ?? "User"}</div>
			</div>	
		</div>
	</div>
{/if}
