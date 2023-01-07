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
	<div class="flex flex-col items-center justify-center">
		<h1 class="text-3xl font-bold">You are not signed in!</h1>
		<button class="w-20 mt-10 btn btn-primary" on:click={() => signIn("github")}>Login</button>
	</div>

{:else}
	<div class="mt-10 max-w-md">
		<h1 class="text-3xl font-bold"><span class="text-accent">CAPA</span><span class="lowercase text-base-content">Tracker</span> Dashboard</h1>
		<h3 class="mt-10 text-lg font-bold">Logged in as <span class="text-secondary">{$page.data.session.user?.name ?? "User"}</span></h3>
		
		<div class="stats stats-vertical lg:stats-horizontal shadow">
			<div class="stat">
				<div class="stat-title">Total CAPAs</div>
				<div class="stat-value text-error">{capaReports.length}</div>
			</div>	
		</div>
	</div>
{/if}
