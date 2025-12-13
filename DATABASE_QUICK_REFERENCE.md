# Quick Reference: Updated Database Structure

## What You Need to Know

### ✅ Changes Applied Successfully

1. **Exercise Storage**: Exercises are now referenced by ID in workoutsData
2. **Equipment Tracking**: All exercises have equipment information
3. **Library Expansion**: 120 total exercises (77 original + 43 new)
4. **Database Services**: Automatically handle ID-to-object conversion

---

## For Developers

### Adding a New Exercise

```javascript
// 1. Add to exerciseLibrary in src/data/workouts.js
gym: [
    // ... existing exercises
    {
        id: 'ex121',  // Use next available ID
        name: 'Cable Flyes',
        reps: 12,
        sets: 3,
        icon: '🦅',
        category: 'gym',
        equipment: 'Cable Machine',
        videoUrl: 'https://www.youtube.com/watch?v=...'
    }
]

// 2. Reference it in a workout
workoutsData: {
    1: {
        // ... workout details
        exercises: ['ex1', 'ex2', 'ex121']  // Add new exercise ID
    }
}
```

### Creating a New Workout

```javascript
// Add to workoutsData in src/data/workouts.js
21: {
    id: 21,
    name: 'Gym Power',
    duration: 45,
    calories: 400,
    icon: '🏋️',
    category: 'gym',
    targetArea: 'Full Body',
    exercises: ['ex91', 'ex92', 'ex93', 'ex94']  // Reference exercise IDs
}
```

### Using Helper Functions

```javascript
import {
  getAllExercises,
  getExerciseById,
  getWorkoutWithExercises,
} from "@/data/workouts";

// Get all exercises
const allExercises = getAllExercises();
// Returns: [{ id: 'ex1', name: 'Push-ups', ... }, ...]

// Get single exercise
const exercise = getExerciseById("ex1");
// Returns: { id: 'ex1', name: 'Push-ups', equipment: 'None', ... }

// Get workout with exercises populated
const workout = getWorkoutWithExercises(1);
// Returns: { id: 1, name: 'Chest Blast', exercises: [{ name: 'Push-ups', ... }] }
```

---

## For Vue Components

### Accessing Workout Data

```vue
<script setup>
import { useWorkoutStore } from "@/stores";

const workoutStore = useWorkoutStore();

// Load single workout (exercises are automatically populated)
await workoutStore.loadWorkout(1);
const workout = workoutStore.currentWorkout;

// Load all workouts
await workoutStore.loadWorkouts();
const workouts = workoutStore.workouts;
</script>

<template>
  <!-- Display exercises -->
  <div v-for="exercise in workout.exercises" :key="exercise.id">
    {{ exercise.icon }} {{ exercise.name }}
    <span v-if="exercise.equipment !== 'None'">
      Equipment: {{ exercise.equipment }}
    </span>
  </div>

  <!-- Display equipment needed -->
  <div v-if="workout.equipment?.length">
    <h3>Equipment Needed:</h3>
    <span v-for="item in workout.equipment" :key="item">
      {{ item }}
    </span>
  </div>
</template>
```

---

## Database Schema

### Tables and Relationships

```
┌─────────────┐       ┌──────────────────┐       ┌─────────────┐
│  workouts   │       │ workoutExercises │       │  exercises  │
├─────────────┤       ├──────────────────┤       ├─────────────┤
│ id          │──┐    │ id               │    ┌──│ id          │
│ name        │  │    │ workoutId        │────┘  │ name        │
│ duration    │  └────│ exerciseId       │       │ reps        │
│ calories    │       │ order            │       │ duration    │
│ category    │       │ sets             │       │ sets        │
│ difficulty  │       │ reps             │       │ icon        │
└─────────────┘       │ duration         │       │ category    │
                      └──────────────────┘       │ equipment   │
                                                 │ videoUrl    │
                                                 └─────────────┘
```

---

## Exercise Categories

| Category    | Count   | Equipment Examples                         |
| ----------- | ------- | ------------------------------------------ |
| Chest       | 8       | None, Dumbbells, Dip Bar                   |
| Back        | 8       | Pull-up Bar, Dumbbells, Barbell            |
| Shoulders   | 8       | Dumbbells, Barbell, Wall                   |
| Arms        | 8       | Dumbbells, None                            |
| Legs        | 10      | None, Dumbbells, Bench                     |
| Core        | 10      | None                                       |
| Cardio      | 21      | None, Treadmill, Rowing Machine, Jump Rope |
| Gym         | 30      | Barbell, Cable Machine, Leg Press          |
| Flexibility | 17      | Yoga Mat, None                             |
| **Total**   | **120** | -                                          |

---

## Equipment Types

- None (Bodyweight)
- Dumbbells
- Barbell
- Pull-up Bar
- Cable Machine
- Bench/Box
- Yoga Mat
- Treadmill
- Rowing Machine
- Exercise Bike
- And more...

---

## Troubleshooting

### Issue: Workouts not loading

**Solution**: Clear database and reseed

```javascript
import db from "@/services/db";
import { seedDatabase } from "@/services/seedDatabase";

await db.delete();
await db.open();
await seedDatabase();
```

### Issue: Exercises missing equipment

**Check**: All exercises in exerciseLibrary have `equipment` field

### Issue: Workout shows IDs instead of names

**Cause**: Using workoutsData directly instead of database service
**Solution**: Use `workoutService.getWorkout()` instead

---

## Files Modified

1. ✅ `src/data/workouts.js` - Added IDs, equipment, new exercises
2. ✅ `src/services/seedDatabase.js` - Updated to map exercise IDs
3. ✅ `src/services/db.js` - Added equipment aggregation

## Files Created

1. 📄 `DATABASE_MIGRATION_COMPLETE.md` - Detailed migration guide
2. 📄 `test-db-changes.html` - Automated test suite
3. 📄 `DATABASE_QUICK_REFERENCE.md` - This file

---

## Testing

### Run Tests

1. Start dev server: `npm run dev`
2. Open: http://localhost:5174/test-db-changes.html
3. Click "Run All Tests"

### Manual Testing

1. Navigate to Workouts page
2. Click on a workout
3. Verify exercises display correctly
4. Check equipment list appears
5. Start workout timer
6. Confirm exercises play properly

---

## Need Help?

All database operations are handled automatically by the service layer. Vue components don't need to know about the normalized structure - they just work with the data as before!
