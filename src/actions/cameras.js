'use strict';

import imagePro from 'src/common/imagePro';

import {
  GET_CAMERA,
  ADD_CAMERA,
  DELETE_CAMERA,
} from 'src/common/constants'

export const fetching= function(){
   return{
        type:FETCHING
      }
}

export const addCamera= function(data){
  return dispatch => {
    dispatch({
        type:ADD_CAMERA,
        data
    })
  }
}

export const getCamera= function(id){
  return dispatch => {
    dispatch({
        type:GET_CAMERA,
        id
    })
  }
}

export const deleteCamera= function(id){
  return dispatch => {
    dispatch({
        type:DELETE_CAMERA,
        id
    })
  }
}