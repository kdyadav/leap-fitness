<template>
    <div class="min-h-screen pb-20" style="background-color: var(--bg-primary);">
        <div class="max-w-2xl mx-auto relative">
            <!-- Cover Background -->
            <div class="h-45 relative overflow-hidden rounded-b-3xl">
                <div class="cover-gradient w-full h-full"></div>
            </div>

            <!-- Profile Header -->
            <div class="text-center -mt-15 px-6 mb-8">
                <div class="relative inline-block mb-4">
                    <div class="avatar w-30 h-30 rounded-full flex items-center justify-center shadow-xl border-5 relative z-2"
                        style="border-color: var(--bg-primary);">
                        <span class="text-5xl font-bold text-white uppercase">{{ userInitials }}</span>
                    </div>
                    <div class="avatar-ring absolute -top-2 -left-2 -right-2 -bottom-2 rounded-full border-3 opacity-30"
                        style="border-color: var(--accent-color);"></div>
                </div>
                <h1 class="text-3xl font-bold mb-1" style="color: var(--text-primary);">{{ user?.name || 'User' }}</h1>
                <p class="text-lg font-medium mb-2" style="color: var(--accent-color);">@{{ user?.username || 'user' }}
                </p>
                <p class="text-sm mb-3" style="color: var(--text-secondary);">{{ user?.email || 'N/A' }}</p>
                <button @click="showProfileForm = !showProfileForm"
                    class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                    style="background-color: var(--accent-color); color: white;">
                    {{ showProfileForm ? '✕ Cancel' : '✏️ Edit Profile' }}
                </button>
            </div>

            <!-- Profile Edit Form -->
            <div v-if="showProfileForm" class="px-6 mb-8">
                <div class="p-6 rounded-2xl border transition-all duration-300"
                    style="background-color: var(--card-bg); border-color: var(--border-color);">
                    <h3 class="text-lg font-bold mb-4" style="color: var(--text-primary);">✏️ Edit Profile</h3>
                    <form @submit.prevent="handleUpdateProfile" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold mb-2" style="color: var(--text-primary);">
                                Full Name
                            </label>
                            <input v-model="profileForm.name" type="text" required
                                class="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:border-[var(--accent-color)]"
                                style="background-color: var(--bg-primary); border-color: var(--border-color); color: var(--text-primary);"
                                placeholder="Enter your full name">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-2" style="color: var(--text-primary);">
                                Username
                            </label>
                            <input v-model="profileForm.username" type="text" required
                                class="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:border-[var(--accent-color)]"
                                style="background-color: var(--bg-primary); border-color: var(--border-color); color: var(--text-primary);"
                                placeholder="Enter your username">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-2" style="color: var(--text-primary);">
                                Age
                            </label>
                            <input v-model.number="profileForm.age" type="number" min="1" max="120"
                                class="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:border-[var(--accent-color)]"
                                style="background-color: var(--bg-primary); border-color: var(--border-color); color: var(--text-primary);"
                                placeholder="Enter your age">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-2" style="color: var(--text-primary);">
                                Gender
                            </label>
                            <select v-model="profileForm.gender"
                                class="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:border-[var(--accent-color)]"
                                style="background-color: var(--bg-primary); border-color: var(--border-color); color: var(--text-primary);">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <button type="submit"
                            class="w-full py-3 rounded-xl font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                            style="background-color: var(--accent-color); color: white;">
                            💾 Save Profile
                        </button>
                    </form>
                </div>
            </div>

            <!-- Current Stats Overview -->
            <div class="px-6 mb-8">
                <div class="p-6 rounded-2xl border"
                    style="background-color: var(--card-bg); border-color: var(--border-color);">
                    <h2 class="text-lg font-bold mb-4" style="color: var(--text-primary);">Current Stats</h2>
                    <div class="flex flex-row gap-4 justify-around">
                        <div class="text-center">
                            <div class="text-3xl mb-2">🎂</div>
                            <div class="text-2xl font-bold" style="color: var(--text-primary);">{{ user?.age || '-' }}
                            </div>
                            <div class="text-xs uppercase tracking-wider mt-1" style="color: var(--text-secondary);">
                                Years</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl mb-2">⚖️</div>
                            <div class="text-2xl font-bold" style="color: var(--text-primary);">{{ user?.weight || '-'
                            }}</div>
                            <div class="text-xs uppercase tracking-wider mt-1" style="color: var(--text-secondary);">kg
                            </div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl mb-2">📏</div>
                            <div class="text-2xl font-bold" style="color: var(--text-primary);">{{ user?.height || '-'
                            }}</div>
                            <div class="text-xs uppercase tracking-wider mt-1" style="color: var(--text-secondary);">cm
                            </div>
                        </div>
                    </div>

                    <!-- Update Button -->
                    <button @click="showMetricsForm = !showMetricsForm"
                        class="w-full mt-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                        style="background-color: var(--accent-color); color: white;">
                        {{ showMetricsForm ? '✕ Cancel' : '📝 Update Metrics' }}
                    </button>
                </div>
            </div>

            <!-- Metrics Update Form -->
            <div v-if="showMetricsForm" class="px-6 mb-8">
                <div class="p-6 rounded-2xl border transition-all duration-300"
                    style="background-color: var(--card-bg); border-color: var(--border-color);">
                    <h3 class="text-lg font-bold mb-4" style="color: var(--text-primary);">Update Your Metrics</h3>
                    <form @submit.prevent="handleSubmitMetrics" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold mb-2" style="color: var(--text-primary);">
                                Weight (kg)
                            </label>
                            <input v-model.number="metricsForm.weight" type="number" step="0.1" required
                                class="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:border-[var(--accent-color)]"
                                style="background-color: var(--bg-primary); border-color: var(--border-color); color: var(--text-primary);"
                                placeholder="Enter your weight">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-2" style="color: var(--text-primary);">
                                Height (cm)
                            </label>
                            <input v-model.number="metricsForm.height" type="number" step="0.1" required
                                class="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:border-[var(--accent-color)]"
                                style="background-color: var(--bg-primary); border-color: var(--border-color); color: var(--text-primary);"
                                placeholder="Enter your height">
                        </div>
                        <button type="submit"
                            class="w-full py-3 rounded-xl font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                            style="background-color: var(--accent-color); color: white;">
                            💾 Save Metrics
                        </button>
                    </form>
                </div>
            </div>

            <!-- Health Analysis -->
            <div v-if="healthMetrics && user?.weight && user?.height" class="px-6 mb-8">
                <h2 class="text-xl font-bold mb-4" style="color: var(--text-primary);">📊 Health Analysis</h2>

                <!-- BMI & Ideal Weight -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div class="p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg"
                        style="background-color: var(--card-bg); border-color: var(--border-color);">
                        <div class="flex items-center justify-between mb-3">
                            <div class="text-sm font-semibold" style="color: var(--text-secondary);">Body Mass Index
                            </div>
                            <div class="text-3xl">📊</div>
                        </div>
                        <div class="text-4xl font-bold mb-3" style="color: var(--text-primary);">{{ healthMetrics.bmi }}
                        </div>
                        <div class="px-3 py-1.5 rounded-full text-sm font-semibold text-white inline-block"
                            :style="{ backgroundColor: healthMetrics.bmiColor }">
                            {{ healthMetrics.bmiCategory }}
                        </div>
                    </div>

                    <div v-if="healthMetrics.idealWeight"
                        class="p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg"
                        style="background-color: var(--card-bg); border-color: var(--border-color);">
                        <div class="flex items-center justify-between mb-3">
                            <div class="text-sm font-semibold" style="color: var(--text-secondary);">Ideal Weight</div>
                            <div class="text-3xl">🎯</div>
                        </div>
                        <div class="text-3xl font-bold mb-2" style="color: var(--text-primary);">
                            {{ healthMetrics.idealWeight.min }} - {{ healthMetrics.idealWeight.max }} kg
                        </div>
                        <div class="text-xs" style="color: var(--text-secondary);">Healthy BMI range (18.5-24.9)</div>
                    </div>
                </div>

                <!-- Additional Health Metrics -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div v-if="healthMetrics.bodyFat"
                        class="p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg text-center"
                        style="background-color: var(--card-bg); border-color: var(--border-color);">
                        <div class="text-2xl mb-2">💪</div>
                        <div class="text-sm font-semibold mb-1" style="color: var(--text-secondary);">Body Fat</div>
                        <div class="text-3xl font-bold" style="color: var(--text-primary);">{{ healthMetrics.bodyFat }}%
                        </div>
                        <div class="text-xs mt-1" style="color: var(--text-secondary);">Estimated</div>
                    </div>

                    <div v-if="healthMetrics.bmr"
                        class="p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg text-center"
                        style="background-color: var(--card-bg); border-color: var(--border-color);">
                        <div class="text-2xl mb-2">🔥</div>
                        <div class="text-sm font-semibold mb-1" style="color: var(--text-secondary);">BMR</div>
                        <div class="text-3xl font-bold" style="color: var(--text-primary);">{{ healthMetrics.bmr }}
                        </div>
                        <div class="text-xs mt-1" style="color: var(--text-secondary);">cal/day at rest</div>
                    </div>

                    <div v-if="healthMetrics.calorieNeeds"
                        class="p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg text-center"
                        style="background-color: var(--card-bg); border-color: var(--border-color);">
                        <div class="text-2xl mb-2">🍽️</div>
                        <div class="text-sm font-semibold mb-1" style="color: var(--text-secondary);">Daily Needs</div>
                        <div class="text-3xl font-bold" style="color: var(--text-primary);">{{
                            healthMetrics.calorieNeeds.moderate }}</div>
                        <div class="text-xs mt-1" style="color: var(--text-secondary);">cal/day (moderate)</div>
                    </div>
                </div>
            </div>

            <!-- Progress Tracking -->
            <div v-if="progressData.length > 0" class="px-6 mb-8">
                <div class="p-6 rounded-2xl border"
                    style="background-color: var(--card-bg); border-color: var(--border-color);">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-xl font-bold" style="color: var(--text-primary);">📈 Progress Tracking</h2>
                        <div class="flex gap-2 p-1 rounded-lg" style="background-color: var(--bg-primary);">
                            <button @click="viewMode = 'weekly'"
                                class="px-3 py-1.5 rounded text-sm font-semibold transition-all duration-300"
                                :style="viewMode === 'weekly' ? 'background-color: var(--accent-color); color: white;' : 'color: var(--text-secondary);'">
                                Weekly
                            </button>
                            <button @click="viewMode = 'monthly'"
                                class="px-3 py-1.5 rounded text-sm font-semibold transition-all duration-300"
                                :style="viewMode === 'monthly' ? 'background-color: var(--accent-color); color: white;' : 'color: var(--text-secondary);'">
                                Monthly
                            </button>
                        </div>
                    </div>
                    <div class="h-80">
                        <Line :data="chartData" :options="chartOptions" />
                    </div>
                </div>
            </div>

            <!-- Database Management -->
            <div class="px-6 mb-8">
                <div class="p-6 rounded-2xl border"
                    style="background-color: var(--card-bg); border-color: var(--border-color);">
                    <h2 class="text-lg font-bold mb-4" style="color: var(--text-primary);">🗄️ Database Management</h2>
                    <div class="space-y-3">
                        <button @click="handleResetDatabase"
                            class="w-full flex items-center justify-center gap-3 p-4 bg-transparent border-2 border-orange-500 text-orange-500 rounded-xl text-sm font-bold cursor-pointer transition-all duration-300 hover:bg-orange-500 hover:text-white hover:-translate-y-0.5 hover:shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <polyline points="23 4 23 10 17 10"></polyline>
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                            </svg>
                            Reset Database (Keep User Data)
                        </button>
                        <button @click="handleClearDatabase"
                            class="w-full flex items-center justify-center gap-3 p-4 bg-transparent border-2 border-red-600 text-red-600 rounded-xl text-sm font-bold cursor-pointer transition-all duration-300 hover:bg-red-600 hover:text-white hover:-translate-y-0.5 hover:shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path
                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                </path>
                            </svg>
                            Clear Entire Database
                        </button>
                        <p class="text-xs text-center mt-2" style="color: var(--text-secondary);">
                            ⚠️ Warning: These actions cannot be undone
                        </p>
                    </div>
                </div>
            </div>

            <!-- Logout -->
            <div class="px-6 mb-8">
                <button @click="handleLogout"
                    class="w-full flex items-center justify-center gap-3 p-5 bg-transparent border-2 border-red-500 text-red-500 rounded-2xl text-lg font-bold cursor-pointer transition-all duration-300 hover:bg-red-500 hover:text-white hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';
