// Vuex Store - State management for the application
import { reactive, computed } from 'vue';
import { userService, preferencesService, programService, workoutService, exerciseService, userWorkoutService, progressService, goalService, favoriteService } from '@/services/database';

// Global state
const state = reactive({
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
});

// Getters
const getters = {
    isAuthenticated: () => state.isAuthenticated,
    currentUser: () => state.currentUser,

    workoutsByType: () => (type) => state.workouts.filter(w => w.workout_type === type),
    workoutsByDifficulty: () => (difficulty) => state.workouts.filter(w => w.difficulty_level === difficulty),

    programsByDifficulty: () => (difficulty) => state.programs.filter(p => p.difficulty_level === difficulty),

    exercisesByMuscleGroup: () => (muscleGroup) => state.exercises.filter(e => e.muscle_group === muscleGroup),

    completedWorkouts: () => state.userWorkouts.filter(w => w.status === 'completed'),
    activeGoals: () => state.userGoals.filter(g => g.status === 'active'),
    completedGoals: () => state.userGoals.filter(g => g.status === 'completed'),

    isFavorited: () => (workoutId) => state.favorites.some(f => f.workout_id === workoutId),
};

// Mutations
const mutations = {
    // Auth mutations
    SET_CURRENT_USER(user) {
        state.currentUser = user;
        state.isAuthenticated = !!user;
    },
    SET_AUTH_LOADING(loading) {
        state.authLoading = loading;
    },
    SET_AUTH_ERROR(error) {
        state.authError = error;
    },

    // Workout mutations
    SET_WORKOUTS(workouts) {
        state.workouts = workouts;
    },
    SET_CURRENT_WORKOUT(workout) {
        state.currentWorkout = workout;
    },
    SET_WORKOUTS_LOADING(loading) {
        state.workoutsLoading = loading;
    },
    ADD_WORKOUT(workout) {
        state.workouts.push(workout);
    },
    UPDATE_WORKOUT(workout) {
        const index = state.workouts.findIndex(w => w.id === workout.id);
        if (index !== -1) {
            state.workouts[index] = workout;
        }
    },
    REMOVE_WORKOUT(workoutId) {
        state.workouts = state.workouts.filter(w => w.id !== workoutId);
    },

    // Program mutations
    SET_PROGRAMS(programs) {
        state.programs = programs;
    },
    SET_PROGRAMS_LOADING(loading) {
        state.programsLoading = loading;
    },
    ADD_PROGRAM(program) {
        state.programs.push(program);
    },
    UPDATE_PROGRAM(program) {
        const index = state.programs.findIndex(p => p.id === program.id);
        if (index !== -1) {
            state.programs[index] = program;
        }
    },
    REMOVE_PROGRAM(programId) {
        state.programs = state.programs.filter(p => p.id !== programId);
    },

    // Exercise mutations
    SET_EXERCISES(exercises) {
        state.exercises = exercises;
    },
    SET_EXERCISES_LOADING(loading) {
        state.exercisesLoading = loading;
    },
    ADD_EXERCISE(exercise) {
        state.exercises.push(exercise);
    },
    UPDATE_EXERCISE(exercise) {
        const index = state.exercises.findIndex(e => e.id === exercise.id);
        if (index !== -1) {
            state.exercises[index] = exercise;
        }
    },
    REMOVE_EXERCISE(exerciseId) {
        state.exercises = state.exercises.filter(e => e.id !== exerciseId);
    },

    // User workouts mutations
    SET_USER_WORKOUTS(workouts) {
        state.userWorkouts = workouts;
    },
    SET_USER_WORKOUTS_LOADING(loading) {
        state.userWorkoutsLoading = loading;
    },
    SET_CURRENT_USER_WORKOUT(workout) {
        state.currentUserWorkout = workout;
    },
    ADD_USER_WORKOUT(workout) {
        state.userWorkouts.push(workout);
    },
    UPDATE_USER_WORKOUT(workout) {
        const index = state.userWorkouts.findIndex(w => w.id === workout.id);
        if (index !== -1) {
            state.userWorkouts[index] = workout;
        }
    },

    // Progress mutations
    SET_USER_PROGRESS(progress) {
        state.userProgress = progress;
    },
    SET_PROGRESS_LOADING(loading) {
        state.progressLoading = loading;
    },
    SET_PROGRESS_STATS(stats) {
        state.progressStats = stats;
    },

    // Goals mutations
    SET_USER_GOALS(goals) {
        state.userGoals = goals;
    },
    SET_GOALS_LOADING(loading) {
        state.goalsLoading = loading;
    },
    ADD_GOAL(goal) {
        state.userGoals.push(goal);
    },
    UPDATE_GOAL(goal) {
        const index = state.userGoals.findIndex(g => g.id === goal.id);
        if (index !== -1) {
            state.userGoals[index] = goal;
        }
    },
    REMOVE_GOAL(goalId) {
        state.userGoals = state.userGoals.filter(g => g.id !== goalId);
    },

    // Preferences mutations
    SET_USER_PREFERENCES(preferences) {
        state.userPreferences = preferences;
    },
    SET_PREFERENCES_LOADING(loading) {
        state.preferencesLoading = loading;
    },

    // Favorites mutations
    SET_FAVORITES(favorites) {
        state.favorites = favorites;
    },
    SET_FAVORITES_LOADING(loading) {
        state.favoritesLoading = loading;
    },
    ADD_FAVORITE(favorite) {
        if (!state.favorites.find(f => f.workout_id === favorite.workout_id)) {
            state.favorites.push(favorite);
        }
    },
    REMOVE_FAVORITE(workoutId) {
        state.favorites = state.favorites.filter(f => f.workout_id !== workoutId);
    },

    // Notifications mutations
    ADD_NOTIFICATION(notification) {
        state.notifications.push({
            id: Date.now(),
            ...notification,
        });
    },
    REMOVE_NOTIFICATION(notificationId) {
        state.notifications = state.notifications.filter(n => n.id !== notificationId);
    },
};

