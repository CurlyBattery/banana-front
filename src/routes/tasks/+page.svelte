<script>
    import {Role} from "$lib/enums/role.enum";

    let { data } = $props();
    const isHead = data.user.role === Role.HEAD_DEPARTMENT;
</script>

<svelte:head>
    <title>Tasks</title>
</svelte:head>

<div>
    <h2>{isHead ? `Задачи от руководителя: ${data.user.email}` : `Задачи для сотрудника: ${data.user.email}`}</h2>
    {#if data.tasks.length !== 0}
        <ul>
            {#each data.tasks as task}
                <li>
                    <h3><a href={`/tasks/${task.id}`}>{task.title}</a></h3>
                    <p>{task.description}</p>
                </li>
            {/each}
        </ul>
    {:else}
        <div>
            <h3>Задачи отсутствуют..</h3>
        </div>
    {/if}

    {#if isHead}
        <button><a href="/tasks/new">Создать задачу</a></button>
    {/if}
</div>