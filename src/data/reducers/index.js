'use strict'

var{ combineReducers } = require('redux');

import nav from './navigator';
import user from './user';
import imgModal from './imgModal';
import musejam from './musejam';
import cubical from './cubical';
import contacts from './contacts';


const rootReducer = combineReducers({
  nav,
  user,
  imgModal,
  musejam,
  cubical,
  contacts
});

export default rootReducer