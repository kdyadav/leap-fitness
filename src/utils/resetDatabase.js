// Utility to reset and reseed the database with new progressive programs
import db from '../services/db.js';
import { seedDatabase } from '../services/seedDatabase.js';

export async function resetDatabase() {
    try {
        console.log('🗑️  Clearing all database tables...');

        // Clear all tables
        await db.workouts.clear();
        await db.exercises.clear();
        await db.workoutExercises.clear();
        await db.programs.clear();
        await db.userWorkouts.clear();
        await db.userProgress.clear();
        await db.workoutLogs.clear();
        await db.goals.clear();
        await db.favorites.clear();
        // Note: Not clearing users and preferences to keep user data

        console.log('✅ Database cleared');
        console.log('🌱 Reseeding database with new progressive programs...');

        // Reseed the database
        await seedDatabase();

        console.log('🎉 Database reset complete!');
        console.log('💡 Refresh the page to see the new progressive programs');

        return { success: true, message: 'Database reset successfully!' };
    } catch (error) {
        console.error('❌ Error resetting database:', error);
        return { success: false, error: error.message };
    }
}

// Make it available globally for easy console access
if (typeof window !== 'undefined') {
    window.resetDatabase = resetDatabase;
}
