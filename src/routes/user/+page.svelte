<script lang="ts">
	import { page } from '$app/stores';
	import { avatarLetters } from '$utilities/helpers';

	const avatarInitials = avatarLetters(String($page.data.session?.user?.name));
</script>

<div class="card bg-base-300 max-w-3xl shadow-xl mx-1">
	<div class="card-body">
		<h1 class="text-3xl font-bold">Profile</h1>

		<div>
			<div class="avatar online placeholder">
				<div class="bg-neutral-focus text-neutral-content rounded-full w-16">
					<span class="text-xl">{avatarInitials}</span>
				</div>
			</div>
			<p>
				Signed in as <span class="text-accent">{$page.data.session?.user?.name ?? 'User'}</span>
			</p>
		</div>
	</div>
</div>
