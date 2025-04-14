<template>
    <aside>
        <div
            class="font-sans text-xl flex h-full w-full flex-col gap-5 overflow-y-auto rounded-md border bg-card pb-5 scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md">
            <!-- Main Menu -->
            <SidebarItem :links="dashboardRoutes" />
        </div>
    </aside>
</template>

<script setup lang="ts">
import SidebarItem from './SidebarItem.vue';

</script>