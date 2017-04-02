/*
all the action creator for musejam task are defined in this file.
include fetching data from api
sorting, filtering and serach logic

*/

'use strict';

//import {ListView} from 'react-native';

import {
  FETCHING,
  FETCH_SUCCESS,
  FETCH_ERROR,
  UPDATE_DATASOURCE,
  TAKE_SET
} from 'src/common/constants'

//var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!== r2});

export const fetching = function(){
  return{
     type:FETCHING
  }
}
export const fetchSuccess= function(data){
  return {
    type:FETCH_SUCCESS,
    data
  }
}
export const takeSet = function(data){
  return{
    type:TAKE_SET,
    data
  }
}

export const fetchError = function(data){
  return{
    type:FETCH_ERROR,
    data
  }
}
export const updateDataSource = function(data){
  return{
    type:UPDATE_DATASOURCE,
    data
  }
}

export const fetchProjects= function(){
  return dispatch =>{
      dispatch(fetching());
      return fetch('http://starlord.hackerearth.com/kickstarter')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        dispatch(fetchSuccess(responseJson));
        dispatch(takeSet(0));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  }
}

