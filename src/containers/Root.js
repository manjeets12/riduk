'use strict';

import React, {Component} from 'react';
var ReactNative = require('react-native');
var {
  View,Text,
  Dimensions,
  DeviceEventEmitter
}=ReactNative

import { Provider, connect } from 'react-redux';
import firebase from 'src/common/firebase';

import api from 'src/common/api'; 
import App from './App';
var configureStore = require('src/data/store');



class Root extends Component {
    constructor(props) {
      super(props);
      this.state = {
        authenticated:false,
        isLoading:true,
        store: configureStore(() => this.setState({isLoading: false})),
      };
  }

  componentDidMount() {
    let {dispatch} = this.state.store;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //api.resetRouteStack(dispatch, "UserProfile");
        console.log("authenticated", user);
      } else {
        //api.resetRouteStack(dispatch, "Landing");
        console.log("authenticated", false);
      }
    });
   
  }
  
  render() {
    if (this.state.isLoading) {
        return null;
      }
      return (
        
        <Provider store={this.state.store}>
          <App/>
        </Provider>
          
      );
  }
}
module.exports = Root;