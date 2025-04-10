<!-- components/Confirmation.vue -->
<script>
import 'primeicons/primeicons.css'
import Button from 'primevue/button';
definePageMeta({
  layout: 'home',
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 md:gap-6 p-6 sm:p-10 md:p-20">
    <i class="pi pi-check-circle text-green-500" style="font-size: 1.75rem; sm:2rem;"></i>
    <h2 class="font-bold text-xl sm:text-2xl md:text-3xl text-center">Your meeting scheduled successfully!</h2>
    <h2 class="text-base sm:text-lg text-gray-500 text-center">Confirmation sent on your email</h2>
    <NuxtLink to="/">
      <Button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
        Thank you
      </Button>
    </NuxtLink>
  </div>
</template>