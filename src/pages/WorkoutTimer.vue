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
                <div class="flex items-center gap-2">
                    <button @click="showSettings = true"
                        class="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-800 transition-colors">
                        <IconSettings :size="20" />
                    </button>
                    <button @click="toggleMusic"
                        class="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-800 transition-colors"
                        :class="{ 'bg-indigo-500 text-white': isMusicEnabled }">
                        <IconMusic v-if="isMusicEnabled" :size="20" />
                        <IconMusicOff v-else :size="20" />
                    </button>
                    <button @click="toggleVoice"
                        class="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-800 transition-colors"
                        :class="{ 'bg-indigo-500 text-white': isVoiceEnabled }">
                        <IconVolume v-if="isVoiceEnabled" :size="20" />
                        <IconVolumeOff v-else :size="20" />
                    </button>
                    <div class="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600">
                        <span>{{ currentExerciseIndex + 1 }} / {{ workout.exercises.length }}</span>
                    </div>
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
                    <div class="text-8xl font-bold mb-8">{{ getReadyTimeRemaining }}</div>
                    <p class="text-xl mb-6">Next: {{ currentExercise.name }}</p>
                    <button @click="skipGetReady"
                        class="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto">
                        Skip
                        <IconPlayerSkipForward :size="20" />
                    </button>
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
            <div class="fixed bottom-24 left-1/2 -translate-x-1/2 flex justify-center gap-4 z-1">
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
                class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 bg-opacity-60 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <div class="flex items-center gap-2 text-sm">
                    <span class="text-gray-300">Next:</span>
                    <span class="font-semibold text-white">{{ nextExercise.name }}</span>
                </div>
            </div>
        </div>

        <!-- Settings Modal -->
        <div v-if="showSettings"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in"
            @click.self="showSettings = false">
            <div class="bg-white text-gray-800 p-8 rounded-3xl max-w-md w-full">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold">Settings</h2>
                    <button @click="showSettings = false"
                        class="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                        <IconX :size="20" />
                    </button>
                </div>

                <!-- Music Selection -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
                        <IconMusic :size="20" />
                        Background Music
                    </h3>
                    <div class="space-y-2">
                        <label v-for="music in musicOptions" :key="music.id"
                            class="flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all"
                            :class="selectedMusic === music.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'">
                            <input type="radio" :value="music.id" v-model="selectedMusic" @change="changeMusicTrack"
                                class="w-4 h-4 text-indigo-600" />
                            <span class="ml-3 text-sm font-medium">{{ music.name }}</span>
                        </label>
                    </div>
                </div>

                <!-- Coach Voice Selection -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
                        <IconVolume :size="20" />
                        Coach Voice
                    </h3>
                    <div class="space-y-2">
                        <label v-for="voice in coachVoiceOptions" :key="voice.id"
                            class="flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all"
                            :class="selectedVoice === voice.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'">
                            <input type="radio" :value="voice.id" v-model="selectedVoice" @change="testVoice(voice)"
                                class="w-4 h-4 text-indigo-600" />
                            <div class="ml-3">
                                <div class="text-sm font-medium">{{ voice.name }}</div>
                                <div class="text-xs text-gray-500">{{ voice.description }}</div>
                            </div>
                        </label>
                    </div>
                </div>

                <button @click="showSettings = false"
                    class="w-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:-translate-y-0.5 transition-transform">
                    Done
                </button>
            </div>
        </div>

        <!-- Completion Modal -->
        <WorkoutCompletionModal :show="showCompletion" :workout-name="workout?.name || ''"
            :duration="workout?.duration || 0" :calories="workout?.calories || 0"
            :exercise-count="workout?.exercises?.length || 0" @go-to-workouts="goToWorkouts"
            @restart="restartWorkout" />

    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IconX, IconBed, IconPlayerPlay, IconPlayerPause, IconChevronLeft, IconChevronRight, IconCheck, IconPlayerSkipForward, IconStretching, IconVolume, IconVolumeOff, IconMusic, IconMusicOff, IconSettings } from '@tabler/icons-vue';
import { useWorkoutMusic, musicOptions, coachVoiceOptions } from '../composables/useWorkoutMusic';
import WorkoutCompletionModal from '../components/workout/WorkoutCompletionModal.vue';
import { workoutsData } from '../data/workouts';

const route = useRoute();
const router = useRouter();

// Music and voice composable
const {
    isMusicEnabled,
    isVoiceEnabled,
    selectedMusic,
    selectedVoice,
    playBackgroundMusic,
    stopBackgroundMusic,
    pauseBackgroundMusic,
    resumeBackgroundMusic,
    toggleMusic: toggleMusicComposable,
    toggleVoice: toggleVoiceComposable,
    changeMusicTrack: changeMusicTrackComposable,
    speak,
    testVoice,
    cleanup
} = useWorkoutMusic();

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
const showSettings = ref(false);

let timerInterval = null;

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
    playBackgroundMusic();
    speak('Get ready for your workout!');
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
                speak(`Start ${currentExercise.value.name}`);
            } else if (getReadyTimeRemaining.value <= 3) {
                speak(getReadyTimeRemaining.value.toString());
            }
        } else if (isResting.value) {
            restTimeRemaining.value--;
            if (restTimeRemaining.value <= 0) {
                isResting.value = false;
                if (timerMode.value === 'countdown') {
                    timeRemaining.value = currentExercise.value.duration;
                }
                speak(`Start ${currentExercise.value.name}`);
            } else if (restTimeRemaining.value <= 3) {
                speak(restTimeRemaining.value.toString());
            }
        } else if (timerMode.value === 'countdown') {
            timeRemaining.value--;
            if (timeRemaining.value <= 5 && timeRemaining.value > 0) {
                speak(timeRemaining.value.toString());
            }
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
    speak('Rest time');
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
    if (isPaused.value) {
        pauseBackgroundMusic();
    } else {
        resumeBackgroundMusic();
    }
};

const skipRest = () => {
    isResting.value = false;
    if (timerMode.value === 'countdown') {
        timeRemaining.value = currentExercise.value.duration;
    }
};

const skipGetReady = () => {
    showGetReady.value = false;
    getReadyTimeRemaining.value = 0;
    if (timerMode.value === 'countdown') {
        timeRemaining.value = currentExercise.value.duration;
    }
    speak(`Start ${currentExercise.value.name}`);
};

const completeWorkout = () => {
    if (timerInterval) clearInterval(timerInterval);
    showCompletion.value = true;
    stopBackgroundMusic();
    speak('Workout complete! Great job!');
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
        stopBackgroundMusic();
        router.back();
    }
};

const toggleMusic = () => {
    toggleMusicComposable(workoutStarted.value, isPaused.value);
};

const toggleVoice = () => {
    toggleVoiceComposable();
};

const changeMusicTrack = () => {
    changeMusicTrackComposable(workoutStarted.value, isPaused.value);
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
    cleanup();
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
