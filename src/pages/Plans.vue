<template>
    <div class="p-6 max-w-3xl mx-auto" style="background-color: var(--bg-primary);">
        <h1 class="text-3xl font-bold mb-6" style="color: var(--text-primary);">Workout Plans</h1>

        <!-- Loading State -->
        <div v-if="programsLoading" class="flex justify-center items-center py-12">
            <div class="text-xl" style="color: var(--text-secondary);">Loading plans...</div>
        </div>

        <!-- Plans List -->
        <div v-else class="flex flex-col gap-4">
            <router-link v-for="program in programs" :key="program.id"
                :to="{ name: 'plan-details', params: { id: program.id } }"
                class="flex items-center gap-4 p-5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer no-underline"
                style="background-color: var(--card-bg); color: var(--text-primary);">
                <div class="text-4xl shrink-0">📅</div>
                <div class="flex-1">
                    <h3 class="text-xl font-semibold mb-2" style="color: var(--text-primary);">{{ program.name }}
                    </h3>
                    <p class="text-sm mb-3" style="color: var(--text-secondary);">{{ program.description }}</p>
                    <div class="flex gap-4 text-sm flex-wrap">
                        <span class="flex items-center gap-1" style="color: var(--text-secondary);">
                            <IconCalendar :size="16" /> {{ program.duration }} days
                        </span>
                        <span v-if="program.progression" class="flex items-center gap-1"
                            style="color: var(--text-secondary);">
                            📈 {{ program.progression.startingDuration }}-{{ program.progression.endingDuration }}
                            min
                        </span>
                        <span v-if="program.schedule" class="flex items-center gap-1"
                            style="color: var(--text-secondary);">
                            🗓️ {{ program.schedule.daysPerWeek }}x/week
                        </span>
                        <span :class="[
                            'px-3 py-1 rounded-full font-medium text-xs',
                            program.difficulty === 'beginner' ? 'bg-green-100 text-green-700' : '',
                            program.difficulty === 'intermediate' ? 'bg-orange-100 text-orange-700' : '',
                            program.difficulty === 'advanced' ? 'bg-red-100 text-red-700' : ''
                        ]">
                            {{ program.difficulty }}
                        </span>
                    </div>
                    <div v-if="program.progression" class="mt-2 flex gap-2 text-xs">
                        <span class="px-2 py-1 rounded bg-blue-50 text-blue-700 font-medium">
                            {{ program.progression.startingSets }}-{{ program.progression.endingSets }} sets
                        </span>
                        <span class="px-2 py-1 rounded bg-purple-50 text-purple-700 font-medium">
                            {{ program.progression.startingReps }}-{{ program.progression.endingReps }} reps
                        </span>
                        <span class="px-2 py-1 rounded bg-pink-50 text-pink-700 font-medium capitalize">
                            {{ program.progression.progressionType }}
                        </span>
                    </div>
                </div>
                <div style="color: var(--text-tertiary);">
                    <IconChevronRight :size="24" />
                </div>
            </router-link>

            <!-- Empty State -->
            <div v-if="programs.length === 0 && !programsLoading" class="text-center py-12"
                style="color: var(--text-secondary);">
                <div class="text-5xl mb-4">📅</div>
                <p class="text-lg">No workout plans available yet</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { IconChevronRight, IconCalendar } from '@tabler/icons-vue';
import { useProgramStore } from '../stores/index.js';

const programStore = useProgramStore();

const programs = computed(() => programStore.programs);
const programsLoading = computed(() => programStore.programsLoading);

onMounted(async () => {
    await programStore.loadPrograms();
});
</script>
