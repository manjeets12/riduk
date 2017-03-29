'use strict';
var {applyMiddleware, createStore} = require('redux');
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native';
import ReduxThunk from 'redux-thunk'

import rootReducer from './reducers';

const createAppStore = applyMiddleware(ReduxThunk)(createStore);

function configureStore(onComplete: ?() => void) {
  const store = autoRehydrate()(createAppStore)(rootReducer);
  persistStore(store, {storage: AsyncStorage,blacklist: ['nav','navBeforeLogin']}, onComplete);
  return store;
}
module.exports = configureStore;