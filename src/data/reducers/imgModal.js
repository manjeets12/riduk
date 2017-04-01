'use strict'

import {
  FETCHING,
  FETCH_SUCCESS,
  FETCH_FROM_URL_SUCCESS,
  FETCH_ERROR,
  LOGGED_OUT,
  LOGGED_OUT_FAILED
} from 'src/common/constants'

const initialState = {
  isFetching:false,
  isSuccess:false,
  isFailed:false,
  error:null,
  concepts:[],
  localUrl:null,
  images:[],
};

function imgModal(state = initialState, action){
  let concepts, url, localUrl;
  switch(action.type){
    case FETCHING:
    //return {...initialState,...state.images, isFetching:true}
    return {...state, concepts:[], isFetching:true, isSuccess:false,isFailed:false}
    case FETCH_SUCCESS:
    concepts=action.data.concepts;
    url=action.data.url;
    localUrl = action.data.localUrl
    return {...initialState, concepts, localUrl, images:[...state.images, {url, localUrl}], isSuccess:true};
    case FETCH_FROM_URL_SUCCESS:
    concepts=action.data.concepts;
    url=action.data.url;
    localUrl = action.data.localUrl;
    return {...state, concepts, localUrl, isSuccess:true, isFailed:false,isFetching:false};
    case FETCH_ERROR:
    return {...state, error:action.data,isFailed:true, isFetching:false, isSuccess:false};
    case LOGGED_OUT:
    case LOGGED_OUT_FAILED:
    return initialState;
    default:
    return state;
  }
}

module.exports = imgModal;