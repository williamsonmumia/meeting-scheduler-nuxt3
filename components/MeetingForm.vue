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
            <i class="pi pi-chevron-up"></i>
            <span class="text-gray-600 text-sm">Other</span>

            <Popover ref="op">
                <div class="flex flex-col gap-4">
                    <div>
                        <span class="font-medium block mb-2">Team Members</span>
                        <ul class="list-none p-0 m-0 flex flex-col">
                            <li v-for="member in members" :key="member.name"
                                class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
                                @click="selectMember(member)">
                                <img :src="`https://primefaces.org/cdn/primevue/images/avatar/${member.image}`"
                                    style="width: 32px" />
                                <div>
                                    <span class="font-medium">{{ member.name }}</span>
                                    <div class="text-sm text-surface-500 dark:text-surface-400">{{ member.email }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </Popover>
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
import { useRouter } from "vue-router"; // Import Vue Router
import DatePage from '@/pages/date/index.vue'; // Import the date page

const routes = [
    {
        path: '/date',
        component: DatePage,
    },
    // Add other routes here
];

export default {
    data() {
        return {
            members: [
                { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
                { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
            ],
            user: { email: "user@example.com" }, // Mock user object, replace with actual user data
        };
    },
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
                    eventName: this.eventname, // Use eventname from setup
                    duration: this.selectedDuration.duration, // Use selectedDuration from setup
                    locationType: this.location, // Use location from setup
                    locationUrl: this.url, // Use url from setup
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
        const selectedDuration = ref(props.value2 ? { duration: props.value2 } : null); // Ensure selectedDuration is an object
        const location = ref(props.value3 || {}); // Ensure it's an object
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

        // Watch for changes and emit updated values
        watch(eventname, (newValue) => {
            emit('update:value', newValue);
        });
        watch(selectedDuration, (newValue) => {
            emit('update:value2', newValue?.duration); // Emit only the duration string
        });
        watch(location, (newValue) => {
            emit('update:value3', newValue);
        });
        watch(url, (newValue) => {
            emit('update:value4', newValue);
        });

        // Initialize router and toast
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