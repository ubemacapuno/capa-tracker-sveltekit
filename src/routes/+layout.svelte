<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import "../app.css";
</script>
<div class="flex flex-col min-h-screen relative pb-7">


	<ul class="menu menu-horizontal px-1 z-50">
		<li>
			<button> Set Theme 🎨 </button>
			<ul class="p-2 bg-base-100 w-full max-h-96 overflow-y-scroll">
				<li>
					<button>Dark</button>
				</li>
				<li>
					<button>Light</button>
				</li>
			</ul>
		</li>
	</ul>


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