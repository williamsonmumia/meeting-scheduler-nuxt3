<template>
    <aside>
        <div
            class="flex h-full w-full flex-col gap-5 overflow-y-auto rounded-md border bg-card pb-5 scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md">
            <!-- Main Menu -->
            <SidebarItem :links="dashboardRoutes" />
        </div>
    </aside>
</template>

<script setup lang="ts">
import SidebarItem from './SidebarItem.vue';

const dashboardRoutes = [
    {
        title: "Meeting Type",
        icon: "heroicons:briefcase",
        link: "/meeting-type",
    },
    {
        title: "Scheduled",
        icon: "heroicons:calendar",
        link: "/scheduled",
    },
    {
        title: "Availability",
        icon: "heroicons:clock",
        link: "/availability",
    },

];

</script>