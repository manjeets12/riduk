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
  showLoader:false,
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
    return {...initialState, authenticating:true,showLoader:true}
    case AUTH_SUCCESS:
    return {...data, authenticated:true, authenticating:false,showLoader:false};
    case AUTH_ERROR:
    return {...initialState, error:data};
    case LOGGED_OUT:
    case LOGGED_OUT_FAILED:
    return initialState;
    default:
    return state;
  }
}
//export default user;
module.exports = user;