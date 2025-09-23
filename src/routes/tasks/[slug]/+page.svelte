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

<div class="tasks-container">
  <div class="task-card">
     <div class="task-header">
         <h2>{data.task.title}</h2>
         <span class="task-deadline">Дедлайн - {data.task.deadline}</span>
     </div>

      <p class="task-description">{data.task.description}</p>

      {#if !isHead}
              <form method="POST" action="?/changeStatus" bind:this={form} use:enhance class="task-status-form">
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
      {:else}
          <p class="task-status-display">Статус - <span class={`status-${data.task.status.toLowerCase()}`}>{data.task.status}</span></p>
      {/if}

      {#if isHead}
          <form method="POST" action="?/deleteTask" use:enhance class="delete-form">
              <button type="submit">Удалить задачу</button>
          </form>
      {/if}
  </div>
</div>

<style>
    .tasks-container {
        display: flex;
        justify-content: center;
        padding: 2rem;
    }

    .task-card {
        background: linear-gradient(135deg, rgba(45, 45, 45, 0.8), rgba(22, 22, 22, 0.8));
        border-radius: 20px;
        max-width: 600px;
        width: 100%;
        padding: 2rem;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        color: #fff;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        transition: transform 0.3s, box-shadow 0.3s;
    }
    .task-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 50px rgba(0,0,0,0.5);
    }

    .task-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }
    .task-header h2 {
        font-size: 2rem;
        font-weight: 700;
    }
    .task-deadline {
        font-size: 0.9rem;
        font-weight: 500;
        color: rgba(255,255,255,0.7)
    }

    .task-description {
        font-size: 1.1rem;
        line-height: 1.5;
        color: rgba(255,255,255,0.9)
    }

    .task-status-form select{
        padding: 0.5rem 1rem;
        border-radius: 12px;
        border: none;
        font-size: 1rem;
        background-color: rgba(255,255,255,0.1);
        color: #fff;
        cursor: pointer;
        transition: background 0.3s;
    }
    .task-status-form select:hover {
        background-color: rgba(255,255,255,0.2);
    }
    .task-status-form select:focus {
        color: #2d2d2d;
    }

    .task-status-display {
        font-size: 1rem;
    }
    .status-new {
        color: #00ffff;
    }
    .status-in_progres {
        color: #f0e130;
    }
    .status-done {
        color: #4caf50;
    }
    .status-overdue {
        color: #ff4c4c;
    }

    .delete-form button {
        margin-top: 1rem;
        padding: 0.7rem 1.5rem;
        border-radius: 12px;
        border: none;
        background: #ff4c4c;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s;
    }

    .delete-form button:hover {
        background: #ff1f1f;
        box-shadow: 0 5px 15px rgba(255,0,0,0.4);
    }
</style>