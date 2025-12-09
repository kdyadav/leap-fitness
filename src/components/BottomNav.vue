<template>
    <nav class="bottom-0 left-0 right-0 bg-black border-t border-gray-600">
        <div class="flex justify-around items-center h-15">
            <!-- Workouts -->
            <router-link :to="{ name: 'workouts' }" :class="[
                'flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-300',
                route.name === 'workouts' ? 'text-[#0054ff]' : 'text-gray-400 hover:text-white'
            ]">
                <span class="text-xl">🏋️</span>
                <span class="text-xs font-medium">Workouts</span>
            </router-link>

            <!-- Classic -->
            <router-link :to="{ name: 'classic' }" :class="[
                'flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-300',
                route.name === 'classic' ? 'text-[#0054ff]' : 'text-gray-400 hover:text-white'
            ]">
                <span class="text-xl">⭐</span>
                <span class="text-xs font-medium">Classic</span>
            </router-link>

            <!-- Preferences -->
            <router-link :to="{ name: 'preferences' }" :class="[
                'flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-300',
                route.name === 'preferences' ? 'text-[#0054ff]' : 'text-gray-400 hover:text-white'
            ]">
                <span class="text-xl">⚙️</span>
                <span class="text-xs font-medium">Preferences</span>
            </router-link>

            <!-- Me/Profile -->
            <router-link :to="{ name: 'profile' }" :class="[
                'flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-300',
                route.name === 'profile' ? 'text-[#0054ff]' : 'text-gray-400 hover:text-white'
            ]">
                <span class="text-xl">👤</span>
                <span class="text-xs font-medium">Me</span>
            </router-link>
        </div>
    </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();


</script>

<style scoped>
nav {
    z-index: 50;
}
</style>
