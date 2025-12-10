// Pinia Stores - State management for the application
import { defineStore } from 'pinia';
import { userService, preferencesService, programService, workoutService, exerciseService, userWorkoutService, progressService, achievementService, goalService, favoriteService } from '../services/db.js';

// Auth Store
export const useAuthStore = defineStore('auth', {
    state: () => ({
        currentUser: null,
        isAuthenticated: false,
        authLoading: false,
        authError: null,
    }),

    getters: {
        user: (state) => state.currentUser,
        isLoggedIn: (state) => state.isAuthenticated,
    },

    actions: {
        async login(credentials) {
            this.authLoading = true;
            this.authError = null;
            try {
                const response = await userService.login(credentials.email, credentials.password);
                this.currentUser = response;
                this.isAuthenticated = true;
                useNotificationStore().addNotification({ type: 'success', message: 'Logged in successfully' });
                return response;
            } catch (error) {
                this.authError = error.message;
                throw error;
            } finally {
                this.authLoading = false;
            }
        },

        async register(userData) {
            this.authLoading = true;
            this.authError = null;
            try {
                const response = await userService.register(userData);
                this.currentUser = response;
                this.isAuthenticated = true;
                useNotificationStore().addNotification({ type: 'success', message: 'Account created successfully' });
                return response;
            } catch (error) {
                this.authError = error.message;
                throw error;
            } finally {
                this.authLoading = false;
            }
        },

        async logout() {
            await userService.logout();
            this.currentUser = null;
            this.isAuthenticated = false;
            useNotificationStore().addNotification({ type: 'info', message: 'Logged out successfully' });
        },

        async loadCurrentUser() {
            try {
                const user = await userService.getCurrentUser();
                this.currentUser = user;
                this.isAuthenticated = true;
            } catch (error) {
                console.error('Failed to load current user:', error);
                this.currentUser = null;
                this.isAuthenticated = false;
            }
        },

        async updateProfile(profileData) {
            try {
                const updated = await userService.updateProfile(this.currentUser.id, profileData);
                this.currentUser = updated;
                useNotificationStore().addNotification({ type: 'success', message: 'Profile updated' });
                return updated;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to update profile' });
                throw error;
            }
        },
    },
});

// Workout Store
export const useWorkoutStore = defineStore('workout', {
    state: () => ({
        workouts: [],
        workoutsLoading: false,
        currentWorkout: null,
    }),

    getters: {
        workoutsByType: (state) => (type) => state.workouts.filter(w => w.workout_type === type),
        workoutsByDifficulty: (state) => (difficulty) => state.workouts.filter(w => w.difficulty === difficulty),
        workoutsByCategory: (state) => (category) => state.workouts.filter(w => w.category === category),
    },

    actions: {
        async loadWorkouts(filters = {}) {
            this.workoutsLoading = true;
            try {
                const workouts = await workoutService.getWorkouts(filters);
                this.workouts = workouts;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to load workouts' });
                throw error;
            } finally {
                this.workoutsLoading = false;
            }
        },

        async loadWorkout(workoutId) {
            try {
                const workout = await workoutService.getWorkout(workoutId);
                this.currentWorkout = workout;
                return workout;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to load workout' });
                throw error;
            }
        },

        async createWorkout(workoutData) {
            try {
                const workout = await workoutService.createWorkout(workoutData);
                this.workouts.push(workout);
                useNotificationStore().addNotification({ type: 'success', message: 'Workout created' });
                return workout;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to create workout' });
                throw error;
            }
        },

        async updateWorkout(workoutId, workoutData) {
            try {
                const updated = await workoutService.updateWorkout(workoutId, workoutData);
                const index = this.workouts.findIndex(w => w.id === workoutId);
                if (index !== -1) {
                    this.workouts[index] = updated;
                }
                useNotificationStore().addNotification({ type: 'success', message: 'Workout updated' });
                return updated;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to update workout' });
                throw error;
            }
        },

        async deleteWorkout(workoutId) {
            try {
                await workoutService.deleteWorkout(workoutId);
                this.workouts = this.workouts.filter(w => w.id !== workoutId);
                useNotificationStore().addNotification({ type: 'success', message: 'Workout deleted' });
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to delete workout' });
                throw error;
            }
        },
    },
});

// Program Store
export const useProgramStore = defineStore('program', {
    state: () => ({
        programs: [],
        programsLoading: false,
    }),

    getters: {
        programsByDifficulty: (state) => (difficulty) => state.programs.filter(p => p.difficulty === difficulty),
    },

    actions: {
        async loadPrograms(filters = {}) {
            this.programsLoading = true;
            try {
                const programs = await programService.getPrograms(filters);
                this.programs = programs;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to load programs' });
                throw error;
            } finally {
                this.programsLoading = false;
            }
        },

        async createProgram(programData) {
            try {
                const program = await programService.createProgram(programData);
                this.programs.push(program);
                useNotificationStore().addNotification({ type: 'success', message: 'Program created' });
                return program;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to create program' });
                throw error;
            }
        },
    },
});

