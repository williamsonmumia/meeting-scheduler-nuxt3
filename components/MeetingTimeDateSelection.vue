<template>
    <div class="p-5 py-10 shadow-lg m-5 border-t-8 rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-3 mt-5">
            <!-- Meeting Info -->
            <div class="p-4 border-r">
                <h2 class="text-sm text-gray-500">
                    {{ businessInfo?.businessName || 'Meeting Name' }}
                </h2>
                <h2 class="font-bold text-3xl mb-4">
                    {{ eventInfo?.eventName || 'Meeting Name' }}
                </h2>

                <div class="mt-5 flex flex-col gap-4">
                    <div class="flex items-center gap-2">

                        <span><i class="pi pi-clock h-4 w-4" /> {{ eventInfo?.duration || 30 }} </span>
                    </div>
                    <div class="flex items-center gap-2">

                        <span><i class="pi pi-map-marker h-4 w-4" /> {{ eventInfo?.locationType?.value }}</span>
                    </div>
                    <a v-if="eventInfo?.locationUrl" :href="eventInfo.locationUrl"
                        class="text-green-600 hover:underline hover:text-green-800" target="_blank"
                        rel="noopener noreferrer">
                        <i class="pi pi-link h-4 w-4" />
                        {{ eventInfo.locationUrl }}
                    </a>
                    <div v-if="selectedTime" class="flex items-center gap-2">
                        <i class="pi pi-clock h-4 w-4" />
                        <span>{{ formatSelectedTime(selectedTime) }}</span>
                    </div>
                </div>
            </div>

            <!-- Step 1: Time & Date Selection -->
            <div v-if="step === 1" class="md:col-span-2 flex flex-col md:flex-row px-4">
                <div class="flex flex-col">
                    <h2 class="font-bold text-lg">Select Date</h2>
                    <div class="mt-5">
                        <Calendar v-model="date" inline showWeek class="w-full sm:w-[30rem]"
                            :disabledDates="disabledDates" @date-select="handleDateSelect" />
                    </div>
                </div>

                <div class="flex flex-col mt-5 md:mt-0 md:ml-5 w-full">
                    <h2 class="font-bold text-lg">Select Time</h2>
                    <div v-if="enableTimeSlot" class="mt-4">
                        <VueDatePicker v-model="selectedTime" time-picker :disabled="!enableTimeSlot"
                            :min-time="minTime" :max-time="maxTime" :disabled-times="disabledTimes"
                            placeholder="Select meeting time" />
                    </div>
                    <div v-else class="mt-4 text-gray-500">
                        Select an available date to enable time selection
                    </div>
                </div>
            </div>

            <div v-else class="md:col-span-2 px-4">
                <h2 class="font-bold text-lg mb-4">Enter Your Information</h2>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Full Name</label>
                        <InputText v-model="userName" type="text" required
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Email</label>
                        <InputText v-model="userEmail" type="email" required
                            class="mt-1 block w-small rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                        <Textarea v-model="userNote" variant="filled" rows="5" cols="30" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex gap-3 justify-end mt-5">
            <Button v-if="step === 2" @click="step = 1" severity="secondary" class="px-4 py-2 border rounded">
                Back
            </Button>
            <button v-if="step === 1" @click="step = 2" :disabled="!selectedTime || !date"
                class="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300">
                Next
            </button>
            <Toast />
            <button v-if="step === 2" @click="scheduleMeeting" :disabled="!userName || !userEmail || loading"
                class="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300">
                <span v-if="loading">Scheduling...</span>
                <span v-else>Schedule Meeting</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css'
import { ref, computed, watch } from 'vue'
import { getFirestore, collection, doc, getDocs, setDoc, query, where } from "firebase/firestore";
import { app } from '../pages/config/firebaseConfig';
import { useRouter } from 'vue-router';
import Calendar from 'primevue/calendar'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import InputText from 'primevue/inputtext';
import { useToast } from "primevue/usetoast";
import { format } from 'date-fns'; 

// Props
const props = defineProps({
    eventInfo: {
        type: Object,
        default: () => ({})
    },
    businessInfo: {
        type: Object,
        default: () => ({})
    }
})

const db = getFirestore(app);

// State
const date = ref(new Date())
const step = ref(1)
const loading = ref(false)
const router = useRouter();
const selectedTime = ref<{ hours: number; minutes: number } | null>(null);
const enableTimeSlot = ref(false)
const userName = ref('')
const userEmail = ref('')
const userNote = ref('')

interface Booking {
    selectedTime: { hours: number; minutes: number };
    selectedDate: Date;
    [key: string]: any;
}
interface DisabledTime {
    hours: number;
    minutes: number;
}
const prevBookings = ref<Booking[]>([]);

