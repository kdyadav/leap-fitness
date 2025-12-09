<template>
    <div class="p-6 max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold mb-6 text-gray-800">My Workouts</h1>

        <div class="flex flex-col gap-4">
            <router-link v-for="workout in workouts" :key="workout.id"
                :to="{ name: 'workout-details', params: { id: workout.id } }"
                class="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer no-underline text-inherit">
                <div class="text-4xl flex-shrink-0">{{ workout.icon }}</div>
                <div class="flex-1">
                    <h3 class="text-xl font-semibold mb-2 text-gray-800">{{ workout.name }}</h3>
                    <p class="text-sm text-gray-600 mb-3">{{ workout.description }}</p>
                    <div class="flex gap-4 text-sm">
                        <span class="text-gray-600 flex items-center gap-1">
                            <IconClock :size="16" /> {{ workout.duration }} min
                        </span>
                        <span :class="[
                            'px-3 py-1 rounded-full font-medium text-xs',
                            workout.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' : '',
                            workout.difficulty === 'Intermediate' ? 'bg-orange-100 text-orange-700' : '',
                            workout.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' : ''
                        ]">
                            {{ workout.difficulty }}
                        </span>
                    </div>
                </div>
                <div class="text-gray-400">
                    <IconChevronRight :size="24" />
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { IconChevronRight, IconClock } from '@tabler/icons-vue';

const workouts = ref([
    {
        id: 1,
        name: 'Morning Yoga',
        description: 'Start your day with energizing yoga poses',
        duration: 20,
        difficulty: 'Beginner',
        icon: '🧘'
    },
    {
        id: 2,
        name: 'HIIT Cardio',
        description: 'High intensity interval training for fat burning',
        duration: 30,
        difficulty: 'Advanced',
        icon: '🔥'
    },
    {
        id: 3,
        name: 'Strength Training',
        description: 'Build muscle with bodyweight exercises',
        duration: 45,
        difficulty: 'Intermediate',
        icon: '💪'
    },
    {
        id: 4,
        name: 'Core Workout',
        description: 'Strengthen your core and abs',
        duration: 15,
        difficulty: 'Beginner',
        icon: '⭐'
    },
    {
        id: 5,
        name: 'Full Body Stretch',
        description: 'Improve flexibility and recovery',
        duration: 25,
        difficulty: 'Beginner',
        icon: '🌟'
    },
    {
        id: 6,
        name: 'Running Intervals',
        description: 'Boost endurance with interval running',
        duration: 40,
        difficulty: 'Intermediate',
        icon: '🏃'
    }
]);
</script>
