<script>
    import {enhance} from "$app/forms";

    let title = $state('');
    let description = $state('');
    let priority = $state();
    let deadline = $state();
    let selectedUser = $state();

    let { data } = $props();
</script>

<svelte:head>
    <title>New Task</title>
</svelte:head>

<div class="new-task-container">
    <h2>Выставление новой задачи</h2>

    <form action="?/createTask" method="POST" use:enhance>
        <div class="task-box">
            <label for="title">Заголовок</label>
            <input name="title" type="text" bind:value={title}>
        </div>
        <div class="task-box">
            <label for="description">Описание задачи</label>
            <input name="description" type="text" bind:value={description}>
        </div>
        <div class="task-box">
            <label for="priority">Приоритет</label>
            <input name="priority" type="number" bind:value={priority}>
        </div>
        <div class="task-box">
            <label for="deadline">Дедлайн</label>
            <input name="deadline" type="datetime-local" bind:value={deadline}>
        </div>
        <div class="task-box select-box">
            <label for="user">Работник</label>
            <select name="user" id="user" bind:value={selectedUser}>
                {#each data.users as us}
                    <option value={us.id} >{us.fullName}</option>
                {/each}
            </select>
        </div>

        <button type="submit" class="save-btn">Сохранить</button>
    </form>
</div>


<style>
    .new-task-container {
        display: flex;
        flex-direction: column;
    }

    h2 {
        margin-bottom: 1em;
        text-align: center;
        font-size: 2em;
        color: #F0BA3A;
    }

    form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5em 2em;
    }

    .task-box {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .task-box input,
    .task-box select {
        background: transparent;
        border: none;
        border-bottom: 2px solid rgba(255, 255, 255, 0.5);
        padding: 10px 5px;
        font-size: 1em;
        color: white;
        outline: none;
        transition: all 0.3s;
    }

    .task-box select option{
        color: black;
    }

    .save-btn {
        grid-column: span 1;
        padding: 0.8em 2em;
        border-radius: 10px;
        background: #e2e2e2;
        color: #000000;
        font-size: 1em;
        font-weight: bold;
        border: 2px solid #8DC63F;
        transition: all 0.3s;
    }

    .save-btn:hover {
        cursor: pointer;
        background: rgba(255, 255, 255, 0);
        color: white;
    }

</style>