// Exercise Store
export const useExerciseStore = defineStore('exercise', {
    state: () => ({
        exercises: [],
        exercisesLoading: false,
    }),

    getters: {
        exercisesByCategory: (state) => (category) => state.exercises.filter(e => e.category === category),
        exercisesByDifficulty: (state) => (difficulty) => state.exercises.filter(e => e.difficulty === difficulty),
    },

    actions: {
        async loadExercises(filters = {}) {
            this.exercisesLoading = true;
            try {
                const exercises = await exerciseService.getExercises(filters);
                this.exercises = exercises;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to load exercises' });
                throw error;
            } finally {
                this.exercisesLoading = false;
            }
        },
    },
});

// User Workout Store (Track workout sessions)
export const useUserWorkoutStore = defineStore('userWorkout', {
    state: () => ({
        userWorkouts: [],
        userWorkoutsLoading: false,
        currentUserWorkout: null,
    }),

    getters: {
        completedWorkouts: (state) => state.userWorkouts.filter(w => w.status === 'completed'),
        inProgressWorkouts: (state) => state.userWorkouts.filter(w => w.status === 'in-progress'),
    },

    actions: {
        async startWorkout(workoutId) {
            try {
                const authStore = useAuthStore();
                const userWorkout = await userWorkoutService.startWorkout(authStore.currentUser.id, workoutId);
                this.userWorkouts.push(userWorkout);
                this.currentUserWorkout = userWorkout;
                useNotificationStore().addNotification({ type: 'success', message: 'Workout started' });
                return userWorkout;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to start workout' });
                throw error;
            }
        },

        async completeWorkout(userWorkoutId, workoutData) {
            try {
                const completed = await userWorkoutService.completeWorkout(userWorkoutId, workoutData);
                const index = this.userWorkouts.findIndex(w => w.id === userWorkoutId);
                if (index !== -1) {
                    this.userWorkouts[index] = completed;
                }
                this.currentUserWorkout = null;
                useNotificationStore().addNotification({ type: 'success', message: 'Workout completed!' });
                return completed;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to complete workout' });
                throw error;
            }
        },

        async pauseWorkout(userWorkoutId) {
            try {
                const paused = await userWorkoutService.pauseWorkout(userWorkoutId);
                const index = this.userWorkouts.findIndex(w => w.id === userWorkoutId);
                if (index !== -1) {
                    this.userWorkouts[index] = paused;
                }
                return paused;
            } catch (error) {
                throw error;
            }
        },

        async resumeWorkout(userWorkoutId) {
            try {
                const resumed = await userWorkoutService.resumeWorkout(userWorkoutId);
                const index = this.userWorkouts.findIndex(w => w.id === userWorkoutId);
                if (index !== -1) {
                    this.userWorkouts[index] = resumed;
                }
                return resumed;
            } catch (error) {
                throw error;
            }
        },

        async loadUserWorkouts() {
            this.userWorkoutsLoading = true;
            try {
                const authStore = useAuthStore();
                const workouts = await userWorkoutService.getUserWorkouts(authStore.currentUser.id);
                this.userWorkouts = workouts;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to load workout history' });
                throw error;
            } finally {
                this.userWorkoutsLoading = false;
            }
        },

        async loadCurrentWorkout() {
            try {
                const authStore = useAuthStore();
                const current = await userWorkoutService.getCurrentUserWorkout(authStore.currentUser.id);
                this.currentUserWorkout = current;
                return current;
            } catch (error) {
                console.error('Failed to load current workout:', error);
            }
        },
    },
});

// Progress Store
export const useProgressStore = defineStore('progress', {
    state: () => ({
        userProgress: [],
        progressLoading: false,
        progressStats: null,
    }),

    actions: {
        async loadUserProgress(startDate = null, endDate = null) {
            this.progressLoading = true;
            try {
                const authStore = useAuthStore();
                if (!startDate) {
                    startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                }
                if (!endDate) {
                    endDate = new Date();
                }
                const progress = await progressService.getUserProgress(authStore.currentUser.id, startDate, endDate);
                this.userProgress = progress;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to load progress' });
                throw error;
            } finally {
                this.progressLoading = false;
            }
        },

        async loadStats() {
            try {
                const authStore = useAuthStore();
                const stats = await progressService.getStats(authStore.currentUser.id);
                this.progressStats = stats;
                return stats;
            } catch (error) {
                throw error;
            }
        },
    },
});

// Goals Store
export const useGoalStore = defineStore('goal', {
    state: () => ({
        userGoals: [],
        goalsLoading: false,
    }),

    getters: {
        activeGoals: (state) => state.userGoals.filter(g => g.status === 'active'),
        completedGoals: (state) => state.userGoals.filter(g => g.status === 'completed'),
    },

    actions: {
        async loadUserGoals() {
            this.goalsLoading = true;
            try {
                const authStore = useAuthStore();
                const goals = await goalService.getUserGoals(authStore.currentUser.id);
                this.userGoals = goals;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to load goals' });
                throw error;
            } finally {
                this.goalsLoading = false;
            }
        },

        async createGoal(goalData) {
            try {
                const authStore = useAuthStore();
                const goal = await goalService.createGoal(authStore.currentUser.id, goalData);
                this.userGoals.push(goal);
                useNotificationStore().addNotification({ type: 'success', message: 'Goal created' });
                return goal;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to create goal' });
                throw error;
            }
        },

        async completeGoal(goalId) {
            try {
                const goal = await goalService.completeGoal(goalId);
                const index = this.userGoals.findIndex(g => g.id === goalId);
                if (index !== -1) {
                    this.userGoals[index] = goal;
                }
                useNotificationStore().addNotification({ type: 'success', message: 'Goal completed! 🎉' });
                return goal;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to complete goal' });
                throw error;
            }
        },
    },
});

