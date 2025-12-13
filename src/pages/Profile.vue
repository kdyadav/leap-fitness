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
                <p class="text-sm" style="color: var(--text-secondary);">Member since {{ formatDate(user?.createdAt) }}
                </p>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-3 gap-4 px-6 mb-8">
                <div v-if="user?.age"
                    class="flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    style="background-color: var(--card-bg); border-color: var(--border-color);">
                    <div class="text-3xl">🎂</div>
                    <div class="text-center">
                        <div class="text-2xl font-bold leading-none" style="color: var(--text-primary);">{{ user.age }}
                        </div>
                        <div class="text-xs uppercase tracking-wider mt-1" style="color: var(--text-secondary);">Years
                        </div>
                    </div>
                </div>
                <div v-if="user?.weight"
                    class="flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    style="background-color: var(--card-bg); border-color: var(--border-color);">
                    <div class="text-3xl">⚖️</div>
                    <div class="text-center">
                        <div class="text-2xl font-bold leading-none" style="color: var(--text-primary);">{{
                            user.weight }}</div>
                        <div class="text-xs uppercase tracking-wider mt-1" style="color: var(--text-secondary);">kg
                        </div>
                    </div>
                </div>
                <div v-if="user?.height"
                    class="flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    style="background-color: var(--card-bg); border-color: var(--border-color);">
                    <div class="text-3xl">📏</div>
                    <div class="text-center">
                        <div class="text-2xl font-bold leading-none" style="color: var(--text-primary);">{{
                            user.height }}</div>
                        <div class="text-xs uppercase tracking-wider mt-1" style="color: var(--text-secondary);">cm
                        </div>
                    </div>
                </div>
            </div>

            <!-- Profile Details -->
            <div class="px-6 mb-8">
                <h2 class="text-xl font-bold mb-4 pl-2" style="color: var(--text-primary);">Personal Information</h2>

                <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 hover:translate-x-1 hover:shadow-md"
                        style="background-color: var(--card-bg); border-color: var(--border-color);">
                        <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 info-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="white" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                                </path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </div>
                        <div class="flex-1">
                            <div class="text-xs uppercase tracking-wider font-semibold mb-1"
                                style="color: var(--text-secondary);">Email Address</div>
                            <div class="text-base font-medium" style="color: var(--text-primary);">{{ user?.email ||
                                'N/A' }}</div>
                        </div>
                    </div>

                    <div v-if="user?.age"
                        class="flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 hover:translate-x-1 hover:shadow-md"
                        style="background-color: var(--card-bg); border-color: var(--border-color);">
                        <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 info-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="white" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </div>
                        <div class="flex-1">
                            <div class="text-xs uppercase tracking-wider font-semibold mb-1"
                                style="color: var(--text-secondary);">Age</div>
                            <div class="text-base font-medium" style="color: var(--text-primary);">{{ user.age }} years
                                old</div>
                        </div>
                    </div>

                    <div v-if="user?.weight"
                        class="flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 hover:translate-x-1 hover:shadow-md"
                        style="background-color: var(--card-bg); border-color: var(--border-color);">
                        <div
                            class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl info-icon">
                            ⚖️</div>
                        <div class="flex-1">
                            <div class="text-xs uppercase tracking-wider font-semibold mb-1"
                                style="color: var(--text-secondary);">Weight</div>
                            <div class="text-base font-medium" style="color: var(--text-primary);">{{ user.weight }} kg
                            </div>
                        </div>
                    </div>

                    <div v-if="user?.height"
                        class="flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 hover:translate-x-1 hover:shadow-md"
                        style="background-color: var(--card-bg); border-color: var(--border-color);">
                        <div
                            class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl info-icon">
                            📏</div>
                        <div class="flex-1">
                            <div class="text-xs uppercase tracking-wider font-semibold mb-1"
                                style="color: var(--text-secondary);">Height</div>
                            <div class="text-base font-medium" style="color: var(--text-primary);">{{ user.height }} cm
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="px-6">
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
        month: 'long'
    });
};

const handleLogout = async () => {
    await authStore.logout();
    router.push('/auth/login');
};
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