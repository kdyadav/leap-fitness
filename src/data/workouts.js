export const workoutsData = {
    1: {
        id: 1,
        name: 'Morning Yoga',
        duration: 20,
        calories: 150,
        icon: '🧘',
        exercises: [
            {
                name: 'Child\'s Pose', duration: 60,
                videoUrl: "https://www.youtube.com/watch?v=Fcbw82ykBvY",
                icon: '🙏', sets: 1
            },
            { name: 'Downward Dog', duration: 45, icon: '🐕', sets: 1 },
            { name: 'Cat-Cow Stretch', reps: 10, sets: 2, icon: '🐱' },
            { name: 'Warrior Pose', duration: 30, sets: 2, icon: '⚔️' },
            { name: 'Tree Pose', duration: 30, sets: 2, icon: '🌳' },
            { name: 'Seated Forward Bend', duration: 60, icon: '🧘‍♀️', sets: 1 }
        ]
    },
    2: {
        id: 2,
        name: 'HIIT Cardio',
        duration: 30,
        calories: 400,
        icon: '🔥',
        exercises: [
            { name: 'Jumping Jacks', duration: 45, sets: 3, icon: '🤸' },
            { name: 'Burpees', reps: 15, sets: 3, icon: '💪' },
            { name: 'Mountain Climbers', duration: 45, sets: 3, icon: '⛰️' },
            { name: 'High Knees', duration: 45, sets: 3, icon: '🦵' },
            { name: 'Jump Squats', reps: 20, sets: 3, icon: '🏋️' },
            { name: 'Sprint in Place', duration: 30, sets: 3, icon: '🏃' }
        ]
    },
    3: {
        id: 3,
        name: 'Strength Training',
        duration: 45,
        calories: 300,
        icon: '💪',
        exercises: [
            { name: 'Push-ups', reps: 15, sets: 4, icon: '💪' },
            { name: 'Pull-ups', reps: 10, sets: 3, icon: '🏋️' },
            { name: 'Squats', reps: 20, sets: 4, icon: '🦵' },
            { name: 'Lunges', reps: 12, sets: 3, icon: '🚶' },
            { name: 'Plank', duration: 60, sets: 3, icon: '🏊' },
            { name: 'Dips', reps: 12, sets: 3, icon: '💪' }
        ]
    },
    4: {
        id: 4,
        name: 'Core Workout',
        duration: 15,
        calories: 120,
        icon: '⭐',
        exercises: [
            { name: 'Crunches', reps: 20, sets: 3, icon: '💫' },
            { name: 'Bicycle Crunches', reps: 15, sets: 3, icon: '🚴' },
            { name: 'Plank', duration: 45, sets: 3, icon: '🏊' },
            { name: 'Russian Twists', reps: 20, sets: 3, icon: '🔄' },
            { name: 'Leg Raises', reps: 12, sets: 3, icon: '🦵' }
        ]
    },
    5: {
        id: 5,
        name: 'Full Body Stretch',
        duration: 25,
        calories: 80,
        icon: '🌟',
        exercises: [
            { name: 'Neck Rolls', duration: 30, icon: '🔄', sets: 1 },
            { name: 'Shoulder Stretch', duration: 30, sets: 2, icon: '💪' },
            { name: 'Hamstring Stretch', duration: 45, sets: 2, icon: '🦵' },
            { name: 'Quad Stretch', duration: 30, sets: 2, icon: '🦿' },
            { name: 'Hip Flexor Stretch', duration: 45, sets: 2, icon: '🧘' },
            { name: 'Spinal Twist', duration: 45, sets: 2, icon: '🌀' }
        ]
    },
    6: {
        id: 6,
        name: 'Running Intervals',
        duration: 40,
        calories: 450,
        icon: '🏃',
        exercises: [
            { name: 'Warm-up Jog', duration: 300, icon: '🚶', sets: 1 },
            { name: 'Sprint', duration: 60, sets: 6, icon: '💨' },
            { name: 'Recovery Jog', duration: 120, sets: 6, icon: '🏃' },
            { name: 'Tempo Run', duration: 300, icon: '🏃‍♂️', sets: 1 },
            { name: 'Cool Down Walk', duration: 300, icon: '🚶‍♂️', sets: 1 }
        ]
    }
};
