<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<title>Home</title>
</svelte:head>

<div>
	<nav>
		<a href="/">Logo</a>
		<ul>
			<li><a href="/sign-up">Start Now</a></li>
			<li><a href="/sign-in">Sign In</a></li>
		</ul>
	</nav>
</div>

{@render children?.()}
