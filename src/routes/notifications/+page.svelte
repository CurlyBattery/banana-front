<script>
    const {data} = $props();
</script>

<svelte:head>
    <title>Notifications</title>
</svelte:head>

<div>
    <h2>Уведомления</h2>
    {#if data.notifications.length !== 0}
        <ul>
            {#each data.notifications as notification}
                <li>
                    <h4>{notification.title}</h4>
                    <p>{notification.data}</p>
                    <span>{notification.createdAt}</span>
                </li>
            {/each}
        </ul>
    {:else}
        <div>
            <h3>Уведомлений нет :(</h3>
        </div>
    {/if}
</div>