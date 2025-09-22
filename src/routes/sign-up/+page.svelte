<script>
    import {enhance} from "$app/forms";

    let email = $state('');
    let fullName = $state('');
    let selectedDepartment = $state();
    let password = $state('');
    let selectedRole = $state('MANAGER');

    let roles = [
      { value: 'HEAD_DEPARTMENT', name: 'Глава Отдела' },
      { value: 'MANAGER', name: 'Менеджер' },
      { value: 'SALESMAN', name: 'Продажник' },
      { value: 'DEVELOPER', name: 'Разработчик' },
      { value: 'ADMINISTRATOR', name: 'Администратор' },
    ]


    let { data } = $props();
</script>

<svelte:head>
    <title>Sign Up</title>
</svelte:head>

<div class="register-container">
    <h2>Регистрация</h2>

    <form action="?/register" method="POST" use:enhance>
        <div class="user-box">
            <label for="email">Почта</label>
            <input name="email" bind:value={email} type="email">
        </div>
        <div class="user-box">
            <label for="fullName">Полное имя</label>
            <input name="fullName" bind:value={fullName} type="text">
        </div>
        <div class="user-box">
            <label for="department">Отдел</label>
            <select name="department" id="department" bind:value={selectedDepartment}>
                {#each data.departments as dep}
                    <option value={dep.id} >{dep.description}</option>
                {/each}
            </select>
        </div>
        <div class="user-box">
            <label for="role">Роль</label>
            <select name="role" id="role" bind:value={selectedRole}>
                {#each roles as rol}
                    <option value={rol.value}>{rol.name}</option>
                {/each}
            </select>
        </div>
        <div class="user-box">
            <label for="password">Пароль</label>
            <input name="password" bind:value={password} type="password">
        </div>

        <button type="submit">Зарегистрироваться</button>
    </form>
</div>

<style>
    .register-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    h2 {
        font-size: 3em;
        font-weight: 800;
        color: #8DC63F;
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
        background-color: #F0BA3A;
        border-radius: 15px;
        border: 1px solid rgb(255, 255, 255);
        color: white;
    }

    form button[type="submit"]:hover {
        cursor: pointer;
        box-shadow: 0 0 5px 5px rgba(255, 255, 255, 0.2);
    }


</style>