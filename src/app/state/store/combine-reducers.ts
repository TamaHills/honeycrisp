import { ReducerObject, ReducerFn } from './types';

export const combineReducers = (reducerObject: ReducerObject): ReducerFn => {
    // create an array of reducer entries [key, reducer] from the users supplied ReducerObject
    let reducers = Object.entries(reducerObject);

    // create a new reducer funtion
    let composedReducer: ReducerFn = (state = undefined, action = {type: undefined}) => {
        // map reducer entries to state entries [key, state]
        let stateEntries = reducers.map(([key, reducer]): [string, any] => [
            key,
            reducer(state?.[key], action),
        ]);

        // create & return a state object from the state entries
        return Object.fromEntries(stateEntries);
    };
    // return the new reducer function
    return composedReducer;
};
