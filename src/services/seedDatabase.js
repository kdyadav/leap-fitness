// Seed the database with initial data
import db, { userService } from './db';

export const seedDatabase = async () => {
    try {
        // Check if database is already seeded
        const workoutCount = await db.workouts.count();

        if (workoutCount > 0) {
            console.log('Database already seeded');
            return;
        }

        console.log('Seeding database...');

        // ========== STEP 1: Create Demo Users ==========
        try {
            await userService.register({
                email: 'demo@fitness.com',
                password: 'demo123',
                name: 'Demo User',
                username: 'demo',
                age: 25,
                weight: 70,
            });
            console.log('✓ Demo user created');
        } catch (error) {
            console.log('Demo user may already exist or error:', error.message);
        }

        try {
            await userService.register({
                email: 'john@fitness.com',
                password: 'john123',
                name: 'John Athlete',
                username: 'johnathletic',
                age: 30,
                weight: 80,
            });
            console.log('✓ John user created');
        } catch (error) {
            console.log('John user may already exist');
        }

        // ========== STEP 2: Create Comprehensive Exercise Library ==========
        const exerciseLibrary = [
            // CHEST EXERCISES
            { name: 'Push-ups', reps: 15, sets: 4, icon: '💪', category: 'chest', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4', difficulty: 'beginner' },
            { name: 'Wide Push-ups', reps: 12, sets: 3, icon: '💪', category: 'chest', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=rr6KQFL-X24', difficulty: 'intermediate' },
            { name: 'Diamond Push-ups', reps: 10, sets: 3, icon: '💎', category: 'chest', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=J0DnG1_S92I', difficulty: 'advanced' },
            { name: 'Decline Push-ups', reps: 12, sets: 3, icon: '📐', category: 'chest', equipment: 'Bench', videoUrl: 'https://www.youtube.com/watch?v=SKPab2YC3Og', difficulty: 'advanced' },
            { name: 'Incline Push-ups', reps: 15, sets: 3, icon: '⬆️', category: 'chest', equipment: 'Bench', videoUrl: 'https://www.youtube.com/watch?v=Gh4_YVpN3Pk', difficulty: 'beginner' },
            { name: 'Chest Dips', reps: 12, sets: 3, icon: '🏋️', category: 'chest', equipment: 'Dip Bar', videoUrl: 'https://www.youtube.com/watch?v=yN6Q1UI_xkE', difficulty: 'advanced' },
            { name: 'Plyometric Push-ups', reps: 10, sets: 3, icon: '💥', category: 'chest', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=YXeAw-NSYi0', difficulty: 'advanced' },

            // BACK EXERCISES
            { name: 'Pull-ups', reps: 10, sets: 3, icon: '🏋️', category: 'back', equipment: 'Pull-up Bar', videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g', difficulty: 'advanced' },
            { name: 'Chin-ups', reps: 10, sets: 3, icon: '💪', category: 'back', equipment: 'Pull-up Bar', videoUrl: 'https://www.youtube.com/watch?v=brhRXlOhkAM', difficulty: 'advanced' },
            { name: 'Superman', duration: 30, sets: 3, icon: '🦸', category: 'back', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=z6PJMT2y8GQ', difficulty: 'beginner' },
            { name: 'Reverse Snow Angels', reps: 15, sets: 3, icon: '👼', category: 'back', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=X_JwHIezkhA', difficulty: 'beginner' },
            { name: 'Wide Grip Pull-ups', reps: 8, sets: 3, icon: '🏋️‍♂️', category: 'back', equipment: 'Pull-up Bar', videoUrl: 'https://www.youtube.com/watch?v=iywjqUo5nmU', difficulty: 'advanced' },
            { name: 'Inverted Rows', reps: 12, sets: 3, icon: '⬆️', category: 'back', equipment: 'Bar', videoUrl: 'https://www.youtube.com/watch?v=hXTc1mDnZCw', difficulty: 'intermediate' },
            { name: 'Back Extensions', reps: 15, sets: 3, icon: '🔙', category: 'back', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=qtdHJoZvCno', difficulty: 'beginner' },

            // SHOULDER EXERCISES
            { name: 'Pike Push-ups', reps: 12, sets: 3, icon: '⛰️', category: 'shoulders', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=x4YNi4nRboU', difficulty: 'intermediate' },
            { name: 'Shoulder Taps', reps: 20, sets: 3, icon: '👆', category: 'shoulders', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=VjQGQ7uPJnw', difficulty: 'beginner' },
            { name: 'Handstand Hold', duration: 20, sets: 3, icon: '🤸', category: 'shoulders', equipment: 'Wall', videoUrl: 'https://www.youtube.com/watch?v=tgazbDFG8dE', difficulty: 'advanced' },
            { name: 'Lateral Raises', reps: 15, sets: 3, icon: '🦅', category: 'shoulders', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo', difficulty: 'beginner' },
            { name: 'Front Raises', reps: 15, sets: 3, icon: '⬆️', category: 'shoulders', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=wzcrXjiLD5Q', difficulty: 'beginner' },
            { name: 'Overhead Press', reps: 12, sets: 3, icon: '🏋️', category: 'shoulders', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI', difficulty: 'intermediate' },

            // ARM EXERCISES
            { name: 'Tricep Dips', reps: 15, sets: 3, icon: '💪', category: 'arms', equipment: 'Bench', videoUrl: 'https://www.youtube.com/watch?v=6kALZikXxLc', difficulty: 'beginner' },
            { name: 'Bicep Curls', reps: 15, sets: 3, icon: '💪', category: 'arms', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo', difficulty: 'beginner' },
            { name: 'Hammer Curls', reps: 15, sets: 3, icon: '🔨', category: 'arms', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=TwD-YGVP4Bk', difficulty: 'beginner' },
            { name: 'Tricep Extensions', reps: 15, sets: 3, icon: '🔽', category: 'arms', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=_gsUck-7M74', difficulty: 'intermediate' },
            { name: 'Close Grip Push-ups', reps: 12, sets: 3, icon: '👊', category: 'arms', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=uz47V3D7HMo', difficulty: 'intermediate' },
            { name: 'Concentration Curls', reps: 12, sets: 3, icon: '🎯', category: 'arms', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=Jvj2wV0zly0', difficulty: 'intermediate' },

            // LEG EXERCISES
            { name: 'Squats', reps: 20, sets: 4, icon: '🦵', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=aclHkVaku9U', difficulty: 'beginner' },
            { name: 'Lunges', reps: 12, sets: 3, icon: '🚶', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U', difficulty: 'beginner' },
            { name: 'Jump Squats', reps: 15, sets: 3, icon: '🏋️', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=A-cFYWvaHr0', difficulty: 'intermediate' },
            { name: 'Bulgarian Split Squats', reps: 12, sets: 3, icon: '🇧🇬', category: 'legs', equipment: 'Bench', videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE', difficulty: 'advanced' },
            { name: 'Wall Sit', duration: 45, sets: 3, icon: '🧱', category: 'legs', equipment: 'Wall', videoUrl: 'https://www.youtube.com/watch?v=y-wV4Venusw', difficulty: 'beginner' },
            { name: 'Calf Raises', reps: 20, sets: 4, icon: '👟', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=gwLzBJYoWlI', difficulty: 'beginner' },
            { name: 'Step-ups', reps: 15, sets: 3, icon: '📶', category: 'legs', equipment: 'Bench', videoUrl: 'https://www.youtube.com/watch?v=aajhW7DD1EA', difficulty: 'beginner' },
            { name: 'Pistol Squats', reps: 8, sets: 3, icon: '🔫', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=qDcniqddTeE', difficulty: 'advanced' },
            { name: 'Glute Bridges', reps: 20, sets: 3, icon: '🌉', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=OUgsJ8-Vi0E', difficulty: 'beginner' },

            // CORE EXERCISES
            { name: 'Plank', duration: 60, sets: 3, icon: '🏊', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw', difficulty: 'beginner' },
            { name: 'Crunches', reps: 20, sets: 3, icon: '💫', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU', difficulty: 'beginner' },
            { name: 'Bicycle Crunches', reps: 20, sets: 3, icon: '🚴', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=Iwyvozckjak', difficulty: 'beginner' },
            { name: 'Russian Twists', reps: 20, sets: 3, icon: '🔄', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI', difficulty: 'intermediate' },
            { name: 'Leg Raises', reps: 15, sets: 3, icon: '🦵', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=JB2oyawG9KI', difficulty: 'intermediate' },
            { name: 'Mountain Climbers', duration: 45, sets: 3, icon: '⛰️', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=nmwgirgXLYM', difficulty: 'intermediate' },
            { name: 'Side Plank', duration: 30, sets: 3, icon: '📐', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=K2VljzCC16g', difficulty: 'intermediate' },
            { name: 'V-ups', reps: 15, sets: 3, icon: 'V️', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=7UVgs18Y1P4', difficulty: 'advanced' },
            { name: 'Dead Bug', reps: 15, sets: 3, icon: '🐛', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=g_BYB0R-4Ws', difficulty: 'beginner' },

            // CARDIO EXERCISES
            { name: 'Jumping Jacks', duration: 45, sets: 3, icon: '🤸', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=c4DAnQ6DtF8', difficulty: 'beginner' },
            { name: 'Burpees', reps: 15, sets: 3, icon: '💪', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=TU8QYVW0gDU', difficulty: 'intermediate' },
            { name: 'High Knees', duration: 45, sets: 3, icon: '🦵', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=8opcQdC-V-U', difficulty: 'beginner' },
            { name: 'Sprint in Place', duration: 30, sets: 3, icon: '🏃', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=hHCW7OuDRzI', difficulty: 'intermediate' },
            { name: 'Box Jumps', reps: 15, sets: 3, icon: '📦', category: 'cardio', equipment: 'Box', videoUrl: 'https://www.youtube.com/watch?v=NBY9-kTuHEk', difficulty: 'advanced' },
            { name: 'Jump Rope', duration: 60, sets: 3, icon: '🪢', category: 'cardio', equipment: 'Jump Rope', videoUrl: 'https://www.youtube.com/watch?v=FJmRQ5iTXKE', difficulty: 'beginner' },
            { name: 'Skater Hops', reps: 20, sets: 3, icon: '⛸️', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=qxKd_YdPh6Y', difficulty: 'intermediate' },
            { name: 'Butt Kicks', duration: 45, sets: 3, icon: '🦵', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=qokBxeL0IY8', difficulty: 'beginner' },

            // FLEXIBILITY EXERCISES
            { name: 'Child\'s Pose', duration: 60, sets: 1, icon: '🙏', category: 'flexibility', equipment: 'Yoga Mat', videoUrl: 'https://www.youtube.com/watch?v=2MN9JUcwteU', difficulty: 'beginner' },
            { name: 'Downward Dog', duration: 45, sets: 1, icon: '🐕', category: 'flexibility', equipment: 'Yoga Mat', videoUrl: 'https://www.youtube.com/watch?v=nXKZcj7QCQQ', difficulty: 'beginner' },
            { name: 'Cat-Cow Stretch', reps: 10, sets: 2, icon: '🐱', category: 'flexibility', equipment: 'Yoga Mat', videoUrl: 'https://www.youtube.com/watch?v=kqnua4rHVVA', difficulty: 'beginner' },
            { name: 'Warrior Pose', duration: 30, sets: 2, icon: '⚔️', category: 'flexibility', equipment: 'Yoga Mat', videoUrl: 'https://www.youtube.com/watch?v=Ej4xXlgUJaU', difficulty: 'beginner' },
            { name: 'Hamstring Stretch', duration: 45, sets: 2, icon: '🦵', category: 'flexibility', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=ZOAAK-Tihz8', difficulty: 'beginner' },
            { name: 'Quad Stretch', duration: 30, sets: 2, icon: '🦿', category: 'flexibility', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=5gsG40FbBqo', difficulty: 'beginner' },
            { name: 'Shoulder Stretch', duration: 30, sets: 2, icon: '💪', category: 'flexibility', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=Uv7Zp7wHE_M', difficulty: 'beginner' },
            { name: 'Spinal Twist', duration: 45, sets: 2, icon: '🌀', category: 'flexibility', equipment: 'Yoga Mat', videoUrl: 'https://www.youtube.com/watch?v=tU0MZVuGtUE', difficulty: 'beginner' },
        ];

        // Add exercises to database
        const exerciseIds = await db.exercises.bulkAdd(exerciseLibrary.map(ex => ({
            ...ex,
            createdAt: new Date(),
            updatedAt: new Date()
        })), { allKeys: true });

        console.log(`✓ ${exerciseIds.length} exercises created`);

        // Get all exercises with their DB IDs
        const allExercisesInDB = await db.exercises.toArray();

        // Create helper to get exercises by category
        const getExercisesByCategory = (category) =>
            allExercisesInDB.filter(ex => ex.category === category);

        const getExercisesByDifficulty = (difficulty) =>
            allExercisesInDB.filter(ex => ex.difficulty === difficulty);

        // ========== STEP 3: Create Workouts ==========
        const workouts = [
            // BEGINNER WORKOUTS
            {
                name: 'Beginner Full Body',
                duration: 25,
                calories: 220,
                icon: '🌱',
                difficulty: 'beginner',
                category: 'full-body',
                targetArea: 'Full Body',
                description: 'Perfect for beginners starting their fitness journey'
            },
            {
                name: 'Core Basics',
                duration: 15,
                calories: 140,
                icon: '⭐',
                difficulty: 'beginner',
                category: 'core',
                targetArea: 'Core',
                description: 'Build a strong foundation with basic core exercises'
            },
            {
                name: 'Cardio Starter',
                duration: 20,
                calories: 200,
                icon: '🏃',
                difficulty: 'beginner',
                category: 'cardio',
                targetArea: 'Cardio',
                description: 'Get your heart pumping with beginner-friendly cardio'
            },
            {
                name: 'Morning Stretch',
                duration: 15,
                calories: 80,
                icon: '🧘',
                difficulty: 'beginner',
                category: 'flexibility',
                targetArea: 'Flexibility',
                description: 'Start your day with gentle stretching'
            },

            // INTERMEDIATE WORKOUTS
            {
                name: 'Chest Blast',
                duration: 30,
                calories: 280,
                icon: '💪',
                difficulty: 'intermediate',
                category: 'chest',
                targetArea: 'Chest',
                description: 'Build a powerful chest with varied exercises'
            },
            {
                name: 'Back Builder',
                duration: 35,
                calories: 300,
                icon: '🏋️',
                difficulty: 'intermediate',
                category: 'back',
                targetArea: 'Back',
                description: 'Develop a strong, defined back'
            },
            {
                name: 'Leg Day',
                duration: 40,
                calories: 380,
                icon: '🦵',
                difficulty: 'intermediate',
                category: 'legs',
                targetArea: 'Legs',
                description: 'Build powerful legs and glutes'
            },
            {
                name: 'Arm Sculptor',
                duration: 28,
                calories: 240,
                icon: '💪',
                difficulty: 'intermediate',
                category: 'arms',
                targetArea: 'Arms',
                description: 'Sculpt strong, defined arms'
            },
            {
                name: 'Shoulder Shredder',
                duration: 25,
                calories: 220,
                icon: '⛰️',
                difficulty: 'intermediate',
                category: 'shoulders',
                targetArea: 'Shoulders',
                description: 'Build boulder shoulders'
            },
            {
                name: 'Core Crusher',
                duration: 25,
                calories: 200,
                icon: '🔥',
                difficulty: 'intermediate',
                category: 'core',
                targetArea: 'Core',
                description: 'Advanced core workout for definition'
            },

            // ADVANCED WORKOUTS
            {
                name: 'HIIT Inferno',
                duration: 35,
                calories: 480,
                icon: '🔥',
                difficulty: 'advanced',
                category: 'cardio',
                targetArea: 'Full Body',
                description: 'High-intensity interval training for maximum burn'
            },
            {
                name: 'Advanced Athlete',
                duration: 50,
                calories: 520,
                icon: '🏆',
                difficulty: 'advanced',
                category: 'full-body',
                targetArea: 'Full Body',
                description: 'Complete workout for experienced athletes'
            },
            {
                name: 'Upper Body Power',
                duration: 40,
                calories: 360,
                icon: '💪',
                difficulty: 'advanced',
                category: 'upper-body',
                targetArea: 'Upper Body',
                description: 'Intense upper body strength training'
            },
            {
                name: 'Lower Body Burn',
                duration: 45,
                calories: 400,
                icon: '🔥',
                difficulty: 'advanced',
                category: 'lower-body',
                targetArea: 'Lower Body',
                description: 'Push your legs to the limit'
            },

            // GENERAL FITNESS
            {
                name: 'Total Body Blast',
                duration: 45,
                calories: 420,
                icon: '🚀',
                difficulty: 'intermediate',
                category: 'full-body',
                targetArea: 'Full Body',
                description: 'Complete full body workout'
            },
            {
                name: 'Quick Core',
                duration: 12,
                calories: 100,
                icon: '⚡',
                difficulty: 'beginner',
                category: 'core',
                targetArea: 'Core',
                description: 'Quick core workout when short on time'
            },
        ];

        const workoutIds = await db.workouts.bulkAdd(workouts.map(w => ({
            ...w,
            createdAt: new Date(),
            updatedAt: new Date()
        })), { allKeys: true });

        console.log(`✓ ${workoutIds.length} workouts created`);

        // ========== STEP 4: Create Workout-Exercise Relations ==========
        const workoutExerciseRelations = [];

        // Helper function to add exercises to workout
        const addExercisesToWorkout = (workoutIndex, exerciseNames) => {
            exerciseNames.forEach((name, order) => {
                const exercise = allExercisesInDB.find(ex => ex.name === name);
                if (exercise) {
                    workoutExerciseRelations.push({
                        workoutId: workoutIds[workoutIndex],
                        exerciseId: exercise.id,
                        order: order,
                        sets: exercise.sets || 3,
                        reps: exercise.reps || null,
                        duration: exercise.duration || null,
                    });
                }
            });
        };

        // Beginner Full Body (Workout 0)
        addExercisesToWorkout(0, [
            'Incline Push-ups', 'Squats', 'Plank', 'Lunges',
            'Crunches', 'Wall Sit', 'Shoulder Taps'
        ]);

        // Core Basics (Workout 1)
        addExercisesToWorkout(1, [
            'Plank', 'Crunches', 'Bicycle Crunches', 'Dead Bug', 'Side Plank'
        ]);

        // Cardio Starter (Workout 2)
        addExercisesToWorkout(2, [
            'Jumping Jacks', 'High Knees', 'Butt Kicks', 'Jump Rope', 'Sprint in Place'
        ]);

        // Morning Stretch (Workout 3)
        addExercisesToWorkout(3, [
            'Child\'s Pose', 'Downward Dog', 'Cat-Cow Stretch',
            'Warrior Pose', 'Hamstring Stretch', 'Shoulder Stretch'
        ]);

        // Chest Blast (Workout 4)
        addExercisesToWorkout(4, [
            'Push-ups', 'Wide Push-ups', 'Diamond Push-ups',
            'Decline Push-ups', 'Incline Push-ups', 'Chest Dips'
        ]);

        // Back Builder (Workout 5)
        addExercisesToWorkout(5, [
            'Pull-ups', 'Wide Grip Pull-ups', 'Inverted Rows',
            'Superman', 'Reverse Snow Angels', 'Back Extensions'
        ]);

        // Leg Day (Workout 6)
        addExercisesToWorkout(6, [
            'Squats', 'Lunges', 'Jump Squats', 'Bulgarian Split Squats',
            'Wall Sit', 'Calf Raises', 'Glute Bridges', 'Step-ups'
        ]);

        // Arm Sculptor (Workout 7)
        addExercisesToWorkout(7, [
            'Bicep Curls', 'Hammer Curls', 'Tricep Dips',
            'Tricep Extensions', 'Close Grip Push-ups', 'Concentration Curls'
        ]);

        // Shoulder Shredder (Workout 8)
        addExercisesToWorkout(8, [
            'Pike Push-ups', 'Lateral Raises', 'Front Raises',
            'Shoulder Taps', 'Overhead Press', 'Handstand Hold'
        ]);

        // Core Crusher (Workout 9)
        addExercisesToWorkout(9, [
            'Plank', 'Bicycle Crunches', 'Russian Twists', 'Leg Raises',
            'Mountain Climbers', 'V-ups', 'Side Plank'
        ]);

        // HIIT Inferno (Workout 10)
        addExercisesToWorkout(10, [
            'Burpees', 'Jump Squats', 'Mountain Climbers', 'High Knees',
            'Box Jumps', 'Skater Hops', 'Sprint in Place', 'Jumping Jacks'
        ]);

        // Advanced Athlete (Workout 11)
        addExercisesToWorkout(11, [
            'Plyometric Push-ups', 'Pistol Squats', 'Handstand Hold',
            'Burpees', 'Pull-ups', 'Box Jumps', 'V-ups', 'Jump Squats'
        ]);

        // Upper Body Power (Workout 12)
        addExercisesToWorkout(12, [
            'Push-ups', 'Pull-ups', 'Diamond Push-ups', 'Pike Push-ups',
            'Tricep Dips', 'Bicep Curls', 'Chest Dips'
        ]);

        // Lower Body Burn (Workout 13)
        addExercisesToWorkout(13, [
            'Squats', 'Lunges', 'Jump Squats', 'Bulgarian Split Squats',
            'Pistol Squats', 'Glute Bridges', 'Calf Raises', 'Wall Sit'
        ]);

        // Total Body Blast (Workout 14)
        addExercisesToWorkout(14, [
            'Burpees', 'Push-ups', 'Squats', 'Pull-ups', 'Lunges',
            'Mountain Climbers', 'Plank', 'Jump Squats'
        ]);

        // Quick Core (Workout 15)
        addExercisesToWorkout(15, [
            'Plank', 'Bicycle Crunches', 'Leg Raises', 'Russian Twists', 'Mountain Climbers'
        ]);

        await db.workoutExercises.bulkAdd(workoutExerciseRelations);
        console.log(`✓ ${workoutExerciseRelations.length} workout-exercise relations created`);

        // ========== STEP 5: Create Progressive Programs ==========
        const chestExercises = getExercisesByCategory('chest').map(e => e.id);
        const backExercises = getExercisesByCategory('back').map(e => e.id);
        const shoulderExercises = getExercisesByCategory('shoulders').map(e => e.id);
        const armExercises = getExercisesByCategory('arms').map(e => e.id);
        const legExercises = getExercisesByCategory('legs').map(e => e.id);
        const coreExercises = getExercisesByCategory('core').map(e => e.id);
        const cardioExercises = getExercisesByCategory('cardio').map(e => e.id);
        const flexibilityExercises = getExercisesByCategory('flexibility').map(e => e.id);
        const beginnerExercises = getExercisesByDifficulty('beginner').map(e => e.id);
        const intermediateExercises = getExercisesByDifficulty('intermediate').map(e => e.id);
        const advancedExercises = getExercisesByDifficulty('advanced').map(e => e.id);
        const allExerciseIds = allExercisesInDB.map(e => e.id);

        const programs = [
            {
                name: 'Beginner Fitness Journey',
                difficulty: 'beginner',
                duration: 28,
                description: 'Perfect for those just starting their fitness journey. Progressive intensity over 4 weeks.',
                workoutTemplate: {
                    category: 'mixed',
                    exercisePool: beginnerExercises.slice(0, 20),
                    structure: {
                        warmup: 2,
                        main: 4,
                        cooldown: 2
                    }
                },
                progression: {
                    startingDuration: 15,
                    endingDuration: 30,
                    startingSets: 2,
                    endingSets: 4,
                    startingReps: 8,
                    endingReps: 15,
                    progressionType: 'linear'
                },
                schedule: {
                    daysPerWeek: 3,
                    totalWeeks: 4
                },
                exercisePool: beginnerExercises.slice(0, 20),
                structure: { warmup: 2, main: 4, cooldown: 2 },
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
                    exercisePool: [...chestExercises, ...backExercises, ...legExercises, ...coreExercises],
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
                exercisePool: [...chestExercises, ...backExercises, ...legExercises, ...coreExercises],
                structure: { warmup: 2, main: 5, cooldown: 1 },
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
                    exercisePool: cardioExercises.length > 0 ? cardioExercises : allExerciseIds.slice(0, 12),
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
                exercisePool: cardioExercises.length > 0 ? cardioExercises : allExerciseIds.slice(0, 12),
                structure: { warmup: 1, main: 6, cooldown: 1 },
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
                    exercisePool: flexibilityExercises.length > 0 ? flexibilityExercises : allExerciseIds.slice(0, 10),
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
                exercisePool: flexibilityExercises.length > 0 ? flexibilityExercises : allExerciseIds.slice(0, 10),
                structure: { warmup: 1, main: 5, cooldown: 2 },
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Upper Body Power',
                difficulty: 'intermediate',
                duration: 28,
                description: 'Focus on building upper body strength with chest, back, shoulders, and arms.',
                workoutTemplate: {
                    category: 'upper-body',
                    exercisePool: [...chestExercises, ...backExercises, ...shoulderExercises, ...armExercises],
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
                exercisePool: [...chestExercises, ...backExercises, ...shoulderExercises, ...armExercises],
                structure: { warmup: 2, main: 5, cooldown: 1 },
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Lower Body Blast',
                difficulty: 'intermediate',
                duration: 21,
                description: 'Build powerful legs and a rock-solid core.',
                workoutTemplate: {
                    category: 'lower-body',
                    exercisePool: [...legExercises, ...coreExercises],
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
                exercisePool: [...legExercises, ...coreExercises],
                structure: { warmup: 2, main: 6, cooldown: 1 },
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Total Body Transformation',
                difficulty: 'advanced',
                duration: 42,
                description: 'Complete body transformation with balanced muscle development over 6 weeks.',
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
            },
            {
                name: 'Core Domination',
                difficulty: 'intermediate',
                duration: 21,
                description: 'Focused core training for definition and strength.',
                workoutTemplate: {
                    category: 'core',
                    exercisePool: coreExercises,
                    structure: {
                        warmup: 1,
                        main: 6,
                        cooldown: 1
                    }
                },
                progression: {
                    startingDuration: 15,
                    endingDuration: 35,
                    startingSets: 2,
                    endingSets: 4,
                    startingReps: 10,
                    endingReps: 25,
                    progressionType: 'linear'
                },
                schedule: {
                    daysPerWeek: 4,
                    totalWeeks: 3
                },
                exercisePool: coreExercises,
                structure: { warmup: 1, main: 6, cooldown: 1 },
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];

        await db.programs.bulkAdd(programs);
        console.log(`✓ ${programs.length} programs created`);

        console.log('\n🎉 Database seeded successfully!');
        console.log('━'.repeat(50));
        console.log(`Total Records Created:`);
        console.log(`  - Exercises: ${allExercisesInDB.length}`);
        console.log(`  - Workouts: ${workoutIds.length}`);
        console.log(`  - Workout-Exercise Relations: ${workoutExerciseRelations.length}`);
        console.log(`  - Programs: ${programs.length}`);
        console.log('━'.repeat(50));

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
};
