'use strict'

var{ combineReducers } = require('redux');

import nav from './navigator';
import user from './user';


const rootReducer = combineReducers({
  nav,
  user,
});

export default rootReducer