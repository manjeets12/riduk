'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Root from 'src/containers/Root'


AppRegistry.registerComponent('Riduk', () => Root);



function game (){
	var S = "bacbacacb",A = 8, B = 9, C ="", i=0, sum=0;
	while(C !== S){
		var len = C.length;
		var part = S.substring(i, len);
		if(C !="" && C === part){
			C += part;
			sum += B;
			i += len;
			console.log("Hi");
		}else{
			C += S.charAt(i);
			i++;
			sum += A;
		}
	}
	console.log("total is: -", sum);
	console.log(C);
}

game();
