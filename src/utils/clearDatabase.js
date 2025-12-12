// Utility to clear the database - useful when schema changes
import Dexie from 'dexie';

export const clearDatabase = async () => {
    try {
        await Dexie.delete('LeapFitnessDB');
        console.log('Database cleared successfully');
        return true;
    } catch (error) {
        console.error('Error clearing database:', error);
        return false;
    }
};

// Run this in browser console if needed:
// import { clearDatabase } from './utils/clearDatabase.js'; await clearDatabase(); location.reload();
