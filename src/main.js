import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import './style.css'
import App from './App.vue'
import { seedDatabase } from './services/seedDatabase'
import { useAuthStore } from './stores'

// Initialize and seed database
seedDatabase()

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize auth state before mounting
const authStore = useAuthStore()
authStore.loadCurrentUser().then(() => {
    app.mount('#app')
})
