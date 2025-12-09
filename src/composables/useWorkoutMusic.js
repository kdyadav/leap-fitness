import { ref } from 'vue';

export const musicOptions = [
    { id: 'energetic', name: '🔥 Energetic Beats', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 'motivational', name: '💪 Motivational Rock', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 'chill', name: '🧘 Chill Vibes', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 'electronic', name: '⚡ Electronic Dance', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: 'none', name: '🔇 No Music', url: '' }
];

export const coachVoiceOptions = [
    { id: 'default', name: 'Default', description: 'Standard voice', rate: 1.0, pitch: 1.0 },
    { id: 'energetic', name: 'Energetic Coach', description: 'Fast & upbeat', rate: 1.2, pitch: 1.1 },
    { id: 'calm', name: 'Calm Guide', description: 'Slow & soothing', rate: 0.9, pitch: 0.95 },
    { id: 'motivator', name: 'Motivator', description: 'Deep & powerful', rate: 1.0, pitch: 0.85 }
];

export function useWorkoutMusic() {
    const isMusicEnabled = ref(true);
    const isVoiceEnabled = ref(true);
    const selectedMusic = ref('energetic');
    const selectedVoice = ref('default');

    let backgroundMusic = null;

    const playBackgroundMusic = () => {
        if (!isMusicEnabled.value) return;

        const selectedMusicTrack = musicOptions.find(m => m.id === selectedMusic.value);
        if (!selectedMusicTrack || !selectedMusicTrack.url) return;

        // Stop any existing music first
        if (backgroundMusic && !backgroundMusic.paused) {
            backgroundMusic.pause();
        }

        if (!backgroundMusic) {
            backgroundMusic = new Audio();
            backgroundMusic.loop = true;
            backgroundMusic.volume = 0.3;
        }

        // Update source if different
        if (backgroundMusic.src !== selectedMusicTrack.url) {
            backgroundMusic.src = selectedMusicTrack.url;
            backgroundMusic.load();
        }

        // Play immediately - the audio will start when ready
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(err => {
                console.log('Audio playback failed:', err);
            });
        }
    };

    const stopBackgroundMusic = () => {
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
    };

    const pauseBackgroundMusic = () => {
        if (backgroundMusic && !backgroundMusic.paused) {
            backgroundMusic.pause();
        }
    };

    const resumeBackgroundMusic = () => {
        if (backgroundMusic && isMusicEnabled.value && backgroundMusic.paused) {
            backgroundMusic.play().catch(err => {
                console.log('Audio playback failed:', err);
            });
        }
    };

    const toggleMusic = (workoutStarted, isPaused) => {
        isMusicEnabled.value = !isMusicEnabled.value;
        if (isMusicEnabled.value) {
            if (workoutStarted && !isPaused) {
                playBackgroundMusic();
            }
        } else {
            stopBackgroundMusic();
        }
    };

    const changeMusicTrack = (workoutStarted, isPaused) => {
        const wasPlaying = backgroundMusic && !backgroundMusic.paused;

        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }

        if (isMusicEnabled.value && workoutStarted && !isPaused && wasPlaying) {
            playBackgroundMusic();
        }
    };

    const toggleVoice = () => {
        isVoiceEnabled.value = !isVoiceEnabled.value;
        if (!isVoiceEnabled.value && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    };

    const speak = (text) => {
        if (!isVoiceEnabled.value) return;

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const selectedVoiceConfig = coachVoiceOptions.find(v => v.id === selectedVoice.value);
            if (selectedVoiceConfig) {
                utterance.rate = selectedVoiceConfig.rate;
                utterance.pitch = selectedVoiceConfig.pitch;
            }
            utterance.volume = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    };

    const testVoice = (voice) => {
        const utterance = new SpeechSynthesisUtterance('Let\'s get started!');
        utterance.rate = voice.rate;
        utterance.pitch = voice.pitch;
        utterance.volume = 1.0;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    };

    const cleanup = () => {
        stopBackgroundMusic();
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    };

    return {
        isMusicEnabled,
        isVoiceEnabled,
        selectedMusic,
        selectedVoice,
        playBackgroundMusic,
        stopBackgroundMusic,
        pauseBackgroundMusic,
        resumeBackgroundMusic,
        toggleMusic,
        toggleVoice,
        changeMusicTrack,
        speak,
        testVoice,
        cleanup
    };
}
