import { writable, derived } from "svelte/store";

export const notifications = writable([]);

export const unreadCount = derived(notifications, ($notifications) =>
    $notifications.filter((n) => !n['isRead']).length
);