'use strict';

import imagePro from 'src/common/imagePro';

import {
  FETCHING,
  FETCH_SUCCESS,
  FETCH_FROM_URL_SUCCESS,
  FETCH_ERROR,
  LOGGED_OUT,
  LOGGED_OUT_FAILED
} from 'src/common/constants'

export const fetching= function(){
   return{
        type:FETCHING
      }
}

export const fecthSuccess= function(data){
   return{
        type:FETCH_SUCCESS,
        data,
      }
}

export const fecthFromUrlSuccess = function(data){
  return{
        type:FETCH_FROM_URL_SUCCESS,
        data,
      }
}

export const fetchError= function(data){
   return{
        type: FETCH_ERROR,
        data,
      }
}



export const startPredictor= function(params){
  let {base64, localUrl} = params;
  return dispatch => {
    dispatch(fetching());
    imagePro.models.predict(Clarifai.GENERAL_MODEL, {base64})
    .then((response) =>{
      let {status, outputs} = response.data;
      if(status.code === 10000 && status.description ==="Ok"){
        let {data, input} = outputs[0];
        let result = {
          concepts:data.concepts,
          url:input.data.image.url,
          localUrl:localUrl
        };
        dispatch(fecthSuccess(Object.assign({}, result)));
      }
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
      dispatch(fetchError(error));
    });
  }
}

export const startPredictorFromUrl= function(params){
  let {localUrl, url} = params;
  return dispatch => {
    dispatch(fetching());
    imagePro.models.predict(Clarifai.GENERAL_MODEL, url)
    .then((response) =>{
      let {status, outputs} = response.data;
      if(status.code === 10000 && status.description ==="Ok"){
        let {data, input} = outputs[0];
        let result = {
          concepts:data.concepts,
          url:input.data.image.url,
          localUrl:localUrl,
        };
        dispatch(fecthFromUrlSuccess(Object.assign({}, result)));
      }
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
      dispatch(fetchError(error));
    });
  }
}
