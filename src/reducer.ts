import { combineReducers } from 'redux';
import { reducer as desktopReducer } from 'containers/desktop';

const rootReducer = combineReducers({
    desktop: desktopReducer,
});

export default rootReducer;
