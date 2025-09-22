<script>
    import {enhance} from "$app/forms";

    let email = $state('');
    let password = $state('');
</script>

<svelte:head>
    <title>Sign In</title>
</svelte:head>

<div class="login-container">
    <h2>Аутентификация</h2>

    <form action="?/login" method="POST" use:enhance>
        <div class="user-box">
            <label for="email">Почта</label>
            <input type="email" name="email" bind:value={email}>
        </div>
        <div class="user-box">
            <label for="password">Пароль</label>
            <input type="password" name="password" bind:value={password}>
        </div>

        <button type="submit">Войти в систему</button>
    </form>
</div>


<style>
    .login-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    h2 {
        font-size: 3em;
        font-weight: 800;
        color: #F0BA3A;
    }

    form {
        max-width: 400px;
        width: 100%;
    }

    .user-box {
        margin-bottom: 1em;
        width: 100%;
    }
    .user-box label {
        display: block;
        margin-bottom: .5em;
    }

    .user-box input[type="text"],
    .user-box input[type="email"],
    .user-box input[type="password"],
    .user-box select {
        color: white;
        width: 100%;
        box-sizing: border-box;
        padding: 1em;
        border: none;
        border-bottom: 3px solid #ccc;
        background-color: rgba(255, 255, 255, 0);
        font-size: 1em;
        transition: all 0.3s;
    }

    .user-box input[type="text"]:focus,
    .user-box input[type="email"]:focus,
    .user-box input[type="password"]:focus,
    .user-box select:focus {
        border: 3px solid #f8e940;
        outline: none;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    form button[type="submit"] {
        margin-top: 2.5em;
        width: 100%;
        padding: 1em;
        font-size: 1em;
        font-weight: 800;
        background-color: #8DC63F;
        border-radius: 15px;
        border: 1px solid rgb(255, 255, 255);
        color: white;
    }

    form button[type="submit"]:hover {
        cursor: pointer;
        box-shadow: 0 0 5px 5px rgba(255, 255, 255, 0.2);
    }

</style>