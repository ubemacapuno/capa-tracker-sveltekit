<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores"
	import { signIn, signOut } from "@auth/sveltekit/client"

	let userTheme = 'dark'
	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme');
		userTheme = theme
		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
		}
	};


</script>
<header>
	<div class="navbar bg-base-100">
		<div class="navbar-start">
		  <div class="dropdown">
			<label tabindex="0" class="btn btn-ghost lg:hidden">
			  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
			</label>
			<ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box border-2 border-base-content w-52 bg-neutral">
				<li><a href="/about">About</a></li>
				<li><a href="/capas">View</a></li>
			</ul>
		  </div>
		  <!-- <a href="/" class="btn btn-ghost normal-case text-xl">CAPA Tracker</a> -->
		  <a href="/" aria-current="page" aria-label="Homepage" class="flex-0 btn btn-ghost px-2 "><div class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl"><span class="text-accent">CAPA</span> <span class="lowercase text-base-content">Tracker</span></div></a>
		</div>
		<div class="navbar-center hidden lg:flex">
		  <ul class="menu menu-horizontal p-0">
			<li><a href="/about">About</a></li>
			<li><a href="/capas">View</a></li>
		  </ul>
		</div>
		<div class="navbar-end">
	
			<form method="POST" use:enhance={submitUpdateTheme}>
				{#if userTheme === "dark"}
					<button class="mx-6 light btn btn-circle btn-outline btn-primary" formaction="/?/setTheme&theme=light&redirectTo={$page.url.pathname}"></button>
				{:else}
					<button class="mx-6 dark btn btn-circle btn-outline btn-secondary" formaction="/?/setTheme&theme=dark&redirectTo={$page.url.pathname}"></button>
				{/if}
			</form>

			<p>
				{#if $page.data.session}
					{#if $page.data.session.user?.image}
					<span
						style="background-image: url('{$page.data.session.user.image}')"
						class="avatar"
					/>
					{/if}
					<span class="signedInText">
					<strong class="mx-2 text-accent">{$page.data.session.user?.name ?? "User"}</strong>
					</span>
					<button class="btn btn-primary" on:click={() => signOut()}>Sign out</button>
				{:else}
					<button class="btn btn-primary" on:click={() => signIn("github")}>Login</button>
				{/if}
			</p>
		</div>
	</div>
	  <div class="modal" id="my-modal-2">
		<div class="modal-box">
		  <h3 class="font-bold text-lg">Demo Use!</h3>
		  <p class="py-4">In later versions, this button will log the user out!</p>
		  <div class="modal-action">
		   <a href="#" class="btn">Close</a>
		  </div>
		</div>
	  </div>
</header>

<style>
	.light::before {
		content: url('../lib/icons/Light.svg');
		width: 30px;
		height: 30px;
	}

	.dark::before {
		content: url('../lib/icons/Dark.svg');
		width: 30px;
		height: 30px;
	}
	
</style>