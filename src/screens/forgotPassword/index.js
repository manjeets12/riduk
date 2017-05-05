'use strict'

import React, {Component} from 'react';
import {View, Text, Image,ListView,TouchableOpacity, ScrollView,ActivityIndicator,DeviceEventEmitter,Dimensions,TextInput} from 'react-native';

//import VoxImplant from "react-native-voximplant";

import api from 'src/common/api';
import styles from 'src/common/styles';
import Header from '../Header';
import {CALL_ICON, HEART_ICON, HEART_ICON_RED, ENVELOPE_ICON,DEFAULT_AVATAR} from 'src/common/constants';

const { width, height } = Dimensions.get('window');

class ForgotPassword extends Component{
	constructor(props){
		super(props);
		//VoxImplant.SDK.closeConnection();
	}

	componentDidMount() {
	    //VoxImplant.SDK.connect();
	}
	
	
	renderLoader(){
		return(
			<ActivityIndicator
		        animating={true}
		        style={[styles.centering, {height: 80}]}
		        size="large"
		     />
		);
	}

	render(){
		const { navigate } = this.props.navigation;
		return(
			<View style={[styles.container,{alignItems:'center', backgroundColor:'#f2eae7'}]}>
				{/*<Header title="Forget Password" isBackButton={true}/>*/}
				<View  style={{justifyContent:'center', alignItems:'center'}}>
					<View style={{justifyContent:'center', alignItems:'center', marginTop:50}}>
						<Image
					        style={styles.logoSmall}
					        source={DEFAULT_AVATAR}
					      />
					</View>
					<View style={{alignItems:'center', padding:10}}>
						<TextInput
							style={styles.formInput}
							placeholder ="EMAIL"
							placeholderTextColor ="#333"
							underlineColorAndroid ='transparent'
					        onChangeText={(text) => {}}/>

					    <TouchableOpacity onPress={()=>{}}
						   style={[styles.fullWidthBtn,{backgroundColor:'#E91E63'}]}>
					      <Text style={[styles.btnText,{color:'#fff'}]}>Submit</Text>
					    </TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

ForgotPassword.navigationOptions = {
    title: 'Forget Password',
    headerStyle: {backgroundColor:'#E91E63'},
	headerTintColor: '#FFF',
	headerTitleStyle: {
	color: '#FFF'
	}
};

export default ForgotPassword;