import { healthMetricsService } from '@/services/db';
import { Line } from 'vue-chartjs';
import { clearDatabase } from '@/utils/clearDatabase';
import { resetDatabase } from '@/utils/resetDatabase';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => authStore.currentUser);
const showMetricsForm = ref(false);
const showProfileForm = ref(false);
const metricsForm = ref({
    weight: user.value?.weight || null,
    height: user.value?.height || null
});
const profileForm = ref({
    name: user.value?.name || '',
    username: user.value?.username || '',
    age: user.value?.age || null,
    gender: user.value?.gender || 'male'
});
const progressData = ref([]);
const viewMode = ref('weekly'); // 'weekly' or 'monthly'

const healthMetrics = computed(() => {
    if (!user.value?.weight || !user.value?.height || !user.value?.age) {
        return null;
    }

    // Assuming gender, default to 'male' if not specified
    const gender = user.value?.gender || 'male';

    return healthMetricsService.getHealthMetrics(
        user.value.weight,
        user.value.height,
        user.value.age,
        gender
    );
});

const userInitials = computed(() => {
    if (!user.value?.name) return 'U';
    const names = user.value.name.split(' ');
    if (names.length > 1) {
        return names[0][0] + names[names.length - 1][0];
    }
    return names[0][0];
});

const handleLogout = async () => {
    await authStore.logout();
    router.push('/auth/login');
};

