<template>
    <div class="min-h-screen bg-gray-50">
        <div v-if="workout" class="max-w-3xl mx-auto p-4">
            <!-- Header Section -->
            <div class="bg-white p-8 rounded-2xl text-center mb-6 shadow-sm">
                <button @click="goBack"
                    class="bg-gray-100 hover:bg-gray-200 border-none px-4 py-2 rounded-lg cursor-pointer text-sm mb-4 transition-colors">
                    <IconArrowLeft :size="20" class="inline" /> Back
                </button>
                <div class="text-6xl mb-4">{{ workout.icon }}</div>
                <h1 class="text-3xl font-bold mb-2 text-gray-800">{{ workout.name }}</h1>
                <p class="text-gray-600 mb-6">{{ workout.description }}</p>

                <div class="flex justify-center gap-8 pt-6 border-t border-gray-200">
                    <div class="flex flex-col items-center gap-1">
                        <span class="text-indigo-600">
                            <IconClock :size="24" />
                        </span>
                        <span class="text-2xl font-bold text-gray-800">{{ workout.duration }}</span>
                        <span class="text-xs text-gray-400 uppercase">minutes</span>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <span class="text-orange-500">
                            <IconFlame :size="24" />
                        </span>
                        <span class="text-2xl font-bold text-gray-800">{{ workout.calories }}</span>
                        <span class="text-xs text-gray-400 uppercase">calories</span>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <span class="text-blue-600">
                            <IconChartBar :size="24" />
                        </span>
                        <span class="text-2xl font-bold text-gray-800">{{ workout.difficulty }}</span>
                        <span class="text-xs text-gray-400 uppercase">level</span>
                    </div>
                </div>
            </div>

            <!-- Exercises List -->
            <div class="bg-white p-6 rounded-2xl mb-6 shadow-sm">
                <h2 class="text-xl font-bold mb-4 text-gray-800">Exercises ({{ workout.exercises.length }})</h2>

                <div class="flex flex-col gap-4">
                    <div v-for="(exercise, index) in workout.exercises" :key="index"
                        class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div
                            class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                            {{ index + 1 }}
                        </div>
                        <div class="flex-1">
                            <h3 class="text-base font-semibold mb-1 text-gray-800">{{ exercise.name }}</h3>
                            <p class="text-sm text-gray-600 m-0">
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
            <div v-if="workout.equipment.length > 0" class="bg-white p-6 rounded-2xl mb-6 shadow-sm">
                <h2 class="text-xl font-bold mb-4 text-gray-800">Equipment Needed</h2>
                <div class="flex flex-wrap gap-2">
                    <span v-for="(item, index) in workout.equipment" :key="index"
                        class="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                        {{ item }}
                    </span>
                </div>
            </div>

            <!-- Tips Section -->
            <div v-if="workout.tips.length > 0" class="bg-white p-6 rounded-2xl mb-6 shadow-sm">
                <h2 class="text-xl font-bold mb-4 text-gray-800">
                    <IconBulb :size="20" class="inline" /> Tips
                </h2>
                <ul class="m-0 pl-6">
                    <li v-for="(tip, index) in workout.tips" :key="index" class="text-gray-600 mb-2 leading-relaxed">
                        {{ tip }}
                    </li>
                </ul>
            </div>

            <!-- Start Button -->
            <div class="sticky bottom-4 p-4 bg-white rounded-2xl shadow-lg">
                <button @click="startWorkout"
                    class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none px-4 py-4 rounded-xl text-lg font-bold cursor-pointer hover:-translate-y-0.5 hover:shadow-xl transition-all">
                    Start Workout
                    <IconArrowRight :size="20" class="inline" />
                </button>
            </div>
        </div>

        <div v-else class="text-center p-8 text-gray-600">
            <p>Loading workout details...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IconArrowLeft, IconArrowRight, IconClock, IconFlame, IconChartBar, IconBulb } from '@tabler/icons-vue';

const route = useRoute();
const router = useRouter();

const workout = ref(null);

