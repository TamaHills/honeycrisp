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

// component props
export interface ProviderProps<E extends string | number> {
    children: VNode[];
    store: Store<E>;
}

// Provider component
export function Provider<E extends string | number>({
    children,
    store,
}: ProviderProps<E>) {
    const { getState, subscribe, unsubscribe, dispatch } = store;
    const [state, setState] = useState(getState());

    useEffect(() => {
        subscribe(setState);

        return () => {
            unsubscribe(setState);
        };
    }, []);

    return h(ctx.Provider, { value: { state, dispatch }, children });
}
