<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import ToastMessage from './ToastMessage.svelte';
	import '../app.css';
	import { navigating } from '$app/stores';
	import { loading } from '$lib/stores/loading';

	let isLoading = true;

	//call method from the loading store:
	$: loading.setNavigate(!!$navigating);
	$: if ($loading.status === 'NAVIGATING') {
		setTimeout(() => {
			//If loading.status is 'NAVIGATING' after the setTimeout, then set loading.status to 'LOADING':
			if ($loading.status === 'NAVIGATING') {
				$loading.status = 'LOADING';
			}
		}, 600);
	}
</script>

<ToastMessage />
<div class="flex flex-col min-h-screen relative pb-7">
	<Header />
	<div class="mx-auto">
		{#if $loading.status === 'LOADING'}
			<div class="empty_state_wrapper">
				<EmptyState {isLoading} message="Loading" />
			</div>
		{:else}
			<slot />
		{/if}
	</div>
	<div class="mt-4">
		<Footer />
	</div>
</div>

<style>
	.empty_state_wrapper {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
