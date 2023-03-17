<script lang="ts">
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai';
	export let type: ChatCompletionRequestMessageRoleEnum;
	export let message: string;
</script>

<div class="chat {type === 'user' ? 'chat-end' : 'chat-start'} justify-end">
	<div class="chat-image avatar online">
		{#if type === 'user'}
			<div class="user_avatar_wrapper bg-neutral-focus text-primary rounded-full w-10">
				<span class="text-xl">ME</span>
			</div>
		{:else}
			<div class="user_avatar_wrapper bg-neutral-focus text-secondary rounded-full w-10">
				<span class="text-xl">C</span>
			</div>
		{/if}
	</div>
	<div class="chat-header">
		{type === 'user' ? 'Me' : 'CAPATracker Assistant'}
	</div>
	<div class="chat-bubble {type === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}">
		{message}
		<slot />
	</div>
</div>

<style>
	.user_avatar_wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
