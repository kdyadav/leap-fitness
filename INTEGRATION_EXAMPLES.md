# Example: Integrating Database into Your Components

Here are practical examples of updating your existing pages to use the database.

## Example 1: Workouts.vue - Load from Database

### Current (Hardcoded)

```vue
<script setup>
import { ref } from 'vue';

const workouts = ref([
  { id: 1, name: 'Morning Yoga', duration: 20, ... },
  { id: 2, name: 'HIIT Cardio', duration: 30, ... },
  // ... hardcoded data
]);
</script>
```

### Updated (Database)

```vue
<script setup>
import { ref, onMounted } from "vue";
import { workoutService } from "@/services/db";

const workouts = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // Load workouts from database
    const data = await workoutService.getWorkouts();
    workouts.value = data.map((w) => ({
      ...w,
      // Map database fields to your component format
      difficulty: w.difficulty.charAt(0).toUpperCase() + w.difficulty.slice(1),
      description: `${w.duration} minute ${w.category} workout`,
    }));
  } catch (err) {
    error.value = err.message;
    console.error("Failed to load workouts:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">My Workouts</h1>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-8">Loading workouts...</div>

    <!-- Error state -->
    <div v-else-if="error" class="text-red-500 text-center py-8">
      Error: {{ error }}
    </div>

    <!-- Workouts list -->
    <div v-else class="flex flex-col gap-4">
      <router-link
        v-for="workout in workouts"
        :key="workout.id"
        :to="{ name: 'workout-details', params: { id: workout.id } }"
        class="workout-card"
      >
        <!-- Your existing card template -->
      </router-link>
    </div>
  </div>
</template>
```

## Example 2: Login.vue - Authenticate Users

```vue
<template>
  <div class="login-page">
    <h1>Login</h1>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <button type="submit" class="login-btn" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
      </button>
    </form>

    <p class="signup-link">
      Don't have an account?
      <router-link to="/signup">Sign up here</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userService } from "@/services/db";

const router = useRouter();
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(null);

const handleLogin = async () => {
  loading.value = true;
  error.value = null;

  try {
    const user = await userService.login(email.value, password.value);
    console.log("Logged in as:", user);

    // Redirect to workouts page
    router.push("/workouts");
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.error-message {
  background-color: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}
</style>
```

## Example 3: SignUp.vue - Register New Users

```vue
<template>
  <div class="signup-page">
    <h1>Create Account</h1>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <form @submit.prevent="handleSignup">
      <div class="form-group">
        <label for="name">Full Name</label>
        <input v-model="formData.name" type="text" id="name" required />
      </div>

      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="formData.username" type="text" id="username" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="formData.email" type="email" id="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="formData.password"
          type="password"
          id="password"
          required
        />
      </div>

      <div class="form-group">
        <label for="age">Age</label>
        <input v-model.number="formData.age" type="number" id="age" />
      </div>

      <button type="submit" class="signup-btn" :disabled="loading">
        {{ loading ? "Creating Account..." : "Sign Up" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userService } from "@/services/db";

const router = useRouter();
const loading = ref(false);
const error = ref(null);

const formData = ref({
  name: "",
  username: "",
  email: "",
  password: "",
  age: null,
  weight: null,
  height: null,
});

const handleSignup = async () => {
  loading.value = true;
  error.value = null;

  try {
    const user = await userService.register(formData.value);
    console.log("User registered:", user);

    // Auto-login after registration
    await userService.login(formData.value.email, formData.value.password);

    // Redirect to workouts page
    router.push("/workouts");
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>
```

## Example 4: WorkoutTimer.vue - Track Active Workout

