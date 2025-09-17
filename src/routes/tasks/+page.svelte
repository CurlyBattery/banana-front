<script lang="ts">
    import {Role} from "$lib/enums/role.enum";

    let { data } = $props();
</script>

<div>
    <h2>{data.user.role === Role.HEAD_DEPARTMENT ? `Задачи от руководителя: ${data.user.email}` : `Задачи для сотрудника: ${data.user.email}`}</h2>
    {#if data.tasks.length !== 0}
        <ul>
            {#each data.tasks as task}
                <li>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </li>
            {/each}
        </ul>
    {:else}
        <div>
            <h3>Задачи для вас отсутствуют..</h3>
        </div>
    {/if}
</div>