<script lang="ts">
	import chatBotAvatar from '$lib/icons/avatar.jpg';
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai';
	export let type: ChatCompletionRequestMessageRoleEnum;
	export let message: string;
</script>

<div class="chat {type === 'user' ? 'chat-end' : 'chat-start'} justify-end">
	<div class="chat-image avatar online">
		{#if type === 'user'}
			<div class="user_avatar_wrapper bg-neutral-focus text-accent rounded-full w-10">
				<span class="text-xl">ME</span>
			</div>
		{:else}
			<div class="w-10 rounded-full">
				<img src={chatBotAvatar} alt="Chat Bot Avatar" />
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
