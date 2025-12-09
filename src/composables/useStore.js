// Composable hooks for using Pinia stores in Vue components
// Simply re-export all Pinia stores for easy access

export {
    useAuthStore,
    useWorkoutStore,
    useProgramStore,
    useExerciseStore,
    useUserWorkoutStore,
    useProgressStore,
    useGoalStore,
    usePreferencesStore,
    useFavoriteStore,
    useNotificationStore,
    useThemeStore,
} from '../stores/index.js';

// Legacy compatibility wrappers (for easier migration)
import {
    useAuthStore,
    useWorkoutStore,
    useProgramStore,
    useExerciseStore,
    useUserWorkoutStore,
    useProgressStore,
    useGoalStore,
    usePreferencesStore,
    useFavoriteStore,
    useNotificationStore,
    useThemeStore,
} from '../stores/index.js';

export function useAuth() {
    return useAuthStore();
}

export function useWorkouts() {
    return useWorkoutStore();
}

export function usePrograms() {
    return useProgramStore();
}

export function useExercises() {
    return useExerciseStore();
}

export function useUserWorkouts() {
    return useUserWorkoutStore();
}

export function useProgress() {
    return useProgressStore();
}

export function useGoals() {
    return useGoalStore();
}

export function usePreferences() {
    return usePreferencesStore();
}

export function useFavorites() {
    return useFavoriteStore();
}

export function useNotifications() {
    return useNotificationStore();
}

export function useTheme() {
    return useThemeStore();
}
