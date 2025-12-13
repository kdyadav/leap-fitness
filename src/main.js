import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import './style.css'
import App from './App.vue'
import { seedDatabase } from './services/seedDatabase'
import { resetDatabase } from './utils/resetDatabase'
import { useAuthStore } from './stores'
import { registerSW } from 'virtual:pwa-register'

// Register service worker for PWA
const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
        if (confirm('New content available. Reload to update?')) {
            updateSW(true)
        }
    },
    onOfflineReady() {
        console.log('App ready to work offline')
    },
    onRegistered(registration) {
        console.log('Service Worker registered:', registration)
    },
    onRegisterError(error) {
        console.error('Service Worker registration error:', error)
    }
})

// Initialize and seed database
seedDatabase()

// Make resetDatabase available globally for development
window.resetDatabase = resetDatabase

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize auth state before mounting
const authStore = useAuthStore()
authStore.loadCurrentUser().then(() => {
    app.mount('#app')
})
