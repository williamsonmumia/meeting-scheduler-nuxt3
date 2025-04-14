<template>
    <div class="flex flex-col items-center justify-center">
        <!-- User Info Section -->
        <div class="p-8 mb-6 max-w-md w-full text-center">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ $auth.user.name }}</h1>
            <p class="text-lg text-gray-600">{{ value }}</p>

            <div class="flex items-center justify-center gap-4 text-lg text-gray-600 mb-4">
                <div v-if="value2" class="flex items-center gap-2">
                    <img src="/my-icons/clock.svg" class="w-5 h-5 text-gray-500" />
                    <span>{{ value2 }}</span>
                </div>
                <div v-if="value3" class="flex items-center gap-2">
                    <i :class="value3.icon"></i>
                    <span>{{ value3.value }}</span>
                </div>
            </div>

            <div v-if="value4" class="mt-4 text-center">
                <p class="text-sm text-gray-500">
                    <a :href="value4" class="text-blue-500 hover:underline">{{ value4 }}</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: String,
        value2: String, 
        value3: Object, 
        value4: String, 
    },
};
</script>