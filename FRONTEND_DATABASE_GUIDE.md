# Frontend-Only Database Setup

Your Leap Fitness app now uses **IndexedDB** for client-side data storage - no backend server required!

## 🎯 What is IndexedDB?

IndexedDB is a browser-based database that:

- ✅ Works completely offline
- ✅ Stores data locally in the user's browser
- ✅ Supports complex queries and relationships
- ✅ Has much larger storage capacity than localStorage (50MB+)
- ✅ Is fast and asynchronous

## 📦 Technology Used

**Dexie.js** - A wrapper around IndexedDB that makes it easier to use with a simple, promise-based API.

## 📁 File Structure

```
src/
├── services/
│   ├── db.js              # NEW: Main database with Dexie.js
│   ├── seedDatabase.js    # NEW: Seeds initial data
│   ├── database.js        # OLD: Backend API calls (not used anymore)
│   └── api.js            # OLD: HTTP client (not used anymore)
```

## 🗄️ Database Schema

The database includes these tables:

### 1. **users**

```javascript
{
  id: (auto-increment),
  email: string,
  username: string (unique),
  password: string,
  name: string,
  age: number,
  weight: number,
  height: number,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. **workouts**

```javascript
{
  id: (auto-increment),
  name: string,
  duration: number (minutes),
  calories: number,
  icon: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  category: 'cardio' | 'strength' | 'flexibility' | 'general',
  exercises: array,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. **exercises**

```javascript
{
  id: (auto-increment),
  name: string,
  icon: string,
  duration: number (seconds),
  reps: number,
  sets: number,
  videoUrl: string,
  category: string,
  difficulty: string,
  createdAt: Date
}
```

### 4. **userWorkouts**

```javascript
{
  id: (auto-increment),
  userId: number,
  workoutId: number,
  status: 'in-progress' | 'paused' | 'completed',
  startedAt: Date,
  completedAt: Date
}
```

### 5. **workoutLogs**

```javascript
{
  id: (auto-increment),
  userId: number,
  workoutId: number,
  date: Date,
  duration: number,
  caloriesBurned: number
}
```

### 6. **preferences**

```javascript
{
  id: (auto-increment),
  userId: number,
  theme: 'light' | 'dark',
  notifications: boolean,
  soundEnabled: boolean,
  language: string
}
```

### 7. **programs**

```javascript
{
  id: (auto-increment),
  name: string,
  difficulty: string,
  duration: number (days),
  description: string,
  workouts: array,
  schedule: array
}
```

### 8. **userProgress** & **achievements**

## 🚀 Usage in Your Components

### Import the services you need:

```javascript
import { userService, workoutService, progressService } from "@/services/db";
```

### Example: Register a new user

```javascript
const handleRegister = async () => {
  try {
    const user = await userService.register({
      email: "user@example.com",
      password: "password123",
      username: "fitnessuser",
      name: "John Doe",
      age: 25,
      weight: 70,
      height: 175,
    });
    console.log("User registered:", user);
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
```

### Example: Login

```javascript
const handleLogin = async () => {
  try {
    const user = await userService.login("user@example.com", "password123");
    console.log("Logged in:", user);
  } catch (error) {
    console.error("Login failed:", error);
  }
};
```

### Example: Get all workouts

```javascript
const loadWorkouts = async () => {
  const workouts = await workoutService.getWorkouts();
  console.log("All workouts:", workouts);
};
```

### Example: Filter workouts by difficulty

```javascript
const loadBeginnerWorkouts = async () => {
  const workouts = await workoutService.getWorkouts({ difficulty: "beginner" });
  console.log("Beginner workouts:", workouts);
};
```

### Example: Start a workout

```javascript
const startWorkout = async (workoutId) => {
  const userId = await userService.getCurrentUser().then((u) => u.id);
  const userWorkout = await userWorkoutService.startWorkout(userId, workoutId);
  console.log("Workout started:", userWorkout);
};
```

### Example: Complete a workout

```javascript
const completeWorkout = async (userWorkoutId) => {
  const result = await userWorkoutService.completeWorkout(userWorkoutId, {
    duration: 30, // minutes
    caloriesBurned: 250,
  });
  console.log("Workout completed:", result);
};
```

### Example: Get user stats

```javascript
const loadStats = async () => {
  const userId = await userService.getCurrentUser().then((u) => u.id);
  const stats = await progressService.getStats(userId);
  console.log("User stats:", stats);
  // { totalWorkouts, totalMinutes, totalCalories, streak }
};
```

## 🔄 Migrating from Backend API

Your old code used `database.js` which made HTTP calls to a backend. Now you can simply replace those imports:

**Before:**

```javascript
import { userService, workoutService } from "@/services/database";
```

**After:**

```javascript
import { userService, workoutService } from "@/services/db";
```

The function signatures are nearly identical, so most of your existing code should work with minimal changes!

## 📊 Viewing the Database

You can inspect the database in Chrome DevTools:

1. Open Chrome DevTools (F12)
2. Go to **Application** tab
3. Expand **IndexedDB** in the sidebar
4. Click on **LeapFitnessDB**
5. View/edit data in each table

## 🧪 Testing

To clear the database and reseed:

```javascript
// In browser console or your code
import db from "@/services/db";
import { seedDatabase } from "@/services/seedDatabase";

// Clear all data
await db.delete();

// Recreate and seed
await db.open();
await seedDatabase();
```

## ⚠️ Important Notes

### Data Persistence

- Data is stored **per browser** - users will have separate data in Chrome vs Firefox
- Data persists even after closing the browser
- Clearing browser data will delete the database

### User Sessions

- Currently, `currentUserId` is stored in `localStorage`
- When a user logs in, their ID is saved
- When they log out, it's removed
- This means only one user can be "logged in" at a time per browser

### Security Note

- ⚠️ **Passwords are stored in plain text** in IndexedDB
- This is **NOT secure** for a production app
- For real apps, you should:
  - Use a backend server with proper authentication
  - Hash passwords before storing
  - Use secure tokens (JWT)
- For learning/demo purposes, this is acceptable

### Storage Limits

- Most browsers allow 50MB+ in IndexedDB
- Chrome allows up to 60% of available disk space
- Mobile browsers may have lower limits

## 🎨 Benefits of This Approach

✅ **No Backend Required** - Perfect for demos, prototypes, and learning
✅ **Offline First** - App works completely offline
✅ **Fast** - No network latency
✅ **Simple Deployment** - Just deploy static files (Netlify, Vercel, GitHub Pages)
✅ **Cost Effective** - No server hosting costs

## 🚫 Limitations

❌ **No Data Sync** - Data doesn't sync between devices
❌ **No Sharing** - Users can't share data with others
❌ **Browser-Specific** - Each browser has its own data
❌ **Not Secure** - Don't store sensitive data without encryption
❌ **No Backup** - If user clears browser data, it's gone

## 🔮 Future: Adding Backend Later

If you want to add a backend later:

1. Keep the current `db.js` for offline support
2. Add sync logic to push/pull from a server
3. Use a "dirty flag" pattern to track what needs syncing
4. Implement conflict resolution for offline edits

This approach gives you the best of both worlds - offline capability with cloud sync!
