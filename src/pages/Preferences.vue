<template>
    <div class="preferences-page"
        style="background-color: var(--bg-primary); color: var(--text-primary); min-height: 100vh; padding: 1.5rem;">
        <div style="max-width: 48rem; margin: 0 auto;">
            <!-- Header -->
            <div style="margin-bottom: 2rem;">
                <h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem; color: var(--text-primary);">
                    Preferences</h1>
                <p style="color: var(--text-secondary);">Customize your app experience</p>
            </div>

            <!-- Theme Section -->
            <div
                style="background-color: var(--card-bg); border-radius: 0.75rem; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px var(--shadow);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <IconMoon v-if="isDarkMode" :size="24" style="color: var(--accent-color);" />
                        <IconSun v-else :size="24" style="color: var(--accent-color);" />
                        <div>
                            <h2 style="font-size: 1.125rem; font-weight: 600; color: var(--text-primary);">Appearance
                            </h2>
                            <p style="font-size: 0.875rem; color: var(--text-secondary);">Switch between light and dark
                                mode</p>
                        </div>
                    </div>
                </div>

                <div style="display: flex; gap: 0.75rem;">
                    <button @click="setTheme('light')" :style="{
                        flex: 1,
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        border: currentTheme === 'light' ? '2px solid var(--accent-color)' : '2px solid var(--border-color)',
                        backgroundColor: currentTheme === 'light' ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontWeight: currentTheme === 'light' ? '600' : '400',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }">
                        <IconSun :size="20" />
                        Light
                    </button>

                    <button @click="setTheme('dark')" :style="{
                        flex: 1,
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        border: currentTheme === 'dark' ? '2px solid var(--accent-color)' : '2px solid var(--border-color)',
                        backgroundColor: currentTheme === 'dark' ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontWeight: currentTheme === 'dark' ? '600' : '400',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }">
                        <IconMoon :size="20" />
                        Dark
                    </button>
                </div>
            </div>

            <!-- Quick Toggle -->
            <div
                style="background-color: var(--card-bg); border-radius: 0.75rem; padding: 1.5rem; box-shadow: 0 1px 3px var(--shadow);">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div>
                        <h3
                            style="font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">
                            Quick Toggle</h3>
                        <p style="font-size: 0.875rem; color: var(--text-secondary);">Switch theme instantly</p>
                    </div>

                    <button @click="toggleTheme" :style="{
                        width: '3.5rem',
                        height: '2rem',
                        borderRadius: '9999px',
                        backgroundColor: isDarkMode ? 'var(--accent-color)' : 'var(--border-color)',
                        position: 'relative',
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                        border: 'none',
                    }">
                        <div :style="{
                            width: '1.5rem',
                            height: '1.5rem',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            position: 'absolute',
                            top: '0.25rem',
                            left: isDarkMode ? '1.75rem' : '0.25rem',
                            transition: 'all 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }">
                            <IconMoon v-if="isDarkMode" :size="16" style="color: #111827;" />
                            <IconSun v-else :size="16" style="color: #111827;" />
                        </div>
                    </button>
                </div>
            </div>

            <!-- Info Section -->
            <div
                style="margin-top: 2rem; padding: 1rem; background-color: var(--bg-secondary); border-radius: 0.5rem; border-left: 4px solid var(--accent-color);">
                <p style="font-size: 0.875rem; color: var(--text-secondary);">
                    <strong style="color: var(--text-primary);">Tip:</strong> Your theme preference is saved
                    automatically and will be remembered on your next visit.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { IconMoon, IconSun } from '@tabler/icons-vue';
import { useThemeStore } from '../stores/index.js';

const themeStore = useThemeStore();

const currentTheme = computed(() => themeStore.theme);
const isDarkMode = computed(() => themeStore.isDarkMode);

const toggleTheme = () => {
    themeStore.toggleTheme();
};

const setTheme = (theme) => {
    themeStore.setTheme(theme);
};
</script>

<style scoped>
button:hover {
    opacity: 0.9;
}

button:active {
    transform: scale(0.98);
}
</style>
