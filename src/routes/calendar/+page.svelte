<script lang="ts">
    import { onMount } from "svelte";
    import { Calendar } from "@fullcalendar/core";
    import dayGridPlugin from "@fullcalendar/daygrid";
    import interactionPlugin from "@fullcalendar/interaction";
    import {format, compareAsc, parseISO} from "date-fns";

    let calendarEl: HTMLDivElement;
    let {data} = $props();
    let events = data.tasks.map((task ) => {
        return {
            id: task.id,
            title: task.title,
            start: format(parseISO(task.createdAt), "yyyy-MM-dd")
        }
    })

    onMount(() => {
        const calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, interactionPlugin],
            initialView: "dayGridMonth",
            editable: true,
            events,
            eventDrop: (info) => {
                console.log("Перетащили", info.event.id, "=>", info.event.start);
                // тут можно отправить запрос в GraphQL / fetch для обновления даты
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
