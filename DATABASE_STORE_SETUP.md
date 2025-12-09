# Database Store Architecture

This document describes the database store layer for the Leap Fitness app.

## Overview

The database store is organized into three main layers:

1. **API Service** (`src/services/api.js`) - HTTP client for backend communication
2. **Database Service** (`src/services/database.js`) - Database operations organized by entity
3. **State Store** (`src/store/index.js`) - Vue state management
4. **Composables** (`src/composables/useStore.js`) - Vue composition API hooks

## Architecture

```
┌─────────────────────────────────────┐
│    Vue Components                   │
│    (using composables)              │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│    Composables (useStore)           │
│    - useAuth()                      │
│    - useWorkouts()                  │
│    - usePrograms()                  │
│    - useExercises()                 │
│    - etc.                           │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│    State Store                      │
│    - state (reactive)               │
│    - mutations                      │
│    - actions                        │
│    - getters                        │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│    Database Service                 │
│    - userService                    │
│    - workoutService                 │
│    - programService                 │
│    - exerciseService                │
│    - progressService                │
│    - etc.                           │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│    API Client                       │
│    - HTTP requests                  │
│    - Auth token management          │
│    - Error handling                 │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│    Backend API Server               │
│    (Node.js/Express)                │
└─────────────────────────────────────┘
```

## File Structure

```
src/
├── services/
│   ├── api.js           # APIClient class - HTTP communication
│   └── database.js      # Database services (userService, workoutService, etc.)
├── store/
│   └── index.js         # Vuex store (state, mutations, actions, getters)
├── composables/
│   └── useStore.js      # Vue composition API hooks
└── ...
```

## Usage

### 1. Using Composables in Components

Composables are the preferred way to use the store in Vue 3:

```vue
<template>
  <div>
    <button @click="startWorkout" :disabled="workoutsLoading">
      Start Workout
    </button>
    <div v-if="currentUserWorkout">
      Currently working out: {{ currentUserWorkout.name }}
    </div>
  </div>
</template>

<script setup>
import { useUserWorkouts } from "@/composables/useStore";
import { onMounted } from "vue";

const { workoutsLoading, currentUserWorkout, startWorkout } = useUserWorkouts();

onMounted(() => {
  // Load initial data if needed
});
</script>
```

### 2. Available Composables

#### useAuth()

```javascript
const {
  isAuthenticated,
  currentUser,
  authLoading,
  login,
  logout,
  register,
  updateProfile,
} = useAuth();
```

#### useWorkouts()

```javascript
const {
  workouts,
  workoutsLoading,
  workoutsByType,
  workoutsByDifficulty,
  loadWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = useWorkouts();
```

#### usePrograms()

```javascript
const { programs, programsLoading, loadPrograms, createProgram } =
  usePrograms();
```

#### useExercises()

```javascript
const { exercises, exercisesLoading, exercisesByMuscleGroup, loadExercises } =
  useExercises();
```

#### useUserWorkouts()

```javascript
const {
  userWorkouts,
  userWorkoutsLoading,
  currentUserWorkout,
  completedWorkouts,
  loadUserWorkouts,
  startWorkout,
  completeWorkout,
} = useUserWorkouts();
```

#### useProgress()

```javascript
const { userProgress, progressLoading, progressStats, loadUserProgress } =
  useProgress();
```

#### useGoals()

```javascript
const {
  userGoals,
  goalsLoading,
  activeGoals,
  completedGoals,
  loadUserGoals,
  createGoal,
  completeGoal,
} = useGoals();
```

#### usePreferences()

```javascript
const {
  userPreferences,
  preferencesLoading,
  loadUserPreferences,
  updateUserPreferences,
} = usePreferences();
```

#### useFavorites()

```javascript
const {
  favorites,
  favoritesLoading,
  isFavorited,
  loadFavorites,
  addFavorite,
  removeFavorite,
} = useFavorites();
```

#### useNotifications()

```javascript
const { notifications, removeNotification, clearNotifications } =
  useNotifications();
```

## API Endpoints

The store expects the following API endpoints:

### Authentication

- `POST /users/register` - Register user
- `POST /users/login` - Login user
- `GET /users/me` - Get current user
- `PUT /users/:id` - Update user profile
- `POST /users/:id/change-password` - Change password

### Workouts

