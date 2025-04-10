<template>
    <header class="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <!-- Container of flex -->
        <div class="container flex h-16 items-center justify-between">
            <!-- Logo and page title -->
            <div class="flex items-center gap-3">
                <button @click="isOpen = true" aria-label="Open menu"
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background lg:hidden">
                    <span class="sr-only">Button used to open menu</span>
                    <Icon name="heroicons:bars-2" />
                </button>
                <!-- Logo -->
                <!-- Page title -->
                <NuxtLink class="text-xl font-bold text-green-500" to="/">aligno</NuxtLink>
            </div>

            <!-- Right side of header -->
            <div class="flex items-center gap-5">

                <!-- Profile Dropdown menu -->
                <HMenu as="div" class="relative">

                    <HMenuButton
                        class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border bg-background">
                        <img :src="$auth.user.picture" alt="Logged in user" class="h-full w-full" />
                    </HMenuButton>
                    <TransitionScale :scale="0.8" origin="top right">
                        <HMenuItems
                            class="absolute right-0 z-10 mt-3 w-48 rounded-md border bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <div class="w-full border-b px-4 py-3">
                                <p class="text-sm font-medium">My account</p>
                            </div>
                            <div class="p-1">
                                <template v-for="(p, i) in navitems" :key="i">
                                    <HMenuItem v-if="!p.divider" v-slot="{ active }">
                                        <NuxtLink :to="p.link" :class="[active && 'bg-muted',]"
                                            class="inline-flex w-full items-center rounded-md p-2 text-sm font-medium">

                                            <img :src="p.icon" alt="" class="w-5 h-5 mr-2 dark:invert" />
                                            {{ p.title }}
                                        </NuxtLink>
                                    </HMenuItem>
                                    <hr v-if="p.divider" class="my-1" />
                                </template>
                            </div>
                        </HMenuItems>
                    </TransitionScale>
                </HMenu>
            </div>
        </div>
        <!-- Mobile menu -->
        <MobileMenu v-model="isOpen" />
    </header>
</template>

<script setup>
import { profileMenuOptions } from '../utils/index.ts';

// Initialize routes with profileMenuoptions
const navitems = ref(profileMenuOptions);
// Used to open/close menu
const isOpen = ref(false);
</script>