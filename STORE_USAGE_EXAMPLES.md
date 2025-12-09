// Example usage of the database store in Vue components

// Example 1: Login Page
import { useAuth } from '@/composables/useStore';

export default {
name: 'LoginPage',
setup() {
const { login, authLoading, authError } = useAuth();

    const handleLogin = async (credentials) => {
      try {
        await login(credentials);
        // Router will handle navigation
      } catch (error) {
        // Error is already displayed via notifications
      }
    };

    return { handleLogin, authLoading, authError };

},
};

// Example 2: Workouts List
import { useWorkouts } from '@/composables/useStore';
import { ref, onMounted } from 'vue';

export default {
name: 'WorkoutsPage',
setup() {
const { workouts, workoutsLoading, loadWorkouts, workoutsByDifficulty } = useWorkouts();
const selectedDifficulty = ref('beginner');

    onMounted(async () => {
      await loadWorkouts();
    });

    return {
      workouts,
      workoutsLoading,
      filteredWorkouts: () => workoutsByDifficulty(selectedDifficulty.value),
      selectedDifficulty,
    };

},
};

// Example 3: Workout Timer (Starting a workout)
import { useUserWorkouts } from '@/composables/useStore';
import { useRoute } from 'vue-router';

export default {
name: 'WorkoutTimer',
setup() {
const route = useRoute();
const { currentUserWorkout, startWorkout, completeWorkout } = useUserWorkouts();
const workoutId = route.params.workoutId;

    const handleStartWorkout = async () => {
      await startWorkout(workoutId);
    };

    const handleCompleteWorkout = async (rating) => {
      await completeWorkout(currentUserWorkout().id, {
        rating,
        notes: 'Great session!',
      });
    };

    return { handleStartWorkout, handleCompleteWorkout, currentUserWorkout };

},
};

// Example 4: User Dashboard
import { useProgress, useGoals, useUserWorkouts, useAuth } from '@/composables/useStore';
import { onMounted } from 'vue';

export default {
name: 'Dashboard',
setup() {
const { currentUser } = useAuth();
const { progressStats, loadUserProgress } = useProgress();
const { activeGoals, completedGoals, loadUserGoals } = useGoals();
const { completedWorkouts, loadUserWorkouts } = useUserWorkouts();

    onMounted(async () => {
      await Promise.all([
        loadUserProgress(),
        loadUserGoals(),
        loadUserWorkouts(),
      ]);
    });

    return {
      currentUser,
      progressStats,
      activeGoals,
      completedGoals,
      completedWorkouts,
    };

},
};

// Example 5: Preferences Page
import { usePreferences } from '@/composables/useStore';
import { ref, onMounted } from 'vue';

export default {
name: 'PreferencesPage',
setup() {
const { userPreferences, loadUserPreferences, updateUserPreferences } = usePreferences();
const preferences = ref(null);

    onMounted(async () => {
      await loadUserPreferences();
      preferences.value = userPreferences();
    });

    const handleSave = async () => {
      await updateUserPreferences(preferences.value);
    };

    return { preferences, handleSave };

},
};

// Example 6: Create Goal
import { useGoals } from '@/composables/useStore';
import { ref } from 'vue';

export default {
name: 'CreateGoal',
setup() {
const { createGoal } = useGoals();
const goalData = ref({
goal_type: 'weight_loss',
target_value: 5,
target_date: '2025-12-31',
});

    const handleCreateGoal = async () => {
      await createGoal(goalData.value);
    };

    return { goalData, handleCreateGoal };

},
};

// Example 7: Admin - Create Workout
import { useWorkouts } from '@/composables/useStore';
import { ref } from 'vue';

export default {
name: 'AdminCreateWorkout',
setup() {
const { createWorkout } = useWorkouts();
const workoutData = ref({
name: 'Full Body Cardio',
description: 'A full body cardio workout',
duration_minutes: 30,
difficulty_level: 'intermediate',
workout_type: 'cardio',
});

    const handleCreateWorkout = async () => {
      await createWorkout(workoutData.value);
    };

    return { workoutData, handleCreateWorkout };

},
};
