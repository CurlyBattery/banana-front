<script lang="ts">
  import { Role } from "$lib/enums/role.enum";
  import { format, parseISO} from 'date-fns'
  import {  formatInTimeZone } from 'date-fns-tz';

  let { data } = $props();
  const isHead = data.user.role === Role.HEAD_DEPARTMENT;
</script>

<svelte:head>
    <title>Tasks</title>
</svelte:head>

<div class="tasks-container">
    <p>Привет 👋</p>
    <h2>{isHead ? `Задачи от руководителя: ${data.user.fullName}` : `Задачи для сотрудника: ${data.user.fullName}`}</h2>
    <form class="search-container">
            <input type="search" id="mySearch" name="q"  placeholder="Поиск задач..."/>
            <button>Search</button>
            <a href="/tasks">
                <button>Очистить</button>
            </a>
    </form>
    {#if data.tasks.length !== 0}
        <ul class="task-list">
            {#each data.tasks as task}
                <li class="task-card">
                    <a href={`/tasks/${task.id}`} class="task-link">
                        <h3>{task.title}</h3>
                        <div class="task-body">
                            <p>{task.description}</p>
                            <span>с {format(parseISO(task.createdAt),  'yyyy-MM-dd')} по {formatInTimeZone(parseISO(task.deadline), 'UTC', 'yyyy-MM-dd')}</span>
                        </div>
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
        padding: 2rem;
    }

    .tasks-container p{
        font-size: 1.5em;
        font-weight: 800;
    }

    h2 {
        font-size: 2.5em;
        font-weight: 800;
        background: linear-gradient(
                270deg,
                #ff6ec4,
                #7873f5,
                #42e695,
                #f0ba3a,
                #ff6ec4
        );
        background-size: 1000% 1000%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradient-flow 10s ease infinite;
    }

    @keyframes gradient-flow {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }


    .task-list {
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        row-gap: 15px;
        flex: 1 1 auto;
        overflow-y: auto;
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


    .task-body {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .task-body p {
        font-size: 1em;
        line-height: 1.4em;
        color: rgba(221, 221, 221, 0.7);
    }

    .task-body span {
        font-size: .8em;
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

    .search-container {
        margin: 1em 0;
    }

    .search-container input[type="search"]{
        padding: 1em;
        border-radius: 10px;
        background: #eaeaea;
        border: none;
    }

    .search-container button {
        padding: 1em;
        border: none;
        border-radius: 5px;
        background: #8DC63F;
        color: rgb(255, 255, 255);
    }

    .search-container button:hover {
        cursor: pointer;
        box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.5) inset;
    }
</style>