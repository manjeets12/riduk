'use strict'
//import * as firebase from 'firebase';

import RNFirebase from 'react-native-firebase'

const config = {
    apiKey: "AIzaSyDqXURDSNzo9YpWb-yvYYt2v7YTPwImLt8",
    authDomain: "riduk-1214.firebaseapp.com",
    databaseURL: "https://riduk-1214.firebaseio.com",
    storageBucket: "riduk-1214.appspot.com",
    messagingSenderId: "9937259539"
};

//const firebase = new RNFirebase(config);  //if native doesn't works;
const firebase = new RNFirebase({persistence:true});

//firebase.initializeApp(config);

export default firebase;