/* Types */
export type Action<E extends string | number> = ReducerAction | AsyncCreatorFn<E>;

// Function Types
export type DispatchFn<E extends string | number> = (action: ReducerAction<E> | AsyncCreatorFn<E>) => void;
export type ReducerFn = (state: any, action: ReducerAction) => any;
export type MiddlewareFn = (ctx: MiddlewareContext) => any;
export type SelectorFn = (state: any) => any;
export type CreatorFn = (...args: any[]) => Action<any>;
export type WrappedCreatorFn = (...args: any[]) => void;
export type AsyncCreatorFn<E extends string | number> = (dispatch: DispatchFn<E>) => void;

// Interfaces
export interface ReducerAction<E extends string | number = undefined> {
    [key: string]: any;
    type: E
}

export interface Store {
    initialState: any;
    reducer: ReducerFn;
    middleware: MiddlewareFn[];
}

export interface ProviderContext {
    dispatch: DispatchFn<any>;
    state: any;
}

export interface ReducerObject {
    [key: string]: ReducerFn;
}

export interface ActionsObject {
    [key: string]: CreatorFn;
}

export interface WrappedActionsObject {
    [key: string]: WrappedCreatorFn
}

export interface MiddlewareContext {
    reducer: ReducerFn;
    prevState: any;
    newState: any;
    action: ReducerAction;
}
