// Seed the database with initial data
import db, { userService } from './db';
import { workoutsData } from '../data/workouts';

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
            difficulty: workout.duration < 20 ? 'beginner' : workout.duration < 35 ? 'intermediate' : 'advanced',
            category: getCategoryFromName(workout.name),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await db.workouts.bulkAdd(workouts);

        // Seed exercises from workouts
        const exercises = [];
        const exerciseMap = new Map();

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
                        category: getCategoryFromName(workout.name),
                        difficulty: exercise.duration > 60 || (exercise.reps && exercise.reps > 15) ? 'advanced' : 'beginner',
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

        // Create some sample programs
        const programs = [
            {
                name: 'Beginner Fitness Journey',
                difficulty: 'beginner',
                duration: 28, // days
                description: 'Perfect for those just starting their fitness journey',
                workouts: [1, 4, 5], // workout ids
                schedule: ['Monday', 'Wednesday', 'Friday'],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Advanced HIIT Challenge',
                difficulty: 'advanced',
                duration: 21,
                description: 'High-intensity interval training for experienced athletes',
                workouts: [2, 3, 6],
                schedule: ['Tuesday', 'Thursday', 'Saturday'],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
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
    } else if (nameLower.includes('hiit') || nameLower.includes('cardio') || nameLower.includes('running')) {
        return 'cardio';
    } else if (nameLower.includes('strength') || nameLower.includes('core')) {
        return 'strength';
    }

    return 'general';
}
