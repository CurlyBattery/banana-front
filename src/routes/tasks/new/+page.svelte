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
        <div class="task-box">
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
</style>
