'use strict'

var{ combineReducers } = require('redux');

import nav from './navigator';
import user from './user';
import imgModal from './imgModal';
import musejam from './musejam';
import cubical from './cubical';
import contacts from './contacts';
import cameras from './cameras';


const rootReducer = combineReducers({
  nav,
  user,
  imgModal,
  musejam,
  cubical,
  contacts,
  cameras
});

export default rootReducer