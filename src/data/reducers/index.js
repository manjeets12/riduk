'use strict'

var{ combineReducers } = require('redux');

import nav from './navigator';
import user from './user';
import imgModal from './imgModal';
import musejam from './musejam';
import cubical from './cubical';


const rootReducer = combineReducers({
  nav,
  user,
  imgModal,
  musejam,
  cubical
});

export default rootReducer