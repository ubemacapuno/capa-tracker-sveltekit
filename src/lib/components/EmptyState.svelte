<script lang="ts">
	export let title = '';
	export let description = '';
	export let isLoading = false;
	export let message = '';
</script>

{#if isLoading}
	<div class="btn loading">{message}</div>
{:else}
	<div class="alert shadow-lg">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="stroke-info flex-shrink-0 w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<h3>{title}</h3>
			<span>{description}</span>
		</div>
	</div>
{/if}
<slot />
