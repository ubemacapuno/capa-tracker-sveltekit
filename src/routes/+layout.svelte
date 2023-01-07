<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import "../app.css";

</script>
<div class="flex flex-col min-h-screen relative pb-7">

	<Header />
		<div class="flex justify-center">
			<div class="hero-content">
				<main class="flex flex-col">
					<slot />
				</main>
			</div>
	  	</div>
	<Footer />
</div>