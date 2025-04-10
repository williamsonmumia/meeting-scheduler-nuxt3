<template>
    <div class="relative space-y-4 py-4 flex flex-col h-full border-r">
        <!-- Dashboard Content -->
        <div class="px-3 py-2">
            <a href="#" class="flex items-center mb-6"></a>

            <Button @click="showLoading" label="Create" severity="success" variant="outlined" rounded
                class="flex gap-4 w-full mt-5 rounded-full">
                <LucidePlus />
                Create
            </Button>

            <div class="mt-6 space-y-1">
                <NuxtLink v-for="route in routes" :key="route.link" :to="route.link"
                    class="text-lg group text-primary dark:text-primary-dark flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition hover:bg-green-50 dark:hover:bg-green-900"
                    :class="{ 'bg-green-50': !isDarkMode && currentRoute.path === route.link }">
                    <div class="flex items-center flex-1">
                        <Icon :name="route.icon" :class="`h-5 w-5 mr-3 ${route.color}`" />
                        {{ route.title }}
                    </div>
                </NuxtLink>
            </div>
        </div>

        <Dialog v-model:visible="loadingVisible" modal :closable="false" :showHeader="false"
            pt:root:class="!border-0 !bg-transparent" pt:mask:class="backdrop-blur-sm">
            <ProgressSpinner style="width: 60px; height: 60px" strokeWidth="4" class="text-primary-700" />
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { dashboardRoutes } from '../utils/index.ts';

const loadingVisible = ref(false);
const router = useRouter();
const currentRoute = useRoute();
const routes = ref(dashboardRoutes);

const showLoading = async () => {
    loadingVisible.value = true;

    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        await router.push('/create-meeting');
    } finally {
        loadingVisible.value = false;
    }
};
</script>