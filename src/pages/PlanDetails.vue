<template>
    <div class="p-6 max-w-4xl mx-auto" style="background-color: var(--bg-primary);">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center min-h-screen">
            <div class="text-xl" style="color: var(--text-secondary);">Loading plan...</div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="flex justify-center items-center min-h-screen">
            <div class="text-xl text-red-600">{{ error }}</div>
        </div>

        <!-- Plan Details -->
        <div v-else-if="plan">
            <!-- Header -->
            <div class="mb-8">
                <button @click="goBack" class="mb-4 flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                    style="color: var(--text-secondary);">
                    <IconArrowLeft :size="20" />
                    <span>Back to Workouts</span>
                </button>

                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                        <h1 class="text-4xl font-bold mb-3" style="color: var(--text-primary);">{{ plan.name }}</h1>
                        <p class="text-lg mb-4" style="color: var(--text-secondary);">{{ plan.description }}</p>
                    </div>
                    <div class="text-5xl ml-4">📅</div>
                </div>

                <!-- Plan Stats -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div class="p-4 rounded-lg" style="background-color: var(--card-bg);">
                        <div class="text-sm mb-1" style="color: var(--text-secondary);">Duration</div>
                        <div class="text-2xl font-bold" style="color: var(--text-primary);">{{ plan.duration }} days
                        </div>
                    </div>
                    <div class="p-4 rounded-lg" style="background-color: var(--card-bg);">
                        <div class="text-sm mb-1" style="color: var(--text-secondary);">Progress</div>
                        <div class="text-2xl font-bold" style="color: var(--text-primary);">{{ completedDays.length }} /
                            {{ plan.duration }}
                        </div>
                    </div>
                    <div class="p-4 rounded-lg" style="background-color: var(--card-bg);">
                        <div class="text-sm mb-1" style="color: var(--text-secondary);">Difficulty</div>
                        <div class="text-2xl font-bold capitalize" style="color: var(--text-primary);">{{
                            plan.difficulty }}</div>
                    </div>
                    <div class="p-4 rounded-lg" style="background-color: var(--card-bg);">
                        <div class="text-sm mb-1" style="color: var(--text-secondary);">Days/Week</div>
                        <div class="text-2xl font-bold" style="color: var(--text-primary);">{{
                            plan.schedule?.daysPerWeek || 0 }}</div>
                    </div>
                </div>

                <!-- Progression Summary -->
                <div v-if="progressionSummary"
                    class="p-5 rounded-lg mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                    <div class="text-sm font-bold mb-3" style="color: var(--text-primary);">📈 Progressive Training
                    </div>
                    <div class="grid grid-cols-3 gap-4 text-xs">
                        <div>
                            <div class="text-gray-600 mb-1">Duration</div>
                            <div class="font-bold text-blue-700">{{ progressionSummary.duration.start }}m → {{
                                progressionSummary.duration.end }}m</div>
                        </div>
                        <div>
                            <div class="text-gray-600 mb-1">Sets</div>
                            <div class="font-bold text-purple-700">{{ progressionSummary.sets.start }} → {{
                                progressionSummary.sets.end }}</div>
                        </div>
                        <div>
                            <div class="text-gray-600 mb-1">Reps</div>
                            <div class="font-bold text-pink-700">{{ progressionSummary.reps.start }} → {{
                                progressionSummary.reps.end }}</div>
                        </div>
                    </div>
                    <div class="mt-3 text-xs text-gray-600">
                        <span class="font-medium">Progression Type:</span>
                        <span class="capitalize bg-white px-2 py-1 rounded">{{ progressionSummary.type }}</span>
                    </div>
                </div>
            </div>

            <!-- Vertical Timeline -->
            <div class="mb-8">
                <h2 class="text-2xl font-bold mb-6" style="color: var(--text-primary);">Program Timeline</h2>

                <div class="relative">
                    <!-- Timeline Line -->
                    <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
                        style="opacity: 0.3;"></div>

                    <!-- Timeline Items -->
                    <div class="space-y-8">
                        <div v-for="(item, index) in timeline" :key="index" class="relative flex gap-6">
                            <!-- Timeline Dot -->
                            <div class="flex-shrink-0 relative">
                                <div :class="[
                                    'w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold relative z-10',
                                    item.type === 'workout' ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg' :
                                        item.type === 'rest' ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-white' :
                                            'bg-gradient-to-br from-green-500 to-green-600 text-white'
                                ]">
                                    {{ item.type === 'workout' ? item.dayNumber : item.type === 'rest' ? '💤' : '🎯' }}
                                </div>
                            </div>

                            <!-- Timeline Content -->
                            <div class="flex-1 pb-8">
                                <div v-if="item.type === 'workout'" @click="handleWorkoutClick(item)" :class="[
                                    'p-6 rounded-xl shadow-md transition-all',
                                    isDayUnlocked(item.dayNumber) ? 'hover:shadow-lg cursor-pointer' : 'opacity-50 cursor-not-allowed',
                                    isDayCompleted(item.dayNumber) ? 'border-2 border-green-500' : ''
                                ]" style="background-color: var(--card-bg);">
                                    <div class="flex items-start justify-between mb-3">
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2 mb-1">
                                                <div class="text-xs font-medium" style="color: var(--text-secondary);">
                                                    Day {{ item.dayNumber }}
                                                </div>
                                                <span v-if="isDayCompleted(item.dayNumber)"
                                                    class="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">
                                                    ✓ Completed
                                                </span>
                                                <span v-else-if="!isDayUnlocked(item.dayNumber)"
                                                    class="px-2 py-1 rounded bg-gray-200 text-gray-600 text-xs font-bold">
                                                    🔒 Locked
                                                </span>
                                            </div>
                                            <h3 class="text-xl font-bold mb-2" style="color: var(--text-primary);">{{
                                                item.workout.name }}</h3>
                                            <p class="text-sm mb-3" style="color: var(--text-secondary);">{{
                                                item.workout.description }}</p>
                                        </div>
                                        <div class="text-4xl ml-4">{{ item.workout.icon }}</div>
                                    </div>
                                    <div class="flex flex-wrap gap-3 text-sm">
                                        <span class="flex items-center gap-1" style="color: var(--text-secondary);">
                                            <IconClock :size="16" /> {{ item.workout.duration }} min
                                        </span>
                                        <span class="flex items-center gap-1" style="color: var(--text-secondary);">
                                            <IconFlame :size="16" /> {{ item.workout.calories }} cal
                                        </span>
                                        <span v-if="item.workout.progressiveStats"
                                            class="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium">
                                            {{ item.workout.progressiveStats.sets }} sets
                                        </span>
                                        <span v-if="item.workout.progressiveStats"
                                            class="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-medium">
                                            {{ item.workout.progressiveStats.reps }} reps
                                        </span>
                                        <span :class="[
                                            'px-3 py-1 rounded-full font-medium text-xs',
                                            item.workout.difficulty === 'beginner' ? 'bg-green-100 text-green-700' : '',
                                            item.workout.difficulty === 'intermediate' ? 'bg-orange-100 text-orange-700' : '',
                                            item.workout.difficulty === 'advanced' ? 'bg-red-100 text-red-700' : ''
                                        ]">
                                            {{ item.workout.difficulty }}
                                        </span>
                                    </div>
                                </div>

                                <div v-else-if="item.type === 'rest'" @click="handleRestDayClick(item.dayNumber)"
                                    :class="[
                                        'p-6 rounded-xl shadow-md transition-all',
                                        isDayUnlocked(item.dayNumber) ? 'hover:shadow-lg cursor-pointer' : 'opacity-50 cursor-not-allowed',
                                        isDayCompleted(item.dayNumber) ? 'border-2 border-green-500' : ''
                                    ]" style="background-color: var(--card-bg);">
                                    <div class="flex items-center gap-2 mb-1">
                                        <div class="text-xs font-medium" style="color: var(--text-secondary);">
                                            Day {{ item.dayNumber }}
                                        </div>
                                        <span v-if="isDayCompleted(item.dayNumber)"
                                            class="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">
                                            ✓ Completed
                                        </span>
                                        <span v-else-if="!isDayUnlocked(item.dayNumber)"
                                            class="px-2 py-1 rounded bg-gray-200 text-gray-600 text-xs font-bold">
                                            🔒 Locked
                                        </span>
                                        <span v-else
                                            class="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                                            Click to mark complete
                                        </span>
                                    </div>
                                    <h3 class="text-xl font-bold mb-2" style="color: var(--text-primary);">Rest Day</h3>
                                    <p class="text-sm" style="color: var(--text-secondary);">Take a break and let your
                                        muscles recover</p>
                                </div>

                                <div v-else-if="item.type === 'milestone'"
                                    class="p-6 rounded-xl shadow-md border-2 border-green-500"
                                    style="background-color: var(--card-bg);">
                                    <div class="text-xs font-medium mb-1 text-green-600">
                                        Day {{ item.dayNumber }} • Milestone
                                    </div>
                                    <h3 class="text-xl font-bold mb-2" style="color: var(--text-primary);">{{
                                        item.title }}</h3>
                                    <p class="text-sm text-green-600">{{ item.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Start Program Button -->
            <div class="sticky bottom-6 flex justify-center">
                <button @click="startProgram"
                    class="px-8 py-4 rounded-full text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    {{ lastCompletedDay > 0 ? `Continue - Day ${lastCompletedDay + 1}` : 'Start This Program' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IconArrowLeft, IconClock, IconFlame } from '@tabler/icons-vue';
import { useProgramStore, useWorkoutStore, useAuthStore } from '../stores/index.js';
import { workoutGeneratorService, planProgressService } from '../services/db.js';

const route = useRoute();
const router = useRouter();
const programStore = useProgramStore();
const workoutStore = useWorkoutStore();
const authStore = useAuthStore();

const loading = ref(true);
const error = ref(null);
const plan = ref(null);
const timeline = ref([]);
const progressionSummary = ref(null);
const completedDays = ref([]);
const lastCompletedDay = ref(0);

// Computed: Calculate total workout days
const totalWorkouts = computed(() => {
    if (!plan.value) return 0;
    const daysPerWeek = plan.value.schedule?.daysPerWeek || 3;
    const totalWeeks = Math.ceil(plan.value.duration / 7);
    return Math.min(daysPerWeek * totalWeeks, plan.value.duration);
});

// Generate timeline with progressive workouts, rest days, and milestones
async function generateTimeline() {
    if (!plan.value) return;

    const items = [];
    const daysPerWeek = plan.value.schedule?.daysPerWeek || 3;
    let workoutDayCounter = 0;
    let totalWorkoutDays = 0;

    for (let day = 1; day <= plan.value.duration; day++) {
        const dayInWeek = ((day - 1) % 7) + 1;
        const isWorkoutDay = workoutDayCounter < daysPerWeek;

        if (isWorkoutDay) {
            totalWorkoutDays++;
            try {
                // Generate progressive workout for this specific day
                const workout = await workoutGeneratorService.generateWorkoutForDay(plan.value.id, totalWorkoutDays);
                items.push({
                    type: 'workout',
                    dayNumber: day,
                    workout: workout
                });
            } catch (err) {
                console.error(`Error generating workout for day ${day}:`, err);
            }
            workoutDayCounter++;
        } else {
            items.push({
                type: 'rest',
                dayNumber: day
            });
        }

        // Reset weekly counter
        if (dayInWeek === 7) {
            workoutDayCounter = 0;
        }

        // Add milestones
        if (day === 7) {
            items.push({
                type: 'milestone',
                dayNumber: day,
                title: 'Week 1 Complete!',
                description: 'Great start! Keep up the momentum.'
            });
        } else if (day === 14) {
            items.push({
                type: 'milestone',
                dayNumber: day,
                title: 'Week 2 Complete!',
                description: 'You\'re building consistency!'
            });
        } else if (day === 21) {
            items.push({
                type: 'milestone',
                dayNumber: day,
                title: '3 Weeks Done!',
                description: 'You\'re forming a habit. Amazing progress!'
            });
        } else if (day === plan.value.duration) {
            items.push({
                type: 'milestone',
                dayNumber: day,
                title: 'Program Complete! 🎉',
                description: 'Congratulations on finishing the program!'
            });
        }
    }

    timeline.value = items;
}

onMounted(async () => {
    try {
        loading.value = true;
        const planId = parseInt(route.params.id);

        // Load programs
        await programStore.loadPrograms();

        // Get the specific program
        plan.value = programStore.programs.find(p => p.id === planId);

        if (!plan.value) {
            error.value = 'Plan not found';
            return;
        }

        // Load user's completed days for this plan
        if (authStore.currentUser?.id) {
            completedDays.value = await planProgressService.getPlanProgress(authStore.currentUser.id, planId);
            lastCompletedDay.value = await planProgressService.getLastCompletedDay(authStore.currentUser.id, planId);
        }

        // Get progression summary
        progressionSummary.value = await workoutGeneratorService.getProgressionSummary(planId);

        // Generate the timeline with progressive workouts
        await generateTimeline();

    } catch (err) {
        console.error('Error loading plan:', err);
        error.value = 'Failed to load plan details';
    } finally {
        loading.value = false;
    }
});

const goBack = () => {
    router.push({ name: 'workouts' });
};

const isDayCompleted = (dayNumber) => {
    return completedDays.value.some(day => day.dayNumber === dayNumber);
};

const isDayUnlocked = (dayNumber) => {
    // Day 1 is always unlocked
    if (dayNumber === 1) return true;

    // A day is unlocked if the previous day is completed
    return isDayCompleted(dayNumber - 1);
};

const handleRestDayClick = async (dayNumber) => {
    if (!isDayUnlocked(dayNumber)) {
        alert(`Please complete Day ${dayNumber - 1} first to unlock this rest day.`);
        return;
    }

    if (isDayCompleted(dayNumber)) {
        alert('This rest day is already completed!');
        return;
    }

    // Mark rest day as complete
    if (authStore.currentUser?.id && plan.value?.id) {
        try {
            await planProgressService.completePlanDay(
                authStore.currentUser.id,
                plan.value.id,
                dayNumber,
                { duration: 0, caloriesBurned: 0 }
            );

            // Reload completed days
            completedDays.value = await planProgressService.getPlanProgress(authStore.currentUser.id, plan.value.id);
            lastCompletedDay.value = await planProgressService.getLastCompletedDay(authStore.currentUser.id, plan.value.id);

            alert('Rest day marked as complete! 💤');
        } catch (error) {
            console.error('Failed to mark rest day as complete:', error);
            alert('Failed to mark rest day as complete. Please try again.');
        }
    } else {
        alert('Please log in to track your progress.');
    }
};

const handleWorkoutClick = (item) => {
    if (!isDayUnlocked(item.dayNumber)) {
        alert(`Please complete Day ${item.dayNumber - 1} first to unlock this workout.`);
        return;
    }
    goToWorkout(item.workout, item.dayNumber);
};

const goToWorkout = (workout, dayNumber) => {
    // Store the generated workout and plan info in sessionStorage
    const workoutData = {
        ...workout,
        planId: plan.value.id,
        planDayNumber: dayNumber
    };
    sessionStorage.setItem('currentWorkout', JSON.stringify(workoutData));

    // Navigate to workout timer with the workout ID
    router.push({
        name: 'workout-timer',
        params: { id: workout.id },
        query: { generated: 'true', planId: plan.value.id, dayNumber: dayNumber }
    });
};

const startProgram = () => {
    if (lastCompletedDay.value > 0) {
        const nextDay = lastCompletedDay.value + 1;
        const nextWorkout = timeline.value.find(item => item.type === 'workout' && item.dayNumber === nextDay);

        if (nextWorkout) {
            goToWorkout(nextWorkout.workout, nextDay);
        } else {
            alert(`Great job! You've completed ${lastCompletedDay.value} days. Continue with the next available workout.`);
        }
    } else {
        // Start from day 1
        const firstWorkout = timeline.value.find(item => item.type === 'workout' && item.dayNumber === 1);
        if (firstWorkout) {
            goToWorkout(firstWorkout.workout, 1);
        }
    }
};
</script>

<style scoped>
/* Timeline animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.space-y-8>div {
    animation: fadeInUp 0.5sease-out;
}
</style>