```vue
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { workoutService, userWorkoutService, userService } from "@/services/db";

const route = useRoute();
const router = useRouter();

const workout = ref(null);
const userWorkout = ref(null);
const currentUser = ref(null);
const timeElapsed = ref(0);
const isPaused = ref(false);

onMounted(async () => {
  try {
    // Get current user
    currentUser.value = await userService.getCurrentUser();

    // Load the workout
    const workoutId = parseInt(route.params.id);
    workout.value = await workoutService.getWorkout(workoutId);

    // Start tracking this workout session
    userWorkout.value = await userWorkoutService.startWorkout(
      currentUser.value.id,
      workoutId
    );

    // Start timer
    startTimer();
  } catch (error) {
    console.error("Failed to start workout:", error);
    router.push("/workouts");
  }
});

const startTimer = () => {
  // Your timer logic here
};

const handlePause = async () => {
  isPaused.value = true;
  await userWorkoutService.pauseWorkout(userWorkout.value.id);
};

const handleResume = async () => {
  isPaused.value = false;
  await userWorkoutService.resumeWorkout(userWorkout.value.id);
};

const handleComplete = async () => {
  try {
    await userWorkoutService.completeWorkout(userWorkout.value.id, {
      duration: Math.floor(timeElapsed.value / 60), // convert to minutes
      caloriesBurned: workout.value.calories,
    });

    // Show completion modal or redirect
    router.push("/workouts");
  } catch (error) {
    console.error("Failed to complete workout:", error);
  }
};
</script>

<template>
  <div class="workout-timer">
    <h1>{{ workout?.name }}</h1>

    <div class="timer">
      {{ Math.floor(timeElapsed / 60) }}:{{
        (timeElapsed % 60).toString().padStart(2, "0")
      }}
    </div>

    <button v-if="!isPaused" @click="handlePause">Pause</button>
    <button v-else @click="handleResume">Resume</button>
    <button @click="handleComplete">Complete Workout</button>
  </div>
</template>
```

## Example 5: Profile.vue - Display User Stats

```vue
<script setup>
import { ref, onMounted } from "vue";
import { userService, progressService } from "@/services/db";

const user = ref(null);
const stats = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    user.value = await userService.getCurrentUser();
    stats.value = await progressService.getStats(user.value.id);
  } catch (error) {
    console.error("Failed to load profile:", error);
  } finally {
    loading.value = false;
  }
});

const updateProfile = async (updates) => {
  try {
    user.value = await userService.updateProfile(user.value.id, updates);
    alert("Profile updated successfully!");
  } catch (error) {
    alert("Failed to update profile: " + error.message);
  }
};
</script>

<template>
  <div v-if="loading">Loading...</div>

  <div v-else-if="user" class="profile-page">
    <h1>{{ user.name }}'s Profile</h1>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Workouts</h3>
        <p class="stat-value">{{ stats.totalWorkouts }}</p>
      </div>

      <div class="stat-card">
        <h3>Total Minutes</h3>
        <p class="stat-value">{{ stats.totalMinutes }}</p>
      </div>

      <div class="stat-card">
        <h3>Calories Burned</h3>
        <p class="stat-value">{{ stats.totalCalories }}</p>
      </div>

      <div class="stat-card">
        <h3>Current Streak</h3>
        <p class="stat-value">{{ stats.streak }} days 🔥</p>
      </div>
    </div>

    <div class="user-info">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p v-if="user.age"><strong>Age:</strong> {{ user.age }}</p>
      <p v-if="user.weight"><strong>Weight:</strong> {{ user.weight }} kg</p>
      <p v-if="user.height"><strong>Height:</strong> {{ user.height }} cm</p>
    </div>
  </div>
</template>
```

## Key Patterns to Remember

### 1. Always handle errors

```javascript
try {
  const data = await service.method();
} catch (error) {
  console.error("Error:", error);
  // Show user-friendly message
}
```

### 2. Show loading states

```javascript
const loading = ref(true);

onMounted(async () => {
  try {
    // Load data
  } finally {
    loading.value = false;
  }
});
```

### 3. Check if user is logged in

```javascript
onMounted(async () => {
  try {
    const user = await userService.getCurrentUser();
    // User is logged in
  } catch (error) {
    // Not logged in, redirect to login
    router.push("/login");
  }
});
```

### 4. Map database fields to UI format

```javascript
const workouts = await workoutService.getWorkouts();
const formattedWorkouts = workouts.map((w) => ({
  ...w,
  // Capitalize difficulty
  difficulty: w.difficulty.charAt(0).toUpperCase() + w.difficulty.slice(1),
  // Format description
  description: `${w.duration} minute ${w.category} workout`,
}));
```

## Testing Your Integration

Open browser console and test:

```javascript
// Import services
import { userService, workoutService } from "@/services/db";

// Register test user
await userService.register({
  email: "test@test.com",
  password: "test123",
  username: "testuser",
  name: "Test User",
});

// Login
await userService.login("test@test.com", "test123");

// Get workouts
const workouts = await workoutService.getWorkouts();
console.log("Workouts:", workouts);
```

Now your app is fully database-powered! 🎉
