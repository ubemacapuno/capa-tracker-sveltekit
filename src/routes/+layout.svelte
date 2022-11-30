<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	// import './styles.css';
	import "../app.css";
</script>
<div class="flex flex-col min-h-screen">
	<Header />

	<main class="flex justify-center content-center flex-col">
		<slot />
	</main>

	<Footer />
</div>