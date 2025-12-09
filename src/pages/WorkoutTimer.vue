<template>
    <div class="min-h-screen bg-white text-gray-800 p-4">
        <div v-if="workout" class="max-w-2xl mx-auto">
            <!-- Progress Bar -->
            <div class="bg-gray-100 h-2 rounded-full overflow-hidden mb-8">
                <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
                    :style="{ width: progressPercentage + '%' }">
                </div>
            </div>

            <!-- Header -->
            <div class="flex items-center justify-between mb-4">
                <button @click="handleExit"
                    class="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-800 transition-colors">
                    <IconX :size="24" />
                </button>
                <h2 class="text-xl font-medium flex-1 text-center">{{ workout.name }}</h2>
                <div class="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600">
                    <span>{{ currentExerciseIndex + 1 }} / {{ workout.exercises.length }}</span>
                </div>
            </div>

            <!-- Get Ready Countdown Overlay -->
            <div v-if="showGetReady"
                class="fixed inset-0 bg-black opacity-90 flex flex-col items-center justify-center text-white z-50 animate-fade-in">
                <div class="text-center">
                    <div class="mb-4 flex justify-center">
                        <IconStretching :size="80" stroke-width="1.5" />
                    </div>
                    <h2 class="text-3xl font-bold mb-4">Get Ready!</h2>
                    <div class="text-8xl font-bold mb-4">{{ getReadyTimeRemaining }}</div>
                    <p class="text-xl">Next: {{ currentExercise.name }}</p>
                </div>
            </div>

            <!-- Rest Display Overlay -->
            <div v-if="isResting"
                class="fixed inset-0 bg-indigo-500 bg-opacity-95 flex flex-col items-center justify-center text-white z-50 animate-fade-in">
                <div class="text-center">
                    <div class="mb-4 flex justify-center">
                        <IconBed :size="80" stroke-width="1.5" />
                    </div>
                    <h2 class="text-3xl font-bold mb-4">Rest Time</h2>
                    <div class="text-7xl font-bold mb-8">{{ formatTime(restTimeRemaining) }}</div>
                    <button @click="skipRest"
                        class="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto">
                        Skip
                        <IconPlayerSkipForward :size="20" />
                    </button>
                </div>
            </div>

            <!-- Exercise Video/Icon Section (Top) -->
            <div class="bg-white text-center mb-6 flex items-center justify-center min-h-[300px]">
                <div v-if="currentExercise.videoUrl" class="w-full max-w-2xl aspect-video">
                    <iframe :src="getEmbedUrl(currentExercise.videoUrl)" class="w-full h-full rounded-lg"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                </div>
                <div v-else class="text-8xl">{{ currentExercise.icon }}</div>
            </div>

            <!-- Exercise Title -->
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold mb-2 text-gray-800">{{ currentExercise.name }}</h1>
                <div v-if="currentExercise.sets > 1" class="text-base text-gray-400 mt-1">
                    Set {{ currentSet }} of {{ currentExercise.sets }}
                </div>
            </div>

            <!-- Timer Section -->
            <div class="text-center mb-12 py-8">
                <!-- Timer Display -->
                <div v-if="timerMode === 'countdown'" class="flex flex-col items-center">
                    <div class="text-8xl font-bold leading-none text-gray-800">{{ formatTime(timeRemaining) }}</div>
                    <div class="text-sm text-gray-400 mt-2 uppercase tracking-wider">seconds remaining</div>
                </div>

                <!-- Reps Display -->
                <div v-else class="flex flex-col items-center">
                    <div class="text-8xl font-bold leading-none text-gray-800">{{ currentExercise.reps }}</div>
                    <div class="text-sm text-gray-400 mt-2 uppercase tracking-wider">repetitions</div>
                </div>
            </div>



            <!-- Control Buttons (Bottom) -->
            <div class="fixed bottom-24 left-1/2 -translate-x-1/2 flex justify-center gap-4 z-10">
                <button v-if="!workoutStarted" @click="startWorkout"
                    class="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:-translate-y-0.5 hover:shadow-lg transition-all active:translate-y-0">
                    <IconPlayerPlay :size="32" fill="white" />
                </button>

                <template v-else>
                    <button v-if="currentExerciseIndex > 0" @click="previousExercise"
                        class="w-16 h-16 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center hover:-translate-y-0.5 hover:shadow-md transition-all active:translate-y-0">
                        <IconChevronLeft :size="28" />
                    </button>

                    <button v-if="!isResting" @click="togglePause"
                        class="w-16 h-16 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center hover:-translate-y-0.5 hover:shadow-md transition-all active:translate-y-0">
                        <IconPlayerPlay v-if="isPaused" :size="28" />
                        <IconPlayerPause v-else :size="28" />
                    </button>

                    <button @click="goToNextExercise"
                        class="w-16 h-16 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center hover:-translate-y-0.5 hover:shadow-md transition-all active:translate-y-0">
                        <IconCheck v-if="isLastExercise" :size="28" />
                        <IconChevronRight v-else :size="28" />
                    </button>
                </template>
            </div>

            <!-- Next Exercise Info -->
            <div v-if="nextExercise && workoutStarted && !showGetReady"
                class="fixed bottom-3 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-200">
                <div class="flex items-center gap-2 text-sm">
                    <span class="text-gray-500">Next:</span>
                    <span class="font-semibold text-gray-800">{{ nextExercise.name }}</span>
                    <span class="text-xl">{{ nextExercise.icon }}</span>
                </div>
            </div>
        </div>

        <!-- Completion Modal -->
        <div v-if="showCompletion"
            class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div class="bg-white text-gray-800 p-12 rounded-3xl text-center max-w-lg w-full">
                <div class="mb-4 flex justify-center">
                    <IconConfetti :size="80" stroke-width="1.5" />
                </div>
                <h1 class="text-3xl font-bold mb-2">Workout Complete!</h1>
                <p class="text-gray-600 mb-8">Great job! You've finished {{ workout.name }}</p>

                <div class="flex justify-center gap-8 mb-8 p-8 bg-gray-50 rounded-2xl">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-indigo-600">{{ workout.duration }}</div>
                        <div class="text-xs text-gray-400 uppercase tracking-wider mt-1">Minutes</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-indigo-600">{{ workout.calories }}</div>
                        <div class="text-xs text-gray-400 uppercase tracking-wider mt-1">Calories</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-indigo-600">{{ workout.exercises.length }}</div>
                        <div class="text-xs text-gray-400 uppercase tracking-wider mt-1">Exercises</div>
                    </div>
                </div>

                <div class="flex gap-4">
                    <button @click="goToWorkouts"
                        class="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-4 px-6 rounded-xl font-bold hover:-translate-y-0.5 transition-transform">
                        Workouts
                    </button>
                    <button @click="restartWorkout"
                        class="flex-1 bg-gray-100 text-gray-800 py-4 px-6 rounded-xl font-bold hover:-translate-y-0.5 transition-transform">
                        Restart
                    </button>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IconX, IconBed, IconPlayerPlay, IconPlayerPause, IconChevronLeft, IconChevronRight, IconCheck, IconConfetti, IconPlayerSkipForward, IconStretching } from '@tabler/icons-vue';

