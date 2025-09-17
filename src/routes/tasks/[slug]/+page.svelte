<script lang="ts">
    import {Role} from "$lib/enums/role.enum.js";
    import {TaskStatus} from "$lib/enums/task-status.enum.js";
    import {enhance} from "$app/forms";

    let { data } = $props();
    const isHead = data.user.role === Role.HEAD_DEPARTMENT;
    let selectedTaskStatus = $state(data.task.status);

    let taskStatuses = [
      { value: 'NEW', name: TaskStatus.NEW },
      { value: 'IN_PROGRES', name: TaskStatus.IN_PROGRES },
      { value: 'DONE', name: TaskStatus.DONE },
      { value: 'OVERDUE', name: TaskStatus.OVERDUE },
    ];

    let form: HTMLFormElement = $state();
</script>

<svelte:head>
    <title>Task</title>
</svelte:head>

<div>
    <h2>{data.task.title}</h2>
    <span>{data.task.description}</span>
    <p>Дедлайн - {data.task.deadline}</p>
    {#if !isHead}
        <div>
            <form method="POST" action="?/changeStatus" bind:this={form} use:enhance>
                <select
                        name="status"
                        bind:value={selectedTaskStatus}
                        on:change={() => form.requestSubmit()}
                >
                    {#each taskStatuses as taskStatus}
                        <option value={taskStatus.value}>{taskStatus.name}</option>
                    {/each}
                </select>
            </form>


        </div>
    {:else}
        <p>Статус - {data.task.status}</p>
    {/if}

    {#if isHead}
        <form method="POST" action="?/deleteTask" use:enhance>
            <button type="submit">Удалить задачу</button>
        </form>
    {/if}
</div>