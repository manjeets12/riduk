'use strict';

import React, {Component} from 'react';
import {Linking, Alert, NetInfo, Platform} from 'react-native';
import { NavigationActions} from 'react-navigation';

var api = {
    navigator,
    
    isAndroid(){
        return (Platform.OS === 'android');
    },

    resetRouteStack(dispatch, route){
        let resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: route})
          ]
        });
        dispatch(resetAction);
    },
    
    //common method to get/post data from/to the server
    request: async function(params) {
        if (params) {
            let contentType ="application/json; charset=utf-8";
            let url = BASE_URL + params.method;
            let options ={
                  method: params.type,
                  account_id:ACCOUNT_ID,
                  account_email:"kingm2016@gmail.com",
                  api_key:API_KEY,
                  dataType: 'json',
                  headers: {
                   'Accept': 'application/json',
                   'Content-Type': contentType,
                  },
            };
            if (!params.input) {
                params.input = {};
            }
            params.input.api_key = API_KEY;
            params.input.api_secret =API_SECRET;
            if(params.input){
              options.body = JSON.stringify(params.input);
            }
            console.log(params);
            try{
                let response = await fetch(url, options);
                let body = await response.json();
                console.log(body);
                return params.onSuccess(body);
            }catch(error){
                return params.onError(error);
            }
        }
    },


    updateNavigator(_navigator){
      if(_navigator)
          this.navigator = _navigator;
    },

    setConnectionState(state){
          if(!this.connection) this.connection = null;
          this.connection = state;
    },
   
    openURL(user){
        try{
                Linking.canOpenURL(user).then(supported => {
                if (supported) {
                  Linking.openURL(user);
                } else {
                  console.log('Please try again letter');
                }
              });
            }
           catch(error){
            console.log(error);
           }
    },
    validateEmailAddress(email) {
            let regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (regex.test(email)) {
                return true;
            } else {
                return false;
            }
    }



   
}

module.exports = api;



