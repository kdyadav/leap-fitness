<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div class="max-w-7xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Workout History</h1>

            <!-- Workout Stats Section -->
            <div v-if="workoutStats" class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Stats</h2>
                <div class="grid grid-cols-4 gap-2.5 sm:grid-cols-2">
                    <div
                        class="bg-white dark:bg-gray-800 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-center transition-all hover:-translate-y-0.5 hover:shadow-lg">
                        <div class="text-2xl mb-1.5">🏋️</div>
                        <div class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-0.5">{{
                            workoutStats.totalWorkouts }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Total Workouts</div>
                    </div>
                    <div
                        class="bg-white dark:bg-gray-800 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-center transition-all hover:-translate-y-0.5 hover:shadow-lg">
                        <div class="text-2xl mb-1.5">⏱️</div>
                        <div class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-0.5">{{
                            workoutStats.totalDuration }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Minutes Trained</div>
                    </div>
                    <div
                        class="bg-white dark:bg-gray-800 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-center transition-all hover:-translate-y-0.5 hover:shadow-lg">
                        <div class="text-2xl mb-1.5">🔥</div>
                        <div class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-0.5">{{
                            workoutStats.totalCalories }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Calories Burned</div>
                    </div>
                    <div
                        class="bg-white dark:bg-gray-800 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-center transition-all hover:-translate-y-0.5 hover:shadow-lg">
                        <div class="text-2xl mb-1.5">📊</div>
                        <div class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-0.5">{{
                            workoutStats.averageDuration }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Avg Duration (min)</div>
                    </div>
                </div>
            </div>

            <!-- Incomplete Workouts Section -->
            <div v-if="incompleteWorkouts.length > 0" class="border-l-4 border-amber-500 pl-4 mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Incomplete Workouts</h2>
                <div class="flex flex-col gap-3">
                    <div v-for="workout in incompleteWorkouts" :key="workout.id"
                        class="bg-gradient-to-r from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-800 p-4 rounded-xl border border-amber-200 dark:border-amber-700 flex justify-between items-center transition-all hover:translate-x-1 hover:shadow-md">
                        <div class="flex-1">
                            <div class="text-base font-semibold text-gray-900 dark:text-white mb-2">{{
                                getWorkoutName(workout.workoutId) }}</div>
                            <div class="flex gap-3 items-center">
                                <span
                                    class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200">
                                    Incomplete
                                </span>
                                <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatLogDate(workout.endedAt
                                    || workout.startedAt) }}</span>
                            </div>
                            <div v-if="workout.completionPercentage"
                                class="mt-3 bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full relative overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
                                    :style="{ width: workout.completionPercentage + '%' }">
                                </div>
                                <span
                                    class="absolute -top-5 right-0 text-xs text-gray-500 dark:text-gray-400 font-medium">{{
                                        Math.round(workout.completionPercentage) }}%
                                    complete</span>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 items-end">
                            <div class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                <span class="text-base">⏱️</span>
                                <span>{{ workout.duration || 0 }} min</span>
                            </div>
                            <div class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                <span class="text-base">✓</span>
                                <span>{{ workout.exercisesCompleted }}/{{ workout.totalExercises }}</span>
                            </div>
                            <div class="flex gap-2 mt-2">
                                <button @click="resumeWorkout(workout.workoutId, workout.id)"
                                    class="px-4 py-2 bg-gradient-to-br from-amber-500 to-amber-400 text-white border-0 rounded-lg text-sm font-semibold cursor-pointer flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/30 hover:from-amber-600 hover:to-amber-500 active:translate-y-0"
                                    title="Resume workout">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                    Resume
                                </button>
                                <button @click="deleteIncompleteWorkout(workout.id)"
                                    class="p-2 bg-gray-100 dark:bg-gray-700 text-red-500 border border-red-200 dark:border-red-900/50 rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center transition-all min-w-[40px] hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-500 hover:-translate-y-0.5 hover:shadow-md hover:shadow-red-500/20 active:translate-y-0"
                                    title="Delete workout">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path
                                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Completed Workouts Section -->
            <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Completed Workouts</h2>
                <div v-if="logsLoading" class="text-center p-8 text-gray-500 dark:text-gray-400">Loading workout
                    history...</div>
                <div v-else-if="workoutLogs.length === 0"
                    class="text-center py-12 px-4 text-gray-500 dark:text-gray-400">
                    <div class="text-5xl mb-4">📝</div>
                    <p>No workout history yet</p>
                    <p class="text-sm mt-2">Start your fitness journey today!</p>
                </div>
                <div v-else class="flex flex-col gap-3">
                    <div v-for="log in workoutLogs" :key="log.id"
                        class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex justify-between items-center transition-all hover:translate-x-1 hover:shadow-md">
                        <div class="flex-1">
                            <div class="text-base font-semibold text-gray-900 dark:text-white mb-2">{{ log.workoutName
                                }}</div>
                            <div class="flex gap-3 items-center">
                                <span class="px-3 py-1 rounded-full text-xs font-semibold capitalize" :class="{
                                    'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200': log.workoutDifficulty?.toLowerCase() === 'beginner',
                                    'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200': log.workoutDifficulty?.toLowerCase() === 'intermediate',
                                    'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200': log.workoutDifficulty?.toLowerCase() === 'advanced'
                                }">
                                    {{ log.workoutDifficulty }}
                                </span>
                                <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatLogDate(log.date)
                                    }}</span>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 items-end">
                            <div class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                <span class="text-base">⏱️</span>
                                <span>{{ log.duration }} min</span>
                            </div>
                            <div class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                <span class="text-base">🔥</span>
                                <span>{{ log.caloriesBurned }} cal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useWorkoutLogStore, useUserWorkoutStore, useWorkoutStore } from '@/stores';

const router = useRouter();
const workoutLogStore = useWorkoutLogStore();
const userWorkoutStore = useUserWorkoutStore();
const workoutStore = useWorkoutStore();

const workoutLogs = computed(() => workoutLogStore.workoutLogs);
const workoutStats = computed(() => workoutLogStore.workoutStats);
const logsLoading = computed(() => workoutLogStore.logsLoading);
const incompleteWorkouts = computed(() => userWorkoutStore.incompleteWorkouts);

const getWorkoutName = (workoutId) => {
    const workout = workoutStore.workouts.find(w => w.id === workoutId);
    return workout?.name || 'Workout';
};

const formatLogDate = (date) => {
    if (!date) return 'N/A';
    const logDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if it's today
    if (logDate.toDateString() === today.toDateString()) {
        return 'Today';
    }
    // Check if it's yesterday
    if (logDate.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }
    // Otherwise show the date
    return logDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: logDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
};

const resumeWorkout = (workoutId, sessionId) => {
    router.push({
        name: 'workout-timer',
        params: { id: workoutId },
        query: { resume: 'true', sessionId: sessionId }
    });
};

const deleteIncompleteWorkout = async (sessionId) => {
    if (confirm('Are you sure you want to delete this incomplete workout?')) {
        try {
            await userWorkoutStore.deleteUserWorkoutSession(sessionId);
        } catch (error) {
            console.error('Failed to delete incomplete workout:', error);
        }
    }
};

onMounted(async () => {
    await workoutLogStore.loadUserWorkoutLogs();
    await workoutLogStore.loadUserWorkoutStats();
    await userWorkoutStore.loadUserWorkouts();
    await workoutStore.loadWorkouts();
});
</script>
