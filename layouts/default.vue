<template>
    <div>
        <!-- Header -->
        <Header />

        <!-- Container for Sidebar and Main Content -->
        <div class="container max-w-7xl mx-auto px-4 md:px-8 lg:px-12 lg:grid lg:grid-cols-12 lg:gap-12">
            <!-- Sidebar -->
            <Sidebar class="sticky top-[65px] hidden h-[calc(100vh-65px)] py-6 lg:col-span-3 lg:block" />

            <!-- Main Section (Wider Layout with Better Spacing) -->
            <main class="py-6 lg:py-8 lg:col-span-9">
                <slot />
            </main>
        </div>
    </div>
</template>


<script setup>
import Header from '~/components/Header.vue';
import Sidebar from '~/components/Sidebar.vue';

</script>