// Sample workout data (in a real app, this would come from a database/API)
const workoutsData = {
    1: {
        id: 1,
        name: 'Morning Yoga',
        description: 'Start your day with energizing yoga poses to improve flexibility and mindfulness',
        duration: 20,
        calories: 150,
        difficulty: 'Beginner',
        icon: '🧘',
        equipment: ['Yoga mat'],
        exercises: [
            { name: 'Child\'s Pose', duration: 60, icon: '🙏' },
            { name: 'Downward Dog', duration: 45, icon: '🐕' },
            { name: 'Cat-Cow Stretch', reps: 10, sets: 2, icon: '🐱' },
            { name: 'Warrior Pose', duration: 30, sets: 2, icon: '⚔️' },
            { name: 'Tree Pose', duration: 30, sets: 2, icon: '🌳' },
            { name: 'Seated Forward Bend', duration: 60, icon: '🧘‍♀️' }
        ],
        tips: [
            'Focus on your breathing throughout the practice',
            'Don\'t push yourself too hard - yoga is about listening to your body',
            'Use a yoga mat for better grip and comfort'
        ]
    },
    2: {
        id: 2,
        name: 'HIIT Cardio',
        description: 'High intensity interval training for fat burning and cardiovascular fitness',
        duration: 30,
        calories: 400,
        difficulty: 'Advanced',
        icon: '🔥',
        equipment: [],
        exercises: [
            { name: 'Jumping Jacks', duration: 45, sets: 3, icon: '🤸' },
            { name: 'Burpees', reps: 15, sets: 3, icon: '💪' },
            { name: 'Mountain Climbers', duration: 45, sets: 3, icon: '⛰️' },
            { name: 'High Knees', duration: 45, sets: 3, icon: '🦵' },
            { name: 'Jump Squats', reps: 20, sets: 3, icon: '🏋️' },
            { name: 'Sprint in Place', duration: 30, sets: 3, icon: '🏃' }
        ],
        tips: [
            'Warm up for 5 minutes before starting',
            'Rest 30 seconds between sets',
            'Stay hydrated throughout the workout',
            'Cool down with light stretching'
        ]
    },
    3: {
        id: 3,
        name: 'Strength Training',
        description: 'Build muscle and strength with targeted bodyweight exercises',
        duration: 45,
        calories: 300,
        difficulty: 'Intermediate',
        icon: '💪',
        equipment: ['Dumbbells (optional)', 'Pull-up bar'],
        exercises: [
            { name: 'Push-ups', reps: 15, sets: 4, icon: '💪' },
            { name: 'Pull-ups', reps: 10, sets: 3, icon: '🏋️' },
            { name: 'Squats', reps: 20, sets: 4, icon: '🦵' },
            { name: 'Lunges', reps: 12, sets: 3, icon: '🚶' },
            { name: 'Plank', duration: 60, sets: 3, icon: '🏊' },
            { name: 'Dips', reps: 12, sets: 3, icon: '💪' }
        ],
        tips: [
            'Focus on proper form over number of reps',
            'Rest 60-90 seconds between sets',
            'Increase resistance gradually as you get stronger'
        ]
    },
    4: {
        id: 4,
        name: 'Core Workout',
        description: 'Strengthen your core muscles for better posture and stability',
        duration: 15,
        calories: 120,
        difficulty: 'Beginner',
        icon: '⭐',
        equipment: ['Exercise mat'],
        exercises: [
            { name: 'Crunches', reps: 20, sets: 3, icon: '💫' },
            { name: 'Bicycle Crunches', reps: 15, sets: 3, icon: '🚴' },
            { name: 'Plank', duration: 45, sets: 3, icon: '🏊' },
            { name: 'Russian Twists', reps: 20, sets: 3, icon: '🔄' },
            { name: 'Leg Raises', reps: 12, sets: 3, icon: '🦵' }
        ],
        tips: [
            'Keep your lower back pressed to the floor during exercises',
            'Breathe out when contracting your abs',
            'Quality over quantity - focus on engaging your core'
        ]
    },
    5: {
        id: 5,
        name: 'Full Body Stretch',
        description: 'Improve flexibility, reduce muscle tension, and aid recovery',
        duration: 25,
        calories: 80,
        difficulty: 'Beginner',
        icon: '🌟',
        equipment: ['Yoga mat', 'Stretching strap (optional)'],
        exercises: [
            { name: 'Neck Rolls', duration: 30, icon: '🔄' },
            { name: 'Shoulder Stretch', duration: 30, sets: 2, icon: '💪' },
            { name: 'Hamstring Stretch', duration: 45, sets: 2, icon: '🦵' },
            { name: 'Quad Stretch', duration: 30, sets: 2, icon: '🦿' },
            { name: 'Hip Flexor Stretch', duration: 45, sets: 2, icon: '🧘' },
            { name: 'Spinal Twist', duration: 45, sets: 2, icon: '🌀' }
        ],
        tips: [
            'Never bounce while stretching',
            'Hold each stretch for at least 30 seconds',
            'Breathe deeply and relax into each stretch',
            'Don\'t push to the point of pain'
        ]
    },
    6: {
        id: 6,
        name: 'Running Intervals',
        description: 'Boost cardiovascular endurance with structured interval running',
        duration: 40,
        calories: 450,
        difficulty: 'Intermediate',
        icon: '🏃',
        equipment: ['Running shoes', 'Water bottle'],
        exercises: [
            { name: 'Warm-up Jog', duration: 300, icon: '🚶' },
            { name: 'Sprint', duration: 60, sets: 6, icon: '💨' },
            { name: 'Recovery Jog', duration: 120, sets: 6, icon: '🏃' },
            { name: 'Tempo Run', duration: 300, icon: '🏃‍♂️' },
            { name: 'Cool Down Walk', duration: 300, icon: '🚶‍♂️' }
        ],
        tips: [
            'Start with a proper warm-up to prevent injury',
            'Maintain good running form throughout',
            'Alternate between high and low intensity',
            'Track your progress over time'
        ]
    }
};

onMounted(() => {
    const workoutId = route.params.id;
    workout.value = workoutsData[workoutId] || null;
});

const goBack = () => {
    router.back();
};

const startWorkout = () => {
    router.push({ name: 'workout-timer', params: { id: route.params.id } });
};
</script>
