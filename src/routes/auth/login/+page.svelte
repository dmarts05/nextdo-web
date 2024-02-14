<script lang="ts">
	import { enhance } from '$app/forms';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let form;

	let isLoading = false;
</script>

<main class="flex flex-col justify-center h-screen max-w-md gap-4 p-4 mx-auto">
	<h1 class="h1">Log In</h1>
	<hr />
	<form
		method="post"
		class="flex flex-col justify-center gap-4"
		use:enhance={() => {
			isLoading = true;
			return async ({ update }) => {
				isLoading = false;
				update();
			};
		}}
	>
		<div class="flex flex-col gap-2">
			<label for="email" class="label">Email</label>
			<input
				type="email"
				id="email"
				name="email"
				class="input"
				class:input-error={form?.errors?.email}
				autocomplete="email"
				required
			/>
			{#if form?.errors?.email}
				<small class="text-error-500">{form.errors.email}</small>
			{/if}
		</div>
		<div class="flex flex-col gap-2">
			<label for="password" class="label">Password</label>
			<input
				type="password"
				id="password"
				name="password"
				class="input"
				class:input-error={form?.errors?.password}
				autocomplete="current-password"
				required
			/>
			{#if form?.errors?.password}
				<small class="text-error-500">{form.errors.password}</small>
			{/if}
		</div>
		<button type="submit" class="mt-2 btn variant-filled-primary" disabled={isLoading}>
			<span>Log In</span>
			{#if isLoading}
				<ProgressRadial strokeLinecap="round" stroke={60} width="w-4" />
			{/if}
		</button>
		{#if form?.message}
			<small class="text-error-500">{form.message}</small>
		{/if}
	</form>
</main>
