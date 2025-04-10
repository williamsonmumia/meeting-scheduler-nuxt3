<template>
  <div>
    <div v-if="loading" class="text-center p-8">
      <ProgressSpinner />
    </div>

    <div v-else-if="error">
      <div class="p-4 bg-red-100 text-red-700 rounded-lg">
        {{ error }}
      </div>
    </div>

    <div v-else-if="!businessInfo || !eventInfo">
      <div class="p-4 bg-yellow-100 text-yellow-700 rounded-lg">
        Data not loaded yet or not found
        <pre>Business: {{ businessInfo }}</pre>
        <pre>Event: {{ eventInfo }}</pre>
      </div>
    </div>

    <MeetingTimeDateSelection 
      v-else
      :eventInfo="eventInfo"
      :businessInfo="businessInfo"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from '#imports'
import { 
  getFirestore, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  collection, 
  where 
} from 'firebase/firestore'
import { app } from '~/pages/config/firebaseConfig'

const db = getFirestore(app)
const route = useRoute()

const businessInfo = ref(null)
const eventInfo = ref(null)
const loading = ref(false)
const error = ref(null)

const getMeetingBusinessAndEventDetails = async () => {
  loading.value = true
  error.value = null

  try {
    console.log('Fetching data for:', route.params.business, route.params.meetingEventId)

    // 1. Fetch Business Info
    const businessQuery = query(
      collection(db, 'Business'),
      where('businessName', '==', route.params.business)
    )
    const businessSnapshot = await getDocs(businessQuery)

    if (!businessSnapshot.empty) {
      businessInfo.value = businessSnapshot.docs.map(doc => doc.data())[0] // Handling multiple businesses
      console.log('Business data loaded:', businessInfo.value)
    } else {
      throw new Error('Business not found')
    }

    // 2. Fetch Event Info
    if (!route.params.meetingEventId) {
      throw new Error('Missing event ID')
    }

    const eventRef = doc(db, 'MeetingEvent', route.params.meetingEventId)
    const eventSnap = await getDoc(eventRef)

    if (eventSnap.exists()) {
      eventInfo.value = eventSnap.data()
      console.log('Event data loaded:', eventInfo.value)
    } else {
      throw new Error('Event not found')
    }

  } catch (err) {
    console.error('Fetch error:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Initial load
onMounted(() => {
  if (route.params.business && route.params.meetingEventId) {
    getMeetingBusinessAndEventDetails()
  } else {
    error.value = 'Missing required URL parameters'
  }
})

// Watch for route changes
watch(
  () => route.params,
  (newParams) => {
    if (newParams.business && newParams.meetingEventId) {
      getMeetingBusinessAndEventDetails()
    }
  },
  { immediate: true, deep: true }
)

definePageMeta({
  layout: 'home'
})
</script>