const route = useRoute();
const router = useRouter();

const workout = ref(null);
const currentExerciseIndex = ref(0);
const currentSet = ref(1);
const workoutStarted = ref(false);
const isPaused = ref(false);
const isResting = ref(false);
const showGetReady = ref(false);
const timeRemaining = ref(0);
const restTimeRemaining = ref(0);
const getReadyTimeRemaining = ref(15);
const showCompletion = ref(false);

let timerInterval = null;

// Sample workout data (same as WorkoutDetails)
const workoutsData = {
    1: {
        id: 1,
        name: 'Morning Yoga',
        duration: 20,
        calories: 150,
        icon: '🧘',
        exercises: [
            {
                name: 'Child\'s Pose', duration: 60,
                videoUrl: "https://www.youtube.com/watch?v=Fcbw82ykBvY",
                icon: '🙏', sets: 1
            },
            { name: 'Downward Dog', duration: 45, icon: '🐕', sets: 1 },
            { name: 'Cat-Cow Stretch', reps: 10, sets: 2, icon: '🐱' },
            { name: 'Warrior Pose', duration: 30, sets: 2, icon: '⚔️' },
            { name: 'Tree Pose', duration: 30, sets: 2, icon: '🌳' },
            { name: 'Seated Forward Bend', duration: 60, icon: '🧘‍♀️', sets: 1 }
        ]
    },
    2: {
        id: 2,
        name: 'HIIT Cardio',
        duration: 30,
        calories: 400,
        icon: '🔥',
        exercises: [
            { name: 'Jumping Jacks', duration: 45, sets: 3, icon: '🤸' },
            { name: 'Burpees', reps: 15, sets: 3, icon: '💪' },
            { name: 'Mountain Climbers', duration: 45, sets: 3, icon: '⛰️' },
            { name: 'High Knees', duration: 45, sets: 3, icon: '🦵' },
            { name: 'Jump Squats', reps: 20, sets: 3, icon: '🏋️' },
            { name: 'Sprint in Place', duration: 30, sets: 3, icon: '🏃' }
        ]
    },
    3: {
        id: 3,
        name: 'Strength Training',
        duration: 45,
        calories: 300,
        icon: '💪',
        exercises: [
            { name: 'Push-ups', reps: 15, sets: 4, icon: '💪' },
            { name: 'Pull-ups', reps: 10, sets: 3, icon: '🏋️' },
            { name: 'Squats', reps: 20, sets: 4, icon: '🦵' },
            { name: 'Lunges', reps: 12, sets: 3, icon: '🚶' },
            { name: 'Plank', duration: 60, sets: 3, icon: '🏊' },
            { name: 'Dips', reps: 12, sets: 3, icon: '💪' }
        ]
    },
    4: {
        id: 4,
        name: 'Core Workout',
        duration: 15,
        calories: 120,
        icon: '⭐',
        exercises: [
            { name: 'Crunches', reps: 20, sets: 3, icon: '💫' },
            { name: 'Bicycle Crunches', reps: 15, sets: 3, icon: '🚴' },
            { name: 'Plank', duration: 45, sets: 3, icon: '🏊' },
            { name: 'Russian Twists', reps: 20, sets: 3, icon: '🔄' },
            { name: 'Leg Raises', reps: 12, sets: 3, icon: '🦵' }
        ]
    },
    5: {
        id: 5,
        name: 'Full Body Stretch',
        duration: 25,
        calories: 80,
        icon: '🌟',
        exercises: [
            { name: 'Neck Rolls', duration: 30, icon: '🔄', sets: 1 },
            { name: 'Shoulder Stretch', duration: 30, sets: 2, icon: '💪' },
            { name: 'Hamstring Stretch', duration: 45, sets: 2, icon: '🦵' },
            { name: 'Quad Stretch', duration: 30, sets: 2, icon: '🦿' },
            { name: 'Hip Flexor Stretch', duration: 45, sets: 2, icon: '🧘' },
            { name: 'Spinal Twist', duration: 45, sets: 2, icon: '🌀' }
        ]
    },
    6: {
        id: 6,
        name: 'Running Intervals',
        duration: 40,
        calories: 450,
        icon: '🏃',
        exercises: [
            { name: 'Warm-up Jog', duration: 300, icon: '🚶', sets: 1 },
            { name: 'Sprint', duration: 60, sets: 6, icon: '💨' },
            { name: 'Recovery Jog', duration: 120, sets: 6, icon: '🏃' },
            { name: 'Tempo Run', duration: 300, icon: '🏃‍♂️', sets: 1 },
            { name: 'Cool Down Walk', duration: 300, icon: '🚶‍♂️', sets: 1 }
        ]
    }
};

