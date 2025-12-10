<template>
    <div class="min-h-screen" style="background-color: var(--bg-secondary);">
        <div v-if="workout" class="max-w-3xl mx-auto p-4">
            <!-- Header Section -->
            <div class="p-8 rounded-2xl text-center mb-6 shadow-sm" style="background-color: var(--card-bg);">
                <button @click="goBack"
                    class="border-none px-4 py-2 rounded-lg cursor-pointer text-sm mb-4 transition-colors"
                    style="background-color: var(--bg-tertiary); color: var(--text-primary);">
                    <IconArrowLeft :size="20" class="inline" /> Back
                </button>
                <div class="text-6xl mb-4">{{ workout.icon }}</div>
                <h1 class="text-3xl font-bold mb-2" style="color: var(--text-primary);">{{ workout.name }}</h1>
                <p class="mb-6" style="color: var(--text-secondary);">{{ workout.description }}</p>

                <div class="flex justify-center gap-8 pt-6 border-t" style="border-color: var(--border-color);">
                    <div class="flex flex-col items-center gap-1">
                        <span class="text-indigo-600">
                            <IconClock :size="24" />
                        </span>
                        <span class="text-2xl font-bold" style="color: var(--text-primary);">{{ workout.duration
                        }}</span>
                        <span class="text-xs uppercase" style="color: var(--text-tertiary);">minutes</span>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <span class="text-orange-500">
                            <IconFlame :size="24" />
                        </span>
                        <span class="text-2xl font-bold" style="color: var(--text-primary);">{{ workout.calories
                        }}</span>
                        <span class="text-xs uppercase" style="color: var(--text-tertiary);">calories</span>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <span class="text-blue-600">
                            <IconChartBar :size="24" />
                        </span>
                        <span class="text-2xl font-bold" style="color: var(--text-primary);">{{ workout.difficulty
                        }}</span>
                        <span class="text-xs uppercase" style="color: var(--text-tertiary);">level</span>
                    </div>
                </div>
            </div>

            <!-- Exercises List -->
            <div class="p-6 rounded-2xl mb-6 shadow-sm" style="background-color: var(--card-bg);">
                <h2 class="text-xl font-bold mb-4" style="color: var(--text-primary);">Exercises ({{
                    workout.exercises.length }})</h2>

                <div class="flex flex-col gap-4">
                    <div v-for="(exercise, index) in workout.exercises" :key="index"
                        class="flex items-center gap-4 p-4 rounded-xl transition-colors"
                        style="background-color: var(--bg-secondary);">
                        <div
                            class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                            {{ index + 1 }}
                        </div>
                        <div class="flex-1">
                            <h3 class="text-base font-semibold mb-1" style="color: var(--text-primary);">{{
                                exercise.name }}</h3>
                            <p class="text-sm m-0" style="color: var(--text-secondary);">
                                <span v-if="exercise.reps">{{ exercise.reps }} reps</span>
                                <span v-else-if="exercise.duration">{{ exercise.duration }} seconds</span>
                                <span v-if="exercise.sets"> × {{ exercise.sets }} sets</span>
                            </p>
                        </div>
                        <div class="text-2xl flex-shrink-0">{{ exercise.icon }}</div>
                    </div>
                </div>
            </div>

            <!-- Equipment Section -->
            <div v-if="workout.equipment.length > 0" class="p-6 rounded-2xl mb-6 shadow-sm"
                style="background-color: var(--card-bg);">
                <h2 class="text-xl font-bold mb-4" style="color: var(--text-primary);">Equipment Needed</h2>
                <div class="flex flex-wrap gap-2">
                    <span v-for="(item, index) in workout.equipment" :key="index"
                        class="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                        {{ item }}
                    </span>
                </div>
            </div>

            <!-- Tips Section -->
            <div v-if="workout.tips.length > 0" class="p-6 rounded-2xl mb-6 shadow-sm"
                style="background-color: var(--card-bg);">
                <h2 class="text-xl font-bold mb-4" style="color: var(--text-primary);">
                    <IconBulb :size="20" class="inline" /> Tips
                </h2>
                <ul class="m-0 pl-6">
                    <li v-for="(tip, index) in workout.tips" :key="index" class="mb-2 leading-relaxed"
                        style="color: var(--text-secondary);">
                        {{ tip }}
                    </li>
                </ul>
            </div>

            <!-- Start Button -->
            <div class="sticky bottom-4 p-4 rounded-2xl shadow-lg" style="background-color: var(--card-bg);">
                <button @click="startWorkout"
                    class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none px-4 py-4 rounded-xl text-lg font-bold cursor-pointer hover:-translate-y-0.5 hover:shadow-xl transition-all">
                    Start Workout
                    <IconArrowRight :size="20" class="inline" />
                </button>
            </div>
        </div>

        <div v-else class="text-center p-8" style="color: var(--text-secondary);">
            <p>Loading workout details...</p>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IconArrowLeft, IconArrowRight, IconClock, IconFlame, IconChartBar, IconBulb } from '@tabler/icons-vue';
import { useWorkoutStore } from '../stores/index.js';

const route = useRoute();
const router = useRouter();
const workoutStore = useWorkoutStore();

const workout = computed(() => workoutStore.currentWorkout);

onMounted(async () => {
    const workoutId = parseInt(route.params.id);
    await workoutStore.loadWorkout(workoutId);
});

const goBack = () => {
    router.back();
};

const startWorkout = () => {
    router.push({ name: 'workout-timer', params: { id: route.params.id } });
};
</script>
