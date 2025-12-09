# Workout-Exercise Relation Service

## Overview

The `workoutExerciseService` manages the **many-to-many relationship** between workouts and exercises. This allows:

- ✅ Multiple exercises per workout
- ✅ Same exercise used in multiple workouts
- ✅ Custom sets/reps/duration per workout
- ✅ Ordering of exercises within a workout
- ✅ Better data normalization

## Database Schema

### Tables

1. **workouts** - Workout information (name, duration, calories, etc.)
2. **exercises** - Exercise library (name, category, etc.)
3. **workoutExercises** - Relation table (workoutId, exerciseId, order, sets, reps, duration)

### Example Data Flow

```
Workout: "Morning Yoga"
  ├─ Exercise 1: Child's Pose (60s, 1 set)
  ├─ Exercise 2: Downward Dog (45s, 1 set)
  └─ Exercise 3: Cat-Cow Stretch (10 reps, 2 sets)

Workout: "HIIT Cardio"
  ├─ Exercise 1: Jumping Jacks (45s, 3 sets)
  ├─ Exercise 2: Burpees (15 reps, 3 sets)
  └─ Exercise 3: Mountain Climbers (45s, 3 sets)
```

## Usage Examples

### 1. Get All Exercises for a Workout

```javascript
import { workoutExerciseService } from "@/services/db";

// Get exercises with full details
const exercises = await workoutExerciseService.getWorkoutExercises(workoutId);

// Result:
[
  {
    id: 1,
    name: "Child's Pose",
    icon: "🙏",
    category: "flexibility",
    workoutExerciseId: 101, // Relation ID
    order: 0,
    sets: 1,
    reps: null,
    duration: 60,
  },
  {
    id: 2,
    name: "Downward Dog",
    icon: "🐕",
    category: "flexibility",
    workoutExerciseId: 102,
    order: 1,
    sets: 1,
    reps: null,
    duration: 45,
  },
];
```

### 2. Add Exercise to Workout

```javascript
// Add an exercise to a workout
await workoutExerciseService.addExerciseToWorkout(workoutId, exerciseId, {
  order: 0, // Position in workout
  sets: 3,
  reps: 15,
  duration: null,
});
```

### 3. Bulk Add Multiple Exercises

```javascript
// Add multiple exercises at once
await workoutExerciseService.bulkAddExercisesToWorkout(workoutId, [
  { exerciseId: 1, order: 0, sets: 1, duration: 60 },
  { exerciseId: 2, order: 1, sets: 1, duration: 45 },
  { exerciseId: 3, order: 2, sets: 2, reps: 10 },
]);
```

### 4. Update Exercise Details in Workout

```javascript
// Change sets/reps/duration for an exercise in a specific workout
await workoutExerciseService.updateWorkoutExercise(workoutExerciseId, {
  sets: 4,
  reps: 20,
});
```

### 5. Reorder Exercises

```javascript
// Change the order of exercises in a workout
await workoutExerciseService.reorderWorkoutExercises(workoutId, [
  { workoutExerciseId: 101, order: 2 }, // Move to position 2
  { workoutExerciseId: 102, order: 0 }, // Move to position 0
  { workoutExerciseId: 103, order: 1 }, // Move to position 1
]);
```

### 6. Find Workouts Using an Exercise

```javascript
// Get all workouts that include "Burpees"
const workouts = await workoutExerciseService.getWorkoutsUsingExercise(
  exerciseId
);
```

### 7. Remove Exercise from Workout

```javascript
// Remove a specific exercise from a workout
await workoutExerciseService.removeExerciseFromWorkout(workoutExerciseId);
```

## Component Integration

### WorkoutDetails.vue Example

```vue
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { workoutService, workoutExerciseService } from "@/services/db";

const route = useRoute();
const workout = ref(null);
const exercises = ref([]);
const loading = ref(true);

onMounted(async () => {
  const workoutId = parseInt(route.params.id);

  // Load workout info
  workout.value = await workoutService.getWorkout(workoutId);

  // Load exercises with relation data
  exercises.value = await workoutExerciseService.getWorkoutExercises(workoutId);

  loading.value = false;
});
</script>

<template>
  <div v-if="!loading">
    <h1>{{ workout.name }}</h1>

    <div
      v-for="(exercise, index) in exercises"
      :key="exercise.workoutExerciseId"
    >
      <h3>{{ index + 1 }}. {{ exercise.name }} {{ exercise.icon }}</h3>

      <p v-if="exercise.duration">
        Duration: {{ exercise.duration }}s × {{ exercise.sets }} sets
      </p>

      <p v-if="exercise.reps">
        Reps: {{ exercise.reps }} × {{ exercise.sets }} sets
      </p>
    </div>
  </div>
</template>
```

