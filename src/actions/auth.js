'use strict';

import firebase from 'src/common/firebase';
import {FBLoginManager} from 'react-native-facebook-login';

//import api from 'src/common/api';
import { NavigationActions} from 'react-navigation';

import {
  REGISTER_USER, 
  LOGIN, 
  AUTHENTICATING, 
  AUTH_SUCCESS,
  AUTHENTICATED,
  AUTH_ERROR, 
  SAVE_USER, 
  SHOW_LOADING_OVERLAY, 
  HIDE_LOADING_OVERLAY,
  LOGGED_OUT,
  LOGGED_OUT_FAILED
} from 'src/common/constants'
//import {AsyncStorage} from 'react-native';

export const authenticating= function(){
   return{
        type:AUTHENTICATING
      }
}

export const authSuccess= function(data){
   return{
        type:AUTH_SUCCESS,
        data,
      }
}

export const authenticated= function(){
   return{
        type:AUTHENTICATED
      }
}
export const authError= function(data){
   return{
        type: AUTH_ERROR,
        data,
      }
}

export const registerUser= function(data){
  let {username, email, password} = data;
  return dispatch => {
    dispatch(authenticating());
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      firebase.auth().currentUser.updateProfile({
        displayName: username
      })
      .then(()=>{
          let {uid, displayName, email} = firebase.auth().currentUser;
          firebase.database().ref('users/' + uid).set({
              uid, 
              displayName,
              email
          })   //setting user to database
          .then((response) =>{
            let user = firebase.auth().currentUser;
            dispatch(authSuccess(user._user));
            //dispatch(NavigationActions.navigate({ routeName: 'UserProfile' }));
          })
          .catch((error) => {
            console.log('An error occurred', error);
            dispatch(authError(error));
          });
      })
      .catch((error)=>{
          console.log('An error occurred', error);
          dispatch(authError(error));
      })
    })
    .catch((error) => {
      console.log('An error occurred', error);
      dispatch(authError(error));
    });
  }
}

export const login= function(data){
  let {username, password} =data;
  return dispatch => {
    dispatch(authenticating());
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then((user) => {
      console.log('user created', user);
      dispatch(authSuccess(user._user));
      //dispatch(authenticated());
      //dispatch(NavigationActions.navigate({ routeName: 'UserProfile' }));
    })
    .catch((error) => {
      console.log('An error occurred', error);
      dispatch(authError(error));
    });
  }
}

export const loginWithFacebook = function(){
  return dispatch =>{
    FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
      if (!error) {
        console.log(data);
        let {userId, token} = data.credentials;
        let credentials ={
          provider:"facebook", 
          token:token, 
          secret:userId
        };
        dispatch(loginWithCredentials(Object.assign({},credentials)));
      } else {
        console.log("Error: ", error);
      }
    });
  }
}

export const loginWithGoogle = function(){
  return dispatch =>{
    FBLoginManager.logout((err, data) => {
         const result = err || data;
          if(result.type === 'success' && result.profile){
           console.log(result);
          }else{
            console.log(err);
          }
     });
  }
}


export const loginWithCredentials =function(credential){
  return dispatch =>{
    dispatch(authenticating());
    firebase.auth().signInWithCredential(credential)
    .then((user) => {
      console.log('user created', user);
      dispatch(authSuccess(user._user));
    })
    .catch((error) => {
      console.log('An error occurred', error);
      dispatch(authError(error));
    });
  }
}


export const logoutSuccess= function(){
   return{
        type:LOGGED_OUT,
      }
}
export const logoutError= function(){
   return{
        type:LOGGED_OUT_FAILED,
      }
}

export const logout= function(){
  return dispatch => {
    firebase.auth().signOut()
    .then(() => {
      console.log('User signed out successfully');
      dispatch(logoutSuccess());
    })
    .catch((error)=>{
      console.log(error);
      //dispatch(logoutSucess());
      dispatch(logoutError());
    });
  }
}