<template>
    <div class="p-8">
        <NuxtLink to="/dashboard">
            <h2 class="flex gap-2">
                <Button icon="pi pi-arrow-left" @click="visibleRight = true" />
            </h2>
        </NuxtLink>

        <div class="mt-0">
            <h2 class="font-bold text-2xl my-4">Create New Event</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-4">
            <div>
                <hr class="my-4" />
                <MeetingForm v-model:value="value1" v-model:value2="value2" v-model:value3="value3"
                    v-model:value4="value4" />
            </div>

            <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg shadow-sm">
                <PreviewMeeting :value="value1" :value2="value2" :value3="value3" :value4="value4" />
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import MeetingForm from '../components/MeetingForm.vue';
import PreviewMeeting from '../components/PreviewMeeting.vue';

export default {
    components: {
        MeetingForm,
        PreviewMeeting,
    },
    setup() {
        const value1 = ref('');
        const value2 = ref('');
        const value3 = ref({ icon: '', value: '' }); 
        const value4 = ref('');

        return {
            value1,
            value2,
            value3,
            value4,
        };
    }
};
</script>
