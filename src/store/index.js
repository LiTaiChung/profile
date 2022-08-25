import { applyMiddleware, createStore, compose } from 'redux';
// Thunk
import thunkMiddleware from 'redux-thunk'
// Rersist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import createEncryptor from 'redux-persist-transform-encrypt';
// Tools
import loggerMiddleware from './middleware/logger';
import monitorReducerEnhancer from './enhancers/monitorReducer';
// Reducer
import rootReducer from './reducer'

const encryptor = createEncryptor({
    secretKey: 'my-super-secret-key',
    onError: function(error) {
        console.log(error);
    }
});

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
    transforms: [encryptor]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);
const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer);

const store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers
);

persistStore(store, null, () => {
    // Something
});

export default store;