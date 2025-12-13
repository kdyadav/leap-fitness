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
    <script setup>
        import {computed} from 'vue';
        import {useRouter} from 'vue-router';
        import {useAuthStore} from '@/stores';

        const router = useRouter();
        const authStore = useAuthStore();

const user = computed(() => authStore.currentUser);

const userInitials = computed(() => {
            border - radius: 50%;
        background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

        .avatar span {
            font - size: 2.5rem;
        font-weight: 700;
        color: white;
        text-transform: uppercase;
}

        .profile-header h1 {
            font - size: 2rem;
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
    });
};

const handleLogout = async () => {
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
            margin - bottom: 2rem;
}

        .section-title {
            font - size: 1.5rem;
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
const handleLogout = async () => {
            await authStore.logout();
        router.push('/auth/login');
};
</script>ue {
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
width: 20px;
height: 20px;
}
</style>