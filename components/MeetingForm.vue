<template>
    <div class="flex flex-col gap-3 my-4">
        <!-- Event Name -->
        <h2 class="font-bold">Event Name *</h2>
        <FloatLabel variant="on">
            <InputText id="on_label" v-model="eventname" autocomplete="off" class="w-full" />
            <label for="on_label">Event Name</label>
        </FloatLabel>

        <!-- Duration -->
        <h2 class="font-bold">Duration *</h2>
        <div class="card flex justify-content">
            <Select v-model="selectedDuration" :options="time" optionLabel="duration" placeholder="30 Min" />
        </div>

        <!-- Location -->
        <h2 class="font-bold">Location *</h2>
        <div class="grid-flex grid-cols-4 gap-3">
            <SelectButton v-model="location" :options="options" optionLabel="value" dataKey="value"
                aria-labelledby="custom">
                <template #option="slotProps">
                    <i :class="slotProps.option.icon"></i> {{ slotProps.option.value }}
                </template>
            </SelectButton>
        </div>

        <!-- Add URL -->
        <div class="flex flex-col gap-3 my-4">
            <div class="flex flex-col gap-2">
                <label for="url">Add Url</label>
                <InputText id="url" v-model="url" aria-describedby="url-help" class="w-full" />
            </div>
        </div>
        <div>
            <!-- Create Button -->
            <Button class="w-small mt-0" label="Continue" @click="onCreateClick"
                :disabled="!eventname || !selectedDuration || !location || !url" />
        </div>
    </div>
</template>

<script>
import { ref, watch } from "vue";
import 'primeicons/primeicons.css';
import FloatLabel from 'primevue/floatlabel';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from '../pages/config/firebaseConfig';
import { useRouter } from "vue-router"; 
import DatePage from '@/pages/date/index.vue'; 

const routes = [
    {
        path: '/date',
        component: DatePage,
    },
    
];

export default {
    methods: {
        toggle(event) {
            this.$refs.op.toggle(event);
        },
        async onCreateClick() {
            const id = Date.now().toString();
            const db = getFirestore(app);
            try {
                await setDoc(doc(db, 'MeetingEvent', id), {
                    id: id,
                    eventName: this.eventname, 
                    duration: this.selectedDuration.duration, 
                    locationType: this.location, 
                    locationUrl: this.url, 
                    businessId: doc(db, 'Business', this.$auth.user.name),
                    createdBy: this.$auth.user.name,
                });

                this.router.replace('/date');
            } catch (error) {
                console.error("Error creating meeting event: ", error);
            }
        },
    },
    props: {
        value: String,
        value2: String,
        value3: Object,
        value4: String,
    },
    emits: ['update:value', 'update:value2', 'update:value3', 'update:value4'],
    setup(props, { emit }) {
        const eventname = ref(props.value);
        const selectedDuration = ref(props.value2 ? { duration: props.value2 } : null);
        const location = ref(props.value3 || {}); 
        const url = ref(props.value4);

        // Options for Select and SelectButton
        const time = ref([
            { duration: '15 Min' },
            { duration: '30 Min' },
            { duration: '45 Min' },
            { duration: '60 Min' },
        ]);
        const options = ref([
            { icon: 'pi pi-video', value: 'Video Call' },
            { icon: 'pi pi-phone', value: 'Phone Call' },
            { icon: 'pi pi-map-marker', value: 'In-Person' },
        ]);

        watch(eventname, (newValue) => {
            emit('update:value', newValue);
        });
        watch(selectedDuration, (newValue) => {
            emit('update:value2', newValue?.duration); 
        });
        watch(location, (newValue) => {
            emit('update:value3', newValue);
        });
        watch(url, (newValue) => {
            emit('update:value4', newValue);
        });

    
        const router = useRouter();
        const toast = useToast();

        return {
            eventname,
            selectedDuration,
            location,
            url,
            time,
            options,
            router,
            toast,
        };
    },
};
</script>