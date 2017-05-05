'use strict'

import {
 GET_CAMERA,
 ADD_CAMERA,
 DELETE_CAMERA,
 LOGGED_OUT,
 LOGGED_OUT_FAILED
} from 'src/common/constants'

const initialState = {
  cameras:[
      {
          id:1,
          ip:"",
          port:"",
          username:"",
          password:"",
          link:"rtsp://mpv.cdn3.bigCDN.com:554/bigCDN/mp4:bigbuckbunnyiphone_400.mp4"
      }
  ],
  camera:{
          id:1,
          ip:"",
          port:"",
          username:"",
          password:"",
          url:"rtsp://mpv.cdn3.bigCDN.com:554/bigCDN/mp4:bigbuckbunnyiphone_400.mp4"
      }
};

function cameras(state = initialState, action){
  switch(action.type){
    case GET_CAMERA:
    return {...state, camera:state.cameras.filter((obj, index)=>{
        return obj.id === action.id
    })};
    case ADD_CAMERA:
    return {...state, cameras:[...state.cameras, {...action.data}]}
    case DELETE_CAMERA:
    return {...state}
    case LOGGED_OUT:
    case LOGGED_OUT_FAILED:
    return initialState;
    default:
    return state;
  }
}
//export default user;
module.exports = cameras;