<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import "../app.css";

</script>
<div class="flex flex-col min-h-screen relative pb-7">

	<Header />
		<div class="hero min-h-screen bg-base-200 relative mb-5">
			<div class="hero-content">
				<main class="flex justify-center content-center flex-col">
					<slot />
				</main>
			</div>
	  	</div>
	<Footer />
</div>