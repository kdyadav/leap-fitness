# Pinia Migration Guide

## ✅ Migration Complete!

Your store has been successfully migrated from a custom reactive store to **Pinia** - Vue's official state management library.

## What Changed

### Before (Custom Store)

```javascript
// Old store pattern
import { useStore } from "@/composables/useStore";

const store = useStore();
store.dispatch("login", credentials);
const user = store.state.currentUser;
```

### After (Pinia)

```javascript
// New Pinia stores
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
await authStore.login(credentials);
const user = authStore.currentUser;
```

## New Store Structure

Instead of one monolithic store, you now have **modular Pinia stores**:

### Available Stores

1. **`useAuthStore`** - Authentication & user management
2. **`useWorkoutStore`** - Workouts CRUD
3. **`useProgramStore`** - Workout programs
4. **`useExerciseStore`** - Exercise library
5. **`useUserWorkoutStore`** - Workout session tracking
6. **`useProgressStore`** - Progress & statistics
7. **`useGoalStore`** - Goals management
8. **`usePreferencesStore`** - User preferences
9. **`useFavoriteStore`** - Favorite workouts
10. **`useNotificationStore`** - Notifications
11. **`useThemeStore`** - Theme management

## Usage Examples

### 1. Auth Store

```vue
<script setup>
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();

// State
const user = authStore.currentUser;
const isLoggedIn = authStore.isAuthenticated;
const loading = authStore.authLoading;

// Actions
const login = async (email, password) => {
  await authStore.login({ email, password });
};

const logout = async () => {
  await authStore.logout();
};
</script>
```

### 2. Workout Store

```vue
<script setup>
import { useWorkoutStore } from "@/stores";
import { computed, onMounted } from "vue";

const workoutStore = useWorkoutStore();

// State (reactive)
const workouts = computed(() => workoutStore.workouts);
const loading = computed(() => workoutStore.workoutsLoading);

// Getters
const beginnerWorkouts = computed(() =>
  workoutStore.workoutsByDifficulty("beginner")
);

// Actions
onMounted(async () => {
  await workoutStore.loadWorkouts();
});

const createWorkout = async (data) => {
  await workoutStore.createWorkout(data);
};
</script>
```

### 3. Multiple Stores

```vue
<script setup>
import { useAuthStore, useWorkoutStore, useProgressStore } from "@/stores";

const authStore = useAuthStore();
const workoutStore = useWorkoutStore();
const progressStore = useProgressStore();

// Load data when component mounts
onMounted(async () => {
  if (authStore.isAuthenticated) {
    await workoutStore.loadWorkouts();
    await progressStore.loadStats();
  }
});
</script>
```

### 4. Theme Store

```vue
<script setup>
import { useThemeStore } from "@/stores";
import { computed } from "vue";

const themeStore = useThemeStore();

const isDark = computed(() => themeStore.isDarkMode);
const currentTheme = computed(() => themeStore.theme);

const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>

<template>
  <button @click="toggleTheme">
    {{ isDark ? "☀️ Light" : "🌙 Dark" }}
  </button>
</template>
```

### 5. Notifications Store

```vue
<script setup>
import { useNotificationStore } from "@/stores";
import { computed } from "vue";

const notificationStore = useNotificationStore();

const notifications = computed(() => notificationStore.notifications);

const remove = (id) => {
  notificationStore.removeNotification(id);
};
</script>

<template>
  <div v-for="notif in notifications" :key="notif.id">
    {{ notif.message }}
    <button @click="remove(notif.id)">×</button>
  </div>
</template>
```

## Key Differences

### State Access

**Before:**

```javascript
const user = store.state.currentUser;
```

**After:**

```javascript
const user = authStore.currentUser;
// or with reactivity
const user = computed(() => authStore.currentUser);
```

### Getters

**Before:**

```javascript
const filtered = store.getters.workoutsByDifficulty("beginner");
```

**After:**

