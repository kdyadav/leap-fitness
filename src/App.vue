<script setup>
import { onMounted } from 'vue';
import SplashScreen from './components/SplashScreen.vue';
import { useThemeStore } from './stores/index.js';

const themeStore = useThemeStore();

onMounted(() => {
  // Initialize theme
  themeStore.initTheme();
});
</script>


<template>
  <SplashScreen />
  <div style="background-color: var(--bg-primary); color: var(--text-primary); min-height: 100vh;">
    <router-view />
  </div>
</template>

<style scoped></style>
