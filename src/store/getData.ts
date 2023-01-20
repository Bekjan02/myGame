import { type Ref, ref, watch } from 'vue'
import { defineStore } from 'pinia'


interface Category {
    id: number
    title: string
    created_at: string
    updated_at: string
    clues_count: number
}

export interface Data {
    id: number,
    answer: string,
    question: string,
    value: number,
    airdate: string,
    created_at: string,
    updated_at: string,
    category_id: number,
    game_id: number,
    invalid_count: null,
    category: Category
}

interface GetDataState {
    data: Ref<any>;
    error: unknown;
    getData: () => Promise<unknown>;
    loading: Ref<boolean>;
}

interface Acc {
    [key: string]: Data[]
}


export const useGetDataStore = defineStore('getData', (): GetDataState => {
    const data = ref<any[]>([])
    const loading = ref<boolean>(false)
    const error = ref<unknown>(null)

    const getData = async () => {
        loading.value = true
        try {
            const res = await fetch('http://jservice.io/api/clues?min_date=1985-02-20')
            const json = await res.json()

            const filteredData = json.filter((item: Data) => item.value !== null)
            const newData = filteredData.reduce((acc: Acc, item: Data) => {
                if (!acc[item.category.title]) {
                    acc[item.category.title] = []
                }
                acc[item.category.title].push(item)
                return acc
            }, {})

            Object.keys(newData).reduce((acc: Acc, item: string, i: number) => {
                newData[item].sort((a: Data, b: Data) => a.value - b.value)
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
    }


    return { getData, data, error, loading }
})
