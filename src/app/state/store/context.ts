import { createContext } from 'preact';
import {

    ProviderContext,
    ReducerAction,
    Store,
    ReducerFn,
    MiddlewareFn,

} from './types';

/* Setup */

// initial context object
export const init: ProviderContext = {
    state: undefined,
    dispatch: (action: ReducerAction) => {
        action;
    },
};

// initialize context object
export const ctx = createContext(init);


// Export the bare consumer
// This allows users to access the store wihtout an HOC or Hooks
export const { Consumer } = ctx;

// Store
export const createStore = (
    reducer: ReducerFn,
    ...middleware: MiddlewareFn[]
): Store => {
    // Grab initial state from reducer
    const initialState = reducer(undefined, { type: undefined });

    // return composed store object
    return { reducer, initialState, middleware };
};
