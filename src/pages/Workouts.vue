<template>
    <div class="p-6 max-w-3xl mx-auto" style="background-color: var(--bg-primary);">
        <h1 class="text-3xl font-bold mb-6" style="color: var(--text-primary);">Workouts</h1>

        <!-- Filter Section -->
        <div class="mb-6">
            <h3 class="text-sm font-semibold mb-3" style="color: var(--text-secondary);">Filter by Category</h3>
            <div class="flex flex-wrap gap-2">
                <button @click="selectedCategory = 'all'" :class="[
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    selectedCategory === 'all'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]" style="border: none; cursor: pointer;">
                    All 🏃
                </button>
                <button v-for="category in categories" :key="category.value" @click="selectedCategory = category.value"
                    :class="[
                        'px-4 py-2 rounded-full text-sm font-medium transition-all',
                        selectedCategory === category.value
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    ]" style="border: none; cursor: pointer;">
                    {{ category.label }} {{ category.icon }}
                </button>
            </div>
        </div>

        <!-- Difficulty Filter -->
        <div class="mb-6">
            <h3 class="text-sm font-semibold mb-3" style="color: var(--text-secondary);">Filter by Difficulty</h3>
            <div class="flex flex-wrap gap-2">
                <button @click="selectedDifficulty = 'all'" :class="[
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    selectedDifficulty === 'all'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]" style="border: none; cursor: pointer;">
                    All Levels
                </button>
                <button @click="selectedDifficulty = 'beginner'" :class="[
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    selectedDifficulty === 'beginner'
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                ]" style="border: none; cursor: pointer;">
                    Beginner 🌱
                </button>
                <button @click="selectedDifficulty = 'intermediate'" :class="[
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    selectedDifficulty === 'intermediate'
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                ]" style="border: none; cursor: pointer;">
                    Intermediate 💪
                </button>
                <button @click="selectedDifficulty = 'advanced'" :class="[
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    selectedDifficulty === 'advanced'
                        ? 'bg-red-500 text-white shadow-md'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                ]" style="border: none; cursor: pointer;">
                    Advanced 🔥
                </button>
            </div>
        </div>

        <!-- Workouts Section -->
        <div>
            <div v-if="filteredWorkouts.length === 0" class="text-center py-12">
                <p class="text-lg" style="color: var(--text-secondary);">No workouts found for this filter.</p>
            </div>
            <div v-else class="flex flex-col gap-4">
                <router-link v-for="workout in filteredWorkouts" :key="workout.id"
                    :to="{ name: 'workout-details', params: { id: workout.id } }"
                    class="flex items-center gap-4 p-5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer no-underline"
                    style="background-color: var(--card-bg); color: var(--text-primary);">
                    <div class="text-4xl shrink-0">{{ workout.icon }}</div>
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold mb-2" style="color: var(--text-primary);">{{ workout.name }}
                        </h3>
                        <p class="text-sm mb-3" style="color: var(--text-secondary);">{{ workout.description }}</p>
                        <div class="flex gap-4 text-sm">
                            <span class="flex items-center gap-1" style="color: var(--text-secondary);">
                                <IconClock :size="16" /> {{ workout.duration }} min
                            </span>
                            <span :class="[
                                'px-3 py-1 rounded-full font-medium text-xs',
                                workout.difficulty === 'beginner' ? 'bg-green-100 text-green-700' : '',
                                workout.difficulty === 'intermediate' ? 'bg-orange-100 text-orange-700' : '',
                                workout.difficulty === 'advanced' ? 'bg-red-100 text-red-700' : ''
                            ]">
                                {{ workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1) }}
                            </span>
                        </div>
                    </div>
                    <div style="color: var(--text-tertiary);">
                        <IconChevronRight :size="24" />
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { IconChevronRight, IconClock } from '@tabler/icons-vue';
import { useWorkoutStore } from '../stores/index.js';

const workoutStore = useWorkoutStore();
const selectedCategory = ref('all');
const selectedDifficulty = ref('all');

const categories = [
    { value: 'full-body', label: 'Full Body', icon: '🚀' },
    { value: 'chest', label: 'Chest', icon: '💪' },
    { value: 'back', label: 'Back', icon: '🏋️' },
    { value: 'legs', label: 'Legs', icon: '🦵' },
    { value: 'core', label: 'Core', icon: '⭐' },
    { value: 'cardio', label: 'Cardio', icon: '🏃' },
    { value: 'arms', label: 'Arms', icon: '💪' },
    { value: 'shoulders', label: 'Shoulders', icon: '⛰️' },
    { value: 'upper-body', label: 'Upper Body', icon: '💪' },
    { value: 'lower-body', label: 'Lower Body', icon: '🔥' },
    { value: 'flexibility', label: 'Flexibility', icon: '🧘' },
    { value: 'strength', label: 'Strength', icon: '🏋️' },
];

const workouts = computed(() => workoutStore.workouts);

const filteredWorkouts = computed(() => {
    let filtered = workouts.value;

    // Filter by category
    if (selectedCategory.value !== 'all') {
        filtered = filtered.filter(w => w.category === selectedCategory.value);
    }

    // Filter by difficulty
    if (selectedDifficulty.value !== 'all') {
        filtered = filtered.filter(w => w.difficulty === selectedDifficulty.value);
    }

    return filtered;
});

onMounted(async () => {
    await workoutStore.loadWorkouts();
});
</script>
