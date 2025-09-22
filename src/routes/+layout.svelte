<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import {Role} from "$lib/enums/role.enum";

	let { children, data } = $props();
	let isAdministrator = $state(data?.user?.role === Role.ADMINISTRATOR ?? null);

	let countNotifications = $state(data.notifications?.filter((item) => item.isRead === false)?.length);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<title>Home</title>
</svelte:head>

<div>
	<nav>
		<a href="/">Logo</a>
		<ul>
			{#if data?.user !== null}
				{#if !isAdministrator}
					<li><a href="/tasks">Tasks</a></li>
					<li><a href="/#">Calendar</a></li>
					<li><a href="/notifications">Notifications <span>{countNotifications}</span></a></li>
				{/if}
				<form action="/logout" method="POST" style="display:inline" >
					<button type="submit">Выйти</button>
				</form>
			{:else}
				<li><a href="/sign-up">Start Now</a></li>
				<li><a href="/sign-in">Sign In</a></li>
			{/if}

		</ul>
	</nav>
</div>

{@render children?.()}
