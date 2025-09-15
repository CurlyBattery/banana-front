<script lang="ts">

	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();
	console.log(data)

</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<title>Home</title>
</svelte:head>

<div>
	<nav>
		<a href="/">Logo</a>
		<ul>

			{#if data.user}
				<a href="/tasks">Tasks</a>
			{:else}
				<li><a href="/sign-up">Start Now</a></li>
				<li><a href="/sign-in">Sign In</a></li>
			{/if}
		</ul>
	</nav>


</div>

{@render children?.()}
