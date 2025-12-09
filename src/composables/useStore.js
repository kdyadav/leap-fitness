// Composable for using the store in Vue components
import { useStore as baseUseStore } from '@/store/index';

let storeInstance = null;

export function useStore() {
    if (!storeInstance) {
        storeInstance = baseUseStore();
    }
    return storeInstance;
}

// Composable hooks for common operations
export function useAuth() {
    const store = useStore();

    return {
        isAuthenticated: () => store.state.isAuthenticated,
        currentUser: () => store.state.currentUser,
        authLoading: () => store.state.authLoading,
        authError: () => store.state.authError,

        async login(credentials) {
            return store.dispatch('login', credentials);
        },

        async register(userData) {
            return store.dispatch('register', userData);
        },

        async logout() {
            return store.dispatch('logout');
        },

        async loadCurrentUser() {
            return store.dispatch('loadCurrentUser');
        },

        async updateProfile(profileData) {
            return store.dispatch('updateUserProfile', profileData);
        },
    };
}

export function useWorkouts() {
    const store = useStore();

    return {
        workouts: () => store.state.workouts,
        workoutsLoading: () => store.state.workoutsLoading,
        currentWorkout: () => store.state.currentWorkout,

        workoutsByType: (type) => store.getters.workoutsByType(type),
        workoutsByDifficulty: (difficulty) => store.getters.workoutsByDifficulty(difficulty),

        async loadWorkouts(filters) {
            return store.dispatch('loadWorkouts', filters);
        },

        async loadWorkout(workoutId) {
            return store.dispatch('loadWorkout', workoutId);
        },

        async createWorkout(workoutData) {
            return store.dispatch('createWorkout', workoutData);
        },

        async updateWorkout(workoutId, workoutData) {
            return store.dispatch('updateWorkout', { workoutId, workoutData });
        },

        async deleteWorkout(workoutId) {
            return store.dispatch('deleteWorkout', workoutId);
        },
    };
}

export function usePrograms() {
    const store = useStore();

    return {
        programs: () => store.state.programs,
        programsLoading: () => store.state.programsLoading,

        programsByDifficulty: (difficulty) => store.getters.programsByDifficulty(difficulty),

        async loadPrograms(filters) {
            return store.dispatch('loadPrograms', filters);
        },

        async createProgram(programData) {
            return store.dispatch('createProgram', programData);
        },
    };
}

export function useExercises() {
    const store = useStore();

    return {
        exercises: () => store.state.exercises,
        exercisesLoading: () => store.state.exercisesLoading,

        exercisesByMuscleGroup: (muscleGroup) => store.getters.exercisesByMuscleGroup(muscleGroup),

        async loadExercises(filters) {
            return store.dispatch('loadExercises', filters);
        },
    };
}

export function useUserWorkouts() {
    const store = useStore();

    return {
        userWorkouts: () => store.state.userWorkouts,
        userWorkoutsLoading: () => store.state.userWorkoutsLoading,
        currentUserWorkout: () => store.state.currentUserWorkout,

        completedWorkouts: () => store.getters.completedWorkouts,

        async loadUserWorkouts() {
            return store.dispatch('loadUserWorkouts');
        },

        async startWorkout(workoutId) {
            return store.dispatch('startWorkout', workoutId);
        },

        async completeWorkout(userWorkoutId, workoutData) {
            return store.dispatch('completeWorkout', { userWorkoutId, workoutData });
        },
    };
}

export function useProgress() {
    const store = useStore();

    return {
        userProgress: () => store.state.userProgress,
        progressLoading: () => store.state.progressLoading,
        progressStats: () => store.state.progressStats,

        async loadUserProgress() {
            return store.dispatch('loadUserProgress');
        },
    };
}

export function useGoals() {
    const store = useStore();

    return {
        userGoals: () => store.state.userGoals,
        goalsLoading: () => store.state.goalsLoading,

        activeGoals: () => store.getters.activeGoals,
        completedGoals: () => store.getters.completedGoals,

        async loadUserGoals() {
            return store.dispatch('loadUserGoals');
        },

        async createGoal(goalData) {
            return store.dispatch('createGoal', goalData);
        },

        async completeGoal(goalId) {
            return store.dispatch('completeGoal', goalId);
        },
    };
}

export function usePreferences() {
    const store = useStore();

    return {
        userPreferences: () => store.state.userPreferences,
        preferencesLoading: () => store.state.preferencesLoading,

        async loadUserPreferences() {
            return store.dispatch('loadUserPreferences');
        },

        async updateUserPreferences(preferences) {
            return store.dispatch('updateUserPreferences', preferences);
        },
    };
}

export function useFavorites() {
    const store = useStore();

    return {
        favorites: () => store.state.favorites,
        favoritesLoading: () => store.state.favoritesLoading,

        isFavorited: (workoutId) => store.getters.isFavorited(workoutId),

        async loadFavorites() {
            return store.dispatch('loadFavorites');
        },

        async addFavorite(workoutId) {
            return store.dispatch('addFavorite', workoutId);
        },

        async removeFavorite(workoutId) {
            return store.dispatch('removeFavorite', workoutId);
        },
    };
}

export function useNotifications() {
    const store = useStore();

    return {
        notifications: () => store.state.notifications,

        removeNotification(notificationId) {
            store.commit('REMOVE_NOTIFICATION', notificationId);
        },

        clearNotifications() {
            store.dispatch('clearNotifications');
        },
    };
}
