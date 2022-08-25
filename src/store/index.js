import { applyMiddleware, createStore, compose } from 'redux';
// Thunk
import thunkMiddleware from 'redux-thunk'
// Rersist
import { persistStore, persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
// Tools
import loggerMiddleware from './middleware/logger';
import monitorReducerEnhancer from './enhancers/monitorReducer';
// Reducer
import rootReducer from './reducers'

const encryptor = encryptTransform({
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