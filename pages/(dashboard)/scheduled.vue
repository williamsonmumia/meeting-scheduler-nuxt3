<script setup>
import { ref, onMounted } from 'vue'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { app } from '../config/firebaseConfig'
import { useNuxtApp } from '#app';
import MeetingList from '../../components/ScheduledMeetingList.vue'

const meetings = ref([])
const loading = ref(true)

const db = getFirestore(app)
const { $auth } = useNuxtApp();

const fetchUpcomingMeetings = async () => {
  if (!$auth?.user) {
    console.log('No user found.')
    return
  }

  const userEmail = $auth.user.email
  console.log('Fetching meetings for:', userEmail)

  const q = query(
    collection(db, 'ScheduledMeetings'),
    where('businessEmail', '==', $auth.user.email)
  )

  const snapshot = await getDocs(q)
  const result = []
  snapshot.forEach(doc => {
    const data = doc.data()
    console.log('Fetched doc:', data)
    result.push(data)
  })

  meetings.value = result
  loading.value = false
}

onMounted(() => {
  fetchUpcomingMeetings()
})
</script>

<template>
  <div class="p-4">
    <h2 className='font-sans text-2xl'>Scheduled Meetings</h2>
    <hr className='my-5'>
    </hr>
    <p v-if="loading" class="text-gray-500">Loading meetings...</p>
    <MeetingList :meetings="meetings" v-else />
  </div>
</template>

<style scoped></style>
