/*
all the action creator for cubical task are defined in this file.
*/

'use strict';

import {
  BASE_CUBICAL_URL,
  FETCHING,
  FETCH_SUCCESS,
  FETCH_ERROR,
  UPDATE_DATASOURCE,
  TAKE_SET,
  RESET_TRACKS
} from 'src/common/constants'

//var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!== r2});

export const resetTracks = function(){
  return{
    type:RESET_TRACKS
  }
}

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

export const fetchError = function(data){
  return{
    type:FETCH_ERROR,
    data
  }
}

export const fetchArtists= function(params){
  let {name, tracks} = params;
  let url = BASE_CUBICAL_URL + "term="+name+"&limit="+tracks;
  return dispatch =>{
      dispatch(fetching());
      return fetch(url)
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

