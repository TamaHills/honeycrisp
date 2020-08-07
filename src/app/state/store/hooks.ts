import { useContext } from 'preact/hooks';
import { ctx } from './context'
import { SelectorFn } from './types'

/* Hooks */

// State
export const useSelector = (select: SelectorFn) => {
    // Grab state from context provider
    let { state } = useContext(ctx);

    // Pass state to selector function
    return select(state);
};

// Dispatch
export const useDispatch = () => {
    // Grab dispatch from context provider
    let { dispatch } = useContext(ctx);

    return dispatch;
};