const currentExercise = computed(() => {
    return workout.value?.exercises[currentExerciseIndex.value] || {};
});

const nextExercise = computed(() => {
    if (!workout.value) return null;

    // If there are more sets for current exercise
    if (currentSet.value < currentExercise.value.sets) {
        return null; // Same exercise, just another set
    }

    // If there's a next exercise
    const nextIndex = currentExerciseIndex.value + 1;
    if (nextIndex < workout.value.exercises.length) {
        return workout.value.exercises[nextIndex];
    }

    return null; // No next exercise (last one)
});

const timerMode = computed(() => {
    return currentExercise.value.duration ? 'countdown' : 'reps';
});

const isLastExercise = computed(() => {
    return currentExerciseIndex.value === workout.value.exercises.length - 1 &&
        currentSet.value === currentExercise.value.sets;
});

const progressPercentage = computed(() => {
    if (!workout.value) return 0;
    const totalExercises = workout.value.exercises.length;
    return ((currentExerciseIndex.value + 1) / totalExercises) * 100;
});

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const getEmbedUrl = (url) => {
    if (!url) return '';

    // Convert YouTube watch URL to embed URL
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/;
    const match = url.match(youtubeRegex);

    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
    }

    return url;
};

const startWorkout = () => {
    workoutStarted.value = true;
    showGetReady.value = true;
    getReadyTimeRemaining.value = 15;
    startTimer();
};

