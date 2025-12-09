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
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';

const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => authStore.currentUser);

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

const handleLogout = async () => {
    await authStore.logout();
    router.push('/auth/login');
};
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
</style>
