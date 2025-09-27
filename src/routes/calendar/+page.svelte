<script lang="ts">
    import { onMount } from "svelte";
    import { Calendar } from "@fullcalendar/core";
    import dayGridPlugin from "@fullcalendar/daygrid";
    import timeGridPlugin from "@fullcalendar/timegrid";
    import interactionPlugin from "@fullcalendar/interaction";
    import {format, parseISO} from "date-fns";
    import { invalidateAll} from "$app/navigation";
    import {Role} from "$lib/enums/role.enum";

    let calendarEl: HTMLDivElement;
    let {data} = $props();
    const isHead = data.user.role === Role.HEAD_DEPARTMENT;

    let events = data.tasks.map((task ) => {
        return {
            id: task.id,
            title: task.title,
            start: format(parseISO(task.start), "yyyy-MM-dd'T'HH:mm:ss"),
            end: format(parseISO(task.deadline), "yyyy-MM-dd'T'HH:mm:ss"),
            allDay: false
        }
    })

    onMount(() => {
        const calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
            initialView: "timeGridWeek",
            editable: isHead,
            eventResizableFromStart: true,
            events,
            eventDrop: async (info) => {
                const task = data.tasks.find(t => t.id === Number(info.event.id));
                if (!task) return;
                const formData = new FormData();
                formData.set('id', task.id.toString());
                formData.set('title', info.event.title);
                formData.set('description', task.description);
                formData.set('priority', task.priority.toString());
                formData.set('start', info.event.start?.toISOString() ?? '');
                formData.set('deadline', info.event.end?.toISOString() ?? '');

                await fetch('?/updateTask', { method: 'POST', body: formData });
                await invalidateAll();
            },
            eventResize: async (info) => {
                const task = data.tasks.find(t => t.id === Number(info.event.id));
                if (!task) return;

                const formData = new FormData();
                formData.set('id', task.id.toString());
                formData.set('title', info.event.title);
                formData.set('description', task.description);
                formData.set('priority', task.priority.toString());
                formData.set('start', info.event.start?.toISOString() ?? '');
                formData.set('deadline', info.event.end?.toISOString() ?? '');

                await fetch('?/updateTask', { method: 'POST', body: formData });
                await invalidateAll();
            }
        });

        calendar.render();
    });
</script>

<svelte:head>
    <title>Calendar</title>
</svelte:head>

<div bind:this={calendarEl}></div>

<style>
    div {
        max-width: 900px;
        margin: 0 auto;
    }
</style>
