'use strict'

import React, {Component} from 'react';
import {View, Text, Image,ListView,TouchableOpacity, ScrollView,ActivityIndicator,DeviceEventEmitter,Dimensions,TextInput} from 'react-native';
import {connect } from 'react-redux';
//import VoxImplant from "react-native-voximplant";

import api from 'src/common/api';
import styles from 'src/common/styles';
import Header from '../Header';
import {registerUser} from 'src/actions/auth';

import {LOGO,CALL_ICON, HEART_ICON, HEART_ICON_RED, ENVELOPE_ICON,DEFAULT_AVATAR} from 'src/common/constants';

const { width, height } = Dimensions.get('window');

class SignUp extends Component{
	constructor(props){
		super(props);
		this.state ={
			username:'',
			email:'',
			password:'',
			confirmPassword:''
		}
		this.updateInputValue = this.updateInputValue.bind(this);
		//VoxImplant.SDK.closeConnection();
	}

	componentDidMount() {
	    //VoxImplant.SDK.connect();
	}

	updateInputValue(key, value){
		this.setState({
			[key]:value
		});
	}

	onSignUp(){
		let {username, email, password, confirmPassword } = this.state;
		let errorMsg ="";
		if(username === ""){
			errorMsg ="Name field is required";
		}else if(!api.validateEmailAddress(email)){
			errorMsg ="Invalid email address";
		}else if(password ===''){
			errorMsg ='Password is required';
		}
		if(errorMsg === ""){
			this.props.registerUser({username, email, password});
		}

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
				{/*<Header title="Create Account" isBackButton={true}/>*/}
				<ScrollView keyboardShouldPersistTaps="always" style={{marginTop:10, marginBottom:10}}>
					<View style={{justifyContent:'center', alignItems:'center', marginTop:0}}>
						<Image
					        style={styles.logoSmall}
					        source={LOGO}
					      />
					</View>
					<View style={{alignItems:'center', padding:10}}>
						<TextInput
							style={styles.formInput}
							placeholder ="USERNAME"
							placeholderTextColor ="#333"
							underlineColorAndroid ='transparent'
					        onChangeText={(text) => this.updateInputValue("username", text)}/>
					    <TextInput
							style={styles.formInput}
							placeholder ="Email"
							placeholderTextColor ="#333"
							underlineColorAndroid ='transparent'
					        onChangeText={(text) => this.updateInputValue("email", text)}/>
						<TextInput
							style={styles.formInput}
							secureTextEntry ={true}
							placeholder ="PASSWORD"
							placeholderTextColor ="#333"
							underlineColorAndroid ='transparent'
					        onChangeText={(text) => this.updateInputValue("password", text)}/>
					    <TextInput
							style={styles.formInput}
							secureTextEntry ={true}
							placeholder ="CONFIRM PASSWORD"
							placeholderTextColor ="#333"
							underlineColorAndroid ='transparent'
					        onChangeText={(text) => this.updateInputValue("confirmPassword", text)}/>
					    <TouchableOpacity onPress={()=>{}}
						   style={[styles.textButton,{alignItems:'flex-start'}]}>
					      <Text style={styles.lightDarkText}>Terms and conditions</Text>
					    </TouchableOpacity>
					    <TouchableOpacity onPress={this.onSignUp.bind(this)}
						   style={[styles.fullWidthBtn,{backgroundColor:'#E91E63'}]}>
					      <Text style={[styles.btnText,{color:'#fff'}]}>Sign Up</Text>
					    </TouchableOpacity>

					    <View style={styles.sepratingContainer}>
					    	<View style={{flex:0.6,height:1,backgroundColor:'#bab6b5'}}></View>
					    	<Text style={[{flex:1},styles.lightDarkText]}>IF YOU ALREADY HAVE AN ACCOUNT</Text>
					    	<View style={{flex:0.6,height:1,backgroundColor:'#bab6b5'}}></View>
					    </View>
					    <TouchableOpacity onPress={()=>navigate('Login')}
						   style={[styles.fullWidthBtn,{backgroundColor:'#fff'}]}>
					      <Text style={[styles.btnText,{color:'#E91E63'}]}>Login</Text>
					    </TouchableOpacity>
					</View>
			</ScrollView>
			</View>
		);
	}
}

SignUp.navigationOptions = {
    title: 'Create Account',
    header: navigation => ({
      style: {backgroundColor:'#E91E63'},
      tintColor: '#FFF',
      titleStyle: {
        color: '#FFF'
      }
    })
};

const mapDispatchToProps = (dispatch) => {
   return {
      registerUser: (data) => dispatch(registerUser(data)),
  }
};

const mapStateToProps = (state) => {
   return {
       store: state
   };
};
module.exports =  connect(mapStateToProps, mapDispatchToProps)(SignUp);
//export default SignUp;