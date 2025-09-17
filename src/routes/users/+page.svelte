<script>
    import {enhance} from "$app/forms";

    let { data } = $props();

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

                <form action="?/deleteUser" method="POST" use:enhance>
                    <input type="hidden" name="id" value={user.id}>
                    <button type="submit">Дропнуть</button>
                </form>
            </li>
        {/each}
    </ul>
</div>