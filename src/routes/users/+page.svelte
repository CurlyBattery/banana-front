<script lang="ts">
    import { enhance } from "$app/forms";

    let { data } = $props();
</script>

<svelte:head>
    <title>Users</title>
</svelte:head>

<div class="users-container">
    <h2 class="title">Все работники в системе</h2>

    <table class="users-table">
        <thead>
        <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Активен</th>
            <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        {#each data.users as user}
            <tr>
                <td>{user.id}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                    <form
                            method="POST"
                            action="?/changeActive"
                            use:enhance
                    >
                        <input type="hidden" name="id" value={user.id} />
                        <select
                                name="active"
                                on:change={(e) => e.currentTarget.form?.requestSubmit()}
                        >
                            <option value="true" selected={user.isActive === true}>Да</option>
                            <option value="false" selected={user.isActive === false}>Нет</option>
                        </select>
                    </form>
                </td>
                <td>
                    <form action="?/deleteUser" method="POST" use:enhance>
                        <input type="hidden" name="id" value={user.id} />
                        <button type="submit" class="delete-btn">Дропнуть</button>
                    </form>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>

<style>
    .users-container {
        padding: 2rem;
        color: #fff;
    }

    .title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        text-align: center;
        background: linear-gradient(90deg, #f0ba3a, #ff7e5f);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .users-table {
        width: 100%;
        border-collapse: collapse;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        overflow: hidden;
    }

    .users-table th,
    .users-table td {
        padding: 1rem;
        text-align: left;
    }

    .users-table thead {
        background: rgba(240, 186, 58, 0.2);
    }

    .users-table tr:nth-child(even) {
        background: rgba(255, 255, 255, 0.05);
    }

    .users-table tr:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    select {
        background: #2d2d2d;
        color: #fff;
        border: 1px solid #f0ba3a;
        border-radius: 6px;
        padding: 0.3rem 0.5rem;
    }

    .delete-btn {
        background: #ce4141;
        border: 2px solid #ce4141;
        padding: 0.3rem 0.8rem;
        border-radius: 6px;
        color: #fff;
        cursor: pointer;
        transition: background 0.3s;
    }

    .delete-btn:hover {
        background: transparent;
        border-color: #ff7e5f;
    }
</style>
