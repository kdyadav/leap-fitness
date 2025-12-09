<template>
    <nav class="bottom-0 left-0 right-0"
        style="background-color: var(--card-bg); border-top: 1px solid var(--border-color);">
        <div class="flex justify-around items-center h-15">
            <!-- Workouts -->
            <router-link :to="{ name: 'workouts' }"
                class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-300"
                :style="{ color: route.name === 'workouts' ? 'var(--accent-color)' : 'var(--text-tertiary)' }">
                <IconBarbellOff />
                <span class="text-xs font-medium">Workouts</span>
            </router-link>

            <!-- Classic -->
            <router-link :to="{ name: 'classic' }"
                class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-300"
                :style="{ color: route.name === 'classic' ? 'var(--accent-color)' : 'var(--text-tertiary)' }">
                <IconStar />
                <span class="text-xs font-medium">Classic</span>
            </router-link>

            <!-- Preferences -->
            <router-link :to="{ name: 'preferences' }"
                class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-300"
                :style="{ color: route.name === 'preferences' ? 'var(--accent-color)' : 'var(--text-tertiary)' }">
                <IconSettings />
                <span class="text-xs font-medium">Preferences</span>
            </router-link>

            <!-- Me/Profile -->
            <router-link :to="{ name: 'profile' }"
                class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-300"
                :style="{ color: route.name === 'profile' ? 'var(--accent-color)' : 'var(--text-tertiary)' }">
                <IconUser />
                <span class="text-xs font-medium">Me</span>
            </router-link>
        </div>
    </nav>
</template>

<script setup>
import { computed } from 'vue';
import { IconBarbellOff, IconStar, IconSettings, IconUser } from '@tabler/icons-vue'

import { useRoute } from 'vue-router';

const route = useRoute();


</script>

<style scoped>
nav {
    z-index: 50;
}
</style>
