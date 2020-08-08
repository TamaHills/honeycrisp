import { DispatchFn } from '../store';
import { HCActionTypes } from './types';
export type HCDispatch = DispatchFn<HCActionTypes>;

const getMusicKitInstance = () => {
    try {
        return MusicKit.getInstance()
    } catch (e) {
        console.error
    }
}

export const initMusicKit = () => (dispatch: HCDispatch) => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get('token');

    MusicKit.configure({
        developerToken: token,
        app: {
            name: 'honeycrisp',
            version: '0.0.1',
        },
    });

    const mk = MusicKit.getInstance();

    dispatch({
        type: HCActionTypes.INIT_MUSIC_KIT,
        isAuthorized: mk.isAuthorized,
    });

    dispatch(loadUserLibrary())
};

export const loadUserLibrary = () => (dispatch: HCDispatch) => {
    try {
        dispatch({type: HCActionTypes.UPDATE_IS_LOADING, isLoading: true})

        const mk = MusicKit.getInstance()

        mk.api.library.albums(null, { limit: 100 }).then((library) => {
            dispatch({type: HCActionTypes.UPDATE_USER_LIBRARY, library })
        })

    } catch(e) {
        console.error(e)
    }
}

export const authorize = () => (dispatch: HCDispatch) => {
    try {
        const mk = MusicKit.getInstance();

        dispatch({ type: HCActionTypes.UPDATE_IS_LOADING, isLoading: Boolean });

        mk.authorize().then(() =>
            dispatch({
                type: HCActionTypes.UPDATE_IS_AUTHORIZED,
                isAuthorized: mk.isAuthorized,
            }),
        );
    } catch (e) {
        console.error(e);
    }
};
