// Database Service - Manages all database operations
import { apiClient } from './api';

// User Service
export const userService = {
    async register(userData) {
        return apiClient.post('/users/register', userData);
    },

    async login(email, password) {
        const response = await apiClient.post('/users/login', { email, password });
        if (response.token) {
            apiClient.setToken(response.token);
        }
        return response;
    },

    async logout() {
        apiClient.setToken(null);
    },

    async getCurrentUser() {
        return apiClient.get('/users/me');
    },

    async updateProfile(userId, profileData) {
        return apiClient.put(`/users/${userId}`, profileData);
    },

    async getUser(userId) {
        return apiClient.get(`/users/${userId}`);
    },

    async updatePassword(userId, currentPassword, newPassword) {
        return apiClient.post(`/users/${userId}/change-password`, {
            currentPassword,
            newPassword,
        });
    },
};

// User Preferences Service
export const preferencesService = {
    async getPreferences(userId) {
        return apiClient.get(`/users/${userId}/preferences`);
    },

    async updatePreferences(userId, preferences) {
        return apiClient.put(`/users/${userId}/preferences`, preferences);
    },
};

// Workout Programs Service
export const programService = {
    async getPrograms() {
        return apiClient.get('/programs');
    },

    async getProgram(programId) {
        return apiClient.get(`/programs/${programId}`);
    },

    async createProgram(programData) {
        return apiClient.post('/programs', programData);
    },

    async updateProgram(programId, programData) {
        return apiClient.put(`/programs/${programId}`, programData);
    },

    async deleteProgram(programId) {
        return apiClient.delete(`/programs/${programId}`);
    },

    async getProgramsByDifficulty(difficulty) {
        return apiClient.get(`/programs?difficulty=${difficulty}`);
    },
};

// Workouts Service
export const workoutService = {
    async getWorkouts(filters = {}) {
        const query = new URLSearchParams(filters).toString();
        return apiClient.get(`/workouts${query ? `?${query}` : ''}`);
    },

    async getWorkout(workoutId) {
        return apiClient.get(`/workouts/${workoutId}`);
    },

    async createWorkout(workoutData) {
        return apiClient.post('/workouts', workoutData);
    },

    async updateWorkout(workoutId, workoutData) {
        return apiClient.put(`/workouts/${workoutId}`, workoutData);
    },

    async deleteWorkout(workoutId) {
        return apiClient.delete(`/workouts/${workoutId}`);
    },

    async getWorkoutExercises(workoutId) {
        return apiClient.get(`/workouts/${workoutId}/exercises`);
    },

    async addExerciseToWorkout(workoutId, exerciseData) {
        return apiClient.post(`/workouts/${workoutId}/exercises`, exerciseData);
    },

    async updateWorkoutExercise(workoutId, exerciseId, exerciseData) {
        return apiClient.put(`/workouts/${workoutId}/exercises/${exerciseId}`, exerciseData);
    },

    async removeExerciseFromWorkout(workoutId, exerciseId) {
        return apiClient.delete(`/workouts/${workoutId}/exercises/${exerciseId}`);
    },
};

// Exercises Service
export const exerciseService = {
    async getExercises(filters = {}) {
        const query = new URLSearchParams(filters).toString();
        return apiClient.get(`/exercises${query ? `?${query}` : ''}`);
    },

    async getExercise(exerciseId) {
        return apiClient.get(`/exercises/${exerciseId}`);
    },

    async createExercise(exerciseData) {
        return apiClient.post('/exercises', exerciseData);
    },

    async updateExercise(exerciseId, exerciseData) {
        return apiClient.put(`/exercises/${exerciseId}`, exerciseData);
    },

    async deleteExercise(exerciseId) {
        return apiClient.delete(`/exercises/${exerciseId}`);
    },

    async getExercisesByMuscleGroup(muscleGroup) {
        return apiClient.get(`/exercises?muscle_group=${muscleGroup}`);
    },
};

// User Workouts Service
export const userWorkoutService = {
    async getUserWorkouts(userId, filters = {}) {
        const query = new URLSearchParams(filters).toString();
        return apiClient.get(`/users/${userId}/workouts${query ? `?${query}` : ''}`);
    },

    async startWorkout(userId, workoutId) {
        return apiClient.post(`/users/${userId}/workouts`, {
            workout_id: workoutId,
            status: 'started',
            started_at: new Date().toISOString(),
        });
    },

    async completeWorkout(userWorkoutId, workoutData) {
        return apiClient.put(`/user-workouts/${userWorkoutId}`, {
            ...workoutData,
            status: 'completed',
            completed_at: new Date().toISOString(),
        });
    },

    async getWorkoutHistory(userId, limit = 50, offset = 0) {
        return apiClient.get(`/users/${userId}/workouts/history?limit=${limit}&offset=${offset}`);
    },

    async getWorkoutStats(userId, startDate, endDate) {
        return apiClient.get(`/users/${userId}/workouts/stats?start_date=${startDate}&end_date=${endDate}`);
    },
};

// Exercise Logs Service
export const exerciseLogService = {
    async logExercise(userWorkoutId, exerciseData) {
        return apiClient.post(`/user-workouts/${userWorkoutId}/exercises`, exerciseData);
    },

    async updateExerciseLog(exerciseLogId, exerciseData) {
        return apiClient.put(`/exercise-logs/${exerciseLogId}`, exerciseData);
    },

    async getExerciseLogs(userWorkoutId) {
        return apiClient.get(`/user-workouts/${userWorkoutId}/exercises`);
    },
};

// Progress Service
export const progressService = {
    async getUserProgress(userId, startDate, endDate) {
        return apiClient.get(`/users/${userId}/progress?start_date=${startDate}&end_date=${endDate}`);
    },

    async recordProgress(userId, progressData) {
        return apiClient.post(`/users/${userId}/progress`, progressData);
    },

    async getProgressStats(userId) {
        return apiClient.get(`/users/${userId}/progress/stats`);
    },

    async getWeightHistory(userId) {
        return apiClient.get(`/users/${userId}/progress/weight`);
    },
};

// Goals Service
export const goalService = {
    async getUserGoals(userId) {
        return apiClient.get(`/users/${userId}/goals`);
    },

    async createGoal(userId, goalData) {
        return apiClient.post(`/users/${userId}/goals`, goalData);
    },

    async updateGoal(goalId, goalData) {
        return apiClient.put(`/goals/${goalId}`, goalData);
    },

    async completeGoal(goalId) {
        return apiClient.patch(`/goals/${goalId}`, { status: 'completed' });
    },

    async deleteGoal(goalId) {
        return apiClient.delete(`/goals/${goalId}`);
    },
};

// Favorites Service
export const favoriteService = {
    async getUserFavorites(userId) {
        return apiClient.get(`/users/${userId}/favorites`);
    },

    async addFavorite(userId, workoutId) {
        return apiClient.post(`/users/${userId}/favorites`, { workout_id: workoutId });
    },

    async removeFavorite(userId, workoutId) {
        return apiClient.delete(`/users/${userId}/favorites/${workoutId}`);
    },

    async isFavorited(userId, workoutId) {
        const favorites = await this.getUserFavorites(userId);
        return favorites.some(fav => fav.workout_id === workoutId);
    },
};
