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
            <input name="email" bind:value={email} type="text">
        </div>
        <div>
            <label for="fullName">Полное имя</label>
            <input name="fullName" bind:value={fullName} type="text">
        </div>
        <div>
            <label for="department">Отдел</label>
            <select name="department" id="department" bind:value={selectedDepartment}>
                {#each data.departments as dep}
                    <option value={dep.id} >{dep.description}</option>
                {/each}
            </select>
        </div>
        <div>
            <label for="password">Пароль</label>
            <input name="password" bind:value={password} type="text">
        </div>

        <button type="submit">Зарегистрироваться</button>
    </form>

</div>