<template>
    <div class="profile-page">
        <div class="profile-container">
            <div class="profile-header">
                <div class="avatar">
                    <span>{{ userInitials }}</span>
                </div>
                <h1>{{ user?.name || 'User' }}</h1>
                <p class="username">@{{ user?.username || 'user' }}</p>
            </div>

            <!-- Workout Stats Section -->
            <div v-if="workoutStats" class="stats-section">
                <h2 class="section-title">Workout Stats</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">🏋️</div>
                        <div class="stat-value">{{ workoutStats.totalWorkouts }}</div>
                        <div class="stat-label">Total Workouts</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⏱️</div>
                        <div class="stat-value">{{ workoutStats.totalDuration }}</div>
                        <div class="stat-label">Minutes Trained</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🔥</div>
                        <div class="stat-value">{{ workoutStats.totalCalories }}</div>
                        <div class="stat-label">Calories Burned</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-value">{{ workoutStats.averageDuration }}</div>
                        <div class="stat-label">Avg Duration (min)</div>
                    </div>
                </div>
            </div>

            <div class="profile-info">
                <div class="info-card">
                    <div class="info-label">Email</div>
                    <div class="info-value">{{ user?.email || 'N/A' }}</div>
                </div>

                <div class="info-card" v-if="user?.age">
                    <div class="info-label">Age</div>
                    <div class="info-value">{{ user.age }} years</div>
                </div>

                <div class="info-card" v-if="user?.weight">
                    <div class="info-label">Weight</div>
                    <div class="info-value">{{ user.weight }} kg</div>
                </div>

                <div class="info-card" v-if="user?.height">
                    <div class="info-label">Height</div>
                    <div class="info-value">{{ user.height }} cm</div>
                </div>

                <div class="info-card">
                    <div class="info-label">Member Since</div>
                    <div class="info-value">{{ formatDate(user?.createdAt) }}</div>
                </div>
            </div>

            <!-- Workout History Section -->
            <!-- Incomplete Workouts Section -->
            <div v-if="incompleteWorkouts.length > 0" class="workout-history incomplete-section">
                <h2 class="section-title">Incomplete Workouts</h2>
                <div class="workout-log-list">
                    <div v-for="workout in incompleteWorkouts" :key="workout.id"
                        class="workout-log-item incomplete-item">
                        <div class="log-info">
                            <div class="log-title">{{ getWorkoutName(workout.workoutId) }}</div>
                            <div class="log-meta">
                                <span class="log-badge badge-incomplete">
                                    Incomplete
                                </span>
                                <span class="log-date">{{ formatLogDate(workout.endedAt || workout.startedAt) }}</span>
                            </div>
                            <div v-if="workout.completionPercentage" class="completion-bar">
                                <div class="completion-fill" :style="{ width: workout.completionPercentage + '%' }">
                                </div>
                                <span class="completion-text">{{ Math.round(workout.completionPercentage) }}%
                                    complete</span>
                            </div>
                        </div>
                        <div class="log-stats">
                            <div class="log-stat">
                                <span class="stat-icon-small">⏱️</span>
                                <span>{{ workout.duration || 0 }} min</span>
                            </div>
                            <div class="log-stat">
                                <span class="stat-icon-small">✓</span>
                                <span>{{ workout.exercisesCompleted }}/{{ workout.totalExercises }}</span>
                            </div>
                            <div class="action-buttons">
                                <button @click="resumeWorkout(workout.workoutId, workout.id)" class="resume-btn"
                                    title="Resume workout">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                    Resume
                                </button>
                                <button @click="deleteIncompleteWorkout(workout.id)" class="delete-btn"
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

            <div class="workout-history">
                <h2 class="section-title">Recent Workouts</h2>
                <div v-if="logsLoading" class="loading">Loading workout history...</div>
                <div v-else-if="workoutLogs.length === 0" class="empty-state">
                    <div class="empty-icon">📝</div>
                    <p>No workout history yet</p>
                    <p class="empty-subtitle">Start your fitness journey today!</p>
                </div>
                <div v-else class="workout-log-list">
                    <div v-for="log in recentWorkoutLogs" :key="log.id" class="workout-log-item">
                        <div class="log-info">
                            <div class="log-title">{{ log.workoutName }}</div>
                            <div class="log-meta">
                                <span class="log-badge" :class="'badge-' + log.workoutDifficulty?.toLowerCase()">
                                    {{ log.workoutDifficulty }}
                                </span>
                                <span class="log-date">{{ formatLogDate(log.date) }}</span>
                            </div>
                        </div>
                        <div class="log-stats">
                            <div class="log-stat">
                                <span class="stat-icon-small">⏱️</span>
                                <span>{{ log.duration }} min</span>
                            </div>
                            <div class="log-stat">
                                <span class="stat-icon-small">🔥</span>
                                <span>{{ log.caloriesBurned }} cal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="profile-actions">
                <button @click="handleLogout" class="logout-btn">
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
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore, useWorkoutLogStore, useUserWorkoutStore, useWorkoutStore } from '@/stores';

const router = useRouter();
const authStore = useAuthStore();
const workoutLogStore = useWorkoutLogStore();
const userWorkoutStore = useUserWorkoutStore();
const workoutStore = useWorkoutStore();

