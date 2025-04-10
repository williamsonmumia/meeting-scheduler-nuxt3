<template>
  <div class="card">
    <Accordion :multiple="true" :activeIndex="[0]">
      <AccordionPanel v-for="(meeting, index) in meetings" :key="index" :value="index">
        <AccordionHeader>
          Meeting on {{ meeting.formattedDate }} at {{ formatTime(meeting.selectedTime) }}
        </AccordionHeader>

        <AccordionContent>
          <div class="flex flex-col gap-2">
            <p><i class="pi pi-clock h-4 w-4"/> {{ meeting.duration }} </p>
            <p><i class="pi pi-user h-4 w-4"/> {{ meeting.userName || 'Guest' }} </p>

            <p>
              <a :href="meeting.locationUrl || '#'" target="_blank" class="text-green-600 hover:underline hover:text-green-800"
                @click.prevent="navigateTo(meeting.locationUrl)">
                <i class="pi pi-link h-4 w-4 "/>
                {{ meeting.locationUrl }}
              </a>
            </p>

            <div v-if="meeting.userNote" class="mt-2 p-2 bg-gray-100 rounded">
              <p class="text-sm"><strong>Note:</strong> {{ meeting.userNote }}</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>

    <div v-if="!meetings || meetings.length === 0" class="text-center py-4 text-gray-500">
      No meetings scheduled
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import 'primeicons/primeicons.css'

const props = defineProps({
  meetings: {
    type: Array,
    default: () => []
  }
})

// Format time from your selectedTime object {hours, minutes}
const formatTime = (time) => {
  if (!time) return 'Time not specified'

  if (typeof time === 'object' && time !== null) {
    const hours = time.hours ?? 0
    const minutes = time.minutes ?? 0
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 || 12
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`
  }

  if (typeof time === 'string') {
    return time
  }

  return 'Invalid time format'
}

const navigateTo = (url) => {
  if (url && url !== '#') {
    window.open(url, '_blank')
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  max-height: 400px; /* Set a fixed height */
  overflow-y: auto; /* Allow scrolling within the card */
}

.p-accordion-content {
  max-height: 300px; /* Adjust this as necessary */
  overflow-y: auto; /* Allow scrolling within the content */
}
</style>