const handleResetDatabase = async () => {
    const confirmed = confirm(
        '⚠️ Reset Database?\n\n' +
        'This will:\n' +
        '• Clear all workouts, exercises, and programs\n' +
        '• Reseed with fresh default data\n' +
        '• Keep your user account and preferences\n\n' +
        'Are you sure you want to continue?'
    );

    if (!confirmed) return;

    try {
        const result = await resetDatabase();
        if (result.success) {
            alert('✅ Database reset successfully! The page will now reload.');
            window.location.reload();
        } else {
            alert('❌ Error resetting database: ' + result.error);
        }
    } catch (error) {
        console.error('Error resetting database:', error);
        alert('❌ Error resetting database. Check console for details.');
    }
};

const handleClearDatabase = async () => {
    const confirmed = confirm(
        '🚨 CLEAR ENTIRE DATABASE?\n\n' +
        'This will:\n' +
        '• Delete ALL data including your account\n' +
        '• Remove all workouts, exercises, and programs\n' +
        '• Clear all user data and preferences\n' +
        '• Log you out\n\n' +
        'This action CANNOT be undone!\n\n' +
        'Are you absolutely sure?'
    );

    if (!confirmed) return;

    const doubleConfirmed = confirm(
        '⚠️ FINAL CONFIRMATION\n\n' +
        'Type YES to permanently delete everything.\n\n' +
        'Click OK to proceed or Cancel to abort.'
    );

    if (!doubleConfirmed) return;

    try {
        const success = await clearDatabase();
        if (success) {
            alert('✅ Database cleared successfully! The page will now reload.');
            await authStore.logout();
            window.location.reload();
        } else {
            alert('❌ Error clearing database. Check console for details.');
        }
    } catch (error) {
        console.error('Error clearing database:', error);
        alert('❌ Error clearing database. Check console for details.');
    }
};

