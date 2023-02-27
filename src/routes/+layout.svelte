<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import ToastMessage from './ToastMessage.svelte';
	import '../app.css';
</script>

<ToastMessage />
<div class="flex flex-col min-h-screen relative pb-7">
	<Header />
	<div class="mx-auto">
		<slot />
	</div>
	<div class="mt-4">
		<Footer />
	</div>
</div>