- `GET /workouts` - List workouts (with filters)
- `GET /workouts/:id` - Get workout details
- `POST /workouts` - Create workout (admin)
- `PUT /workouts/:id` - Update workout (admin)
- `DELETE /workouts/:id` - Delete workout (admin)
- `GET /workouts/:id/exercises` - Get exercises in workout
- `POST /workouts/:id/exercises` - Add exercise to workout
- `PUT /workouts/:id/exercises/:exerciseId` - Update exercise in workout
- `DELETE /workouts/:id/exercises/:exerciseId` - Remove exercise from workout

### Programs

- `GET /programs` - List programs
- `GET /programs/:id` - Get program details
- `POST /programs` - Create program (admin)
- `PUT /programs/:id` - Update program (admin)
- `DELETE /programs/:id` - Delete program (admin)

### Exercises

- `GET /exercises` - List exercises (with filters)
- `GET /exercises/:id` - Get exercise details
- `POST /exercises` - Create exercise (admin)
- `PUT /exercises/:id` - Update exercise (admin)
- `DELETE /exercises/:id` - Delete exercise (admin)

### User Workouts

- `GET /users/:id/workouts` - Get user's workouts history
- `POST /users/:id/workouts` - Start a new workout
- `PUT /user-workouts/:id` - Complete/update workout
- `GET /users/:id/workouts/history` - Get workout history with pagination
- `GET /users/:id/workouts/stats` - Get workout statistics

### Progress

- `GET /users/:id/progress` - Get progress data (date range)
- `POST /users/:id/progress` - Record progress
- `GET /users/:id/progress/stats` - Get progress statistics
- `GET /users/:id/progress/weight` - Get weight history

### Goals

- `GET /users/:id/goals` - Get user's goals
- `POST /users/:id/goals` - Create goal
- `PUT /goals/:id` - Update goal
- `PATCH /goals/:id` - Update goal status
- `DELETE /goals/:id` - Delete goal

### Preferences

- `GET /users/:id/preferences` - Get user preferences
- `PUT /users/:id/preferences` - Update user preferences

### Favorites

- `GET /users/:id/favorites` - Get user's favorite workouts
- `POST /users/:id/favorites` - Add favorite
- `DELETE /users/:id/favorites/:workoutId` - Remove favorite

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:3001/api
VITE_AUTH_TIMEOUT=3600
VITE_ENABLE_SOCIAL_SHARING=true
VITE_ENABLE_ACHIEVEMENTS=false
VITE_ENABLE_COACHING=false
```

## State Structure

```javascript
state = {
  // Auth
  currentUser: null,
  isAuthenticated: false,
  authLoading: false,
  authError: null,

  // Workouts
  workouts: [],
  workoutsLoading: false,
  currentWorkout: null,

  // Programs
  programs: [],
  programsLoading: false,

  // Exercises
  exercises: [],
  exercisesLoading: false,

  // User workouts
  userWorkouts: [],
  userWorkoutsLoading: false,
  currentUserWorkout: null,

  // Progress
  userProgress: [],
  progressLoading: false,
  progressStats: null,

  // Goals
  userGoals: [],
  goalsLoading: false,

  // Preferences
  userPreferences: null,
  preferencesLoading: false,

  // Favorites
  favorites: [],
  favoritesLoading: false,

  // UI
  notifications: [],
};
```

## Error Handling

The store includes automatic error handling:

1. **API Errors** - Caught and logged
2. **401 Errors** - Trigger logout and redirect to login
3. **Notifications** - Displayed to user for all operations

## Authentication Flow

1. User submits login credentials
2. `useAuth().login()` is called
3. API client receives token from backend
4. Token is stored in localStorage and Authorization header
5. `currentUser` and `isAuthenticated` are updated in state
6. Components re-render with new auth state

## Data Persistence

- Auth token is persisted in localStorage
- Other data is stored in Vue's reactive state (cleared on page refresh)
- Consider using localStorage or IndexedDB for persisting user preferences/progress

## Performance Optimization

1. **Lazy loading** - Data is only fetched when needed
2. **Computed getters** - Filtered lists are computed on demand
3. **Caching** - State caches data to avoid multiple requests
4. **Debouncing** - Consider debouncing rapid state updates

## Best Practices

1. Always use composables in components
2. Load data in `onMounted` or `onBeforeMount` hooks
3. Handle loading and error states in templates
4. Use notifications for user feedback
5. Keep state normalized - avoid deeply nested structures
6. Use getters for derived state instead of computed in components
7. Keep components focused on UI, not data fetching

## Future Enhancements

- Add offline support with IndexedDB
- Implement real-time updates with WebSockets
- Add optimistic updates for better UX
- Implement caching strategies
- Add file upload for profile pictures and videos
- Add social features (friends, leaderboards)
