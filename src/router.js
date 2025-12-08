import { createMemoryHistory, createRouter } from 'vue-router'

// Layouts
import DefaultLayout from './layout/DefaultLayout.vue';
import AuthLayout from './layout/Auth.Layout.vue';
import AdminLayout from './layout/AdminLayout.vue';
// Pages
import Home from './pages/Home.vue';
import Classic from './pages/Classic.vue';
import Preferences from './pages/Preferences.vue';
import Workouts from './pages/Workouts.vue';
import Profile from './pages/Profile.vue';
// auth
import Login from './pages/auth/Login.vue';
import SingUp from './pages/auth/SingUp.vue';

const routes = [
    {
        path: "/",
        component: DefaultLayout,
        children: [
            { path: "", name: "home", component: Home },
            { path: "classic", name: "classic", component: Classic },
            { path: "preferences", name: "preferences", component: Preferences },
            { path: "workouts", name: "workouts", component: Workouts },
            { path: "profile", name: "profile", component: Profile },
        ]
    },
    {
        path: "/auth",
        component: AuthLayout,
        children: [
            { path: "", component: Login },
            { path: "", component: SingUp }
        ]
    },
    {
        path: "/admin",
        component: AdminLayout,
        children: [
        ]
    }
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})