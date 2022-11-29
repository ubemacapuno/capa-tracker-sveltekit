<script>
	import { page } from '$app/stores';
</script>
<header>
	<div class="navbar bg-base-100">
		<div class="navbar-start">
		  <div class="dropdown">
			<label tabindex="0" class="btn btn-ghost lg:hidden">
			  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
			</label>
			<ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 bg-neutral">
				<li><a href="/about">About</a></li>
				<li><a href="/#">Add Record</a></li>
			</ul>
		  </div>
		  <!-- <a href="/" class="btn btn-ghost normal-case text-xl">CAPA Tracker</a> -->
		  <a href="/" aria-current="page" aria-label="Homepage" class="flex-0 btn btn-ghost px-2 "><div class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl"><span class="text-accent">CAPA</span> <span class="lowercase text-base-content">Tracker</span></div></a>
		</div>
		<div class="navbar-center hidden lg:flex">
		  <ul class="menu menu-horizontal p-0">
			<li><a href="/about">About</a></li>
			<li><a href="/#">Add Record</a></li>
		  </ul>
		</div>
		<div class="navbar-end">
		  <!-- <a href="#" class="btn">Logout</a> -->
		  <a href="#my-modal-2" class="btn">Logout</a>
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