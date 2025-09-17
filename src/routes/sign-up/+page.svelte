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
            <label for="role">Роль</label>
            <select name="role" id="role" bind:value={selectedRole}>
                {#each roles as rol}
                    <option value={rol.value}>{rol.name}</option>
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