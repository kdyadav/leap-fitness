<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-800 p-4">
        <div class="bg-[var(--card-bg)] rounded-2xl p-10 max-w-md w-full shadow-2xl">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-2">Welcome Back</h1>
                <p class="text-[var(--text-secondary)] text-base">Sign in to continue your fitness journey</p>
            </div>

            <div v-if="error" class="bg-red-50 text-red-700 p-3.5 rounded-lg mb-6 text-sm border border-red-200">
                {{ error }}
            </div>

            <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
                <div class="flex flex-col gap-2">
                    <label for="email" class="font-semibold text-[var(--text-primary)] text-sm">Email</label>
                    <input v-model="email" type="email" id="email" placeholder="Enter your email" required
                        :disabled="loading"
                        class="px-3.5 py-3.5 border-2 border-[var(--border-color)] rounded-lg text-base bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed" />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="password" class="font-semibold text-[var(--text-primary)] text-sm">Password</label>
                    <input v-model="password" type="password" id="password" placeholder="Enter your password" required
                        :disabled="loading"
                        class="px-3.5 py-3.5 border-2 border-[var(--border-color)] rounded-lg text-base bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed" />
                </div>

                <button type="submit" :disabled="loading"
                    class="px-4 py-4 bg-indigo-600 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 mt-2 hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                    {{ loading ? 'Signing in...' : 'Sign In' }}
                </button>
            </form>

            <div class="flex items-center text-center my-6 text-[var(--text-secondary)]">
                <div class="flex-1 border-b border-[var(--border-color)]"></div>
                <span class="px-3 text-sm">or</span>
                <div class="flex-1 border-b border-[var(--border-color)]"></div>
            </div>

            <p class="text-center text-[var(--text-secondary)] text-base">
                Don't have an account? <router-link to="/auth/signup"
                    class="text-indigo-600 no-underline font-semibold hover:underline">Sign up here</router-link>
            </p>

            <!-- Demo Credentials -->
            <div
                class="mt-6 p-4 bg-[var(--bg-secondary)] rounded-lg border border-dashed border-[var(--border-color)] text-center">
                <p class="text-[var(--text-primary)] text-sm m-1"><strong>Demo Account:</strong></p>
                <p class="text-[var(--text-secondary)] text-sm m-1">Email: demo@fitness.com</p>
                <p class="text-[var(--text-secondary)] text-sm m-1">Password: demo123</p>
                <button @click="useDemoCredentials" type="button"
                    class="mt-3 px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-md text-[var(--text-primary)] text-sm cursor-pointer transition-all duration-200 hover:bg-[var(--border-color)]">
                    Use Demo Account
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);

const handleLogin = async () => {
    loading.value = true;
    error.value = null;

    try {
        await authStore.login({ email: email.value, password: password.value });
        router.push('/');
    } catch (err) {
        error.value = err.message || 'Login failed. Please check your credentials.';
    } finally {
        loading.value = false;
    }
};

const useDemoCredentials = () => {
    email.value = 'demo@fitness.com';
    password.value = 'demo123';
};
</script>
