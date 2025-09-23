<script>
  const {data} = $props();
</script>

<svelte:head>
    <title>Notifications</title>
</svelte:head>

<div class="notifications-container">
    <h2 class="title">🔔 Уведомления</h2>

    {#if data.notifications.length !== 0}
        <ul class="notification-list">
            {#each data.notifications as notification}
                <li class="notification-card">
                    <div class="notification-header">
                        <h4>{notification.title}</h4>
                        <span class="date">{new Date(notification.createdAt).toLocaleString()}</span>
                    </div>
                    <p class="notification-body">{notification.data}</p>
                </li>
            {/each}
        </ul>
    {:else}
        <div class="empty-state">
            <h3>Уведомлений нет 😴</h3>
        </div>
    {/if}
</div>

<style>
    .notifications-container {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
    }

    .title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 2rem;
        text-align: center;
        background: linear-gradient(90deg, #f0ba3a, #ff7e5f);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .notification-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 100%;
        max-width: 700px;
        padding: 0;
        margin: 0;
    }

    .notification-card {
        list-style: none;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        padding: 1.2rem 1.5rem;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        backdrop-filter: blur(10px);
        transition: transform 0.3s, box-shadow 0.3s;
    }

    .notification-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 35px rgba(0,0,0,0.4);
        border-color: #f0ba3a;
    }

    .notification-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .8rem;
    }

    .notification-header h4 {
        font-size: 1.3rem;
        color: #f0ba3a;
        margin: 0;
    }

    .notification-header .date {
        font-size: 0.85rem;
        color: rgba(255,255,255,0.6);
    }

    .notification-body {
        font-size: 1rem;
        color: rgba(255,255,255,0.85);
        margin: 0;
        line-height: 1.5;
    }

    .empty-state {
        margin-top: 3rem;
        font-size: 1.5rem;
        color: rgba(255,255,255,0.6);
    }
</style>
