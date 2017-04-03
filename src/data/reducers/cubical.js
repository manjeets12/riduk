'use strict'

import {
  FETCHING,
  FETCH_SUCCESS,
  FETCH_ERROR,
  RESET_TRACKS,
  LOGGED_OUT,
  LOGGED_OUT_FAILED,
  TAKE_SET
} from 'src/common/constants';

const initialState = {
  isFetching:false,
  isFetched: false,
  error:"",
  tracks:[],
  resultCount:0
};

function cubical(state = initialState, action){
  switch(action.type){
    case FETCHING:
    return {...initialState, isFetching:true}
    case FETCH_SUCCESS:
    let {results, resultCount} = action.data;
    return {...initialState, tracks:results, isFetched:true};
    case FETCH_ERROR:
    return {...state, isFetched:false, isFetching:false}
    case LOGGED_OUT:
    case LOGGED_OUT_FAILED:
    case RESET_TRACKS:
    return initialState;
    default:
    return state;
  }
}
export default cubical;