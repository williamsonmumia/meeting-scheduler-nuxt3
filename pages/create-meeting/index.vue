<template>
    <!-- Show loading spinner while loading is true -->
    <div v-if="state.isLoading" class="flex justify-center items-center h-screen">
        <div class="text-center text-gray-500">
            <PulseLoader />
        </div>
    </div>
</template>

<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
definePageMeta({
  layout: 'meetings',
});
</script>