<script>
    import {enhance} from "$app/forms";

    let email = $state('');
    let fullName = $state('');
    let selectedDepartment = $state();
    let password = $state('');

    let { data } = $props();
</script>

<svelte:head>
    <title>Sign Up</title>
</svelte:head>

<div>
    <h2>Регистрация</h2>

    <form action="?/register" method="POST" use:enhance>
        <div>
            <label for="email">Почта</label>
            <input name="email" type="text" bind:value={email}>
        </div>
        <div>
            <label for="fullName">Полное имя</label>
            <input name="fullName" type="text"  bind:value={fullName}>
        </div>
        <div>
            <label for="department">Отдел</label>
            <select name="department" id="department" bind:value={selectedDepartment}>
                {#each data.departments as dep}
                    <option value={dep.id}>{dep.description}</option>
                {/each}
            </select>
        </div>
        <div>
            <label for="password">Пароль</label>
            <input name="password" type="password" bind:value={password}>
        </div>

        <button type="submit">Зарегистрироваться</button>
    </form>

</div>