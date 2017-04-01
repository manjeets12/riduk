'use strict'

var{ combineReducers } = require('redux');

import nav from './navigator';
import user from './user';
import imgModal from './imgModal';


const rootReducer = combineReducers({
  nav,
  user,
  imgModal
});

export default rootReducer