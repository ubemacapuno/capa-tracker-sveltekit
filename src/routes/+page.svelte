<script>
	import { signIn, signOut } from "@auth/sveltekit/client"
	import { page } from "$app/stores"
</script>

<svelte:head>
	<title>CAPA Tracker - Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


{#if !$page.data.session}
	<div class="max-w-md">
		<h1 class="text-3xl font-bold">You are not signed in!</h1>
		<button class="btn btn-primary" on:click={() => signIn("github")}>Login</button>
	</div>
{/if}

<div class="mt-20 max-w-md">
	<h1 class="text-3xl font-bold"><span class="text-accent">CAPA</span><span class="lowercase text-base-content">Tracker</span> Dashboard</h1>
	<p>Coming Soon . . .</p>
</div>

