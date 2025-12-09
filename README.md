# Leap Fitness - Frontend-Only Fitness Tracking App

A modern fitness tracking application built with Vue 3 and powered by IndexedDB for client-side data storage. **No backend server required!**

## ✨ Features

- 🏋️ Workout tracking and management
- 📊 Progress statistics and streaks
- 👤 User authentication (frontend-only)
- 💪 Pre-built workout programs
- 🎯 Exercise library
- 📈 Personal fitness dashboard
- 🌙 Dark/Light theme support

## 🚀 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Dexie.js** - IndexedDB wrapper for easy database management
- **Vue Router** - Official router for Vue.js
- **Tabler Icons** - Beautiful icon set

## 🗄️ Database Architecture

This app uses **IndexedDB** (via Dexie.js) for client-side data persistence:

- ✅ No backend server needed
- ✅ Works completely offline
- ✅ Fast local storage
- ✅ Supports complex queries
- ✅ 50MB+ storage capacity

### Database Tables

- `users` - User accounts and profiles
- `workouts` - Workout definitions
- `exercises` - Exercise library
- `programs` - Workout programs
- `userWorkouts` - Workout session tracking
- `workoutLogs` - Historical workout data
- `preferences` - User settings
- `achievements` - Achievement system
- `userProgress` - Progress tracking

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Quick Start

The database is automatically initialized when you start the app. It comes pre-seeded with:

- 6 workout routines
- Exercise library
- 2 sample programs

### First Time Setup

1. Start the app: `npm run dev`
2. Navigate to the signup page
3. Create a new account (stored locally in IndexedDB)
4. Start browsing workouts!

### Using the Database Services

```javascript
import { userService, workoutService, progressService } from "@/services/db";

// Register a user
await userService.register({
  email: "user@example.com",
  password: "password123",
  username: "fituser",
  name: "Fit User",
});

// Login
await userService.login("user@example.com", "password123");

// Get workouts
const workouts = await workoutService.getWorkouts();

// Start a workout
const user = await userService.getCurrentUser();
const session = await userWorkoutService.startWorkout(user.id, workoutId);

// Get statistics
const stats = await progressService.getStats(user.id);
```

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get up and running quickly
- **[FRONTEND_DATABASE_GUIDE.md](./FRONTEND_DATABASE_GUIDE.md)** - Complete database documentation
- **[INTEGRATION_EXAMPLES.md](./INTEGRATION_EXAMPLES.md)** - Real code examples
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Migrating from backend API

## 🛠️ Development

### Project Structure

```
src/
├── services/
│   ├── db.js              # Main database (NEW!)
│   └── seedDatabase.js    # Database seeding (NEW!)
├── components/           # Vue components
├── pages/               # Page components
├── router.js            # Route definitions
├── data/                # Static data
└── main.js             # App entry point
```

### Available Services

All services exported from `src/services/db.js`:

- `userService` - User management
- `workoutService` - Workout operations
- `exerciseService` - Exercise library
- `programService` - Workout programs
- `userWorkoutService` - Session tracking
- `progressService` - Statistics
- `preferencesService` - User settings
- `achievementService` - Achievements

## 🔍 Debugging

### View Database in Browser

1. Open Chrome DevTools (F12)
2. Go to **Application** tab
3. Expand **IndexedDB** → **LeapFitnessDB**
4. Browse tables and data

### Reset Database

```javascript
import db from "@/services/db";
import { seedDatabase } from "@/services/seedDatabase";

// Clear and reseed
await db.delete();
await db.open();
await seedDatabase();
```

## 🌐 Deployment

Since this is a frontend-only app, you can deploy it anywhere that serves static files:

### Netlify

```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### Vercel

```bash
npm run build
vercel --prod
```

### GitHub Pages

```bash
npm run build
# Push 'dist' folder to gh-pages branch
```

## ⚠️ Important Notes

### Security

- This is a **demo/learning project**
- Passwords are stored in plain text (not secure!)
- For production, use a proper backend with:
  - Password hashing
  - JWT tokens
  - Server-side validation
  - HTTPS

### Data Persistence

- Data is stored per-browser
- Clearing browser data deletes the database
- No sync between devices
- No cloud backup

### Storage Limits

- Most browsers: 50MB+ in IndexedDB
- Chrome: Up to 60% of available disk space
- Mobile browsers may have lower limits

## 🎉 Benefits

✅ No backend setup required  
✅ No hosting costs  
✅ Works offline  
✅ Fast (no network latency)  
✅ Easy to deploy  
✅ Perfect for learning and prototyping

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! This is a learning project showcasing frontend-only data persistence.

---

Built with ❤️ using Vue 3 + Vite + Dexie.js
