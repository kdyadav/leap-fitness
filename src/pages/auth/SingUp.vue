<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-800 py-8 px-4">
        <div class="bg-[var(--card-bg)] rounded-2xl p-10 max-w-xl w-full shadow-2xl">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-2">Create Account</h1>
                <p class="text-[var(--text-secondary)] text-base">Start your fitness journey today</p>
            </div>

            <div v-if="error" class="bg-red-50 text-red-700 p-3.5 rounded-lg mb-6 text-sm border border-red-200">
                {{ error }}
            </div>

            <form @submit.prevent="handleSignUp" class="flex flex-col gap-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="flex flex-col gap-2">
                        <label for="name" class="font-semibold text-[var(--text-primary)] text-sm">Full Name</label>
                        <input v-model="formData.name" type="text" id="name" placeholder="John Doe" required
                            :disabled="loading"
                            class="px-3.5 py-3.5 border-2 border-[var(--border-color)] rounded-lg text-base bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="username" class="font-semibold text-[var(--text-primary)] text-sm">Username</label>
                        <input v-model="formData.username" type="text" id="username" placeholder="johndoe" required
                            :disabled="loading"
                            class="px-3.5 py-3.5 border-2 border-[var(--border-color)] rounded-lg text-base bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed" />
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <label for="email" class="font-semibold text-[var(--text-primary)] text-sm">Email</label>
                    <input v-model="formData.email" type="email" id="email" placeholder="john@example.com" required
                        :disabled="loading"
                        class="px-3.5 py-3.5 border-2 border-[var(--border-color)] rounded-lg text-base bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed" />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="password" class="font-semibold text-[var(--text-primary)] text-sm">Password</label>
                    <input v-model="formData.password" type="password" id="password" placeholder="At least 6 characters"
                        required minlength="6" :disabled="loading"
                        class="px-3.5 py-3.5 border-2 border-[var(--border-color)] rounded-lg text-base bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed" />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="confirmPassword" class="font-semibold text-[var(--text-primary)] text-sm">Confirm
                        Password</label>
                    <input v-model="confirmPassword" type="password" id="confirmPassword"
                        placeholder="Re-enter password" required :disabled="loading"
                        class="px-3.5 py-3.5 border-2 border-[var(--border-color)] rounded-lg text-base bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed" />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="flex flex-col gap-2">
                        <label for="age" class="font-semibold text-[var(--text-primary)] text-sm">Age (optional)</label>
                        <input v-model.number="formData.age" type="number" id="age" placeholder="25" min="13" max="120"
                            :disabled="loading"
                            class="px-3.5 py-3.5 border-2 border-[var(--border-color)] rounded-lg text-base bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="weight" class="font-semibold text-[var(--text-primary)] text-sm">Weight (kg,
                            optional)</label>
                        <input v-model.number="formData.weight" type="number" id="weight" placeholder="70"
                            :disabled="loading"
                            class="px-3.5 py-3.5 border-2 border-[var(--border-color)] rounded-lg text-base bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed" />
                    </div>
                </div>

                <button type="submit" :disabled="loading"
                    class="px-4 py-4 bg-indigo-600 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 mt-2 hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                    {{ loading ? 'Creating Account...' : 'Create Account' }}
                </button>
            </form>

            <div class="flex items-center text-center my-6 text-[var(--text-secondary)]">
                <div class="flex-1 border-b border-[var(--border-color)]"></div>
                <span class="px-3 text-sm">or</span>
                <div class="flex-1 border-b border-[var(--border-color)]"></div>
            </div>

            <p class="text-center text-[var(--text-secondary)] text-base">
                Already have an account? <router-link to="/auth/login"
                    class="text-indigo-600 no-underline font-semibold hover:underline">Login here</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';

const router = useRouter();
const authStore = useAuthStore();

const formData = reactive({
    name: '',
    username: '',
    email: '',
    password: '',
    age: null,
    weight: null,
    height: null,
});

const confirmPassword = ref('');
const error = ref(null);
const loading = ref(false);

const handleSignUp = async () => {
    error.value = null;

    // Validation
    if (formData.password !== confirmPassword.value) {
        error.value = 'Passwords do not match';
        return;
    }

    if (formData.password.length < 6) {
        error.value = 'Password must be at least 6 characters';
        return;
    }

    loading.value = true;

    try {
        await authStore.register(formData);
        router.push('/');
    } catch (err) {
        error.value = err.message || 'Registration failed. Please try again.';
    } finally {
        loading.value = false;
    }
};
</script>
