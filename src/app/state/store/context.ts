import { createContext } from 'preact';
import {
    ProviderContext,
    MiddlewareContext,
    ReducerAction,
    Store,
    ReducerFn,
    MiddlewareFn,
    Action,
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

function middlewareReducer<E extends string | number>(
    reducer: ReducerFn<E>,
    middleware: MiddlewareFn<E>[],
    newState: any,
    action: ReducerAction,
) {
    return (prevState: any) =>
        middleware.reduce((newState, mw) => {
            let ctx: MiddlewareContext<E> = {
                newState,
                prevState,
                action,
                reducer,
            };
            return mw(ctx);
        }, newState);
}

type SubscriberCallbackFn = (state: any) => void

// Store
export function createStore<E extends string | number>(
    reducer: ReducerFn<E>,
    ...middleware: MiddlewareFn<E>[]
): Store<E> {
    // Grab initial state from reducer
    const subscribers: SubscriberCallbackFn[] = [];

    let state = reducer(undefined, { type: undefined });
    const getState = () => {
        return state;
    };

    const subscribe = (cb: SubscriberCallbackFn) => {
        cb(state);
        subscribers.push(cb);
    };

    const unsubscribe = (cb:SubscriberCallbackFn) => {
        const index = subscribers.indexOf(cb);
        if (index > -1) {
            subscribers.splice(index, 1);
        }
    };

    let dispatch = (action: Action<E>) => {
        // catches async creators
        if (typeof action === 'function') {
            // passes this function into an async creator
            // this gives the creator the ability to call actions after resolution
            action(dispatch);
        } else {
            // pass action to reducer
            let newState = reducer(state, action);
            /*  
                this is the argument for the StateUpdater call.
                if the user has supplied middleware this will generate a middleware reducer function.
                if no middleware is provided the updater will just resolve to the result of the reducer
            */
            let stateUpdate: any = middleware.length
                ? middlewareReducer(
                      reducer,
                      middleware,
                      newState,
                      action,
                  )(state.current)
                : newState;
            state = { state, ...stateUpdate };

            subscribers.forEach((cb) => {
                cb(state);
            });
        }
    };

    return { dispatch, getState, subscribe, unsubscribe };
}
