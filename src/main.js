import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import './style.css'
import App from './App.vue'
import { seedDatabase } from './services/seedDatabase'
import { resetDatabase } from './utils/resetDatabase'
import { useAuthStore } from './stores'
// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then(registration => {
                console.log('SW registered: ', registration)
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError)
            })
    })
}

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
