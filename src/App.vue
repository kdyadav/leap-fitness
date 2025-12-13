<script setup>
import { onMounted, ref } from 'vue';
import SplashScreen from './components/SplashScreen.vue';
import { useThemeStore } from './stores/index.js';

const themeStore = useThemeStore();
const showInstallPrompt = ref(false);
let deferredPrompt = null;

onMounted(() => {
  // Initialize theme
  themeStore.initTheme();

  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt event fired');
    e.preventDefault();
    deferredPrompt = e;
    showInstallPrompt.value = true;
  });

  // Check if app is already installed
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    showInstallPrompt.value = false;
    deferredPrompt = null;
  });
});

const installApp = async () => {
  if (!deferredPrompt) {
    console.log('No deferred prompt available');
    return;
  }

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`User response to the install prompt: ${outcome}`);

  deferredPrompt = null;
  showInstallPrompt.value = false;
};

const dismissPrompt = () => {
  showInstallPrompt.value = false;
};


</script>


<template>
  <SplashScreen />

  <!-- Install Prompt Banner -->
  <div v-if="showInstallPrompt"
    class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 shadow-lg">
    <div class="max-w-4xl mx-auto flex items-center justify-between gap-4">
      <div class="flex-1">
        <p class="font-semibold">Install Leap Fitness</p>
        <p class="text-sm opacity-90">Get quick access and work offline</p>
      </div>
      <div class="flex gap-2">
        <button @click="installApp"
          class="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
          Install
        </button>
        <button @click="dismissPrompt"
          class="px-4 py-2 bg-blue-700 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition">
          Not now
        </button>
      </div>
    </div>
  </div>

  <div style="background-color: var(--bg-primary); color: var(--text-primary); min-height: 100vh;">
    <router-view />
  </div>
</template>

<style scoped></style>