// Format selected time for display
const formatSelectedTime = (timeObj: { hours: number; minutes: number } | null | undefined): string => {
    if (!timeObj) return '';
    const hours = timeObj.hours % 12 || 12;
    const minutes = String(timeObj.minutes).padStart(2, '0');
    const period = timeObj.hours >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${period}`;
};

// Disabled dates based on business availability
const disabledDates = computed(() => {
    const disabled = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    for (let d = new Date(0); d <= yesterday; d.setDate(d.getDate() + 1)) {
        disabled.push(new Date(d))
    }

    if (props.businessInfo?.daysAvailable) {
        for (let i = 0; i < 180; i++) {
            const testDate = new Date(today)
            testDate.setDate(today.getDate() + i)
            const dayName = testDate.toLocaleDateString('en-US', { weekday: 'long' })
            if (!props.businessInfo.daysAvailable[dayName]) {
                disabled.push(testDate)
            }
        }
    }

    return disabled
})


const minTime = computed(() => {
    if (!props.businessInfo?.startTime) return { hours: 0, minutes: 0 }
    const [hours, minutes] = props.businessInfo.startTime.split(':').map(Number)
    return { hours, minutes }
})

const maxTime = computed(() => {
    if (!props.businessInfo?.endTime) return { hours: 23, minutes: 59 }
    const [hours, minutes] = props.businessInfo.endTime.split(':').map(Number)
    return { hours, minutes }
})


const handleDateSelect = async (selectedDate: Date) => {
    date.value = selectedDate;
    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    enableTimeSlot.value = props.businessInfo?.daysAvailable?.[dayName] || false;

    if (enableTimeSlot.value) {
        await fetchPrevBookings(selectedDate);
    } else {
        selectedTime.value = null;
        prevBookings.value = [];
    }
};

// Disabled times based on previous bookings
const disabledTimes = computed(() => {
    return prevBookings.value.map(booking => ({
        hours: booking.selectedTime.hours,
        minutes: booking.selectedTime.minutes
    })) as DisabledTime[];
});

// Fetch previous bookings for selected date
const fetchPrevBookings = async (date: Date) => {
    try {
        const dateString = format(date, 'yyyy-MM-dd');
        const q = query(
            collection(db, 'ScheduledMeetings'),
            where('selectedDate', '==', dateString),
            where('eventId', '==', props.eventInfo.id)
        );

        const querySnapshot = await getDocs(q);
        prevBookings.value = querySnapshot.docs.map(doc => doc.data() as Booking);
    } catch (error) {
        console.error("Error fetching bookings:", error);
    }
};

// Schedule meeting
const toast = useToast();
const scheduleMeeting = async () => {
    if (!selectedTime.value) {
        alert('Please select a valid time');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail.value)) {
        alert('Please enter a valid email address');
        return;
    }

    loading.value = true;

    try {
        // 1. Prepare meeting data
        const meetingData = {
            businessName: props.businessInfo.businessName,
            businessEmail: props.businessInfo.email,
            selectedTime: selectedTime.value,
            selectedDate: format(date.value, 'yyyy-MM-dd'),
            formattedDate: format(date.value, 'PPP'), // Add formatted date for display
            timeStamp: new Date(`${format(date.value, 'yyyy-MM-dd')}T${selectedTime.value}`).getTime(),
            duration: props.eventInfo.duration,
            locationUrl: props.eventInfo.locationUrl,
            eventId: props.eventInfo.id,
            userName: userName.value,
            userEmail: userEmail.value,
            userNote: userNote.value,
            createdAt: new Date()
        };

        // 2. Save to Firebase
        const docRef = doc(collection(db, 'ScheduledMeetings'));
        await setDoc(docRef, meetingData);

        // 3. Send confirmation email (ADDED THIS)
        await sendConfirmationEmail({
            userName: userName.value,
            userEmail: userEmail.value,
            businessName: props.businessInfo.businessName,
            date: format(date.value, 'PPPP'), // More readable format (e.g., "November 15, 2023")
            time: `${selectedTime.value.hours}:${selectedTime.value.minutes}`, // Convert to "14:30" format
            duration: props.eventInfo.duration,
            locationUrl: props.eventInfo.locationUrl
        });

        // 4. Show success
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Meeting scheduled and confirmation email sent!', // Updated message
            life: 3000
        });

        // Reset form
        step.value = 1;
        selectedTime.value = null;
        userName.value = '';
        userEmail.value = '';
        userNote.value = '';

    } catch (error) {
        console.error("Error:", error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error instanceof Error ? error.message : 'Failed to schedule meeting',
            life: 3000
        });
    } finally {
        loading.value = false;
    }
};


// First, define an interface for your email data
interface EmailData {
    userName: string;
    userEmail: string;
    businessName: string;
    date: string;
    time: string;
    duration: number;
    locationUrl?: string; // Optional field
}
const sendConfirmationEmail = async (data: EmailData): Promise<void> => {
    try {
        await $fetch('/api/send-confirmation', {
            method: 'POST',
            body: data
        });
        await router.replace('/confirmation');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Or handle it differently if needed
    }
}
// Watch for business info changes
watch(() => props.businessInfo, (newVal) => {
    if (newVal?.startTime && newVal?.endTime) {
    }
}, { immediate: true })
</script>