### Admin: Create Custom Workout

```vue
<script setup>
import { ref } from "vue";
import {
  workoutService,
  exerciseService,
  workoutExerciseService,
} from "@/services/db";

const workoutName = ref("");
const selectedExercises = ref([]);
const allExercises = ref([]);

// Load available exercises
onMounted(async () => {
  allExercises.value = await exerciseService.getExercises();
});

const createWorkout = async () => {
  // 1. Create workout
  const workout = await workoutService.createWorkout({
    name: workoutName.value,
    duration: 30,
    calories: 200,
    difficulty: "intermediate",
    category: "custom",
  });

  // 2. Add exercises to workout
  const exerciseData = selectedExercises.value.map((ex, index) => ({
    exerciseId: ex.id,
    order: index,
    sets: ex.sets || 3,
    reps: ex.reps || null,
    duration: ex.duration || null,
  }));

  await workoutExerciseService.bulkAddExercisesToWorkout(
    workout.id,
    exerciseData
  );

  alert("Workout created!");
};
</script>
```

## Benefits of Relation Table

### ✅ Before (Embedded)

```javascript
// Workout with embedded exercises
{
  id: 1,
  name: "Morning Yoga",
  exercises: [
    { name: "Child's Pose", duration: 60, sets: 1 },
    { name: "Downward Dog", duration: 45, sets: 1 }
  ]
}

// Problems:
// ❌ Exercise data duplicated across workouts
// ❌ Can't query "which workouts use this exercise?"
// ❌ Updating an exercise name requires updating all workouts
// ❌ Hard to reorder exercises
```

### ✅ After (Normalized with Relation Table)

```javascript
// Workout
{ id: 1, name: "Morning Yoga" }

// Exercises (library)
{ id: 1, name: "Child's Pose" }
{ id: 2, name: "Downward Dog" }

// Relations
{ workoutId: 1, exerciseId: 1, order: 0, sets: 1, duration: 60 }
{ workoutId: 1, exerciseId: 2, order: 1, sets: 1, duration: 45 }

// Benefits:
// ✅ No data duplication
// ✅ Easy to query both directions
// ✅ Update exercise once, reflects everywhere
// ✅ Easy to reorder, add, remove
// ✅ Different sets/reps per workout
```

## Migration Notes

### Old Way (Embedded)

```javascript
// Old: Workout contains exercises array
const workout = await workoutService.getWorkout(1);
const exercises = workout.exercises; // Array embedded in workout
```

### New Way (Relation Service)

```javascript
// New: Fetch workout and exercises separately
const workout = await workoutService.getWorkout(1);
const exercises = await workoutExerciseService.getWorkoutExercises(1);
```

## API Reference

### Methods

| Method                                                 | Description                   | Returns            |
| ------------------------------------------------------ | ----------------------------- | ------------------ |
| `addExerciseToWorkout(workoutId, exerciseId, options)` | Add exercise to workout       | Relation object    |
| `getWorkoutExercises(workoutId)`                       | Get all exercises for workout | Array of exercises |
| `getWorkoutsUsingExercise(exerciseId)`                 | Find workouts using exercise  | Array of workouts  |
| `updateWorkoutExercise(id, updates)`                   | Update sets/reps/duration     | Updated relation   |
| `removeExerciseFromWorkout(id)`                        | Remove exercise from workout  | Success object     |
| `reorderWorkoutExercises(workoutId, orders)`           | Reorder exercises             | Success object     |
| `bulkAddExercisesToWorkout(workoutId, exercises)`      | Add multiple exercises        | Success object     |

## Export/Import

```javascript
// Export service
export { workoutExerciseService } from "@/services/db";

// Import in components
import { workoutExerciseService } from "@/services/db";
```

---

**The relation table is now created and ready to use!** 🎉

The database will automatically seed workout-exercise relations when you first run the app.
