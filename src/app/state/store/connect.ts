import { h, FunctionComponent, VNode } from 'preact';
import {
    ProviderContext,
    ActionsObject,
    WrappedActionsObject,
    DispatchFn,
    SelectorFn,
    CreatorFn,
} from './types';
import { Consumer } from './context';

// Helper function to wrap action creators to be used as props
const wrapActions = (
    actions: ActionsObject = {},
    dispatch: DispatchFn<any>,
): WrappedActionsObject => {
    const actionEntries: [string, CreatorFn][] = Object.entries(actions);
    const wrappedActions = actionEntries.reduce(
        (acc, [actionName, actionCreator]) => ({
            ...acc,
            [actionName]: (...args: any[]) => {
                let action = actionCreator(...args);
                dispatch(action);
            },
        }),
        <WrappedActionsObject>{},
    );
    return wrappedActions;
};

// HOC for connecting components to context
export const connect = (
    selector: SelectorFn = state => ({ state }),
    actions: ActionsObject = {},
) => (component: FunctionComponent) => () => {
    return h(Consumer, {
        children: ({ state, dispatch }: ProviderContext): VNode<{}> => {
            // Get state from selector function
            const selectedState = selector(state);

            // Wrap actions to attach context
            const wrappedActions = wrapActions(actions, dispatch);

            return h(component, {
                ...selectedState,
                ...wrappedActions,
                dispatch,
            });
        },
    });
};
