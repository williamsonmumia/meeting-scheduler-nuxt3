<template>
    <div>
        <NewTeam />
        <!--chart-->
        <MeetingChart />
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth-logged-in'],
})
</script>

<style lang="scss" scoped></style>
