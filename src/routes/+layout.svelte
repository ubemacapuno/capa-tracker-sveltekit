<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	// import './styles.css';
	import "../app.css";
</script>
<div class="flex flex-col min-h-screen">
	<Header />

	<main class="box-border flex flex-1 flex-col p-1 w-full max-w-5xl my-0 mx-auto">
		<slot />
	</main>

	<Footer />
</div>