// Preferences Store
export const usePreferencesStore = defineStore('preferences', {
    state: () => ({
        userPreferences: null,
        preferencesLoading: false,
    }),

    actions: {
        async loadUserPreferences() {
            this.preferencesLoading = true;
            try {
                const authStore = useAuthStore();
                const preferences = await preferencesService.getPreferences(authStore.currentUser.id);
                this.userPreferences = preferences;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to load preferences' });
                throw error;
            } finally {
                this.preferencesLoading = false;
            }
        },

        async updateUserPreferences(preferences) {
            try {
                const authStore = useAuthStore();
                const updated = await preferencesService.updatePreferences(authStore.currentUser.id, preferences);
                this.userPreferences = updated;
                useNotificationStore().addNotification({ type: 'success', message: 'Preferences updated' });
                return updated;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to update preferences' });
                throw error;
            }
        },
    },
});

// Favorites Store
export const useFavoriteStore = defineStore('favorite', {
    state: () => ({
        favorites: [],
        favoritesLoading: false,
    }),

    getters: {
        isFavorited: (state) => (workoutId) => state.favorites.some(f => f.workoutId === workoutId),
    },

    actions: {
        async loadFavorites() {
            this.favoritesLoading = true;
            try {
                const authStore = useAuthStore();
                const favorites = await favoriteService.getUserFavorites(authStore.currentUser.id);
                this.favorites = favorites;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to load favorites' });
                throw error;
            } finally {
                this.favoritesLoading = false;
            }
        },

        async addFavorite(workoutId) {
            try {
                const authStore = useAuthStore();
                const favorite = await favoriteService.addFavorite(authStore.currentUser.id, workoutId);
                this.favorites.push(favorite);
                useNotificationStore().addNotification({ type: 'success', message: 'Added to favorites' });
                return favorite;
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to add favorite' });
                throw error;
            }
        },

        async removeFavorite(workoutId) {
            try {
                const authStore = useAuthStore();
                await favoriteService.removeFavorite(authStore.currentUser.id, workoutId);
                this.favorites = this.favorites.filter(f => f.workoutId !== workoutId);
                useNotificationStore().addNotification({ type: 'success', message: 'Removed from favorites' });
            } catch (error) {
                useNotificationStore().addNotification({ type: 'error', message: 'Failed to remove favorite' });
                throw error;
            }
        },
    },
});

// Workout Logs Store
export const useWorkoutLogStore = defineStore('workoutLog', {
    state: () => ({
        workoutLogs: [],
        workoutStats: null,
        logsLoading: false,
    }),

    actions: {
        async loadUserWorkoutLogs() {
            this.logsLoading = true;
            try {
                const authStore = useAuthStore();
                const { workoutLogService } = await import('../services/db.js');
                const logs = await workoutLogService.getUserWorkoutLogs(authStore.currentUser.id);
                this.workoutLogs = logs;
            } catch (error) {
                console.error('Failed to load workout logs:', error);
                throw error;
            } finally {
                this.logsLoading = false;
            }
        },

        async loadUserWorkoutStats() {
            try {
                const authStore = useAuthStore();
                const { workoutLogService } = await import('../services/db.js');
                const stats = await workoutLogService.getUserWorkoutStats(authStore.currentUser.id);
                this.workoutStats = stats;
            } catch (error) {
                console.error('Failed to load workout stats:', error);
                throw error;
            }
        },
    },
});

// Notification Store
export const useNotificationStore = defineStore('notification', {
    state: () => ({
        notifications: [],
    }),

    actions: {
        addNotification(notification) {
            this.notifications.push({
                id: Date.now(),
                ...notification,
            });

            // Auto-remove after 5 seconds
            setTimeout(() => {
                this.removeNotification(notification.id);
            }, 5000);
        },

        removeNotification(notificationId) {
            this.notifications = this.notifications.filter(n => n.id !== notificationId);
        },

        clearNotifications() {
            this.notifications = [];
        },
    },
});

// Theme Store
export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: localStorage.getItem('theme') || 'light',
    }),

    getters: {
        isDarkMode: (state) => state.theme === 'dark',
    },

    actions: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            this.applyTheme();
        },

        setTheme(theme) {
            this.theme = theme;
            this.applyTheme();
        },

        applyTheme() {
            localStorage.setItem('theme', this.theme);
            document.documentElement.setAttribute('data-theme', this.theme);
        },

        initTheme() {
            this.applyTheme();
        },
    },
});
