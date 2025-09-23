<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import logo from '$lib/assets/logo.png';
	import {Role} from "$lib/enums/role.enum";

	let { children, data } = $props();
	let isAdministrator = $state(data?.user?.role === Role.ADMINISTRATOR ?? null);

	let countNotifications = $state(data.notifications?.filter((item) => item.isRead === false)?.length);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<title>Home</title>
</svelte:head>

<header>
	<nav>
		<div class="logo-container">
			<a href="/"><img alt="Логотип банановый" src={logo}></a>
		</div>
		<ul>
			{#if data?.user !== null}
				{#if !isAdministrator}
					<li><a href="/tasks">Задачи</a></li>
					<li><a href="/#">Календарь</a></li>
					<li><a href="/notifications">Уведомления <span>{countNotifications}</span></a></li>
				{/if}

			{:else}
				<li><a href="/sign-up">Начать</a></li>
				<li><a href="/sign-in">Войти</a></li>
			{/if}
		</ul>
		{#if data?.user !== null}
			<form action="/logout" method="POST" class="form-container">
				<button type="submit">Выйти</button>
			</form>
		{/if}

	</nav>
</header>

<div class="main-container">
	{@render children?.()}
</div>

<style>
	header {
		height: 100%;
		width: 250px;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		overflow-x: hidden;
		background-color: #2d2d2d;
		padding: 30px 10px;
		box-sizing: border-box;
		box-shadow: 15px 0 10px 0 rgba(0, 0, 0, 0.1);
	}

	.main-container {
		margin-left: 250px;
		padding: 30px;
		background-color: rgb(22, 22, 22);
		color: white;
		box-sizing: border-box;
	}

	nav {
		display: flex;
		flex-direction: column;
		height: 100%;
		row-gap: 20px;
	}

	.logo-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 200px;
	}
	img {
		width: auto;
		height: 100px;
		transition: all 0.2s;
	}
	img:hover {
		width: auto;
		height: 110px;
	}

	nav ul {
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		font-size: 1.2em;
		font-weight: bold;
	}

	li {
		padding: .5em;
		border-radius: 5px;
		background-color: #F0BA3A;
		border: 0.2em solid #F0BA3A ;
		transition: all 0.3s;
	}

	li:hover {
		border: 0.2em solid rgba(255, 255, 255, 0.5);
	}

	li a {
		display: block;
		width: 100%;
		height: 100%;
	}

	form {
		display: flex;
		justify-content: center;
		height: 100%;
	}

	form button {
		margin-top: auto;
		padding: .5em 1.2em;
		border-radius: 30px;
		border: 3px solid #ce4141;
		background-color: #ce4141;
		font-family: "VAG World", sans-serif;
		font-weight: bold;
		font-size: 1.2em;
		color: #ffffff;
	}

	form button:hover {
		background-color: rgba(255, 255, 255, 0);
		cursor: pointer;
	}

</style>
