import { HCActionTypes } from "./actions"
import { ReducerAction } from "./store"

const initialState = {
    isAuthorized: false,
    isInitialized: false,
    isLoading: false,
    library: [] as MusicKit.Resource[]
}

export type HCState = typeof initialState;


export const reducer = (state = initialState, action: ReducerAction<HCActionTypes>) => {
    switch(action.type) {
        case HCActionTypes.UPDATE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case HCActionTypes.INIT_MUSIC_KIT:
            return {
                ...state,
                isInitialized: true,
                isAuthorized: action.isAuthorized,
                isLoading: false
            }
        case HCActionTypes.UPDATE_IS_AUTHORIZED:
            return {
                ...state,
                isAuthorized: action.isAuthorized,
                isLoading: false
            }
        case HCActionTypes.LOADING_USER_LIBRARY: 
            return {
                ...state,
                isLoading: true
            }
        case HCActionTypes.UPDATE_USER_LIBRARY:
            return {
                ...state,
                isLoading: false,
                library: action.library
            }
        default:
            return state
    }
}