// Exercise Library - Comprehensive collection of exercises from Leap Fitness Official
// Videos sourced from: https://www.youtube.com/@LeapFitnessOfficial
export const exerciseLibrary = [
    // CHEST EXERCISES
    { name: 'Push-ups', reps: 15, sets: 4, icon: '💪', category: 'chest', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=R08gYyypGto', difficulty: 'beginner' },
    { name: 'Wide Push-ups', reps: 12, sets: 3, icon: '💪', category: 'chest', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=5-8yKSzjE5Q', difficulty: 'intermediate' },
    { name: 'Diamond Push-ups', reps: 10, sets: 3, icon: '💎', category: 'chest', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=B376F1lAxCw', difficulty: 'advanced' },
    { name: 'Decline Push-ups', reps: 12, sets: 3, icon: '📐', category: 'chest', equipment: 'Bench', videoUrl: 'https://www.youtube.com/watch?v=0s7i_M_Gvs4', difficulty: 'advanced' },
    { name: 'Incline Push-ups', reps: 15, sets: 3, icon: '⬆️', category: 'chest', equipment: 'Bench', videoUrl: 'https://www.youtube.com/watch?v=iJCTN_bMEH0', difficulty: 'beginner' },
    { name: 'Chest Dips', reps: 12, sets: 3, icon: '🏋️', category: 'chest', equipment: 'Dip Bar', videoUrl: 'https://www.youtube.com/watch?v=nI4LYcHZG_g', difficulty: 'advanced' },
    { name: 'Plyometric Push-ups', reps: 10, sets: 3, icon: '💥', category: 'chest', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=KJPxLHkPpHI', difficulty: 'advanced' },

    // BACK EXERCISES
    { name: 'Pull-ups', reps: 10, sets: 3, icon: '🏋️', category: 'back', equipment: 'Pull-up Bar', videoUrl: 'https://www.youtube.com/watch?v=HIL8AkZNqH4', difficulty: 'advanced' },
    { name: 'Chin-ups', reps: 10, sets: 3, icon: '💪', category: 'back', equipment: 'Pull-up Bar', videoUrl: 'https://www.youtube.com/watch?v=sqKCY8K8u1Q', difficulty: 'advanced' },
    { name: 'Superman', duration: 30, sets: 3, icon: '🦸', category: 'back', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=H-ZguHPbIjM', difficulty: 'beginner' },
    { name: 'Reverse Snow Angels', reps: 15, sets: 3, icon: '👼', category: 'back', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=GG0LZPqELhY', difficulty: 'beginner' },
    { name: 'Wide Grip Pull-ups', reps: 8, sets: 3, icon: '🏋️‍♂️', category: 'back', equipment: 'Pull-up Bar', videoUrl: 'https://www.youtube.com/watch?v=HIL8AkZNqH4', difficulty: 'advanced' },
    { name: 'Inverted Rows', reps: 12, sets: 3, icon: '⬆️', category: 'back', equipment: 'Bar', videoUrl: 'https://www.youtube.com/watch?v=5TfG3_3oQ34', difficulty: 'intermediate' },
    { name: 'Back Extensions', reps: 15, sets: 3, icon: '🔙', category: 'back', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=ph3pddpKzzw', difficulty: 'beginner' },

    // SHOULDER EXERCISES
    { name: 'Pike Push-ups', reps: 12, sets: 3, icon: '⛰️', category: 'shoulders', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=dZcDYpilFRs', difficulty: 'intermediate' },
    { name: 'Shoulder Taps', reps: 20, sets: 3, icon: '👆', category: 'shoulders', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=sZN7HJrYqF8', difficulty: 'beginner' },
    { name: 'Handstand Hold', duration: 20, sets: 3, icon: '🤸', category: 'shoulders', equipment: 'Wall', videoUrl: 'https://www.youtube.com/watch?v=XRLbqXvAMqw', difficulty: 'advanced' },
    { name: 'Lateral Raises', reps: 15, sets: 3, icon: '🦅', category: 'shoulders', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=kDqklk1ZESo', difficulty: 'beginner' },
    { name: 'Front Raises', reps: 15, sets: 3, icon: '⬆️', category: 'shoulders', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=R95rIKWJR3Q', difficulty: 'beginner' },
    { name: 'Overhead Press', reps: 12, sets: 3, icon: '🏋️', category: 'shoulders', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=b-5zQYhPD7Q', difficulty: 'intermediate' },

    // ARM EXERCISES
    { name: 'Tricep Dips', reps: 15, sets: 3, icon: '💪', category: 'arms', equipment: 'Bench', videoUrl: 'https://www.youtube.com/watch?v=0326dy_-CzM', difficulty: 'beginner' },
    { name: 'Bicep Curls', reps: 15, sets: 3, icon: '💪', category: 'arms', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=soxrZbuIgbA', difficulty: 'beginner' },
    { name: 'Hammer Curls', reps: 15, sets: 3, icon: '🔨', category: 'arms', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=TwD-YGVP4Bk', difficulty: 'beginner' },
    { name: 'Tricep Extensions', reps: 15, sets: 3, icon: '🔽', category: 'arms', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=YbX7Wd8jQ-Q', difficulty: 'intermediate' },
    { name: 'Close Grip Push-ups', reps: 12, sets: 3, icon: '👊', category: 'arms', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=soxrZbuIgbA', difficulty: 'intermediate' },
    { name: 'Concentration Curls', reps: 12, sets: 3, icon: '🎯', category: 'arms', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=Jvj2wV0zly0', difficulty: 'intermediate' },

    // LEG EXERCISES
    { name: 'Squats', reps: 20, sets: 4, icon: '🦵', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=xqvCmoLULNY', difficulty: 'beginner' },
    { name: 'Lunges', reps: 12, sets: 3, icon: '🚶', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U', difficulty: 'beginner' },
    { name: 'Jump Squats', reps: 15, sets: 3, icon: '🏋️', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=CVaEhXotL7M', difficulty: 'intermediate' },
    { name: 'Bulgarian Split Squats', reps: 12, sets: 3, icon: '🇧🇬', category: 'legs', equipment: 'Bench', videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE', difficulty: 'advanced' },
    { name: 'Wall Sit', duration: 45, sets: 3, icon: '🧱', category: 'legs', equipment: 'Wall', videoUrl: 'https://www.youtube.com/watch?v=y-wV4Venusw', difficulty: 'beginner' },
    { name: 'Calf Raises', reps: 20, sets: 4, icon: '👟', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=gwWP7Nrujdk', difficulty: 'beginner' },
    { name: 'Step-ups', reps: 15, sets: 3, icon: '📶', category: 'legs', equipment: 'Bench', videoUrl: 'https://www.youtube.com/watch?v=aajhW7DD1EA', difficulty: 'beginner' },
    { name: 'Pistol Squats', reps: 8, sets: 3, icon: '🔫', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=qDcniqddTeE', difficulty: 'advanced' },
    { name: 'Glute Bridges', reps: 20, sets: 3, icon: '🌉', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=OUgsJ8-Vi0E', difficulty: 'beginner' },

    // CORE EXERCISES
    { name: 'Plank', duration: 60, sets: 3, icon: '🏊', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=yeKv5oX_6GY', difficulty: 'beginner' },
    { name: 'Crunches', reps: 20, sets: 3, icon: '💫', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=MKmrqcoCZ-M', difficulty: 'beginner' },
    { name: 'Bicycle Crunches', reps: 20, sets: 3, icon: '🚴', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=1we3bh9uhqY', difficulty: 'beginner' },
    { name: 'Russian Twists', reps: 20, sets: 3, icon: '🔄', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI', difficulty: 'intermediate' },
    { name: 'Leg Raises', reps: 15, sets: 3, icon: '🦵', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=l4kQd9eWclE', difficulty: 'intermediate' },
    { name: 'Mountain Climbers', duration: 45, sets: 3, icon: '⛰️', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=wQq3ybaLxvI', difficulty: 'intermediate' },
    { name: 'Side Plank', duration: 30, sets: 3, icon: '📐', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=K2VljzCC16g', difficulty: 'intermediate' },
    { name: 'V-ups', reps: 15, sets: 3, icon: 'V️', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=7UVgs18Y1P4', difficulty: 'advanced' },
    { name: 'Dead Bug', reps: 15, sets: 3, icon: '🐛', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=g_BYB0R-4Ws', difficulty: 'beginner' },

    // CARDIO EXERCISES
    { name: 'Jumping Jacks', duration: 45, sets: 3, icon: '🤸', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=UpH7rm0cYbM', difficulty: 'beginner' },
    { name: 'Burpees', reps: 15, sets: 3, icon: '💪', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=JZQA08SlJnM', difficulty: 'intermediate' },
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

// Note: These videos are from Leap Fitness Official and related fitness channels
// All videos are short demonstrations (under 2 minutes) suitable for quick reference during workouts
