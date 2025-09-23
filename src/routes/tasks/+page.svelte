<script lang="ts">
  import { Role } from "$lib/enums/role.enum";
  import { goto } from "$app/navigation";

  let { data } = $props();
  const isHead = data.user.role === Role.HEAD_DEPARTMENT;
</script>

<svelte:head>
    <title>Tasks</title>
</svelte:head>

<div class="tasks-container">
    <p>Привет 👋</p>
    <h2>{isHead ? `Задачи от руководителя: ${data.user.fullName}` : `Задачи для сотрудника: ${data.user.fullName}`}</h2>
    <form>
        <div>
            <input type="search" id="mySearch" name="q"  placeholder="Поиск задач..."/>
            <button>Search</button>
            <a href="/tasks">
                <button>Очистить</button>
            </a>
        </div>
    </form>
    {#if data.tasks.length !== 0}
        <ul class="task-list">
            {#each data.tasks as task}
                <li class="task-card">
                    <a href={`/tasks/${task.id}`} class="task-link">
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                    </a>
                </li>
            {/each}
        </ul>
    {:else}
        <div class="empty-tasks">
            <h3>Задачи отсутствуют..</h3>
        </div>
    {/if}

    {#if isHead}
        <div class="save-container">
            <button class="save-btn"><a href="/tasks/new">+</a></button>
        </div>
    {/if}
</div>


<style>
    .tasks-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .tasks-container p{
        font-size: 1.5em;
        font-weight: 800;
    }

    h2 {
        font-size: 2.5em;
        font-weight: 800;
        color: rgba(255, 255, 255, 0.7);
    }

    .task-list {
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        row-gap: 15px;
    }

    .task-card {
        list-style: none;
        border-radius: 15px;
        overflow: hidden;
    }

    .task-link {
        display: block;
        background: rgba(255, 255, 255, 0.05);
        border: 2px solid rgba(255, 255, 255, 0.01);
        padding: 1em 4em;
        text-decoration: none;
        color: inherit;
        transition: all 0.3s;
        border-radius: 15px;

    }

    .task-link:hover {
        border-color: #F0BA3A;
        box-shadow: 0 0 15px rgba(240, 186, 58, 0.3);
        cursor: pointer;
    }

    .task-link h3 {
        font-size: 1.4em;
        color: rgba(240, 186, 58, 0.8);
    }

    .task-link p {
        font-size: 1em;
        line-height: 1.4em;
        color: rgba(221, 221, 221, 0.7);
    }

    .empty-tasks {
        margin-top: 2em;
        font-size: 1.3em;
        color: #ccc;
    }

    .save-container {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
    }
    .save-btn {
        margin-top: 1.5em;
        width: 60px;
        height: 60px;
        font-size: 2em;
        font-weight: bold;
        background-color: #8DC63F;
        border-radius: 50%;
        border: none;
        color: white;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .save-btn:hover {
        cursor: pointer;
        background-color: #8DC63F;
        box-shadow: 0 0 20px #8DC63F;
    }
</style>