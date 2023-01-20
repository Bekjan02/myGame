const localStorageUtil = {
    getValue(key: string) {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key) as string)
        }
        return false
    },
    setValue(key: string, payload: any) {
        localStorage.setItem(key, JSON.stringify(payload))
    },
}

export default localStorageUtil
