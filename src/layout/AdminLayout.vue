<template>
    <div class="flex flex-col h-screen">
        <div class="flex-1 overflow-auto">
            <router-view></router-view>
        </div>
        <div>
            <BottomNav />
        </div>
    </div>
</template>


<script setup>
import BottomNav from '../components/BottomNav.vue';
</script>

<style scoped></style>
