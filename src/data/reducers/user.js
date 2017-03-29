'use strict'

import {
  REGISTER_USER, 
  LOGIN, 
  AUTHENTICATING, 
  AUTH_SUCCESS,
  AUTH_ERROR, 
  SAVE_USER,
  LOGGED_OUT,
  LOGGED_OUT_FAILED
} from 'src/common/constants'

const initialState = {
  authenticating:false,
  authenticated: false,
  error:"",
  providerId: "",
  uid:"",
  displayName: "",
  email:null,
  emailVerified:false,
  isAnonymous:true,
  photoURL:null,
};

function user(state = initialState, action){
  let data = action.data;
  switch(action.type){
    case AUTHENTICATING:
    return {...state, authenticating:true}
    case AUTH_SUCCESS:
    return {...data, authenticated:true, authenticating:false};
    case AUTH_ERROR:
    return {...state, error:data, authenticating:false};
    case LOGGED_OUT:
    case LOGGED_OUT_FAILED:
         //state = initialState;
    return initialState;
    default:
    return state;
  }
}
//export default user;
module.exports = user;