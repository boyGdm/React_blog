import { createRoutine,  } from 'redux-saga-routines';
import NAME_SPACE from '../../../constants/name-spce';

export const userAction = createRoutine(`${NAME_SPACE.USER}`);
