<template>
  <div class="flex flex-col h-screen">
    <div class="flex-1 overflow-auto">
      <router-view></router-view>
    </div>
    <div>
      <BottomNav v-if="showBottomBar" />
    </div>
  </div>
</template>


<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const showBottomBar = computed(() => !['workout-details', 'workout-timer'].includes(route.name));
import BottomNav from '../components/BottomNav.vue';
import { computed } from 'vue';
</script>

<style scoped></style>
