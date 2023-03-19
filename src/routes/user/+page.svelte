<script lang="ts">
	import { page } from '$app/stores';
	import { avatarLetters } from '$utilities/helpers';

	const avatarInitials = avatarLetters(String($page.data.session?.user?.name));
</script>

<div class="card bg-base-300 max-w-3xl shadow-xl mx-1">
	<div class="card-body">
		<h1 class="text-3xl font-bold">User Profile</h1>
		<div>
			<div class="avatar">
				{#if $page.data.session?.user?.image}
					<div class="w-24 rounded-xl">
						<img src={$page.data.session?.user?.image} alt="User avatar." />
					</div>
				{:else}
					<div class="bg-neutral-focus text-neutral-content rounded-full w-16">
						<span class="text-xl">{avatarInitials}</span>
					</div>
				{/if}
			</div>
			<p>
				User: <span class="text-accent"
					>{$page.data.session?.user?.name ?? 'Username Not Found'}</span
				>
			</p>
			<p>
				Email: <span class="text-accent"
					>{$page.data.session?.user?.email ?? 'Email Not Found'}</span
				>
			</p>
			<div class="max-w-md">
				<a href="/" class="my-6 btn btn-primary">View Dashboard</a>
			</div>
		</div>
	</div>
</div>
