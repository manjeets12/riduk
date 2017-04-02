'use strict'

import {
  FETCHING,
  FETCH_SUCCESS,
  FETCH_ERROR,
  UPDATE_DATASOURCE,
  LOGGED_OUT,
  LOGGED_OUT_FAILED,
  TAKE_SET
} from 'src/common/constants';

const initialState = {
  isFetching:false,
  isFetched: false,
  error:"",
  projects:[],
  set:[],
  page:0,
  dataSource:null,
};

function musejam(state = initialState, action){
  let data = action.data;
  switch(action.type){
    case FETCHING:
    return {...initialState, isFetching:true}
    case FETCH_SUCCESS:
    return {...initialState, projects:[...data], isFetched:true};
    case FETCH_ERROR:
    case TAKE_SET:
    let index = state.page
    return {...state, set:[...state.projects.slice(0, (index+1)*20)], page:index+1};
    case LOGGED_OUT:
    case LOGGED_OUT_FAILED:
    return initialState;
    default:
    return state;
  }
}
export default musejam;