// Actions
const actions = {
    // Auth actions
    async login({ commit }, credentials) {
        commit('SET_AUTH_LOADING', true);
        commit('SET_AUTH_ERROR', null);
        try {
            const response = await userService.login(credentials.email, credentials.password);
            commit('SET_CURRENT_USER', response.user);
            commit('ADD_NOTIFICATION', { type: 'success', message: 'Logged in successfully' });
            return response;
        } catch (error) {
            commit('SET_AUTH_ERROR', error.message);
            throw error;
        } finally {
            commit('SET_AUTH_LOADING', false);
        }
    },

    async register({ commit }, userData) {
        commit('SET_AUTH_LOADING', true);
        commit('SET_AUTH_ERROR', null);
        try {
            const response = await userService.register(userData);
            commit('SET_CURRENT_USER', response.user);
            commit('ADD_NOTIFICATION', { type: 'success', message: 'Account created successfully' });
            return response;
        } catch (error) {
            commit('SET_AUTH_ERROR', error.message);
            throw error;
        } finally {
            commit('SET_AUTH_LOADING', false);
        }
    },

    async logout({ commit }) {
        await userService.logout();
        commit('SET_CURRENT_USER', null);
        commit('SET_USER_WORKOUTS', []);
        commit('SET_USER_GOALS', []);
        commit('ADD_NOTIFICATION', { type: 'info', message: 'Logged out successfully' });
    },

    async loadCurrentUser({ commit }) {
        try {
            const user = await userService.getCurrentUser();
            commit('SET_CURRENT_USER', user);
        } catch (error) {
            console.error('Failed to load current user:', error);
        }
    },

    async updateUserProfile({ commit }, profileData) {
        try {
            const updated = await userService.updateProfile(state.currentUser.id, profileData);
            commit('SET_CURRENT_USER', updated);
            commit('ADD_NOTIFICATION', { type: 'success', message: 'Profile updated' });
            return updated;
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to update profile' });
            throw error;
        }
    },

    // Workout actions
    async loadWorkouts({ commit }, filters = {}) {
        commit('SET_WORKOUTS_LOADING', true);
        try {
            const workouts = await workoutService.getWorkouts(filters);
            commit('SET_WORKOUTS', workouts);
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to load workouts' });
            throw error;
        } finally {
            commit('SET_WORKOUTS_LOADING', false);
        }
    },

    async loadWorkout({ commit }, workoutId) {
        try {
            const workout = await workoutService.getWorkout(workoutId);
            commit('SET_CURRENT_WORKOUT', workout);
            return workout;
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to load workout' });
            throw error;
        }
    },

    async createWorkout({ commit }, workoutData) {
        try {
            const workout = await workoutService.createWorkout(workoutData);
            commit('ADD_WORKOUT', workout);
            commit('ADD_NOTIFICATION', { type: 'success', message: 'Workout created' });
            return workout;
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to create workout' });
            throw error;
        }
    },

    async updateWorkout({ commit }, { workoutId, workoutData }) {
        try {
            const updated = await workoutService.updateWorkout(workoutId, workoutData);
            commit('UPDATE_WORKOUT', updated);
            commit('ADD_NOTIFICATION', { type: 'success', message: 'Workout updated' });
            return updated;
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to update workout' });
            throw error;
        }
    },

    async deleteWorkout({ commit }, workoutId) {
        try {
            await workoutService.deleteWorkout(workoutId);
            commit('REMOVE_WORKOUT', workoutId);
            commit('ADD_NOTIFICATION', { type: 'success', message: 'Workout deleted' });
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to delete workout' });
            throw error;
        }
    },

    // Program actions
    async loadPrograms({ commit }, filters = {}) {
        commit('SET_PROGRAMS_LOADING', true);
        try {
            const programs = await programService.getPrograms(filters);
            commit('SET_PROGRAMS', programs);
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to load programs' });
            throw error;
        } finally {
            commit('SET_PROGRAMS_LOADING', false);
        }
    },

    async createProgram({ commit }, programData) {
        try {
            const program = await programService.createProgram(programData);
            commit('ADD_PROGRAM', program);
            commit('ADD_NOTIFICATION', { type: 'success', message: 'Program created' });
            return program;
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to create program' });
            throw error;
        }
    },

    // Exercise actions
    async loadExercises({ commit }, filters = {}) {
        commit('SET_EXERCISES_LOADING', true);
        try {
            const exercises = await exerciseService.getExercises(filters);
            commit('SET_EXERCISES', exercises);
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to load exercises' });
            throw error;
        } finally {
            commit('SET_EXERCISES_LOADING', false);
        }
    },

    // User workout actions
    async startWorkout({ commit }, workoutId) {
        try {
            const userWorkout = await userWorkoutService.startWorkout(state.currentUser.id, workoutId);
            commit('ADD_USER_WORKOUT', userWorkout);
            commit('SET_CURRENT_USER_WORKOUT', userWorkout);
            commit('ADD_NOTIFICATION', { type: 'success', message: 'Workout started' });
            return userWorkout;
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to start workout' });
            throw error;
        }
    },

    async completeWorkout({ commit }, { userWorkoutId, workoutData }) {
        try {
            const completed = await userWorkoutService.completeWorkout(userWorkoutId, workoutData);
            commit('UPDATE_USER_WORKOUT', completed);
            commit('SET_CURRENT_USER_WORKOUT', null);
            commit('ADD_NOTIFICATION', { type: 'success', message: 'Workout completed' });
            return completed;
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to complete workout' });
            throw error;
        }
    },

    async loadUserWorkouts({ commit }) {
        commit('SET_USER_WORKOUTS_LOADING', true);
        try {
            const workouts = await userWorkoutService.getUserWorkouts(state.currentUser.id);
            commit('SET_USER_WORKOUTS', workouts);
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to load workout history' });
            throw error;
        } finally {
            commit('SET_USER_WORKOUTS_LOADING', false);
        }
    },

    // Progress actions
    async loadUserProgress({ commit }) {
        commit('SET_PROGRESS_LOADING', true);
        try {
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            const progress = await progressService.getUserProgress(state.currentUser.id, startDate, endDate);
            const stats = await progressService.getProgressStats(state.currentUser.id);
            commit('SET_USER_PROGRESS', progress);
            commit('SET_PROGRESS_STATS', stats);
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to load progress' });
            throw error;
        } finally {
            commit('SET_PROGRESS_LOADING', false);
        }
    },

    // Goals actions
    async loadUserGoals({ commit }) {
        commit('SET_GOALS_LOADING', true);
        try {
            const goals = await goalService.getUserGoals(state.currentUser.id);
            commit('SET_USER_GOALS', goals);
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to load goals' });
            throw error;
        } finally {
            commit('SET_GOALS_LOADING', false);
        }
    },

    async createGoal({ commit }, goalData) {
        try {
            const goal = await goalService.createGoal(state.currentUser.id, goalData);
            commit('ADD_GOAL', goal);
            commit('ADD_NOTIFICATION', { type: 'success', message: 'Goal created' });
            return goal;
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to create goal' });
            throw error;
        }
    },

    async completeGoal({ commit }, goalId) {
        try {
            const goal = await goalService.completeGoal(goalId);
            commit('UPDATE_GOAL', goal);
            commit('ADD_NOTIFICATION', { type: 'success', message: 'Goal completed' });
            return goal;
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to complete goal' });
            throw error;
        }
    },

    // Preferences actions
    async loadUserPreferences({ commit }) {
        commit('SET_PREFERENCES_LOADING', true);
        try {
            const preferences = await preferencesService.getPreferences(state.currentUser.id);
            commit('SET_USER_PREFERENCES', preferences);
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to load preferences' });
            throw error;
        } finally {
            commit('SET_PREFERENCES_LOADING', false);
        }
    },

    async updateUserPreferences({ commit }, preferences) {
        try {
            const updated = await preferencesService.updatePreferences(state.currentUser.id, preferences);
            commit('SET_USER_PREFERENCES', updated);
            commit('ADD_NOTIFICATION', { type: 'success', message: 'Preferences updated' });
            return updated;
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to update preferences' });
            throw error;
        }
    },

    // Favorites actions
    async loadFavorites({ commit }) {
        commit('SET_FAVORITES_LOADING', true);
        try {
            const favorites = await favoriteService.getUserFavorites(state.currentUser.id);
            commit('SET_FAVORITES', favorites);
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to load favorites' });
            throw error;
        } finally {
            commit('SET_FAVORITES_LOADING', false);
        }
    },

    async addFavorite({ commit }, workoutId) {
        try {
            const favorite = await favoriteService.addFavorite(state.currentUser.id, workoutId);
            commit('ADD_FAVORITE', favorite);
            commit('ADD_NOTIFICATION', { type: 'success', message: 'Added to favorites' });
            return favorite;
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to add favorite' });
            throw error;
        }
    },

    async removeFavorite({ commit }, workoutId) {
        try {
            await favoriteService.removeFavorite(state.currentUser.id, workoutId);
            commit('REMOVE_FAVORITE', workoutId);
            commit('ADD_NOTIFICATION', { type: 'success', message: 'Removed from favorites' });
        } catch (error) {
            commit('ADD_NOTIFICATION', { type: 'error', message: 'Failed to remove favorite' });
            throw error;
        }
    },

    // Notification actions
    removeNotification({ commit }, notificationId) {
        commit('REMOVE_NOTIFICATION', notificationId);
    },

    clearNotifications({ commit }) {
        state.notifications = [];
    },
};

// Create store
export const useStore = () => ({
    state,
    getters,
    mutations,
    actions,

    // Helper methods
    commit(mutation, payload) {
        if (typeof mutation === 'string' && mutations[mutation]) {
            mutations[mutation](payload);
        }
    },

    async dispatch(action, payload) {
        if (typeof action === 'string' && actions[action]) {
            return await actions[action]({ commit: this.commit }, payload);
        }
    },
});
