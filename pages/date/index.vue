<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-dark p-4 sm:p-8">
        <!-- Done Link -->
        <NuxtLink to="/meeting-type" class="absolute top-4 left-4 text-green-500 hover:underline text-sm sm:text-base">
            Done
        </NuxtLink>
        <h1
            class="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-14 sm:mb-12 mt-6 sm:mt-12 text-center">
            This is a preview of your event created.
        </h1>

        <!-- Card Container -->
        <div class="w-full max-w-4xl mt-0 space-y-8 sm:space-y-0 sm:flex sm:gap-4">
            <div class="w-full sm:w-auto bg-white dark:bg-dark-2 rounded-lg shadow-lg p-4 sm:p-8">
                <DatePicker v-model="date" inline showWeek class="w-full sm:w-[30rem]" :min-date="new Date()" />
            </div>

            <div class="w-full sm:w-auto bg-white dark:bg-dark-2 rounded-lg shadow-lg p-4 sm:p-8">
                <div class="mb-8 sm:mb-12">
                    <label for="timepicker"
                        class="mb-2 sm:mb-[10px] block text-base font-medium text-dark dark:text-white">
                        Timepicker
                    </label>
                    <div class="relative">
                        <div class="relative flex items-center">
                            <span class="absolute left-0 pl-3 sm:pl-5 text-dark-5">
                                <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_3185_947)">
                                        <path
                                            d="M10.4687 10.3125V5.28125C10.4687 4.90625 10.1562 4.59375 9.78125 4.59375C9.40625 4.59375 9.09375 4.90625 9.09375 5.28125V10.5937C9.09375 10.7812 9.15625 10.9687 9.28125 11.0937L12.75 14.625C12.875 14.75 13.0625 14.8437 13.25 14.8437C13.4375 14.8437 13.5937 14.7812 13.75 14.6562C14.0312 14.375 14.0312 13.9375 13.75 13.6562L10.4687 10.3125Z"
                                            fill="" />
                                        <path
                                            d="M10 0.46875C4.78125 0.46875 0.5625 4.75 0.5625 10C0.5625 15.25 4.8125 19.5312 10 19.5312C15.1875 19.5312 19.4375 15.25 19.4375 10C19.4375 4.75 15.2188 0.46875 10 0.46875ZM10 18.125C5.5625 18.125 1.9375 14.4688 1.9375 10C1.9375 5.53125 5.5625 1.875 10 1.875C14.4375 1.875 18.0625 5.53125 18.0625 10C18.0625 14.4688 14.4375 18.125 10 18.125Z"
                                            fill="" />
                                    </g>
                                </svg>
                            </span>
                            <input id="timepicker" type="text" v-model="selectedTime"
                                class="w-full bg-transparent pl-10 sm:pl-[50px] pr-8 py-2.5 border rounded-lg text-dark-2 dark:text-dark-6 border-stroke dark:border-dark-3 outline-none transition focus:border-primary dark:focus:border-primary"
                                placeholder="Select a time" readonly @click="toggleTimepickerVisibility" />
                        </div>

                        <div v-show="isTimepickerVisible"
                            class="absolute right-0 w-full sm:w-[162px] h-[200px] sm:h-[262px] overflow-hidden overflow-y-auto mt-2 bg-white dark:bg-dark-2 border border-stroke dark:border-dark-3 rounded-md shadow-datepicker p-2 no-scrollbar">
                            <div v-for="(time, index) in times" :key="index"
                                class="time-option cursor-pointer flex gap-1 justify-between" @click="selectTime(time)">
                                <div
                                    class="hour max-w-[46px] w-full h-[40px] sm:h-[46px] flex items-center justify-center text-sm font-medium rounded-md text-dark-3 dark:text-dark-6">
                                    {{ time.hour }}
                                </div>
                                <div
                                    class="minute max-w-[46px] w-full h-[40px] sm:h-[46px] flex items-center justify-center text-sm font-medium rounded-md text-dark-3 dark:text-dark-6">
                                    {{ time.minute }}
                                </div>
                                <div
                                    class="period max-w-[46px] w-full h-[40px] sm:h-[46px] flex items-center justify-center text-sm font-medium rounded-md text-dark-3 dark:text-dark-6">
                                    {{ time.period }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const date = ref();
const selectedTime = ref('');
const isTimepickerVisible = ref(false);

const times = ref([]);
const duration = ref(30);

const timeOptions = [
    { label: '15 Min', value: 15 },
    { label: '30 Min', value: 30 },
    { label: '45 Min', value: 45 },
    { label: '60 Min', value: 60 }
];

// Toggle timepicker visibility
function toggleTimepickerVisibility() {
    isTimepickerVisible.value = !isTimepickerVisible.value;
}

// Select time
function selectTime(time) {
    selectedTime.value = `${time.hour}:${time.minute} ${time.period}`;
    isTimepickerVisible.value = false;
}

// Generate time options
function generateTimeOptions(interval) {
    const options = [];
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0);
    for (let i = 0; i < 24 * 60; i += interval) {
        const time = new Date(startTime.getTime() + i * 60000);
        let hour = time.getHours() % 12 || 12;
        const minute = time.getMinutes().toString().padStart(2, '0');
        const period = time.getHours() < 12 ? 'AM' : 'PM';
        options.push({ hour: hour.toString().padStart(2, '0'), minute, period });
    }
    return options;
}

watch(duration, (newDuration) => {
    times.value = generateTimeOptions(newDuration);
});

onMounted(() => {
    times.value = generateTimeOptions(duration.value);
});

definePageMeta({ layout: 'home' });
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;

}
</style>