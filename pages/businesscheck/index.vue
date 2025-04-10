<template>
    <!-- Show loading spinner while loading is true -->
    <div v-if="state.isLoading" class="flex justify-center items-center h-screen">
        <div class="text-center text-gray-500">
            <PulseLoader />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { app } from '../config/firebaseConfig';

// Initialize Firestore
const db = getFirestore(app);

// Get user from Nuxt auth
const { user } = useNuxtApp().$auth;
const router = useRouter();
const loading = ref(true);

const state = reactive({
    isLoading: true,
});

// Check if the user's business already exists
const checkBusinessExists = async () => {
  try {
    const docRef = doc(db, 'Business', user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      router.replace('/dashboard'); // Redirect to dashboard if business exists
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error fetching document:', error);
  } finally {
    loading.value = false; // Set loading to false after the check
  }
};

// Run the check when the component is mounted
onMounted(() => {
  checkBusinessExists();
});

// Check if the business is registered
const isBusinessRegistered = async () => {
    if (!user?.email) {
        console.error('User email not found.');
        return;
    }
    try {
        const docRef = doc(db, 'Business', user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
            loading.value = false;
        } else {
            console.log('No such document!');
            loading.value = false;
            router.replace('/create-business');
        }
    } catch (error) {
        console.error('Error fetching document:', error);
        loading.value = false;
    } finally {
        state.isLoading = false;
    }
};
// Watch for `user` changes and trigger registration check
watch(
    () => user,
    () => {
        if (user) {
            isBusinessRegistered();
        }
    }
);
// Initialize on component mount
onMounted(() => {
    if (user) {
        isBusinessRegistered();
    }
});
definePageMeta({
  layout: 'home',
});
</script>