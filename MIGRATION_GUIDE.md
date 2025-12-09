# Migration Guide: Backend API → Frontend Database

This guide helps you update your existing components to use the new frontend database.

## Quick Reference

### Import Change

```javascript
// OLD - Backend API
import { userService, workoutService } from "@/services/database";

// NEW - Frontend Database
import { userService, workoutService } from "@/services/db";
```

## Service Comparison

Most services have **identical APIs**, making migration easy:

### ✅ These work exactly the same:

```javascript
// User Service
await userService.login(email, password);
await userService.register(userData);
await userService.logout();
await userService.getCurrentUser();
await userService.updateProfile(userId, data);

// Workout Service
await workoutService.getWorkouts();
await workoutService.getWorkout(id);
await workoutService.createWorkout(data);
await workoutService.updateWorkout(id, data);
await workoutService.deleteWorkout(id);

// Program Service
await programService.getPrograms();
await programService.getProgram(id);
await programService.createProgram(data);

// Preferences Service
await preferencesService.getPreferences(userId);
await preferencesService.updatePreferences(userId, data);
```

### 📝 Updated Services

#### userWorkoutService

```javascript
// Start a workout
const userWorkout = await userWorkoutService.startWorkout(userId, workoutId);

// Complete a workout
await userWorkoutService.completeWorkout(userWorkoutId, {
  duration: 30,
  caloriesBurned: 250,
});

// Pause/Resume
await userWorkoutService.pauseWorkout(userWorkoutId);
await userWorkoutService.resumeWorkout(userWorkoutId);

// Get current active workout
const current = await userWorkoutService.getCurrentUserWorkout(userId);
```

#### progressService

```javascript
// Get user stats
const stats = await progressService.getStats(userId);
// Returns: { totalWorkouts, totalMinutes, totalCalories, streak }

// Calculate streak
const streak = await progressService.calculateStreak(userId);

// Log progress
await progressService.logProgress(userId, {
  workoutId: 1,
  duration: 30,
  caloriesBurned: 200,
});
```

## Example Component Updates

### Before: Login Component

```vue
<script setup>
import { ref } from "vue";
import { userService } from "@/services/database"; // OLD
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    const user = await userService.login(email.value, password.value);
    router.push("/workouts");
  } catch (error) {
    alert(error.message);
  }
};
</script>
```

### After: Login Component

```vue
<script setup>
import { ref } from "vue";
import { userService } from "@/services/db"; // NEW - Only this line changes!
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    const user = await userService.login(email.value, password.value);
    router.push("/workouts");
  } catch (error) {
    alert(error.message);
  }
};
</script>
```

### Before: Workouts List

```vue
<script setup>
import { ref, onMounted } from "vue";
import { workoutService } from "@/services/database"; // OLD

const workouts = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    workouts.value = await workoutService.getWorkouts();
  } catch (error) {
    console.error("Failed to load workouts:", error);
  } finally {
    loading.value = false;
  }
});
</script>
```

### After: Workouts List

```vue
<script setup>
import { ref, onMounted } from "vue";
import { workoutService } from "@/services/db"; // NEW - Only this line changes!

const workouts = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    workouts.value = await workoutService.getWorkouts();
  } catch (error) {
    console.error("Failed to load workouts:", error);
  } finally {
    loading.value = false;
  }
});
</script>
```

## Step-by-Step Migration Process

### 1. Find all imports

Search your project for:

```
@/services/database
@/services/api
```

### 2. Replace imports

Change to:

```javascript
import { ... } from '@/services/db';
```

### 3. Test each component

- Login/Register flows
- Data loading (workouts, programs, etc.)
- Data updates (profile, preferences)
- Workout tracking

### 4. Remove old files (optional)

Once everything works, you can delete:

- `src/services/database.js`
- `src/services/api.js`

## Common Issues & Solutions

### Issue: "User not found" after login

**Cause:** No users in database yet
**Solution:** Register a new user first, or seed demo users

### Issue: No workouts showing

**Cause:** Database not seeded
**Solution:** The database auto-seeds on first run. Check browser console for "Database seeded successfully!"

### Issue: Data disappears

**Cause:** Browser data cleared or different browser
**Solution:** IndexedDB is browser-specific. Use the same browser or implement export/import

### Issue: Multiple users logged in

**Cause:** localStorage only tracks one user at a time
**Solution:** This is expected behavior. Each browser window shares the same logged-in user.

## Testing Your Migration

### 1. Test User Flow

```javascript
// Register
await userService.register({
  email: "test@example.com",
  password: "test123",
  username: "testuser",
  name: "Test User",
});

// Login
await userService.login("test@example.com", "test123");

// Get current user
const user = await userService.getCurrentUser();
console.log(user);
```

### 2. Test Workout Flow

```javascript
// Get workouts
const workouts = await workoutService.getWorkouts();

// Start a workout
const currentUser = await userService.getCurrentUser();
const userWorkout = await userWorkoutService.startWorkout(
  currentUser.id,
  workouts[0].id
);

// Complete it
await userWorkoutService.completeWorkout(userWorkout.id, {
  duration: 20,
  caloriesBurned: 150,
});

// Check stats
const stats = await progressService.getStats(currentUser.id);
console.log(stats); // Should show 1 workout
```

## Need Help?

Check the browser console for errors. Common error messages:

- `"No user logged in"` - Call `userService.login()` first
- `"User with this email already exists"` - Use login instead of register
- `"Invalid email or password"` - Check credentials

## Bonus: Debugging Tools

Add this to any component to inspect data:

```vue
<script setup>
import db from "@/services/db";

// Log all workouts
db.workouts.toArray().then(console.log);

// Log all users
db.users.toArray().then(console.log);

// Count records
db.workouts.count().then((count) => console.log("Workout count:", count));
</script>
```
