<template>
    <!-- Show loading spinner while loading is true -->
    <h1>Hi there</h1>
</template>

<script setup>
definePageMeta({
    middleware: ['auth-logged-in'],
})
</script>