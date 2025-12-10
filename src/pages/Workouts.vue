<template>
    <div class="p-6 max-w-3xl mx-auto" style="background-color: var(--bg-primary);">
        <h1 class="text-3xl font-bold mb-6" style="color: var(--text-primary);">My Workouts</h1>

        <div class="flex flex-col gap-4">
            <router-link v-for="workout in workouts" :key="workout.id"
                :to="{ name: 'workout-details', params: { id: workout.id } }"
                class="flex items-center gap-4 p-5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer no-underline"
                style="background-color: var(--card-bg); color: var(--text-primary);">
                <div class="text-4xl shrink-0">{{ workout.icon }}</div>
                <div class="flex-1">
                    <h3 class="text-xl font-semibold mb-2" style="color: var(--text-primary);">{{ workout.name }}</h3>
                    <p class="text-sm mb-3" style="color: var(--text-secondary);">{{ workout.description }}</p>
                    <div class="flex gap-4 text-sm">
                        <span class="flex items-center gap-1" style="color: var(--text-secondary);">
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
                <div style="color: var(--text-tertiary);">
                    <IconChevronRight :size="24" />
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { IconChevronRight, IconClock } from '@tabler/icons-vue';
import { useWorkoutStore } from '../stores/index.js';

const workoutStore = useWorkoutStore();
const workouts = computed(() => workoutStore.workouts);

onMounted(async () => {
    await workoutStore.loadWorkouts();
});
</script>
