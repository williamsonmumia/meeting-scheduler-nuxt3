<template>
    <div>
      <HTransitionRoot appear :show="isOpen" as="div">
        <HDialog as="div" @close="isOpen = false" class="fixed inset-0 z-50 flex justify-start">
          <!-- Backdrop transition -->
          <HTransitionChild as="div" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
            leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black/25 backdrop-blur" />
          </HTransitionChild>
  
          <!-- Panel transition -->
          <HTransitionChild as="div" enter="duration-300 ease-out" enter-from="opacity-0 -translate-x-full"
            leave="duration-200 ease-in" leave-to="opacity-0 -translate-x-full">
            <HDialogPanel class="relative h-dvh w-[320px] bg-background p-3">
              <div class="absolute -right-10 top-4 z-20">
                <button @click="isOpen = false" aria-label="Close menu"
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background">
                  <span class="sr-only">Button used to close menu</span>
                  <Icon name="heroicons:x-mark" />
                </button>
              </div>
              
              <!-- Navigation items directly in the mobile menu -->
              <nav class="mt-10">
                <ul class="space-y-2">
                  <li v-for="(item, index) in navItems" :key="index">
                    <NuxtLink :to="item.link" class="flex items-center gap-2 p-2 hover:bg-muted rounded">
                        <Icon :name="item.icon" :class="`h-5 w-5 mr-3`" />
                      {{ item.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </nav>
            </HDialogPanel>
          </HTransitionChild>
        </HDialog>
      </HTransitionRoot>
    </div>
  </template>
  
  <script setup>
  import { dashboardRoutes } from '../utils/index.ts';
  
  const isOpen = defineModel();
  const navItems = ref(dashboardRoutes);
  </script>