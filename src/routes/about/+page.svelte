<script>
	import { signIn } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import CapaInfo from './CapaInfo.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let isModalOpen = false;
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="card bg-base-300 max-w-3xl shadow-xl mx-1">
	<div class="card-body">
		<h1 class="text-3xl font-bold">
			About <span class="text-accent">CAPA</span><span class="lowercase text-base-content"
				>Tracker</span
			>
		</h1>

		<p>
			By <a
				rel="noreferrer noopener"
				class="no-underline link link-secondary"
				href="https://coreydamocles.netlify.app/"
				target="_blank">Corey Damocles</a
			>
		</p>

		<p class="pt-6 pb-3 text-left">
			CAPA Tracker is a full-stack application that allows users to create CAPA records, add
			information, update information, and delete entries. CAPA stands for Corrective And Preventive
			Action, and is a process by which a manufacturing organization can make improvements to reduce
			non-conformances and process gaps.
		</p>
		<p class="py-3 text-left">
			My background is in pharmaceutical and medical device quality assurance; in both industries,
			CAPA processes are required by regulatory agencies. CAPA Tracker is an app that can help
			document and keep track of your organization's <button
				class="text-accent"
				on:click={() => (isModalOpen = true)}
				type="button">CAPAs.</button
			>
		</p>
		<p class="py-3 text-left">
			CAPA Tracker is in development using <a
				class="link link-accent"
				href="https://kit.svelte.dev/">SvelteKit</a
			>
			and <a class="link link-accent" href="https://daisyui.com/">DaisyUI (Tailwind plugin)</a> on
			the front-end. Server calls to the MongoDB back-end database are made using
			<a class="link link-accent" href="https://kit.svelte.dev/docs/form-actions"
				>SvelteKit form actions</a
			>.
		</p>
		<p class="py-3 text-left">
			This application is a complete overhaul of my <a
				class="link link-accent"
				href="https://github.com/ubemacapuno/capa-tracker">original CAPA Tracker</a
			> application, which was developed using Embedded JavaScript (EJS), Node (Express), and MongoDB.
		</p>
		<!-- <a href="/" class="my-6 btn btn-primary">Dashboard</a> -->
		{#if !$page.data.session}
			<h1 class="text-xl text-warning font-bold">Please sign in!</h1>
			<button class="my-6 btn btn-primary" on:click={() => signIn('github')}>Sign in</button>
		{:else}
			<a href="/" class="my-6 btn btn-primary">Dashboard</a>
		{/if}
	</div>
</div>

<Modal bind:isModalOpen>
	<p><CapaInfo /></p>
</Modal>
