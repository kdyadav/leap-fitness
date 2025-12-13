// Exercise Library by Category
// Video URLs from Leap Fitness Official: https://www.youtube.com/@LeapFitnessOfficial
export const exerciseLibrary = {
    chest: [
        { id: 'ex1', name: 'Push-ups', reps: 15, sets: 4, icon: '💪', category: 'chest', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
        { id: 'ex2', name: 'Wide Push-ups', reps: 12, sets: 3, icon: '💪', category: 'chest', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=rr6KQFL-X24' },
        { id: 'ex3', name: 'Diamond Push-ups', reps: 10, sets: 3, icon: '💎', category: 'chest', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=J0DnG1_S92I' },
        { id: 'ex4', name: 'Decline Push-ups', reps: 12, sets: 3, icon: '📐', category: 'chest', equipment: 'Bench/Box', videoUrl: 'https://www.youtube.com/watch?v=SKPab2YC3Og' },
        { id: 'ex5', name: 'Chest Dips', reps: 12, sets: 3, icon: '🏋️', category: 'chest', equipment: 'Dip Bar/Parallel Bars', videoUrl: 'https://www.youtube.com/watch?v=yN6Q1UI_xkE' },
        { id: 'ex6', name: 'Chest Fly', reps: 15, sets: 3, icon: '🦅', category: 'chest', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=Z8epI4SxMSY' },
        { id: 'ex7', name: 'Incline Push-ups', reps: 15, sets: 3, icon: '⬆️', category: 'chest', equipment: 'Bench/Box', videoUrl: 'https://www.youtube.com/watch?v=Gh4_YVpN3Pk' },
        { id: 'ex8', name: 'Plyometric Push-ups', reps: 10, sets: 3, icon: '💥', category: 'chest', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=YXeAw-NSYi0' }
    ],
    back: [
        { id: 'ex9', name: 'Pull-ups', reps: 10, sets: 3, icon: '🏋️', category: 'back', equipment: 'Pull-up Bar', videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
        { id: 'ex10', name: 'Chin-ups', reps: 10, sets: 3, icon: '💪', category: 'back', equipment: 'Pull-up Bar', videoUrl: 'https://www.youtube.com/watch?v=brhRXlOhkAM' },
        { id: 'ex11', name: 'Superman', duration: 30, sets: 3, icon: '🦸', category: 'back', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=z6PJMT2y8GQ' },
        { id: 'ex12', name: 'Reverse Snow Angels', reps: 15, sets: 3, icon: '👼', category: 'back', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=X_JwHIezkhA' },
        { id: 'ex13', name: 'Bent Over Rows', reps: 15, sets: 3, icon: '🚣', category: 'back', equipment: 'Dumbbells/Barbell', videoUrl: 'https://www.youtube.com/watch?v=T3N-TO4reLQ' },
        { id: 'ex14', name: 'Wide Grip Pull-ups', reps: 8, sets: 3, icon: '🏋️‍♂️', category: 'back', equipment: 'Pull-up Bar', videoUrl: 'https://www.youtube.com/watch?v=iywjqUo5nmU' },
        { id: 'ex15', name: 'Inverted Rows', reps: 12, sets: 3, icon: '⬆️', category: 'back', equipment: 'Bar/Table', videoUrl: 'https://www.youtube.com/watch?v=hXTc1mDnZCw' },
        { id: 'ex16', name: 'Back Extensions', reps: 15, sets: 3, icon: '🔙', category: 'back', equipment: 'None/Bench', videoUrl: 'https://www.youtube.com/watch?v=qtdHJoZvCno' }
    ],
    shoulders: [
        { id: 'ex17', name: 'Pike Push-ups', reps: 12, sets: 3, icon: '⛰️', category: 'shoulders', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=x4YNi4nRboU' },
        { id: 'ex18', name: 'Shoulder Taps', reps: 20, sets: 3, icon: '👆', category: 'shoulders', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=VjQGQ7uPJnw' },
        { id: 'ex19', name: 'Handstand Hold', duration: 20, sets: 3, icon: '🤸', category: 'shoulders', equipment: 'Wall', videoUrl: 'https://www.youtube.com/watch?v=tgazbDFG8dE' },
        { id: 'ex20', name: 'Lateral Raises', reps: 15, sets: 3, icon: '🦅', category: 'shoulders', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
        { id: 'ex21', name: 'Front Raises', reps: 15, sets: 3, icon: '⬆️', category: 'shoulders', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=wzcrXjiLD5Q' },
        { id: 'ex22', name: 'Overhead Press', reps: 12, sets: 3, icon: '🏋️', category: 'shoulders', equipment: 'Dumbbells/Barbell', videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI' },
        { id: 'ex23', name: 'Arnold Press', reps: 12, sets: 3, icon: '💪', category: 'shoulders', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=6Z15_WdXmVw' },
        { id: 'ex24', name: 'Reverse Fly', reps: 15, sets: 3, icon: '🦋', category: 'shoulders', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=EA7u4Q_8HQ0' }
    ],
    arms: [
        { id: 'ex25', name: 'Tricep Dips', reps: 15, sets: 3, icon: '💪', category: 'arms', equipment: 'Bench/Chair', videoUrl: 'https://www.youtube.com/watch?v=6kALZikXxLc' },
        { id: 'ex26', name: 'Diamond Push-ups', reps: 10, sets: 3, icon: '💎', category: 'arms', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=J0DnG1_S92I' },
        { id: 'ex27', name: 'Bicep Curls', reps: 15, sets: 3, icon: '💪', category: 'arms', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
        { id: 'ex28', name: 'Hammer Curls', reps: 15, sets: 3, icon: '🔨', category: 'arms', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=TwD-YGVP4Bk' },
        { id: 'ex29', name: 'Tricep Extensions', reps: 15, sets: 3, icon: '🔽', category: 'arms', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=_gsUck-7M74' },
        { id: 'ex30', name: 'Concentration Curls', reps: 12, sets: 3, icon: '🎯', category: 'arms', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=Jvj2wV0zly0' },
        { id: 'ex31', name: 'Close Grip Push-ups', reps: 12, sets: 3, icon: '👊', category: 'arms', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=uz47V3D7HMo' },
        { id: 'ex32', name: 'Zottman Curls', reps: 12, sets: 3, icon: '🔄', category: 'arms', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=ZrpRBgswtHs' }
    ],
    legs: [
        { id: 'ex33', name: 'Squats', reps: 20, sets: 4, icon: '🦵', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=aclHkVaku9U' },
        { id: 'ex34', name: 'Lunges', reps: 12, sets: 3, icon: '🚶', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U' },
        { id: 'ex35', name: 'Jump Squats', reps: 15, sets: 3, icon: '🏋️', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=A-cFYWvaHr0' },
        { id: 'ex36', name: 'Bulgarian Split Squats', reps: 12, sets: 3, icon: '🇧🇬', category: 'legs', equipment: 'Bench/Box', videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE' },
        { id: 'ex37', name: 'Wall Sit', duration: 45, sets: 3, icon: '🧱', category: 'legs', equipment: 'Wall', videoUrl: 'https://www.youtube.com/watch?v=y-wV4Venusw' },
        { id: 'ex38', name: 'Calf Raises', reps: 20, sets: 4, icon: '👟', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=gwLzBJYoWlI' },
        { id: 'ex39', name: 'Single Leg Deadlift', reps: 12, sets: 3, icon: '⚖️', category: 'legs', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=5GZHXRjzgH4' },
        { id: 'ex40', name: 'Step-ups', reps: 15, sets: 3, icon: '📶', category: 'legs', equipment: 'Bench/Box', videoUrl: 'https://www.youtube.com/watch?v=aajhW7DD1EA' },
        { id: 'ex41', name: 'Pistol Squats', reps: 8, sets: 3, icon: '🔫', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=qDcniqddTeE' },
        { id: 'ex42', name: 'Glute Bridges', reps: 20, sets: 3, icon: '🌉', category: 'legs', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=OUgsJ8-Vi0E' }
    ],
    core: [
        { id: 'ex43', name: 'Plank', duration: 60, sets: 3, icon: '🏊', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw' },
        { id: 'ex44', name: 'Crunches', reps: 20, sets: 3, icon: '💫', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU' },
        { id: 'ex45', name: 'Bicycle Crunches', reps: 20, sets: 3, icon: '🚴', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=Iwyvozckjak' },
        { id: 'ex46', name: 'Russian Twists', reps: 20, sets: 3, icon: '🔄', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI' },
        { id: 'ex47', name: 'Leg Raises', reps: 15, sets: 3, icon: '🦵', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=JB2oyawG9KI' },
        { id: 'ex48', name: 'Mountain Climbers', duration: 45, sets: 3, icon: '⛰️', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=nmwgirgXLYM' },
        { id: 'ex49', name: 'Side Plank', duration: 30, sets: 3, icon: '📐', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=K2VljzCC16g' },
        { id: 'ex50', name: 'Dead Bug', reps: 15, sets: 3, icon: '🐛', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=g_BYB0R-4Ws' },
        { id: 'ex51', name: 'V-ups', reps: 15, sets: 3, icon: 'V️', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=7UVgs18Y1P4' },
        { id: 'ex52', name: 'Hollow Body Hold', duration: 30, sets: 3, icon: '⭕', category: 'core', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=LlDNef_Ztsc' }
    ],
    cardio: [
        { id: 'ex53', name: 'Jumping Jacks', duration: 45, sets: 3, icon: '🤸', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=c4DAnQ6DtF8' },
        { id: 'ex54', name: 'Burpees', reps: 15, sets: 3, icon: '💪', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=TU8QYVW0gDU' },
        { id: 'ex55', name: 'High Knees', duration: 45, sets: 3, icon: '🦵', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=8opcQdC-V-U' },
        { id: 'ex56', name: 'Sprint in Place', duration: 30, sets: 3, icon: '🏃', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=hHCW7OuDRzI' },
        { id: 'ex57', name: 'Box Jumps', reps: 15, sets: 3, icon: '📦', category: 'cardio', equipment: 'Box/Bench', videoUrl: 'https://www.youtube.com/watch?v=NBY9-kTuHEk' },
        { id: 'ex58', name: 'Skater Hops', reps: 20, sets: 3, icon: '⛸️', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=qxKd_YdPh6Y' },
        { id: 'ex59', name: 'Jump Rope', duration: 60, sets: 3, icon: '🪢', category: 'cardio', equipment: 'Jump Rope', videoUrl: 'https://www.youtube.com/watch?v=FJmRQ5iTXKE' },
        { id: 'ex60', name: 'Butt Kicks', duration: 45, sets: 3, icon: '🦵', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=qokBxeL0IY8' },
        { id: 'ex78', name: 'Treadmill Running', duration: 600, sets: 1, icon: '🏃‍♂️', category: 'cardio', equipment: 'Treadmill', videoUrl: 'https://www.youtube.com/watch?v=wCvR2Kant9k' },
        { id: 'ex79', name: 'Rowing Machine', duration: 300, sets: 1, icon: '🚣‍♂️', category: 'cardio', equipment: 'Rowing Machine', videoUrl: 'https://www.youtube.com/watch?v=zQ82RYIFN8s' },
        { id: 'ex80', name: 'Stationary Bike', duration: 600, sets: 1, icon: '🚴‍♂️', category: 'cardio', equipment: 'Exercise Bike', videoUrl: 'https://www.youtube.com/watch?v=DmVeH8GY8H8' },
        { id: 'ex81', name: 'Elliptical Trainer', duration: 600, sets: 1, icon: '🏃', category: 'cardio', equipment: 'Elliptical Machine', videoUrl: 'https://www.youtube.com/watch?v=4zrkCJwYHV0' },
        { id: 'ex82', name: 'Stair Climber', duration: 300, sets: 1, icon: '📶', category: 'cardio', equipment: 'Stair Machine', videoUrl: 'https://www.youtube.com/watch?v=vfqzP8Hzmtg' },
        { id: 'ex83', name: 'Battle Ropes', duration: 30, sets: 4, icon: '🪢', category: 'cardio', equipment: 'Battle Ropes', videoUrl: 'https://www.youtube.com/watch?v=w8fo60DqsS4' },
        { id: 'ex84', name: 'Assault Bike', duration: 60, sets: 5, icon: '🚴', category: 'cardio', equipment: 'Assault Bike', videoUrl: 'https://www.youtube.com/watch?v=YCW-MbXd9Zo' },
        { id: 'ex85', name: 'Sled Push', reps: 10, sets: 4, icon: '🛷', category: 'cardio', equipment: 'Prowler Sled', videoUrl: 'https://www.youtube.com/watch?v=kCBMPnH0pNc' },
        { id: 'ex86', name: 'Sled Pull', reps: 10, sets: 4, icon: '🎯', category: 'cardio', equipment: 'Prowler Sled', videoUrl: 'https://www.youtube.com/watch?v=Vqz4SZ1Y4MI' },
        { id: 'ex87', name: 'Farmers Walk', duration: 60, sets: 3, icon: '🏋️', category: 'cardio', equipment: 'Dumbbells/Kettlebells', videoUrl: 'https://www.youtube.com/watch?v=rt17lmnaLSM' },
        { id: 'ex88', name: 'Kettlebell Swings', reps: 20, sets: 4, icon: '⚫', category: 'cardio', equipment: 'Kettlebell', videoUrl: 'https://www.youtube.com/watch?v=YSxHifyI6s8' },
        { id: 'ex89', name: 'Medicine Ball Slams', reps: 15, sets: 4, icon: '⚽', category: 'cardio', equipment: 'Medicine Ball', videoUrl: 'https://www.youtube.com/watch?v=EwRy9GW8JZs' },
        { id: 'ex90', name: 'Wall Balls', reps: 20, sets: 4, icon: '🎱', category: 'cardio', equipment: 'Medicine Ball', videoUrl: 'https://www.youtube.com/watch?v=fpUD0mcFp_0' }
    ],
    gym: [
        { id: 'ex91', name: 'Barbell Bench Press', reps: 10, sets: 4, icon: '🏋️', category: 'gym', equipment: 'Barbell/Bench', videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg' },
        { id: 'ex92', name: 'Barbell Squat', reps: 12, sets: 4, icon: '🏋️‍♂️', category: 'gym', equipment: 'Barbell/Squat Rack', videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8' },
        { id: 'ex93', name: 'Deadlift', reps: 8, sets: 4, icon: '💪', category: 'gym', equipment: 'Barbell', videoUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q' },
        { id: 'ex94', name: 'Barbell Row', reps: 12, sets: 4, icon: '🚣', category: 'gym', equipment: 'Barbell', videoUrl: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ' },
        { id: 'ex95', name: 'Military Press', reps: 10, sets: 4, icon: '🎖️', category: 'gym', equipment: 'Barbell', videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI' },
        { id: 'ex96', name: 'Lat Pulldown', reps: 12, sets: 3, icon: '⬇️', category: 'gym', equipment: 'Cable Machine', videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc' },
        { id: 'ex97', name: 'Cable Chest Fly', reps: 15, sets: 3, icon: '🦅', category: 'gym', equipment: 'Cable Machine', videoUrl: 'https://www.youtube.com/watch?v=Iwe6AmxVf7o' },
        { id: 'ex98', name: 'Leg Press', reps: 15, sets: 4, icon: '🦿', category: 'gym', equipment: 'Leg Press Machine', videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ' },
        { id: 'ex99', name: 'Leg Curl', reps: 15, sets: 3, icon: '🦵', category: 'gym', equipment: 'Leg Curl Machine', videoUrl: 'https://www.youtube.com/watch?v=ELOCsoDSmrg' },
        { id: 'ex100', name: 'Leg Extension', reps: 15, sets: 3, icon: '🦵', category: 'gym', equipment: 'Leg Extension Machine', videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0' },
        { id: 'ex101', name: 'Cable Tricep Pushdown', reps: 15, sets: 3, icon: '💪', category: 'gym', equipment: 'Cable Machine', videoUrl: 'https://www.youtube.com/watch?v=-xa-6cQaZKY' },
        { id: 'ex102', name: 'Cable Bicep Curl', reps: 15, sets: 3, icon: '💪', category: 'gym', equipment: 'Cable Machine', videoUrl: 'https://www.youtube.com/watch?v=NFzTWp2qpiE' },
        { id: 'ex103', name: 'Smith Machine Squat', reps: 12, sets: 4, icon: '🏋️', category: 'gym', equipment: 'Smith Machine', videoUrl: 'https://www.youtube.com/watch?v=PQu6gVc0CpY' },
        { id: 'ex104', name: 'Incline Dumbbell Press', reps: 12, sets: 4, icon: '📐', category: 'gym', equipment: 'Dumbbells/Bench', videoUrl: 'https://www.youtube.com/watch?v=8iPEnn-ltC8' },
        { id: 'ex105', name: 'Dumbbell Shoulder Press', reps: 12, sets: 4, icon: '🏋️', category: 'gym', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog' },
        { id: 'ex106', name: 'Dumbbell Lunges', reps: 12, sets: 3, icon: '🚶', category: 'gym', equipment: 'Dumbbells', videoUrl: 'https://www.youtube.com/watch?v=D7KaRcUTQeE' },
        { id: 'ex107', name: 'Preacher Curl', reps: 12, sets: 3, icon: '💪', category: 'gym', equipment: 'Preacher Bench/Barbell', videoUrl: 'https://www.youtube.com/watch?v=fIWP-FRFNU0' },
        { id: 'ex108', name: 'Skull Crushers', reps: 12, sets: 3, icon: '💀', category: 'gym', equipment: 'Barbell/Bench', videoUrl: 'https://www.youtube.com/watch?v=d_KZxkY_0cM' },
        { id: 'ex109', name: 'Face Pulls', reps: 15, sets: 3, icon: '🎯', category: 'gym', equipment: 'Cable Machine', videoUrl: 'https://www.youtube.com/watch?v=rep-qVOkqgk' },
        { id: 'ex110', name: 'Seated Cable Row', reps: 12, sets: 4, icon: '🚣‍♂️', category: 'gym', equipment: 'Cable Machine', videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74' },
        { id: 'ex111', name: 'T-Bar Row', reps: 12, sets: 4, icon: '📊', category: 'gym', equipment: 'T-Bar Machine', videoUrl: 'https://www.youtube.com/watch?v=j3Igk5vZGlw' },
        { id: 'ex112', name: 'Hack Squat', reps: 12, sets: 4, icon: '🏋️', category: 'gym', equipment: 'Hack Squat Machine', videoUrl: 'https://www.youtube.com/watch?v=0tn5K9NlCfo' },
        { id: 'ex113', name: 'Chest Press Machine', reps: 12, sets: 3, icon: '🏋️‍♀️', category: 'gym', equipment: 'Chest Press Machine', videoUrl: 'https://www.youtube.com/watch?v=xUm0BiZCWlQ' },
        { id: 'ex114', name: 'Pec Deck Fly', reps: 15, sets: 3, icon: '🦋', category: 'gym', equipment: 'Pec Deck Machine', videoUrl: 'https://www.youtube.com/watch?v=Z57CtFmRMxA' },
        { id: 'ex115', name: 'Cable Crossover', reps: 15, sets: 3, icon: '✖️', category: 'gym', equipment: 'Cable Machine', videoUrl: 'https://www.youtube.com/watch?v=taI4XduLpTk' },
        { id: 'ex116', name: 'Romanian Deadlift', reps: 10, sets: 4, icon: '🇷🇴', category: 'gym', equipment: 'Barbell', videoUrl: 'https://www.youtube.com/watch?v=JCXUYuzwNrM' },
        { id: 'ex117', name: 'Good Mornings', reps: 12, sets: 3, icon: '☀️', category: 'gym', equipment: 'Barbell', videoUrl: 'https://www.youtube.com/watch?v=YA-h3n0EZZg' },
        { id: 'ex118', name: 'Hip Thrust', reps: 15, sets: 4, icon: '🌉', category: 'gym', equipment: 'Barbell/Bench', videoUrl: 'https://www.youtube.com/watch?v=xDmFkJxPzeM' },
        { id: 'ex119', name: 'Goblet Squat', reps: 15, sets: 3, icon: '🏆', category: 'gym', equipment: 'Dumbbell/Kettlebell', videoUrl: 'https://www.youtube.com/watch?v=MeIiIdhvXT4' },
        { id: 'ex120', name: 'Dumbbell Pullover', reps: 12, sets: 3, icon: '🔄', category: 'gym', equipment: 'Dumbbell/Bench', videoUrl: 'https://www.youtube.com/watch?v=tqkN3JiYQh8' }
    ],
    flexibility: [
        { id: 'ex61', name: 'Child\'s Pose', duration: 60, icon: '🙏', sets: 1, category: 'flexibility', equipment: 'Yoga Mat', videoUrl: 'https://www.youtube.com/watch?v=2MN9JUcwteU' },
        { id: 'ex62', name: 'Downward Dog', duration: 45, icon: '🐕', sets: 1, category: 'flexibility', equipment: 'Yoga Mat', videoUrl: 'https://www.youtube.com/watch?v=nXKZcj7QCQQ' },
        { id: 'ex63', name: 'Cat-Cow Stretch', reps: 10, sets: 2, icon: '🐱', category: 'flexibility', equipment: 'Yoga Mat', videoUrl: 'https://www.youtube.com/watch?v=kqnua4rHVVA' },
        { id: 'ex64', name: 'Warrior Pose', duration: 30, sets: 2, icon: '⚔️', category: 'flexibility', equipment: 'Yoga Mat', videoUrl: 'https://www.youtube.com/watch?v=Ej4xXlgUJaU' },
        { id: 'ex65', name: 'Tree Pose', duration: 30, sets: 2, icon: '🌳', category: 'flexibility', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=VqhbKiXHwdE' },
        { id: 'ex66', name: 'Seated Forward Bend', duration: 60, icon: '🧘‍♀️', sets: 1, category: 'flexibility', equipment: 'Yoga Mat', videoUrl: 'https://www.youtube.com/watch?v=g0hS0f3pOx4' },
        { id: 'ex67', name: 'Neck Rolls', duration: 30, icon: '🔄', sets: 1, category: 'flexibility', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=mFaXvkLfVBg' },
        { id: 'ex68', name: 'Shoulder Stretch', duration: 30, sets: 2, icon: '💪', category: 'flexibility', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=Uv7Zp7wHE_M' },
        { id: 'ex69', name: 'Hamstring Stretch', duration: 45, sets: 2, icon: '🦵', category: 'flexibility', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=ZOAAK-Tihz8' },
        { id: 'ex70', name: 'Quad Stretch', duration: 30, sets: 2, icon: '🦿', category: 'flexibility', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=5gsG40FbBqo' },
        { id: 'ex71', name: 'Hip Flexor Stretch', duration: 45, sets: 2, icon: '🧘', category: 'flexibility', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=YQmpO9VT2X4' },
        { id: 'ex72', name: 'Spinal Twist', duration: 45, sets: 2, icon: '🌀', category: 'flexibility', equipment: 'Yoga Mat', videoUrl: 'https://www.youtube.com/watch?v=tU0MZVuGtUE' },
        { id: 'ex73', name: 'Warm-up Jog', duration: 300, icon: '🚶', sets: 1, category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=hHCW7OuDRzI' },
        { id: 'ex74', name: 'Sprint', duration: 60, sets: 6, icon: '💨', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=hHCW7OuDRzI' },
        { id: 'ex75', name: 'Recovery Jog', duration: 120, sets: 6, icon: '🏃', category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=hHCW7OuDRzI' },
        { id: 'ex76', name: 'Tempo Run', duration: 300, icon: '🏃‍♂️', sets: 1, category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=hHCW7OuDRzI' },
        { id: 'ex77', name: 'Cool Down Walk', duration: 300, icon: '🚶‍♂️', sets: 1, category: 'cardio', equipment: 'None', videoUrl: 'https://www.youtube.com/watch?v=hHCW7OuDRzI' }
    ]
};

export const workoutsData = {
    // ===== TARGETED WORKOUTS =====
    1: {
        id: 1,
        name: 'Chest Blast',
        duration: 30,
        calories: 280,
        icon: '💪',
        category: 'chest',
        targetArea: 'Chest',
        exercises: ['ex1', 'ex2', 'ex3', 'ex4', 'ex5', 'ex8']
    },
    2: {
        id: 2,
        name: 'Back Builder',
        duration: 35,
        calories: 300,
        icon: '🏋️',
        category: 'back',
        targetArea: 'Back',
        exercises: ['ex9', 'ex14', 'ex15', 'ex11', 'ex13', 'ex16']
    },
    3: {
        id: 3,
        name: 'Shoulder Shredder',
        duration: 25,
        calories: 220,
        icon: '⛰️',
        category: 'shoulders',
        targetArea: 'Shoulders',
        exercises: ['ex17', 'ex20', 'ex21', 'ex18', 'ex24', 'ex22']
    },
    4: {
        id: 4,
        name: 'Arm Destroyer',
        duration: 28,
        calories: 240,
        icon: '💪',
        category: 'arms',
        targetArea: 'Arms',
        exercises: ['ex27', 'ex28', 'ex25', 'ex26', 'ex29', 'ex30']
    },
    5: {
        id: 5,
        name: 'Leg Day Domination',
        duration: 40,
        calories: 380,
        icon: '🦵',
        category: 'legs',
        targetArea: 'Legs',
        exercises: ['ex33', 'ex34', 'ex36', 'ex35', 'ex37', 'ex38', 'ex42']
    },
    6: {
        id: 6,
        name: 'Core Crusher',
        duration: 20,
        calories: 180,
        icon: '⭐',
        category: 'core',
        targetArea: 'Core',
        exercises: ['ex43', 'ex44', 'ex45', 'ex46', 'ex47', 'ex51', 'ex49']
    },

    // ===== FULL BODY WORKOUTS =====
    7: {
        id: 7,
        name: 'Total Body Blast',
        duration: 45,
        calories: 420,
        icon: '🔥',
        category: 'full-body',
        targetArea: 'Full Body',
        exercises: ['ex54', 'ex1', 'ex33', 'ex9', 'ex34', 'ex48', 'ex43', 'ex35']
    },
    8: {
        id: 8,
        name: 'HIIT Full Body',
        duration: 35,
        calories: 450,
        icon: '🔥',
        category: 'full-body',
        targetArea: 'Full Body',
        exercises: ['ex53', 'ex54', 'ex48', 'ex55', 'ex1', 'ex35', 'ex56']
    },
    9: {
        id: 9,
        name: 'Strength Circuit',
        duration: 50,
        calories: 380,
        icon: '💪',
        category: 'full-body',
        targetArea: 'Full Body',
        exercises: ['ex1', 'ex9', 'ex33', 'ex34', 'ex25', 'ex43', 'ex17', 'ex46']
    },
    10: {
        id: 10,
        name: 'Cardio Inferno',
        duration: 30,
        calories: 480,
        icon: '🔥',
        category: 'cardio',
        targetArea: 'Cardio',
        exercises: ['ex53', 'ex54', 'ex55', 'ex59', 'ex57', 'ex58', 'ex56']
    },

    // ===== SPECIALTY WORKOUTS =====
    11: {
        id: 11,
        name: 'Upper Body Power',
        duration: 40,
        calories: 340,
        icon: '💪',
        category: 'upper-body',
        targetArea: 'Upper Body',
        exercises: ['ex1', 'ex9', 'ex3', 'ex17', 'ex25', 'ex27', 'ex13']
    },
    12: {
        id: 12,
        name: 'Lower Body Burn',
        duration: 35,
        calories: 360,
        icon: '🦵',
        category: 'lower-body',
        targetArea: 'Lower Body',
        exercises: ['ex33', 'ex34', 'ex35', 'ex36', 'ex42', 'ex38', 'ex37']
    },
    13: {
        id: 13,
        name: 'Morning Yoga',
        duration: 20,
        calories: 150,
        icon: '🧘',
        category: 'flexibility',
        targetArea: 'Flexibility',
        exercises: ['ex61', 'ex62', 'ex63', 'ex64', 'ex65', 'ex66']
    },
    14: {
        id: 14,
        name: 'Full Body Stretch',
        duration: 25,
        calories: 80,
        icon: '🌟',
        category: 'flexibility',
        targetArea: 'Flexibility',
        exercises: ['ex67', 'ex68', 'ex69', 'ex70', 'ex71', 'ex72']
    },
    15: {
        id: 15,
        name: 'Running Intervals',
        duration: 40,
        calories: 450,
        icon: '🏃',
        category: 'cardio',
        targetArea: 'Cardio',
        exercises: ['ex73', 'ex74', 'ex75', 'ex76', 'ex77']
    },
    16: {
        id: 16,
        name: 'Beginner Full Body',
        duration: 25,
        calories: 220,
        icon: '🌱',
        category: 'full-body',
        targetArea: 'Full Body',
        difficulty: 'beginner',
        exercises: ['ex7', 'ex33', 'ex43', 'ex34', 'ex44', 'ex37']
    },
    17: {
        id: 17,
        name: 'Advanced Athlete',
        duration: 55,
        calories: 520,
        icon: '🏆',
        category: 'full-body',
        targetArea: 'Full Body',
        difficulty: 'advanced',
        exercises: ['ex8', 'ex41', 'ex19', 'ex54', 'ex9', 'ex57', 'ex51', 'ex35']
    },
    18: {
        id: 18,
        name: 'Push Day',
        duration: 38,
        calories: 320,
        icon: '💪',
        category: 'push',
        targetArea: 'Chest, Shoulders, Triceps',
        exercises: ['ex1', 'ex17', 'ex3', 'ex25', 'ex20', 'ex6', 'ex22']
    },
    19: {
        id: 19,
        name: 'Pull Day',
        duration: 38,
        calories: 310,
        icon: '🏋️',
        category: 'pull',
        targetArea: 'Back, Biceps',
        exercises: ['ex9', 'ex10', 'ex15', 'ex27', 'ex28', 'ex13', 'ex11']
    },
    20: {
        id: 20,
        name: 'Quick Core',
        duration: 12,
        calories: 100,
        icon: '⚡',
        category: 'core',
        targetArea: 'Core',
        exercises: ['ex43', 'ex45', 'ex47', 'ex46', 'ex48']
    }
};

// Helper function to get all exercises as a flat array
export const getAllExercises = () => {
    const allExercises = [];
    Object.values(exerciseLibrary).forEach(category => {
        allExercises.push(...category);
    });
    return allExercises;
};

// Helper function to get exercise by ID
export const getExerciseById = (id) => {
    const allExercises = getAllExercises();
    return allExercises.find(exercise => exercise.id === id);
};

// Helper function to get workout with full exercise objects
export const getWorkoutWithExercises = (workoutId) => {
    const workout = workoutsData[workoutId];
    if (!workout) return null;
    
    return {
        ...workout,
        exercises: workout.exercises.map(exerciseId => getExerciseById(exerciseId))
    };
};
