// Frontend Database using Dexie.js (IndexedDB wrapper)
import Dexie from 'dexie';

// Initialize the database
const db = new Dexie('LeapFitnessDB');

// Define database schema
db.version(1).stores({
    users: '++id, email, &username', // Primary key and indexed fields
    preferences: '++id, userId', // User preferences
    workouts: '++id, name, difficulty, category, duration',
    programs: '++id, name, difficulty, duration',
    exercises: '++id, name, category, difficulty',
    workoutExercises: '++id, workoutId, exerciseId, order, sets, reps, duration', // Workout-Exercise relation
    userWorkouts: '++id, userId, workoutId, status, startedAt, completedAt',
    userProgress: '++id, userId, date, workoutId',
    achievements: '++id, userId, type, unlockedAt',
    workoutLogs: '++id, userId, workoutId, date, duration, caloriesBurned',
    goals: '++id, userId, type, target, current, status, createdAt, completedAt',
    favorites: '++id, userId, workoutId, addedAt',
    planProgress: '++id, [userId+programId], [userId+programId+dayNumber], dayNumber, completedAt', // Track completed days in a plan
});

// Database Services

// Current logged-in user (stored in localStorage)
const getCurrentUserId = () => {
    return localStorage.getItem('currentUserId');
};

const setCurrentUserId = (userId) => {
    if (userId) {
        localStorage.setItem('currentUserId', userId);
    } else {
        localStorage.removeItem('currentUserId');
    }
};

