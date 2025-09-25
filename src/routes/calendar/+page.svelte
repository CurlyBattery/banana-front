<script lang="ts">
    import {onMount} from "svelte";
    import {Calendar} from "@fullcalendar/core";
    import dayGridPlugin from '@fullcalendar/daygrid';
    import interactionPlugin from '@fullcalendar/interaction';

    let calendarEl: HTMLDivElement;
    let { data } = $props();
    const events = data.tasks.map((task) => ({
        id: task.id,
        title: task.title,
        start: task.createdAt,
        end: task.deadline,
        allDay: false
    }));



    onMount(() => {
        const calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, interactionPlugin],
            initialView: "dayGridMonth",
            editable: true,
            events,
            eventResizableFromStart: true,
            eventDrop: (info) => {
                console.log("Перетащили", info.event.id, "=>", info.event.start);
            },
            eventResize: (info) => {
                console.log("Изменили длину", info.event.id, "=>", info.event.start, info.event.end);
            }
        });

        calendar.render();
    });
</script>

<div bind:this={calendarEl}></div>

<style>
    div {
        max-width: 900px;
        margin: 0 auto;
    }
</style>

