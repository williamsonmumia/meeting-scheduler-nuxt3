<template>
    <div className='p-5'>
        <div className='flex flex-col gap-5'>
            <h2 className='font-sans text-2xl'>Meeting Event Type</h2>
            <InputText placeholder="Search" type="text" class="max-w-xs" />
            <hr></hr>
        </div>
        <MeetingEventLists />

    </div>
</template>

<script>
import MeetingEventLists from '~/components/MeetingEventLists.vue';


</script>

<style lang="scss" scoped></style>