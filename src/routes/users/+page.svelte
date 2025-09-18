<script lang="ts">
    import {enhance} from "$app/forms";

    let { data } = $props();
    let form: HTMLFormElement = $state();
</script>

<svelte:head>
    <title>Users</title>
</svelte:head>

<div>
    <h2>Все работники в системе</h2>

    <ul>
        {#each data.users as user}
            <li>
                <h3>{user.fullName}</h3>
                <p>{user.email}</p>
                <p>{user.role}</p>
                <p>{user.isActive}</p>
                <form
                        method="POST"
                        action="?/changeActive"
                        use:enhance
                        bind:this={form}
                >
                    <input type="hidden" name="id" value={user.id}>
                    
                    <select
                        name="active"
                        on:change={(e) => e.currentTarget.form?.requestSubmit()}
                    >
                        <option value="true" selected={user.isActive === true}>Да</option>
                        <option value="false" selected={user.isActive === false}>Нет</option>
                    </select>
                </form>

                <form action="?/deleteUser" method="POST" use:enhance>
                    <input type="hidden" name="id" value={user.id}>
                    <button type="submit">Дропнуть</button>
                </form>
            </li>
        {/each}
    </ul>
</div>