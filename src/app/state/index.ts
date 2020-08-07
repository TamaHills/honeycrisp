import { reducer } from './reducer';
import { createStore } from './store';
import { logger } from './store/logger';

export const store = createStore(reducer, logger)