/* Types */
export type Action<E extends string | number> = ReducerAction | AsyncCreatorFn<E>;

// Function Types
export type DispatchFn<E extends string | number> = (action: ReducerAction<E> | AsyncCreatorFn<E>) => void;
export type ReducerFn<E extends string | number> = (state: any, action: ReducerAction<E>) => any;
export type MiddlewareFn<E extends string | number> = (ctx: MiddlewareContext<E>) => any;
export type SelectorFn = (state: any) => any;
export type CreatorFn = (...args: any[]) => Action<any>;
export type WrappedCreatorFn = (...args: any[]) => void;
export type AsyncCreatorFn<E extends string | number> = (dispatch: DispatchFn<E>) => void;
export type SubscriberCallbackFn = (state: any) => void
// Interfaces
export interface ReducerAction<E extends string | number = undefined> {
    [key: string]: any;
    type: E
}

export interface Store<E extends string | number> {
    dispatch: DispatchFn<E>;
    getState: () => any;
    subscribe: (cb: SubscriberCallbackFn) => void;
    unsubscribe: (cb: SubscriberCallbackFn) => void;
}

export interface ProviderContext {
    dispatch: DispatchFn<any>;
    state: any;
}

export interface ReducerObject<E extends string | number> {
    [key: string]: ReducerFn<E>;
}

export interface ActionsObject {
    [key: string]: CreatorFn;
}

export interface WrappedActionsObject {
    [key: string]: WrappedCreatorFn
}

export interface MiddlewareContext<E extends string | number> {
    reducer: ReducerFn<E>;
    prevState: any;
    newState: any;
    action: ReducerAction;
}
