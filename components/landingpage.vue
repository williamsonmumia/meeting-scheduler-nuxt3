<template>
  <header class="w-full py-4 fixed top-4 left-0 z-50">
    <div class="container mx-auto flex items-center justify-between px-4">
      <!-- Logo and Left-Aligned Menu Items -->
      <div class="flex items-center gap-6">
        <!-- Logo -->
        <a href="#" class="flex items-center">
          <span class="text-2xl md:text-3xl font-bold text-gray-700">aligno</span>
        </a>
      </div>

      <!-- Login & Sign Up Buttons (Right Side) -->
      <div class="flex gap-0">
        <NuxtLink v-for="action in actionItems" :key="action.metadata.id" :to="action.url" class="actionBtn"
          :class="action.label === 'Sign Up' ? 'signUpBtn' : 'loginBtn'" external>
          {{ action.label }}
        </NuxtLink>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="pt-12 md:pt-24 pb-8 md:pb-12">
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <!-- Left Side: Text Content -->
      <div class="md:w-1/2 text-center md:text-left order-2 md:order-1">
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700 mb-4 md:mb-6">
          {{ headline }}
        </h1>
        <p class="text-sm sm:text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-md mx-auto md:mx-0">
          {{ description }}
        </p>
        <NuxtLink :to="button_url"
          class="inline-block bg-green-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold hover:bg-green-700">
          {{ button_label }}
        </NuxtLink>
      </div>
      <!-- Right Side: Image -->
      <div class="md:w-1/2 mt-8 md:mt-0 order-1 md:order-2">
        <img :src="image" class="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md mx-auto" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useActionItems, useHero } from "../hooks/useCMS";

const { headline, subheadline: description, image, button_label, button_url } = useHero();
// Fetch action items for the header
const actionItems = useActionItems();


// Track the active section based on scroll position
const activeSection = ref<string | null>(null);

const handleScroll = () => {
  const sections = document.querySelectorAll('section');
  let currentSection = null;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // Adjust offset for header height
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = `#${section.id}`;
    }
  });

  activeSection.value = currentSection;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.menuItem {
  @apply text-black font-medium transition duration-300;
}

.actionBtn {
  @apply py-2 px-4 font-medium transition duration-300;
}

/* Login button (NO Rounded Corners & NO Hover Effect) */
.loginBtn {
  @apply text-black;
}

/* Sign Up button (WITH Rounded Corners & Hover Effect) */
.signUpBtn {
  @apply text-white bg-green-600 hover:bg-green-700 rounded-lg;
}
</style>