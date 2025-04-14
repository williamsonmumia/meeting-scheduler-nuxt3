<template>
    <div class="flex justify-center p-4">
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
            <!-- Event Cards -->
            <div v-for="(event, index) in eventList" :key="event.id"
                class="rounded-lg border bg-card p-6 flex flex-col h-full"
                :style="{ borderTopColor: event?.themeColor }">

                <div class="flex items-center justify-between gap-x-4">
                    <p class="mb-4">
                        {{ event?.eventName || "No Name" }}
                    </p>

                    <Button icon="pi pi-cog" severity="secondary" aria-haspopup="true" class="mb-3" rounded
                        variant="outlined" :aria-controls="'settings-menu-' + index"
                        @click="toggleMenu($event, index)" />
                    <Toast />
                    <Menu :id="'settings-menu-' + event.id" ref="menuRefs" :model="items(event)" :popup="true" />

                </div>

                <div class="flex justify-between items-center">
                    <p class="mt-0 text-muted-foreground text-xs">
                        <i class="pi pi-clock inline h-4 w-4" /> {{ event?.duration }}
                    </p>
                    <p class="text-xs text-muted-foreground">
                        <i class="pi pi-map-marker h-4 w-4" /> {{ event?.locationType?.value }}
                    </p>
                </div>

                <hr class="my-3" />

                <div class="mt-3 flex justify-between">
                    <h2 class="flex gap-2 text-sm text-primary items-center cursor-pointer"
                        @click="onCopyClickHandler(event)">
                        <i class="pi pi-clone h-4 w-4"></i>
                    </h2>
                    <Button label="share" severity="success" variant="outlined" rounded />
                </div>
            </div>
            <h2 v-if="eventList.length === 0" class="text-center text-gray-500 col-span-full">Loading...</h2>
            <div v-if="businessInfo" class="text-center col-span-full mt-6">
                <h2 class="font-sans text-2xl text-green-500">Business Info</h2>
                <p class="text-gray-600">{{ businessInfo.businessName }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import 'primeicons/primeicons.css'
import Button from "primevue/button";
import Menu from "primevue/menu";
import { useToast } from 'primevue/usetoast';
import { ref, watchEffect } from 'vue';
import { useNuxtApp } from '#app'; 
import { getFirestore, collection, query, where, getDocs, doc, getDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { app } from '../pages/config/firebaseConfig';

const db = getFirestore(app);
const { $auth } = useNuxtApp();

// State for event list and business info
const eventList = ref([]);
const businessInfo = ref(null);
const loading = ref(false);
const error = ref(null);

// Fetch meeting events
const getEventList = async () => {
    loading.value = true;
    error.value = null;
    eventList.value = []; 
    try {
        const q = query(
            collection(db, 'MeetingEvent'),
            where('createdBy', '==', $auth.user.name),
            orderBy('id', 'desc')
        );
        const querySnapshot = await getDocs(q);
        console.log('Query Results:', querySnapshot.docs);
        querySnapshot.forEach((doc) => {
            const eventData = doc.data();
            eventList.value.push({
                id: doc.id,
                duration: eventData.duration,
                eventName: eventData.eventName,
                locationType: eventData.locationType, 
                locationUrl: eventData.locationUrl, 
            });
            console.log('Fetched document:', doc.id, doc.data());
        });
    } catch (err) {
        console.error('Error fetching events:', err);
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

// Fetch business info
const getBusinessInfo = async () => {
    try {
        const docRef = doc(db, 'Business', $auth.user.email); 
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            businessInfo.value = docSnap.data(); 
        }
    } catch (error) {
        console.error('Error fetching business info:', error);
    }
};

watchEffect(() => {
    console.log('Auth User:', $auth.user); 
    if ($auth?.user) {
        getEventList();
        getBusinessInfo();
    }
});

// Function to delete a meeting event
const toast = useToast();

const onDeleteMeetingEvent = async (event) => {
    try {
        await deleteDoc(doc(db, "MeetingEvent", event?.id));

        toast.add({
            severity: 'warn',
            summary: 'Deleted',
            detail: 'Meeting Event Deleted!',
            life: 3000
        });

        setTimeout(() => {
            getEventList();
        }, 2000);

    } catch (error) {
        console.error("Error deleting event:", error);

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete event',
            life: 3000
        });
    }
};

const onCopyClickHandler = (event) => {
    if (!businessInfo.value) return;
    const runtimeConfig = useRuntimeConfig();
    const meetingEventUrl = `${runtimeConfig.public.baseUrl}/${businessInfo.value.businessName}/${event.id}`;
    navigator.clipboard.writeText(meetingEventUrl);
    alert('Copied to Clipboard'); 
};

const menuRefs = ref([]);

const items = (event) => [
    {
        label: 'Update',
        icon: 'pi pi-refresh',
    },
    {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => onDeleteMeetingEvent(event)
    }
];

const toggleMenu = (event, index) => {
    menuRefs.value[index].toggle(event);
};
</script>

<style scoped>
/* Add your styles here */
</style>