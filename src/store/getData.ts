import { type Ref, ref, computed, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import type { Question } from '@/types';


interface GetDataState {
    data: Ref<any[]>;
    error: unknown;
    getData: ComputedRef<Promise<void>>;
    loading: Ref<boolean>;
}

interface Acc {
    [key: string]: Question[]
}

export const useGetDataStore = defineStore('getData', (): GetDataState => {
    const data = ref([])
    const loading = ref(false)
    const error = ref()

    const getData = computed(async () => {
        loading.value = true
        try {
            const res = await fetch('http://jservice.io/api/clues?min_date=1985-02-20')
            const json = await res.json()

            const filteredData = json.filter((item: Question) => item.value !== null)
            const newData = filteredData.reduce((acc: Acc, item: Question) => {
                if (!acc[item.category.title]) {
                    acc[item.category.title] = []
                }
                acc[item.category.title].push(item)
                return acc
            }, {})

            Object.keys(newData).reduce((acc: Acc, item: string) => {
                newData[item].sort((a: Question, b: Question) => a.value - b.value)
                if (newData[item].length > 5 || newData[item].length < 5) {
                    delete newData[item]
                }
                return acc
            }, {})

            data.value = newData
        } catch (e) {
            error.value = e
        } finally {
            loading.value = false
        }
    })


    return { getData, data, error, loading }
})
