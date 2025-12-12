# 🎯 Quick Start - Progressive Workout System

## Reset Database to See New Programs

Open your browser console (F12) and run:

```javascript
await window.resetDatabase();
```

Then refresh the page!

---

## What You'll See

### 📋 Workouts Page

4 new progressive programs:

1. **Beginner Fitness Journey** (28 days, 3x/week)
   - Linear progression: 15→30 min, 2→4 sets
2. **Advanced HIIT Challenge** (21 days, 3x/week)
   - Exponential progression: 20→45 min, 3→5 sets
3. **Strength Builder** (35 days, 4x/week)
   - Stepped progression: 25→50 min, 3→5 sets
4. **Flexibility & Mobility** (14 days, 5x/week)
   - Logarithmic progression: 10→25 min, 1→3 sets

### 📅 Plan Details Page

- **Progression Summary Card**: Shows start → end values
- **Dynamic Timeline**: Each day has a unique, generated workout
- **Progressive Stats**: Sets, reps, duration increase over time
- **Milestones**: Week markers to celebrate progress

---

## How It Works

### Day 1

```
Duration: 15 min
Sets: 2
Reps: 8
Exercises: Warmup (2) → Main (4) → Cooldown (2)
```

### Day 14 (Midpoint)

```
Duration: 22 min  ⬆️
Sets: 3           ⬆️
Reps: 11          ⬆️
Exercises: Different exercises, same structure
```

### Day 28 (Final)

```
Duration: 30 min  ⬆️⬆️
Sets: 4           ⬆️⬆️
Reps: 15          ⬆️⬆️
Exercises: Advanced variations
```

---

## Key Features

✅ **No Repetition**: Different exercises every workout day  
✅ **Progressive Overload**: Automatically increases intensity  
✅ **Smart Scheduling**: Rest days built in  
✅ **Multiple Algorithms**: Linear, Exponential, Stepped, Logarithmic  
✅ **Category-Specific**: Cardio, Strength, Flexibility, or Mixed

---

## Developer Usage

### Generate a Single Workout

```javascript
import { workoutGeneratorService } from "@/services/db";

// Generate Day 10 of Program 1
const workout = await workoutGeneratorService.generateWorkoutForDay(1, 10);

console.log(workout.progressiveStats);
// { sets: 3, reps: 11, duration: 22, calories: 220 }
```

### Get Progression Summary

```javascript
const summary = await workoutGeneratorService.getProgressionSummary(1);

console.log(summary);
// Shows start/end values and increase for duration, sets, reps
```

### Check Progression Algorithm

```javascript
// Calculate what duration will be on day 15 of 28
const duration = workoutGeneratorService.calculateProgression(
  15, // current day
  28, // total days
  15, // starting value
  30, // ending value
  "linear"
);
console.log(duration); // ~22 minutes
```

---

## That's It! 🎉

Your progressive workout system is ready. Users now get personalized, adaptive workouts that grow with them!