const handleUpdateProfile = async () => {
    try {
        if (!user.value?.id) {
            console.error('No user found');
            return;
        }

        await authStore.updateProfile({
            name: profileForm.value.name,
            username: profileForm.value.username,
            age: profileForm.value.age,
            gender: profileForm.value.gender
        });

        // Close form
        showProfileForm.value = false;
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    }
};

const handleSubmitMetrics = async () => {
    try {
        if (!user.value?.id) {
            console.error('No user found');
            return;
        }

        await healthMetricsService.addMetric(user.value.id, {
            weight: metricsForm.value.weight,
            height: metricsForm.value.height,
            date: new Date()
        });

        // Refresh user data
        await authStore.loadCurrentUser();

        // Reload progress data
        await loadProgressData();

        // Close form and reset
        showMetricsForm.value = false;

        // Update form with new values
        metricsForm.value = {
            weight: user.value.weight || null,
            height: user.value.height || null
        };
    } catch (error) {
        console.error('Error saving metrics:', error);
        alert('Failed to save metrics. Please try again.');
    }
};

const loadProgressData = async () => {
    try {
        if (!user.value?.id) return;

        if (viewMode.value === 'weekly') {
            const data = await healthMetricsService.getWeeklyProgress(user.value.id, 12);
            progressData.value = data;
        } else {
            const data = await healthMetricsService.getMonthlyProgress(user.value.id, 6);
            progressData.value = data;
        }
    } catch (error) {
        console.error('Error loading progress data:', error);
    }
};

