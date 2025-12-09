<template>
    <div v-if="showSplash" class="absolute flex bg-[#0054ff] justify-center items-center h-screen w-screen z-100">
        <div class="splash-content text-center text-white">
            <h1 class="text-5xl text-center font-bold">HOME</h1>
            <p class="text-lg tracking-[.5rem]">WORKOUT</p>
            <div class="text-lg mt-3">
                <span class="text-[#0054ff] bg-white rounded-full mr-1 p-1 px-3">GET</span>FIT
            </div>
            <div class="relative flex mt-10 justify-center">
                <div>
                    <span class="relative flex size-3">
                        <span
                            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                        <span class="relative inline-flex size-3 rounded-full bg-white"></span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const showSplash = ref(true);

setTimeout(() => {
    showSplash.value = false;
}, 3000);

</script>

<style scoped></style>
