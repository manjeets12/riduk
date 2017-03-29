'use strict'

import React, {Component} from 'react';
import {View, Text, Image,ActivityIndicator,DeviceEventEmitter,Dimensions} from 'react-native';
import { connect} from 'react-redux';

import styles from 'src/common/styles';
//import AppStateBeforeLogin from './AppBeforeLogin';
import AppWithNavigationState, {UnAuthorizedApp} from './AppNavigator';
//import AppStateBeforeLogin,{AppBeforeLogin} from './AppBeforeLogin';

class App extends Component{
	constructor(props){
		super(props);
	}

	render(){
		let {authenticated} = this.props;
		if(authenticated){
			return <AppWithNavigationState/>;
		}
		return <UnAuthorizedApp/>

		
	}
}

export default connect(state =>({authenticated: state.user.authenticated}))(App);


//export default App;