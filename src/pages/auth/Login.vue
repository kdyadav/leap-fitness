<template>
    <div class="login-page">
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" id="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" class="login-btn">Login</button>
        </form>
        <p class="signup-link">
            Don't have an account? <router-link to="/signup">Sign up here</router-link>
        </p>
    </div>
</template>

<script setup>
</script>
