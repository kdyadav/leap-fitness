<template>
    <div v-if="show"
        class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50 animate-fade-in">
        <div class="bg-white text-gray-800 p-12 rounded-3xl text-center max-w-lg w-full">
            <div class="mb-4 flex justify-center">
                <IconConfetti :size="80" stroke-width="1.5" />
            </div>
            <h1 class="text-3xl font-bold mb-2">Workout Complete!</h1>
            <p class="text-gray-600 mb-8">Great job! You've finished {{ workoutName }}</p>

            <div class="flex justify-center gap-8 mb-8 p-8 bg-gray-50 rounded-2xl">
                <div class="text-center">
                    <div class="text-3xl font-bold text-indigo-600">{{ duration }}</div>
                    <div class="text-xs text-gray-400 uppercase tracking-wider mt-1">Minutes</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-indigo-600">{{ calories }}</div>
                    <div class="text-xs text-gray-400 uppercase tracking-wider mt-1">Calories</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-indigo-600">{{ exerciseCount }}</div>
                    <div class="text-xs text-gray-400 uppercase tracking-wider mt-1">Exercises</div>
                </div>
            </div>

            <div class="flex gap-4">
                <button @click="$emit('go-to-workouts')"
                    class="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-4 px-6 rounded-xl font-bold hover:-translate-y-0.5 transition-transform">
                    Workouts
                </button>
                <button @click="$emit('restart')"
                    class="flex-1 bg-gray-100 text-gray-800 py-4 px-6 rounded-xl font-bold hover:-translate-y-0.5 transition-transform">
                    Restart
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { IconConfetti } from '@tabler/icons-vue';

defineProps({
    show: {
        type: Boolean,
        required: true
    },
    workoutName: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    exerciseCount: {
        type: Number,
        required: true
    }
});

defineEmits(['go-to-workouts', 'restart']);
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
