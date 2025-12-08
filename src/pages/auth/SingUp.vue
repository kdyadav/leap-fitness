<template>
    <div class="signup-page">
        <h1>Sign Up</h1>
        <form @submit.prevent="handleSignUp">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input v-model="name" type="text" id="name" placeholder="Enter your full name" required />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" id="password" placeholder="Enter your password" required />
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input v-model="confirmPassword" type="password" id="confirmPassword"
                    placeholder="Confirm your password" required />
            </div>
            <button type="submit" class="signup-btn">Sign Up</button>
        </form>
        <p class="login-link">
            Already have an account? <router-link to="/login">Login here</router-link>
        </p>
    </div>
</template>

<script>

</script>