// Watch for view mode changes
watch(viewMode, async () => {
    await loadProgressData();
});

const chartData = computed(() => {
    if (progressData.value.length === 0) {
        return {
            labels: [],
            datasets: []
        };
    }

    const labels = progressData.value.map(data => {
        const date = new Date(data.date);
        if (viewMode.value === 'weekly') {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
    });

    const weightData = progressData.value.map(data => data.latestWeight);
    const heightData = progressData.value.map(data => data.latestHeight);

    return {
        labels,
        datasets: [
            {
                label: 'Weight (kg)',
                data: weightData,
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true,
                yAxisID: 'y'
            },
            {
                label: 'Height (cm)',
                data: heightData,
                borderColor: 'rgb(139, 92, 246)',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                tension: 0.4,
                fill: true,
                yAxisID: 'y1'
            }
        ]
    };
});

const chartOptions = computed(() => {
    // Get theme colors from CSS variables
    const styles = getComputedStyle(document.documentElement);
    const textPrimary = styles.getPropertyValue('--text-primary') || '#1f2937';
    const borderColor = styles.getPropertyValue('--border-color') || '#e5e7eb';

    return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: textPrimary,
                    usePointStyle: true,
                    padding: 15
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: borderColor,
                borderWidth: 1
            }
        },
        scales: {
            x: {
                grid: {
                    color: borderColor,
                    display: false
                },
                ticks: {
                    color: textPrimary
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Weight (kg)',
                    color: textPrimary
                },
                grid: {
                    color: borderColor
                },
                ticks: {
                    color: textPrimary
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Height (cm)',
                    color: textPrimary
                },
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    color: textPrimary
                }
            }
        }
    };
});

onMounted(async () => {
    await loadProgressData();

    // Initialize forms with current user values
    if (user.value) {
        metricsForm.value = {
            weight: user.value.weight || null,
            height: user.value.height || null
        };
        profileForm.value = {
            name: user.value.name || '',
            username: user.value.username || '',
            age: user.value.age || null,
            gender: user.value.gender || 'male'
        };
    }
});
</script>

<style scoped>
.cover-gradient {
    background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 50%, #8b5cf6 100%);
    position: relative;
}

.cover-gradient::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 30px 30px;
    animation: slidePattern 20s linear infinite;
}

@keyframes slidePattern {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(30px, 30px);
    }
}

.avatar {
    background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
}

.avatar-ring {
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
        opacity: 0.3;
    }

    50% {
        transform: scale(1.05);
        opacity: 0.5;
    }
}

.info-icon {
    background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
}

@media (max-width: 480px) {
    .grid-cols-3 {
        grid-template-columns: 1fr !important;
    }
}
</style>