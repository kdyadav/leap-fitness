// Seed the database with initial data
import db, { userService } from './db';
import { workoutsData, exerciseLibrary } from '../data/workouts';

export const seedDatabase = async () => {
    try {
        // Check if database is already seeded
        const workoutCount = await db.workouts.count();

        if (workoutCount > 0) {
            console.log('Database already seeded');
            return;
        }

        console.log('Seeding database...');

        // Seed demo user first
        try {
            await userService.register({
                email: 'demo@fitness.com',
                password: 'demo123',
                name: 'Demo User',
                username: 'demo',
                age: 25,
                weight: 70,
            });
            console.log('Demo user created');
        } catch (error) {
            console.log('Demo user may already exist or error:', error.message);
        }

        // Seed workouts (without embedded exercises)
        const workouts = Object.values(workoutsData).map(workout => ({
            name: workout.name,
            duration: workout.duration,
            calories: workout.calories,
            icon: workout.icon,
            difficulty: workout.difficulty || (workout.duration < 20 ? 'beginner' : workout.duration < 35 ? 'intermediate' : 'advanced'),
            category: workout.category || getCategoryFromName(workout.name),
            targetArea: workout.targetArea || 'General',
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await db.workouts.bulkAdd(workouts);

        // Seed exercises from exercise library
        const exercises = [];
        const exerciseMap = new Map();

        // Add exercises from the exercise library
        Object.values(exerciseLibrary).forEach(categoryExercises => {
            categoryExercises.forEach(exercise => {
                if (!exerciseMap.has(exercise.name)) {
                    exerciseMap.set(exercise.name, {
                        name: exercise.name,
                        icon: exercise.icon,
                        duration: exercise.duration,
                        reps: exercise.reps,
                        sets: exercise.sets,
                        videoUrl: exercise.videoUrl,
                        category: exercise.category,
                        difficulty: exercise.duration > 60 || (exercise.reps && exercise.reps > 15) ? 'advanced' : (exercise.reps > 10 || exercise.duration > 40) ? 'intermediate' : 'beginner',
                        createdAt: new Date(),
                    });
                }
            });
        });

        // Also add exercises from workouts that might not be in the library
        Object.values(workoutsData).forEach(workout => {
            workout.exercises.forEach(exercise => {
                if (!exerciseMap.has(exercise.name)) {
                    exerciseMap.set(exercise.name, {
                        name: exercise.name,
                        icon: exercise.icon,
                        duration: exercise.duration,
                        reps: exercise.reps,
                        sets: exercise.sets,
                        videoUrl: exercise.videoUrl,
                        category: exercise.category || getCategoryFromExerciseName(exercise.name, workout.category),
                        difficulty: exercise.duration > 60 || (exercise.reps && exercise.reps > 15) ? 'advanced' : (exercise.reps > 10 || exercise.duration > 40) ? 'intermediate' : 'beginner',
                        createdAt: new Date(),
                    });
                }
            });
        });

        exercises.push(...exerciseMap.values());
        await db.exercises.bulkAdd(exercises);

        // Create workout-exercise relations
        const workoutExerciseRelations = [];
        const exerciseNameToIdMap = new Map();

        // Get all exercises to map names to IDs
        const allExercises = await db.exercises.toArray();
        allExercises.forEach(ex => exerciseNameToIdMap.set(ex.name, ex.id));

        Object.values(workoutsData).forEach((workout, workoutIndex) => {
            const workoutId = workoutIndex + 1; // IDs start from 1
            workout.exercises.forEach((exercise, exerciseOrder) => {
                const exerciseId = exerciseNameToIdMap.get(exercise.name);
                if (exerciseId) {
                    workoutExerciseRelations.push({
                        workoutId,
                        exerciseId,
                        order: exerciseOrder,
                        sets: exercise.sets || 1,
                        reps: exercise.reps || null,
                        duration: exercise.duration || null,
                    });
                }
            });
        });

        await db.workoutExercises.bulkAdd(workoutExerciseRelations);

        // Get all exercise IDs for exercise pools
        const allExerciseIds = allExercises.map(ex => ex.id);
        const cardioExerciseIds = allExercises.filter(ex => ex.category === 'cardio').map(ex => ex.id);
        const strengthExerciseIds = allExercises.filter(ex => ['chest', 'back', 'shoulders', 'arms', 'legs'].includes(ex.category)).map(ex => ex.id);
        const flexibilityExerciseIds = allExercises.filter(ex => ex.category === 'flexibility').map(ex => ex.id);
        const coreExerciseIds = allExercises.filter(ex => ex.category === 'core').map(ex => ex.id);
        const chestExerciseIds = allExercises.filter(ex => ex.category === 'chest').map(ex => ex.id);
        const backExerciseIds = allExercises.filter(ex => ex.category === 'back').map(ex => ex.id);
        const shoulderExerciseIds = allExercises.filter(ex => ex.category === 'shoulders').map(ex => ex.id);
        const armExerciseIds = allExercises.filter(ex => ex.category === 'arms').map(ex => ex.id);
        const legExerciseIds = allExercises.filter(ex => ex.category === 'legs').map(ex => ex.id);

        // Create progressive programs with new structure
        const programs = [
            {
                name: 'Beginner Fitness Journey',
                difficulty: 'beginner',
                duration: 28, // days
                description: 'Perfect for those just starting their fitness journey. Progressive intensity over 4 weeks.',

                // NEW: Workout template structure
                workoutTemplate: {
                    category: 'mixed',
                    exercisePool: allExerciseIds.slice(0, 20), // Use first 20 exercises
                    structure: {
                        warmup: 2,
                        main: 4,
                        cooldown: 2
                    }
                },

                // NEW: Progressive configuration
                progression: {
                    startingDuration: 15,
                    endingDuration: 30,
                    startingSets: 2,
                    endingSets: 4,
                    startingReps: 8,
                    endingReps: 15,
                    progressionType: 'linear'
                },

                // NEW: Schedule structure
                schedule: {
                    daysPerWeek: 3,
                    totalWeeks: 4
                },

                // Keep old fields for backward compatibility
                exercisePool: allExerciseIds.slice(0, 20),
                structure: { warmup: 2, main: 4, cooldown: 2 },

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Advanced HIIT Challenge',
                difficulty: 'advanced',
                duration: 21,
                description: 'High-intensity interval training for experienced athletes. Exponential difficulty increase.',

                workoutTemplate: {
                    category: 'cardio',
                    exercisePool: cardioExerciseIds.length > 0 ? cardioExerciseIds : allExerciseIds.slice(0, 12),
                    structure: {
                        warmup: 1,
                        main: 6,
                        cooldown: 1
                    }
                },

                progression: {
                    startingDuration: 20,
                    endingDuration: 45,
                    startingSets: 3,
                    endingSets: 5,
                    startingReps: 12,
                    endingReps: 25,
                    progressionType: 'exponential'
                },

                schedule: {
                    daysPerWeek: 3,
                    totalWeeks: 3
                },

                exercisePool: cardioExerciseIds.length > 0 ? cardioExerciseIds : allExerciseIds.slice(0, 12),
                structure: { warmup: 1, main: 6, cooldown: 1 },

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Strength Builder',
                difficulty: 'intermediate',
                duration: 35,
                description: 'Build muscle and strength progressively over 5 weeks.',

                workoutTemplate: {
                    category: 'strength',
                    exercisePool: strengthExerciseIds.length > 0 ? strengthExerciseIds : allExerciseIds,
                    structure: {
                        warmup: 2,
                        main: 5,
                        cooldown: 1
                    }
                },

                progression: {
                    startingDuration: 25,
                    endingDuration: 50,
                    startingSets: 3,
                    endingSets: 5,
                    startingReps: 10,
                    endingReps: 20,
                    progressionType: 'stepped'
                },

                schedule: {
                    daysPerWeek: 4,
                    totalWeeks: 5
                },

                exercisePool: strengthExerciseIds.length > 0 ? strengthExerciseIds : allExerciseIds,
                structure: { warmup: 2, main: 5, cooldown: 1 },

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Flexibility & Mobility',
                difficulty: 'beginner',
                duration: 14,
                description: 'Improve flexibility and range of motion with gentle progression.',

                workoutTemplate: {
                    category: 'flexibility',
                    exercisePool: flexibilityExerciseIds.length > 0 ? flexibilityExerciseIds : allExerciseIds.slice(0, 10),
                    structure: {
                        warmup: 1,
                        main: 5,
                        cooldown: 2
                    }
                },

                progression: {
                    startingDuration: 10,
                    endingDuration: 25,
                    startingSets: 1,
                    endingSets: 3,
                    startingReps: 5,
                    endingReps: 12,
                    progressionType: 'logarithmic'
                },

                schedule: {
                    daysPerWeek: 5,
                    totalWeeks: 2
                },

                exercisePool: flexibilityExerciseIds.length > 0 ? flexibilityExerciseIds : allExerciseIds.slice(0, 10),
                structure: { warmup: 1, main: 5, cooldown: 2 },

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Chest & Arms Power',
                difficulty: 'intermediate',
                duration: 28,
                description: 'Focus on building upper body strength with chest and arm exercises.',

                workoutTemplate: {
                    category: 'upper-body',
                    exercisePool: [...chestExerciseIds, ...armExerciseIds],
                    structure: {
                        warmup: 2,
                        main: 5,
                        cooldown: 1
                    }
                },

                progression: {
                    startingDuration: 20,
                    endingDuration: 40,
                    startingSets: 3,
                    endingSets: 5,
                    startingReps: 10,
                    endingReps: 20,
                    progressionType: 'linear'
                },

                schedule: {
                    daysPerWeek: 4,
                    totalWeeks: 4
                },

                exercisePool: [...chestExerciseIds, ...armExerciseIds],
                structure: { warmup: 2, main: 5, cooldown: 1 },

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Back & Shoulder Sculpt',
                difficulty: 'intermediate',
                duration: 28,
                description: 'Develop a strong back and defined shoulders.',

                workoutTemplate: {
                    category: 'upper-body',
                    exercisePool: [...backExerciseIds, ...shoulderExerciseIds],
                    structure: {
                        warmup: 2,
                        main: 5,
                        cooldown: 1
                    }
                },

                progression: {
                    startingDuration: 20,
                    endingDuration: 40,
                    startingSets: 3,
                    endingSets: 5,
                    startingReps: 8,
                    endingReps: 18,
                    progressionType: 'linear'
                },

                schedule: {
                    daysPerWeek: 4,
                    totalWeeks: 4
                },

                exercisePool: [...backExerciseIds, ...shoulderExerciseIds],
                structure: { warmup: 2, main: 5, cooldown: 1 },

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Leg & Core Crusher',
                difficulty: 'intermediate',
                duration: 21,
                description: 'Build powerful legs and a rock-solid core.',

                workoutTemplate: {
                    category: 'lower-body',
                    exercisePool: [...legExerciseIds, ...coreExerciseIds],
                    structure: {
                        warmup: 2,
                        main: 6,
                        cooldown: 1
                    }
                },

                progression: {
                    startingDuration: 25,
                    endingDuration: 45,
                    startingSets: 3,
                    endingSets: 5,
                    startingReps: 12,
                    endingReps: 25,
                    progressionType: 'stepped'
                },

                schedule: {
                    daysPerWeek: 3,
                    totalWeeks: 3
                },

                exercisePool: [...legExerciseIds, ...coreExerciseIds],
                structure: { warmup: 2, main: 6, cooldown: 1 },

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Total Body Transformation',
                difficulty: 'advanced',
                duration: 42,
                description: 'Complete body transformation with balanced muscle development.',

                workoutTemplate: {
                    category: 'full-body',
                    exercisePool: allExerciseIds,
                    structure: {
                        warmup: 2,
                        main: 7,
                        cooldown: 2
                    }
                },

                progression: {
                    startingDuration: 30,
                    endingDuration: 60,
                    startingSets: 3,
                    endingSets: 6,
                    startingReps: 10,
                    endingReps: 25,
                    progressionType: 'exponential'
                },

                schedule: {
                    daysPerWeek: 5,
                    totalWeeks: 6
                },

                exercisePool: allExerciseIds,
                structure: { warmup: 2, main: 7, cooldown: 2 },

                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];

        await db.programs.bulkAdd(programs);

        console.log('Database seeded successfully!');
        console.log(`- ${workouts.length} workouts`);
        console.log(`- ${exercises.length} exercises`);
        console.log(`- ${workoutExerciseRelations.length} workout-exercise relations`);
        console.log(`- ${programs.length} programs`);

    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// Helper function to determine category from workout name
function getCategoryFromName(name) {
    const nameLower = name.toLowerCase();

    if (nameLower.includes('yoga') || nameLower.includes('stretch')) {
        return 'flexibility';
    } else if (nameLower.includes('hiit') || nameLower.includes('cardio') || nameLower.includes('running') || nameLower.includes('inferno')) {
        return 'cardio';
    } else if (nameLower.includes('strength') || nameLower.includes('core') || nameLower.includes('crusher')) {
        return 'core';
    } else if (nameLower.includes('chest')) {
        return 'chest';
    } else if (nameLower.includes('back')) {
        return 'back';
    } else if (nameLower.includes('shoulder')) {
        return 'shoulders';
    } else if (nameLower.includes('arm')) {
        return 'arms';
    } else if (nameLower.includes('leg')) {
        return 'legs';
    } else if (nameLower.includes('upper')) {
        return 'upper-body';
    } else if (nameLower.includes('lower')) {
        return 'lower-body';
    } else if (nameLower.includes('full') || nameLower.includes('total') || nameLower.includes('body')) {
        return 'full-body';
    }

    return 'general';
}

// Helper function to determine category from exercise name
function getCategoryFromExerciseName(exerciseName, workoutCategory) {
    const nameLower = exerciseName.toLowerCase();

    if (nameLower.includes('push') || nameLower.includes('chest') || nameLower.includes('fly')) {
        return 'chest';
    } else if (nameLower.includes('pull') || nameLower.includes('row') || nameLower.includes('superman')) {
        return 'back';
    } else if (nameLower.includes('shoulder') || nameLower.includes('pike') || nameLower.includes('raise')) {
        return 'shoulders';
    } else if (nameLower.includes('curl') || nameLower.includes('tricep') || nameLower.includes('bicep') || nameLower.includes('dip')) {
        return 'arms';
    } else if (nameLower.includes('squat') || nameLower.includes('lunge') || nameLower.includes('leg') || nameLower.includes('calf') || nameLower.includes('glute')) {
        return 'legs';
    } else if (nameLower.includes('plank') || nameLower.includes('crunch') || nameLower.includes('twist') || nameLower.includes('core') || nameLower.includes('v-up')) {
        return 'core';
    } else if (nameLower.includes('jump') || nameLower.includes('burpee') || nameLower.includes('sprint') || nameLower.includes('run') || nameLower.includes('cardio')) {
        return 'cardio';
    } else if (nameLower.includes('yoga') || nameLower.includes('stretch') || nameLower.includes('pose')) {
        return 'flexibility';
    }

    return workoutCategory || 'general';
}
