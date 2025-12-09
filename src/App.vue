<script setup>
import { onMounted } from 'vue';
import SplashScreen from './components/SplashScreen.vue';
import { useStore } from './composables/useStore.js';

const store = useStore();

onMounted(() => {
  // Initialize theme from store
  const theme = store.getters.theme();
  document.documentElement.setAttribute('data-theme', theme);
});
</script>


<template>
  <SplashScreen />
  <div style="background-color: var(--bg-primary); color: var(--text-primary); min-height: 100vh;">
    <router-view />
  </div>
</template>

<style scoped></style>
