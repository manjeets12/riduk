'use strict'

import firebase from 'src/common/firebase';
import { NavigationActions} from 'react-navigation';


/*import {

} from 'src/common/constants'*/
//import {AsyncStorage} from 'react-native';

/*export const authenticating= function(){
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
}*/

export const startUpload= function(data){
  let {url,path} = data;
  return dispatch => {
    firebase.storage()
    .ref(url)
    .putFile(path,{contentType: 'image/jpeg'})
    .then(response => {
       console.log(response);
       firebase.auth().currentUser
        .updateProfile({
          //photoUri: response.downloadUrl,
          displayName:'Manjeet Singh'
        })
        .then(user =>{
          console.log(user);
        })
        .catch(error =>{
          console.log(error);
        });
    })
    .catch(error => {
        console.log(error);
    });
  }
}