import { createWebHistory, createRouter } from 'vue-router'
import { getCurrentUserId } from './services/db';

// Layouts
import DefaultLayout from './layout/DefaultLayout.vue';
import AuthLayout from './layout/Auth.Layout.vue';
import AdminLayout from './layout/AdminLayout.vue';

// Pages
import History from './pages/History.vue';
import Preferences from './pages/Preferences.vue';
import Workouts from './pages/Workouts.vue';
import Plans from './pages/Plans.vue';
import Profile from './pages/Profile.vue';

// Auth
import Login from './pages/auth/Login.vue';
import SingUp from './pages/auth/SingUp.vue';

// Workouts
import WorkoutDetails from './pages/WorkoutDetails.vue';
import WorkoutTimer from './pages/WorkoutTimer.vue';
import PlanDetails from './pages/PlanDetails.vue';

const routes = [
    {
        path: "/",
        component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
            { path: "", name: "workouts", component: Workouts },
            { path: "plans", name: "plans", component: Plans },
            { path: "workouts/:id/details", name: "workout-details", component: WorkoutDetails },
            { path: "workouts/:id/timer", name: "workout-timer", component: WorkoutTimer },
            { path: "plans/:id/details", name: "plan-details", component: PlanDetails },
            { path: "history", name: "history", component: History },
            { path: "preferences", name: "preferences", component: Preferences },
            { path: "profile", name: "profile", component: Profile },
        ]
    },
    {
        path: "/auth",
        component: AuthLayout,
        meta: { requiresGuest: true },
        children: [
            { path: "login", name: "login", component: Login },
            { path: "signup", name: "signup", component: SingUp }
        ]
    },
    {
        path: "/admin",
        component: AdminLayout,
        meta: { requiresAuth: true, requiresAdmin: true },
        children: [
            // Admin routes can be added here
        ]
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation Guards
router.beforeEach((to, from, next) => {
    const userId = getCurrentUserId();
    const isAuthenticated = !!userId;

    // Redirect to login if route requires auth and user is not authenticated
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'login' });
    }
    // Redirect to home if route requires guest and user is authenticated
    else if (to.meta.requiresGuest && isAuthenticated) {
        next({ name: 'workouts' });
    }
    // Allow navigation
    else {
        next();
    }
});