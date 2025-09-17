<script>
    import {enhance} from "$app/forms";

    let email = $state('');
    let password = $state('');
</script>

<svelte:head>
    <title>Sign In</title>
</svelte:head>

<div>
    <h2>Аутентификация</h2>

    <form action="?/login" method="POST" use:enhance>
        <div>
            <label for="email">Почта</label>
            <input type="email" name="email" bind:value={email}>
        </div>
        <div>
            <label for="password">Пароль</label>
            <input type="password" name="password" bind:value={password}>
        </div>

        <button type="submit">Войти в систему</button>
    </form>
</div>
