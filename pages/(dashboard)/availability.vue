<template>
  <div class="p-10">
    <h2 class="font-sans text-2xl">Availability</h2>
    <hr class="my-5">
    <div>
      <h2 class="font-sans ">Availability Days</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5 my-3">
        <div v-for="(item, index) in daysList" :key="index" class="flex align-items-center">
          <Checkbox v-model="daysAvailable[item.day]" :inputId="'day-' + index" :binary="true" />
          <label :for="'day-' + index" class="ml-2">{{ item.day }}</label>
        </div>
      </div>
    </div>
    <div>
      <h2 class="mt-10">Availability Time</h2>
      <div class="flex gap-10">
        <div class="mt-3">
          <h2>Start Time</h2>
          <input type="time" v-model="startTime" class="border rounded p-2" />
        </div>
        <div class="mt-3">
          <h2>End Time</h2>
          <input type="time" v-model="endTime" class="border rounded p-2" />
        </div>
      </div>
    </div>
    <Toast />
    <Button class="w-small mt-10" label="Save" @click="handleSave">
      Save
    </Button>
  </div>
</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import { ref, onMounted } from 'vue'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useNuxtApp } from '#app';
import { useToast } from 'primevue/usetoast';
import { app } from '../config/firebaseConfig';


// Days list (moved inside component since we're not importing from external file)
const daysList = [
  { day: 'Sunday' },
  { day: 'Monday' },
  { day: 'Tuesday' },
  { day: 'Wednesday' },
  { day: 'Thursday' },
  { day: 'Friday' },
  { day: 'Saturday' }
]

// State
const daysAvailable = ref({
  Sunday: false,
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
  Saturday: false
})

const { $auth } = useNuxtApp();
const startTime = ref('')
const endTime = ref('')
const db = getFirestore(app)


// Lifecycle hook
onMounted(() => {
  if ($auth?.user) {
    getBusinessInfo()
  }
})

// Methods
const getBusinessInfo = async () => {
  const docRef = doc(db, 'Business', $auth.user.email)
  const docSnap = await getDoc(docRef)
  const result = docSnap.data()

  if (result) {
    daysAvailable.value = result.daysAvailable || daysAvailable.value
    startTime.value = result.startTime || ''
    endTime.value = result.endTime || ''
  }
}

const onHandleChange = (day, value) => {
  daysAvailable.value = {
    ...daysAvailable.value,
    [day]: value
  }
}

const toast = useToast();
const handleSave = async () => {
  try {
    const docRef = doc(db, 'Business', $auth?.user.email)
    await updateDoc(docRef, {
      daysAvailable: daysAvailable.value,
      startTime: startTime.value,
      endTime: endTime.value
    })
    toast.add({
      severity: 'success',
      summary: 'updated',
      detail: 'Availability set',
      life: 2000
    });
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>

</style>