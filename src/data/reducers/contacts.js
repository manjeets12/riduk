'use strict'

import {
 GET_CONTACTS_SUCCESS,
 GET_CONTACTS_ERROR,
 LOGGED_OUT,
 LOGGED_OUT_FAILED
} from 'src/common/constants'

const initialState = {
  contacts:[],
};

function contacts(state = initialState, action){
  switch(action.type){
    case GET_CONTACTS_SUCCESS:
    return {contacts:[...action.data]};
    case GET_CONTACTS_ERROR:
    case LOGGED_OUT:
    case LOGGED_OUT_FAILED:
    return initialState;
    default:
    return state;
  }
}
//export default user;
module.exports = contacts;