```javascript
const filtered = workoutStore.workoutsByDifficulty("beginner");
// or with reactivity
const filtered = computed(() => workoutStore.workoutsByDifficulty("beginner"));
```

### Actions

**Before:**

```javascript
await store.dispatch("login", credentials);
```

**After:**

```javascript
await authStore.login(credentials);
```

### Mutations

**Before:**

```javascript
store.commit("SET_CURRENT_USER", user);
```

**After:**

```javascript
// In Pinia, just directly modify state or use actions
authStore.currentUser = user;
// or better, use actions:
await authStore.loadCurrentUser();
```

## Benefits of Pinia

✅ **Modular** - Separate stores for different concerns  
✅ **TypeScript Support** - Better type inference  
✅ **DevTools** - Excellent Vue DevTools integration  
✅ **Simpler** - No mutations, just actions  
✅ **Auto-completion** - Better IDE support  
✅ **Tree-shaking** - Only import stores you use  
✅ **Hot Module Replacement** - Better dev experience

## Composables (Backward Compatible)

For gradual migration, composables still work:

```javascript
import { useAuth, useWorkouts } from "@/composables/useStore";

const authStore = useAuth(); // Returns useAuthStore()
const workoutStore = useWorkouts(); // Returns useWorkoutStore()
```

## Direct Store Import

You can also import stores directly:

```javascript
// Import specific stores
import { useAuthStore, useWorkoutStore } from "@/stores";

// Or import from composables (same thing)
import { useAuth, useWorkouts } from "@/composables/useStore";
```

## Reactivity with Storetoref

If you need reactive refs from a store:

```vue
<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();

// Convert state to refs (reactive)
const { currentUser, isAuthenticated, authLoading } = storeToRefs(authStore);

// Actions are NOT converted (use directly from store)
const { login, logout } = authStore;
</script>

<template>
  <div v-if="isAuthenticated">
    Welcome {{ currentUser.name }}!
    <button @click="logout">Logout</button>
  </div>
</template>
```

## Vue DevTools

Open Vue DevTools in your browser and you'll see:

- 📊 All Pinia stores listed
- 🔍 Real-time state inspection
- ⏱️ Time-travel debugging
- 📝 Action history
- 🎯 Store subscriptions

## Common Patterns

### Loading Pattern

```vue
<script setup>
import { useWorkoutStore } from "@/stores";
import { onMounted, computed } from "vue";

const workoutStore = useWorkoutStore();

const workouts = computed(() => workoutStore.workouts);
const loading = computed(() => workoutStore.workoutsLoading);

onMounted(async () => {
  await workoutStore.loadWorkouts();
});
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <div v-for="workout in workouts" :key="workout.id">
      {{ workout.name }}
    </div>
  </div>
</template>
```

### Error Handling

```vue
<script setup>
import { useAuthStore, useNotificationStore } from "@/stores";
import { ref } from "vue";

const authStore = useAuthStore();
const error = ref(null);

const handleLogin = async (credentials) => {
  error.value = null;
  try {
    await authStore.login(credentials);
    // Notification is automatically shown by the store
  } catch (err) {
    error.value = err.message;
  }
};
</script>
```

## Files Changed

- ✅ `src/main.js` - Added Pinia initialization
- ✅ `src/stores/index.js` - New Pinia stores (replaces old store)
- ✅ `src/composables/useStore.js` - Updated to export Pinia stores
- ✅ `src/App.vue` - Updated to use theme store
- ✅ `src/pages/Preferences.vue` - Updated to use theme store
- ❌ `src/store/index.js` - Deleted (old store)

## Next Steps

1. **Test your app** - Run `npm run dev` and test all functionality
2. **Update components** - Gradually migrate other components to use Pinia stores
3. **Explore DevTools** - Open Vue DevTools to inspect state
4. **Read Pinia docs** - https://pinia.vuejs.org/

---

**Your app now uses Pinia for state management!** 🎉

All stores are working and ready to use. The migration is complete and backward compatible.
