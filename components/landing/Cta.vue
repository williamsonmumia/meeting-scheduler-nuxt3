<template>
    <section class="py-0 px-4 container mx-auto">
        <div class="max-w-3xl mx-auto text-center mb-12">
            <div class="inline-block mb-4">
                <Button label="How it works" severity="secondary" disabled rounded size="small" class="text-sm" />
            </div>
            <h2 class="text-slate-600 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Scheduling made easy
            </h2>
            <p class="text-slate-500 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                Book meetings faster, without the chaos.
            </p>
        </div>
     
        <div class="flex flex-wrap justify-center gap-8">
            <!-- First card - now using consistent directive syntax -->
            <div 
                v-animateonscroll="{ enterClass: 'animated flip' }" 
                class="flex flex-col bg-purple-500 text-white border-purple-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
            >
                <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                    <i class="pi pi-calendar !text-2xl"></i>
                </div>
                <span class="text-2xl font-bold">Connect Calendar</span>
                <span class="text-center"> Link your personal or work calendar to automatically 
                    check for conflicts and show your available times.</span>
            </div>
            <!-- Second card - already correct format -->
            <div 
                v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-75 animate-duration-1000' }" 
                class="flex flex-col bg-teal-500 text-white border-teal-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
            >
                <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                    <i class="pi pi-clock !text-2xl"></i>
                </div>
                <span class="text-2xl font-bold">Set Availability</span>
                <span class="text-center">Define your working hours and when you're available for meetings. 
                    Block off focus time and lunch breaks.</span>
            </div>
            <!-- Third card - already correct format -->
            <div 
                v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-1000' }" 
                class="flex flex-col bg-indigo-500 text-white border-indigo-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
            >
                <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                    <i class="pi pi-map-marker !text-2xl"></i>
                </div>
                <span class="text-2xl font-bold">Choose How We Meet</span>
                <span class="text-center">Select your preferred meeting methods: video calls, phone calls, 
                    or in-person meetings at your locations.</span>
            </div>
        </div>
    </section>
</template>

<script setup>
// Import components if needed
// import { Card } from 'primevue/card';
// import { Button } from 'primevue/button';
import 'primeicons/primeicons.css'
</script>
<style>
/* Import Animate.css for the 'animated flip' effect on the first card */
@import 'https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css';

/* Define your custom animation classes if not already defined elsewhere */
.animate-enter {
  animation-fill-mode: both;
}

.animate-duration-1000 {
  animation-duration: 1000ms;
}

.fade-in-10 {
  animation-name: fadeIn;
}

.zoom-in-50 {
  animation-name: zoomIn50;
}

.zoom-in-75 {
  animation-name: zoomIn75;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes zoomIn50 {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes zoomIn75 {
  from { transform: scale(0.75); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>