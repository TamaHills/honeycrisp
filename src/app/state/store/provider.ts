import { h, VNode } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import {
    Action,
    Store,
    MiddlewareContext,
    MiddlewareFn,
    ReducerAction,
    ReducerFn,
} from './types';

import { ctx } from './context';

const middlewareReducer = (
    reducer: ReducerFn,
    middleware: MiddlewareFn[],
    newState: any,
    action: ReducerAction,
) => {
    return (prevState: any) =>
        middleware.reduce((newState, mw) => {
            let ctx: MiddlewareContext = {
                newState,
                prevState,
                action,
                reducer,
            };
            return mw(ctx);
        }, newState);
};



export const useStore = ({ reducer, initialState, middleware }: Store) => {
    // this is where the state lives
    const state = useRef(initialState);
    const subscribers = useRef<Function[]>([])

    const subscribe = (cb: Function) => {
        subscribers.current.push(cb)
    }

    // This the action dispatcher
    // actions passed in should either be an async action creator or an object containing the action
    let dispatch = (action: Action<any>) => {
        // catches async creators
        if (typeof action === 'function') {
            // passes this function into an async creator
            // this gives the creator the ability to call actions after resolution
            action(dispatch);
        } else {
            // pass action to reducer
            let newState = reducer(state.current, action);
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
            // update the state
            state.current = stateUpdate;
            
            subscribers.current.forEach(cb => {
                cb(stateUpdate)
            })
        }
    };

    // Compose and return the context object
    return [state.current, dispatch, subscribe];
};

// component props
export interface ProviderProps {
    children: VNode[];
    store: Store;
}

// Provider component
export const Provider = ({ children, store }: ProviderProps) => {
    // state is not shared between providers
    const [state, dispatch, subscribe] = useStore(store);
    const updateTrigger = useState(undefined)[1]

    useEffect(() => {
        subscribe(updateTrigger)
    }, [])

    return h(ctx.Provider, { value: { state, dispatch }, children });
};
