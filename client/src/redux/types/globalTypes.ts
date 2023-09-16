
export const LOADING = "LOADING"

export interface GlobalSchema {
    loading: boolean
}

export interface GlobalLoadingType {
    type: typeof LOADING,
    payload: boolean
}

