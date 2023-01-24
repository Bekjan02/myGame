import { defineStore } from "pinia";
import { type Ref, ref, watch } from "vue";

interface GameStatusState {
    isGameStarted: Ref<boolean>;
    setGameStatus: (status: boolean) => void;
}

export const useGameStatusStore = defineStore("gameStatus", (): GameStatusState => {
    const isGameStarted = ref(false);
    const isGameStartedLocalStorage = localStorage.getItem('isGameStarted');

    if (isGameStartedLocalStorage) {
        isGameStarted.value = JSON.parse(isGameStartedLocalStorage);
    }

    const setGameStatus = (status: boolean) => {
        isGameStarted.value = status;
    };

    watch(() => isGameStarted, (state) => {
        localStorage.setItem('isGameStarted', JSON.stringify(state.value))
    }, { deep: true })

    return {
        isGameStarted,
        setGameStatus,
    };
});
