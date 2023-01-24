import { defineStore } from 'pinia';
import { ref, type Ref, watch } from 'vue';

interface StatisticsState {
    totalCount: Ref<number>
    wrongAnswers: Ref<number>
    correctAnswers: Ref<number>
    totalAnswers: Ref<number>
    addCorrectAnswer: (value: number) => void
    addWrongAnswer: (value: number) => void
    resetStatistics: () => void
}

export const useStatisticsStore = defineStore('statistics', (): StatisticsState => {
    const totalCount = ref(0)
    const wrongAnswers = ref(0)
    const correctAnswers = ref(0)
    const totalAnswers = ref(0)
    const statisticsLocalStorage = JSON.parse(`${localStorage.getItem('statistics')}`)

    if (statisticsLocalStorage) {
        const {
            totalCount: totalCountStorage,
            wrongAnswers: wrongAnswersStorage,
            correctAnswers: correctAnswersStorage,
            totalAnswers: totalAnswersStorage
        } = statisticsLocalStorage
        totalCount.value = totalCountStorage
        wrongAnswers.value = wrongAnswersStorage
        correctAnswers.value = correctAnswersStorage
        totalAnswers.value = totalAnswersStorage
    }

    const addCorrectAnswer = (value: number) => {
        correctAnswers.value += 1
        totalAnswers.value += 1
        totalCount.value += value
    }

    const addWrongAnswer = (value: number) => {
        wrongAnswers.value += 1
        totalAnswers.value += 1
        totalCount.value -= value
    }

    const resetStatistics = () => {
        const statisticsLocalStorage = JSON.parse(`${localStorage.getItem('statistics')}`)
        const historyLocalStorage = JSON.parse(`${localStorage.getItem('history')}`) || []
        localStorage.setItem('statistics', JSON.stringify({}))
        localStorage.setItem('isGameStarted', JSON.stringify(false))
        if (totalAnswers.value > 0) {
            localStorage.setItem('history', JSON.stringify([...historyLocalStorage, statisticsLocalStorage]))
        }
        totalCount.value = 0
        wrongAnswers.value = 0
        correctAnswers.value = 0
        totalAnswers.value = 0
    }

    watch(() => totalAnswers.value, () => {
        console.log(totalCount.value, wrongAnswers.value, correctAnswers.value, totalAnswers.value);
        localStorage.setItem('statistics', JSON.stringify({
            totalCount: totalCount.value,
            wrongAnswers: wrongAnswers.value,
            correctAnswers: correctAnswers.value,
            totalAnswers: totalAnswers.value
        }))
    })

    return {
        totalCount,
        wrongAnswers,
        correctAnswers,
        totalAnswers,
        addCorrectAnswer: addCorrectAnswer,
        addWrongAnswer,
        resetStatistics
    }

});