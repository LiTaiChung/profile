import { combineReducers } from 'redux';

import AuthReducer from 'store/reducers/Auth';

const rootReducer = combineReducers({
    auth: AuthReducer,
})

export default rootReducer;