// User Service
export const userService = {
    async register(userData) {
        try {
            // Check if user already exists
            const existingUser = await db.users
                .where('email')
                .equals(userData.email)
                .first();

            if (existingUser) {
                throw new Error('User with this email already exists');
            }

            const userId = await db.users.add({
                ...userData,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            // Create default preferences
            await db.preferences.add({
                userId,
                theme: 'light',
                notifications: true,
                soundEnabled: true,
                language: 'en',
            });

            setCurrentUserId(userId);
            return { id: userId, ...userData };
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    async login(email, password) {
        try {
            const user = await db.users
                .where('email')
                .equals(email)
                .first();

            if (!user || user.password !== password) {
                throw new Error('Invalid email or password');
            }

            setCurrentUserId(user.id);
            return { ...user, token: `mock-token-${user.id}` };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    async logout() {
        setCurrentUserId(null);
    },

    async getCurrentUser() {
        const userId = getCurrentUserId();
        if (!userId) {
            throw new Error('No user logged in');
        }
        return await db.users.get(parseInt(userId));
    },

    async updateProfile(userId, profileData) {
        await db.users.update(userId, {
            ...profileData,
            updatedAt: new Date(),
        });
        return await db.users.get(userId);
    },

    async getUser(userId) {
        return await db.users.get(userId);
    },

    async updatePassword(userId, currentPassword, newPassword) {
        const user = await db.users.get(userId);
        if (user.password !== currentPassword) {
            throw new Error('Current password is incorrect');
        }
        await db.users.update(userId, { password: newPassword });
        return { success: true };
    },

    async getAllUsers() {
        return await db.users.toArray();
    },
};

// User Preferences Service
export const preferencesService = {
    async getPreferences(userId) {
        return await db.preferences.where('userId').equals(userId).first();
    },

    async updatePreferences(userId, preferences) {
        const existing = await db.preferences.where('userId').equals(userId).first();
        if (existing) {
            await db.preferences.update(existing.id, preferences);
        } else {
            await db.preferences.add({ userId, ...preferences });
        }
        return await this.getPreferences(userId);
    },
};

// Workout Programs Service
export const programService = {
    async getPrograms() {
        return await db.programs.toArray();
    },

    async getProgram(programId) {
        return await db.programs.get(programId);
    },

    async createProgram(programData) {
        const id = await db.programs.add({
            ...programData,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return await db.programs.get(id);
    },

    async updateProgram(programId, programData) {
        await db.programs.update(programId, {
            ...programData,
            updatedAt: new Date(),
        });
        return await db.programs.get(programId);
    },

    async deleteProgram(programId) {
        await db.programs.delete(programId);
        return { success: true };
    },

    async getProgramsByDifficulty(difficulty) {
        return await db.programs.where('difficulty').equals(difficulty).toArray();
    },
};

// Workouts Service
export const workoutService = {
    async getWorkouts(filters = {}) {
        let query = db.workouts;

        if (filters.difficulty) {
            query = query.where('difficulty').equals(filters.difficulty);
        } else if (filters.category) {
            query = query.where('category').equals(filters.category);
        }

        const workouts = await query.toArray();

        // Fetch exercises for each workout via workoutExercises junction table
        const workoutsWithExercises = await Promise.all(
            workouts.map(async (workout) => {
                const exercises = await workoutExerciseService.getWorkoutExercises(workout.id);
                
                // Aggregate unique equipment needed
                const equipment = [...new Set(
                    exercises
                        .map(ex => ex.equipment)
                        .filter(eq => eq && eq !== 'None')
                )];
                
                return {
                    ...workout,
                    exercises,
                    equipment
                };
            })
        );

        return workoutsWithExercises;
    },

    async getWorkout(workoutId) {
        const workout = await db.workouts.get(workoutId);
        if (!workout) return null;

        // Fetch exercises via workoutExercises junction table
        const exercises = await workoutExerciseService.getWorkoutExercises(workoutId);

        // Aggregate unique equipment needed
        const equipment = [...new Set(
            exercises
                .map(ex => ex.equipment)
                .filter(eq => eq && eq !== 'None')
        )];

        return {
            ...workout,
            exercises,
            equipment
        };
    },

    async createWorkout(workoutData) {
        const id = await db.workouts.add({
            ...workoutData,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return await db.workouts.get(id);
    },

    async updateWorkout(workoutId, workoutData) {
        await db.workouts.update(workoutId, {
            ...workoutData,
            updatedAt: new Date(),
        });
        return await db.workouts.get(workoutId);
    },

    async deleteWorkout(workoutId) {
        await db.workouts.delete(workoutId);
        return { success: true };
    },

    async getWorkoutsByDifficulty(difficulty) {
        return await db.workouts.where('difficulty').equals(difficulty).toArray();
    },

    async getWorkoutsByCategory(category) {
        return await db.workouts.where('category').equals(category).toArray();
    },
};

// Exercises Service
export const exerciseService = {
    async getExercises() {
        return await db.exercises.toArray();
    },

    async getExercise(exerciseId) {
        return await db.exercises.get(exerciseId);
    },

    async createExercise(exerciseData) {
        const id = await db.exercises.add({
            ...exerciseData,
            createdAt: new Date(),
        });
        return await db.exercises.get(id);
    },

    async updateExercise(exerciseId, exerciseData) {
        await db.exercises.update(exerciseId, exerciseData);
        return await db.exercises.get(exerciseId);
    },

    async deleteExercise(exerciseId) {
        await db.exercises.delete(exerciseId);
        return { success: true };
    },

    async getExercisesByCategory(category) {
        return await db.exercises.where('category').equals(category).toArray();
    },
};

// Workout-Exercise Relation Service
export const workoutExerciseService = {
    // Add an exercise to a workout
    async addExerciseToWorkout(workoutId, exerciseId, options = {}) {
        const { order = 0, sets = 1, reps = null, duration = null } = options;

        const id = await db.workoutExercises.add({
            workoutId,
            exerciseId,
            order,
            sets,
            reps,
            duration,
        });
        return await db.workoutExercises.get(id);
    },

    // Get all exercises for a workout (with full exercise details)
    async getWorkoutExercises(workoutId) {
        const relations = await db.workoutExercises
            .where('workoutId')
            .equals(workoutId)
            .sortBy('order');

        // Fetch full exercise details
        const exercisesWithDetails = await Promise.all(
            relations.map(async (relation) => {
                const exercise = await db.exercises.get(relation.exerciseId);
                return {
                    ...exercise,
                    workoutExerciseId: relation.id,
                    order: relation.order,
                    sets: relation.sets,
                    reps: relation.reps,
                    duration: relation.duration,
                };
            })
        );

        return exercisesWithDetails;
    },

    // Get all workouts that use a specific exercise
    async getWorkoutsUsingExercise(exerciseId) {
        const relations = await db.workoutExercises
            .where('exerciseId')
            .equals(exerciseId)
            .toArray();

        const workoutIds = [...new Set(relations.map(r => r.workoutId))];
        return await Promise.all(workoutIds.map(id => db.workouts.get(id)));
    },

    // Update exercise details in a workout (sets, reps, duration)
    async updateWorkoutExercise(workoutExerciseId, updates) {
        await db.workoutExercises.update(workoutExerciseId, updates);
        return await db.workoutExercises.get(workoutExerciseId);
    },

    // Remove an exercise from a workout
    async removeExerciseFromWorkout(workoutExerciseId) {
        await db.workoutExercises.delete(workoutExerciseId);
        return { success: true };
    },

    // Reorder exercises in a workout
    async reorderWorkoutExercises(workoutId, exerciseOrders) {
        // exerciseOrders: [{ workoutExerciseId, order }, ...]
        const updates = exerciseOrders.map(({ workoutExerciseId, order }) =>
            db.workoutExercises.update(workoutExerciseId, { order })
        );
        await Promise.all(updates);
        return { success: true };
    },

    // Bulk add exercises to a workout
    async bulkAddExercisesToWorkout(workoutId, exercises) {
        // exercises: [{ exerciseId, order, sets, reps, duration }, ...]
        const records = exercises.map(ex => ({
            workoutId,
            exerciseId: ex.exerciseId,
            order: ex.order || 0,
            sets: ex.sets || 1,
            reps: ex.reps || null,
            duration: ex.duration || null,
        }));

        await db.workoutExercises.bulkAdd(records);
        return { success: true, count: records.length };
    },
};

// User Workouts Service (Track workout sessions)
export const userWorkoutService = {
    async startWorkout(userId, workoutId) {
        const id = await db.userWorkouts.add({
            userId,
            workoutId,
            status: 'in-progress',
            startedAt: new Date(),
            completedAt: null,
        });
        return await db.userWorkouts.get(id);
    },

    async completeWorkout(userWorkoutId, stats = {}) {
        await db.userWorkouts.update(userWorkoutId, {
            status: 'completed',
            completedAt: new Date(),
            ...stats,
        });

        // Also log it
        const userWorkout = await db.userWorkouts.get(userWorkoutId);
        await db.workoutLogs.add({
            userId: userWorkout.userId,
            workoutId: userWorkout.workoutId,
            date: new Date(),
            duration: stats.duration || 0,
            caloriesBurned: stats.caloriesBurned || 0,
        });

        return await db.userWorkouts.get(userWorkoutId);
    },

    async logIncompleteWorkout(userWorkoutId, stats = {}) {
        await db.userWorkouts.update(userWorkoutId, {
            status: 'incomplete',
            endedAt: new Date(),
            ...stats,
        });

        return await db.userWorkouts.get(userWorkoutId);
    },

    async pauseWorkout(userWorkoutId) {
        await db.userWorkouts.update(userWorkoutId, { status: 'paused' });
        return await db.userWorkouts.get(userWorkoutId);
    },

    async resumeWorkout(userWorkoutId) {
        await db.userWorkouts.update(userWorkoutId, { status: 'in-progress' });
        return await db.userWorkouts.get(userWorkoutId);
    },

    async getUserWorkouts(userId, status = null) {
        if (status) {
            return await db.userWorkouts
                .where(['userId', 'status'])
                .equals([userId, status])
                .toArray();
        }
        return await db.userWorkouts.where('userId').equals(userId).toArray();
    },

    async getCurrentUserWorkout(userId) {
        return await db.userWorkouts
            .where('userId')
            .equals(userId)
            .and(uw => uw.status === 'in-progress' || uw.status === 'paused')
            .first();
    },

    async getUserWorkoutSession(sessionId) {
        return await db.userWorkouts.get(sessionId);
    },

    async deleteUserWorkoutSession(sessionId) {
        await db.userWorkouts.delete(sessionId);
    },
};

// Progress Service
export const progressService = {
    async logProgress(userId, progressData) {
        const id = await db.userProgress.add({
            userId,
            date: new Date(),
            ...progressData,
        });
        return await db.userProgress.get(id);
    },

    async getUserProgress(userId, startDate = null, endDate = null) {
        let query = db.userProgress.where('userId').equals(userId);

        let results = await query.toArray();

        if (startDate) {
            results = results.filter(p => new Date(p.date) >= new Date(startDate));
        }
        if (endDate) {
            results = results.filter(p => new Date(p.date) <= new Date(endDate));
        }

        return results;
    },

    async getStats(userId) {
        const logs = await db.workoutLogs.where('userId').equals(userId).toArray();

        return {
            totalWorkouts: logs.length,
            totalMinutes: logs.reduce((sum, log) => sum + (log.duration || 0), 0),
            totalCalories: logs.reduce((sum, log) => sum + (log.caloriesBurned || 0), 0),
            streak: await this.calculateStreak(userId),
        };
    },

    async calculateStreak(userId) {
        const logs = await db.workoutLogs
            .where('userId')
            .equals(userId)
            .toArray();

        if (logs.length === 0) return 0;

        // Sort by date descending
        logs.sort((a, b) => new Date(b.date) - new Date(a.date));

        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        for (const log of logs) {
            const logDate = new Date(log.date);
            logDate.setHours(0, 0, 0, 0);

            const diffDays = Math.floor((currentDate - logDate) / (1000 * 60 * 60 * 24));

            if (diffDays === streak) {
                streak++;
            } else if (diffDays > streak) {
                break;
            }
        }

        return streak;
    },
};

// Achievements Service
export const achievementService = {
    async getAchievements(userId) {
        return await db.achievements.where('userId').equals(userId).toArray();
    },

    async unlockAchievement(userId, achievementType) {
        const existing = await db.achievements
            .where(['userId', 'type'])
            .equals([userId, achievementType])
            .first();

        if (existing) {
            return existing;
        }

        const id = await db.achievements.add({
            userId,
            type: achievementType,
            unlockedAt: new Date(),
        });

        return await db.achievements.get(id);
    },
};

// Goals Service
export const goalService = {
    async getUserGoals(userId) {
        return await db.goals.where('userId').equals(userId).toArray();
    },

    async createGoal(userId, goalData) {
        const id = await db.goals.add({
            userId,
            ...goalData,
            current: 0,
            status: 'active',
            createdAt: new Date(),
        });
        return await db.goals.get(id);
    },

    async updateGoal(goalId, updates) {
        await db.goals.update(goalId, updates);
        return await db.goals.get(goalId);
    },

    async completeGoal(goalId) {
        await db.goals.update(goalId, {
            status: 'completed',
            completedAt: new Date(),
        });
        return await db.goals.get(goalId);
    },

    async deleteGoal(goalId) {
        await db.goals.delete(goalId);
        return { success: true };
    },
};

// Favorites Service
export const favoriteService = {
    async getUserFavorites(userId) {
        return await db.favorites.where('userId').equals(userId).toArray();
    },

    async addFavorite(userId, workoutId) {
        // Check if already favorited
        const existing = await db.favorites
            .where(['userId', 'workoutId'])
            .equals([userId, workoutId])
            .first();

        if (existing) {
            return existing;
        }

        const id = await db.favorites.add({
            userId,
            workoutId,
            addedAt: new Date(),
        });
        return await db.favorites.get(id);
    },

    async removeFavorite(userId, workoutId) {
        const favorite = await db.favorites
            .where(['userId', 'workoutId'])
            .equals([userId, workoutId])
            .first();

        if (favorite) {
            await db.favorites.delete(favorite.id);
        }
        return { success: true };
    },

    async isFavorite(userId, workoutId) {
        const favorite = await db.favorites
            .where(['userId', 'workoutId'])
            .equals([userId, workoutId])
            .first();
        return !!favorite;
    },
};

// Workout Logs Service
export const workoutLogService = {
    async getUserWorkoutLogs(userId) {
        const logs = await db.workoutLogs
            .where('userId')
            .equals(userId)
            .reverse()
            .sortBy('date');

        // Enrich logs with workout details and filter out logs with missing workouts
        const enrichedLogs = await Promise.all(
            logs.map(async (log) => {
                const workout = await db.workouts.get(log.workoutId);
                if (!workout) {
                    return null; // Mark for filtering
                }
                return {
                    ...log,
                    workoutName: workout.name,
                    workoutDifficulty: workout.difficulty,
                    workoutCategory: workout.category,
                };
            })
        );

        // Filter out null entries (logs with missing workouts)
        return enrichedLogs.filter(log => log !== null);
    },

    async getWorkoutLogsByDateRange(userId, startDate, endDate) {
        const logs = await db.workoutLogs
            .where('userId')
            .equals(userId)
            .filter(log => log.date >= startDate && log.date <= endDate)
            .toArray();

        return logs;
    },

    async getUserWorkoutStats(userId) {
        const logs = await db.workoutLogs
            .where('userId')
            .equals(userId)
            .toArray();

        const totalWorkouts = logs.length;
        const totalDuration = logs.reduce((sum, log) => sum + (log.duration || 0), 0);
        const totalCalories = logs.reduce((sum, log) => sum + (log.caloriesBurned || 0), 0);

        return {
            totalWorkouts,
            totalDuration,
            totalCalories,
            averageDuration: totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0,
            averageCalories: totalWorkouts > 0 ? Math.round(totalCalories / totalWorkouts) : 0,
        };
    },
};

// Plan Progress Service - Track completed days in a plan
export const planProgressService = {
    async completePlanDay(userId, programId, dayNumber, workoutData) {
        const id = await db.planProgress.add({
            userId,
            programId,
            dayNumber,
            completedAt: new Date(),
            duration: workoutData.duration,
            caloriesBurned: workoutData.caloriesBurned,
        });
        return await db.planProgress.get(id);
    },

    async getPlanProgress(userId, programId) {
        const completedDays = await db.planProgress
            .where(['userId', 'programId'])
            .equals([userId, programId])
            .sortBy('dayNumber');
        return completedDays;
    },

    async isDayCompleted(userId, programId, dayNumber) {
        const day = await db.planProgress
            .where(['userId', 'programId', 'dayNumber'])
            .equals([userId, programId, dayNumber])
            .first();
        return !!day;
    },

    async getLastCompletedDay(userId, programId) {
        const completedDays = await db.planProgress
            .where(['userId', 'programId'])
            .equals([userId, programId])
            .sortBy('dayNumber');

        if (completedDays.length === 0) return 0;
        return completedDays[completedDays.length - 1].dayNumber;
    },

    async getCompletedDaysCount(userId, programId) {
        return await db.planProgress
            .where(['userId', 'programId'])
            .equals([userId, programId])
            .count();
    },

    async resetPlanProgress(userId, programId) {
        const entries = await db.planProgress
            .where(['userId', 'programId'])
            .equals([userId, programId])
            .toArray();

        for (const entry of entries) {
            await db.planProgress.delete(entry.id);
        }
        return { success: true };
    },
};

// Workout Generator Service - Progressive Workout System
export const workoutGeneratorService = {
    // Calculate progressive value based on day and progression type
    calculateProgression(day, totalDays, startValue, endValue, progressionType = 'linear') {
        if (totalDays <= 1) return startValue;

        const progress = (day - 1) / (totalDays - 1); // 0 to 1

        switch (progressionType) {
            case 'linear':
                return Math.round(startValue + (endValue - startValue) * progress);

            case 'exponential':
                // Slower start, faster end
                const expProgress = Math.pow(progress, 1.5);
                return Math.round(startValue + (endValue - startValue) * expProgress);

            case 'stepped':
                // Increases in weekly steps
                const weekProgress = Math.floor(progress * 4) / 4; // 4 weeks
                return Math.round(startValue + (endValue - startValue) * weekProgress);

            case 'logarithmic':
                // Faster start, slower end
                const logProgress = Math.sqrt(progress);
                return Math.round(startValue + (endValue - startValue) * logProgress);

            default:
                return Math.round(startValue + (endValue - startValue) * progress);
        }
    },

    // Select exercises for a specific day from exercise pool
    async selectExercisesForDay(exercisePool, structure, dayNumber, category = null) {
        const allExercises = await exerciseService.getExercises();

        // Filter exercises from pool
        let poolExercises = allExercises.filter(ex => exercisePool.includes(ex.id));

        // Further filter by category if specified
        if (category) {
            poolExercises = poolExercises.filter(ex => ex.category === category);
        }

        if (poolExercises.length === 0) {
            // Fallback to all exercises if pool is empty
            poolExercises = allExercises;
        }

        const { warmup = 2, main = 4, cooldown = 2 } = structure;
        const totalNeeded = warmup + main + cooldown;

        // Rotate exercises based on day to ensure variety
        const offset = ((dayNumber - 1) * main) % poolExercises.length;
        const rotatedExercises = [
            ...poolExercises.slice(offset),
            ...poolExercises.slice(0, offset)
        ];

        // Select exercises by type if available, otherwise just rotate
        const selectedExercises = [];

        // Try to get warmup exercises
        const warmupExs = rotatedExercises.filter(ex =>
            ex.name?.toLowerCase().includes('stretch') ||
            ex.name?.toLowerCase().includes('warmup') ||
            ex.category === 'flexibility'
        ).slice(0, warmup);

        // Fill remaining warmup slots
        if (warmupExs.length < warmup) {
            warmupExs.push(...rotatedExercises.slice(0, warmup - warmupExs.length));
        }
        selectedExercises.push(...warmupExs);

        // Get main exercises (excluding warmup)
        const mainExs = rotatedExercises
            .filter(ex => !selectedExercises.includes(ex))
            .slice(0, main);
        selectedExercises.push(...mainExs);

        // Get cooldown exercises
        const cooldownExs = rotatedExercises
            .filter(ex => !selectedExercises.includes(ex))
            .slice(0, cooldown);
        selectedExercises.push(...cooldownExs);

        return selectedExercises.slice(0, totalNeeded);
    },

    // Calculate exercise duration based on total workout duration
    calculateExerciseDuration(exercise, totalDuration, sets, reps) {
        // If exercise has specific duration, scale it
        if (exercise.duration) {
            return exercise.duration;
        }

        // Otherwise, distribute total duration among exercises
        // Assuming rest time between sets
        const timePerRep = 3; // seconds
        const restBetweenSets = 30; // seconds

        return (reps * timePerRep + (sets - 1) * restBetweenSets);
    },

    // Generate a complete workout for a specific day in a program
    async generateWorkoutForDay(programId, dayNumber) {
        try {
            const program = await programService.getProgram(programId);

            if (!program) {
                throw new Error('Program not found');
            }

            // Use new structure if available, otherwise fallback to old structure
            const workoutTemplate = program.workoutTemplate || {
                category: 'general',
                exercisePool: program.exercisePool || [],
                structure: program.structure || { warmup: 2, main: 4, cooldown: 2 }
            };

            const progression = program.progression || {
                startingDuration: 15,
                endingDuration: 30,
                startingSets: 2,
                endingSets: 4,
                startingReps: 10,
                endingReps: 20,
                progressionType: 'linear'
            };

            // Calculate progressive values for this specific day
            const duration = this.calculateProgression(
                dayNumber,
                program.duration,
                progression.startingDuration,
                progression.endingDuration,
                progression.progressionType
            );

            const sets = this.calculateProgression(
                dayNumber,
                program.duration,
                progression.startingSets,
                progression.endingSets,
                progression.progressionType
            );

            const reps = this.calculateProgression(
                dayNumber,
                program.duration,
                progression.startingReps,
                progression.endingReps,
                progression.progressionType
            );

            // Calculate calories based on duration and difficulty
            const difficultyMultiplier = {
                'beginner': 8,
                'intermediate': 12,
                'advanced': 15
            };
            const calories = Math.round(duration * (difficultyMultiplier[program.difficulty] || 10));

            // Select exercises for this day
            const exercises = await this.selectExercisesForDay(
                workoutTemplate.exercisePool,
                workoutTemplate.structure,
                dayNumber,
                workoutTemplate.category
            );

            // Build dynamic workout with progressive values
            const generatedExercises = exercises.map((ex, index) => ({
                id: ex.id,
                name: ex.name,
                sets: sets,
                reps: ex.reps ? reps : undefined,
                duration: ex.duration || this.calculateExerciseDuration(ex, duration, sets, reps),
                icon: ex.icon || '💪',
                category: ex.category,
                order: index + 1,
                videoUrl: ex.videoUrl || null
            }));

            return {
                id: `generated-${programId}-day-${dayNumber}`,
                name: `Day ${dayNumber} - ${program.name}`,
                description: `Progressive workout with ${duration} min, ${sets} sets, ${reps} reps`,
                duration: duration,
                calories: calories,
                difficulty: program.difficulty,
                category: workoutTemplate.category,
                icon: this.getWorkoutIcon(workoutTemplate.category),
                exercises: generatedExercises,
                generatedAt: new Date(),
                programId: programId,
                programDay: dayNumber,
                progressiveStats: {
                    sets,
                    reps,
                    duration,
                    calories
                }
            };
        } catch (error) {
            console.error('Error generating workout:', error);
            throw error;
        }
    },

    // Get icon based on workout category
    getWorkoutIcon(category) {
        const icons = {
            'cardio': '🔥',
            'strength': '💪',
            'flexibility': '🧘',
            'mixed': '🏋️',
            'general': '⚡'
        };
        return icons[category] || '⚡';
    },

    // Generate all workouts for a program (for preview/planning)
    async generateProgramTimeline(programId) {
        const program = await programService.getProgram(programId);

        if (!program) {
            throw new Error('Program not found');
        }

        const timeline = [];
        const daysPerWeek = program.schedule?.daysPerWeek || 3;
        let workoutDayCounter = 0;

        for (let day = 1; day <= program.duration; day++) {
            const dayInWeek = ((day - 1) % 7) + 1;
            const isWorkoutDay = workoutDayCounter < daysPerWeek;

            if (isWorkoutDay) {
                const workout = await this.generateWorkoutForDay(programId, day);
                timeline.push({
                    type: 'workout',
                    dayNumber: day,
                    workout: workout
                });
                workoutDayCounter++;
            } else {
                timeline.push({
                    type: 'rest',
                    dayNumber: day
                });
            }

            // Reset weekly counter
            if (dayInWeek === 7) {
                workoutDayCounter = 0;
            }
        }

        return timeline;
    },

    // Get progression summary for a program
    async getProgressionSummary(programId) {
        const program = await programService.getProgram(programId);

        if (!program || !program.progression) {
            return null;
        }

        const { progression } = program;

        return {
            duration: {
                start: progression.startingDuration,
                end: progression.endingDuration,
                increase: progression.endingDuration - progression.startingDuration
            },
            sets: {
                start: progression.startingSets,
                end: progression.endingSets,
                increase: progression.endingSets - progression.startingSets
            },
            reps: {
                start: progression.startingReps,
                end: progression.endingReps,
                increase: progression.endingReps - progression.startingReps
            },
            type: progression.progressionType
        };
    }
};

// Database initialization and seeding
export const initializeDatabase = async () => {
    try {
        // Check if already initialized
        const workoutCount = await db.workouts.count();

        if (workoutCount === 0) {
            console.log('Seeding database with initial data...');

            // Seed some default workouts from workouts.js if available
            // You can import and add your workout data here

            console.log('Database initialized successfully');
        }
    } catch (error) {
        console.error('Database initialization error:', error);
    }
};

// Export the database instance and helper functions
export default db;
export { getCurrentUserId, setCurrentUserId };