const user = computed(() => authStore.currentUser);
const workoutLogs = computed(() => workoutLogStore.workoutLogs);
const workoutStats = computed(() => workoutLogStore.workoutStats);
const logsLoading = computed(() => workoutLogStore.logsLoading);
const incompleteWorkouts = computed(() => userWorkoutStore.incompleteWorkouts);

const recentWorkoutLogs = computed(() => {
    return workoutLogs.value.slice(0, 10); // Show last 10 workouts
});

const getWorkoutName = (workoutId) => {
    const workout = workoutStore.workouts.find(w => w.id === workoutId);
    return workout?.name || 'Workout';
};

const userInitials = computed(() => {
    if (!user.value?.name) return 'U';
    const names = user.value.name.split(' ');
    if (names.length > 1) {
        return names[0][0] + names[names.length - 1][0];
    }
    return names[0][0];
});

const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
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

const handleLogout = async () => {
    await authStore.logout();
    router.push('/auth/login');
};

onMounted(async () => {
    await workoutLogStore.loadUserWorkoutLogs();
    await workoutLogStore.loadUserWorkoutStats();
    await userWorkoutStore.loadUserWorkouts();
    await workoutStore.loadWorkouts();
});
</script>

<style scoped>
.profile-page {
    background-color: var(--bg-primary);
    min-height: 100vh;
    padding: 1.5rem;
}

.profile-container {
    max-width: 600px;
    margin: 0 auto;
}

.profile-header {
    text-align: center;
    margin-bottom: 2rem;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.avatar span {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    text-transform: uppercase;
}

.profile-header h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.username {
    color: var(--text-secondary);
    font-size: 1.1rem;
}

.profile-info {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;
}

.info-card {
    background: var(--card-bg);
    padding: 1.25rem;
    border-radius: 0.75rem;
    border: 1px solid var(--border-color);
}

.info-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.info-value {
    font-size: 1.1rem;
    color: var(--text-primary);
    font-weight: 600;
}

.profile-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    background: transparent;
    color: #ef4444;
    border: 2px solid #ef4444;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.logout-btn:hover {
    background: #ef4444;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.logout-btn svg {
    width: 20px;
    height: 20px;
}

/* Workout Stats Section */
.stats-section {
    margin-bottom: 2rem;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.stat-card {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1px solid var(--border-color);
    text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--accent-color);
    margin-bottom: 0.25rem;
}

.stat-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
}

/* Workout History Section */
.workout-history {
    margin-bottom: 2rem;
}

.loading {
    text-align: center;
    padding: 2rem;
    color: var(--text-secondary);
}

.empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--text-secondary);
}

.empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.empty-subtitle {
    font-size: 0.9rem;
    margin-top: 0.5rem;
}

.workout-log-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.workout-log-item {
    background: var(--card-bg);
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.2s, box-shadow 0.2s;
}

.workout-log-item:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.log-info {
    flex: 1;
}

.log-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.log-meta {
    display: flex;
    gap: 0.75rem;
    align-items: center;
}

.log-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
}

.badge-beginner {
    background: #dbeafe;
    color: #1e40af;
}

.badge-intermediate {
    background: #fef3c7;
    color: #b45309;
}

.badge-advanced {
    background: #fee2e2;
    color: #b91c1c;
}

.badge-incomplete {
    background: #fef3c7;
    color: #b45309;
}

.incomplete-section {
    border-left: 3px solid #f59e0b;
    padding-left: 1rem;
    margin-bottom: 2rem;
}

.incomplete-item {
    border-color: #fbbf24;
    background: linear-gradient(to right, #fffbeb, var(--card-bg));
}

.completion-bar {
    margin-top: 0.75rem;
    background: #e5e7eb;
    height: 6px;
    border-radius: 3px;
    position: relative;
    overflow: hidden;
}

.completion-fill {
    height: 100%;
    background: linear-gradient(to right, #f59e0b, #fbbf24);
    transition: width 0.3s ease;
}

.completion-text {
    position: absolute;
    top: -22px;
    right: 0;
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-weight: 500;
}

.log-date {
    font-size: 0.85rem;
    color: var(--text-secondary);
}

.log-stats {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-end;
}

.log-stat {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.85rem;
    color: var(--text-secondary);
}

.stat-icon-small {
    font-size: 1rem;
}

.action-buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.resume-btn {
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(245, 158, 11, 0.2);
}

.resume-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);
    background: linear-gradient(135deg, #d97706, #f59e0b);
}

.resume-btn:active {
    transform: translateY(0);
}

.resume-btn svg {
    width: 14px;
    height: 14px;
}

.delete-btn {
    padding: 0.5rem;
    background: var(--bg-tertiary);
    color: #ef4444;
    border: 1px solid #fecaca;
    border-radius: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    min-width: 40px;
}

.delete-btn:hover {
    background: #fee2e2;
    border-color: #ef4444;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(239, 68, 68, 0.2);
}

.delete-btn:active {
    transform: translateY(0);
}

.delete-btn svg {
    width: 16px;
    height: 16px;
}

@media (max-width: 640px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }
}
</style>