const startTimer = () => {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (isPaused.value) return;

        if (showGetReady.value) {
            getReadyTimeRemaining.value--;
            if (getReadyTimeRemaining.value <= 0) {
                showGetReady.value = false;
                if (timerMode.value === 'countdown') {
                    timeRemaining.value = currentExercise.value.duration;
                }
            }
        } else if (isResting.value) {
            restTimeRemaining.value--;
            if (restTimeRemaining.value <= 0) {
                isResting.value = false;
                if (timerMode.value === 'countdown') {
                    timeRemaining.value = currentExercise.value.duration;
                }
            }
        } else if (timerMode.value === 'countdown') {
            timeRemaining.value--;
            if (timeRemaining.value <= 0) {
                handleExerciseComplete();
            }
        }
    }, 1000);
};

const handleExerciseComplete = () => {
    if (currentSet.value < currentExercise.value.sets) {
        // More sets remaining
        currentSet.value++;
        startRest();
    } else {
        // Move to next exercise
        if (!isLastExercise.value) {
            currentExerciseIndex.value++;
            currentSet.value = 1;
            startRest();
        } else {
            completeWorkout();
        }
    }
};

const startRest = () => {
    isResting.value = true;
    restTimeRemaining.value = 10; // 10 seconds rest
};

const goToNextExercise = () => {
    if (isLastExercise.value) {
        completeWorkout();
    } else {
        currentExerciseIndex.value++;
        currentSet.value = 1;
        isResting.value = false;

        if (timerMode.value === 'countdown') {
            timeRemaining.value = currentExercise.value.duration;
        }
    }
};

const previousExercise = () => {
    if (currentExerciseIndex.value > 0) {
        currentExerciseIndex.value--;
        currentSet.value = 1;
        isResting.value = false;

        if (timerMode.value === 'countdown') {
            timeRemaining.value = currentExercise.value.duration;
        }
    }
};

const togglePause = () => {
    isPaused.value = !isPaused.value;
};

const skipRest = () => {
    isResting.value = false;
    if (timerMode.value === 'countdown') {
        timeRemaining.value = currentExercise.value.duration;
    }
};

const completeWorkout = () => {
    if (timerInterval) clearInterval(timerInterval);
    showCompletion.value = true;
};

const restartWorkout = () => {
    showCompletion.value = false;
    currentExerciseIndex.value = 0;
    currentSet.value = 1;
    workoutStarted.value = false;
    isPaused.value = false;
    isResting.value = false;

    if (timerMode.value === 'countdown') {
        timeRemaining.value = currentExercise.value.duration;
    }
};

const goToWorkouts = () => {
    router.push({ name: 'workouts' });
};

const handleExit = () => {
    if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
        router.back();
    }
};

onMounted(() => {
    const workoutId = route.params.id;
    workout.value = workoutsData[workoutId] || null;

    if (workout.value && timerMode.value === 'countdown') {
        timeRemaining.value = currentExercise.value.duration;
    }
});

onUnmounted(() => {
    if (timerInterval) clearInterval(timerInterval);
});

watch(workoutStarted, (started) => {
    if (started && timerMode.value === 'countdown') {
        startTimer();
    }
});
</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
}
</style>
