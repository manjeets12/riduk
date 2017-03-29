'use strict'

import React, {Component} from 'react';
import {
	Alert,
	View, 
	Text, 
	Image,
	ListView,
	TouchableOpacity, 
	ScrollView,
	ActivityIndicator,
	DeviceEventEmitter,
	Dimensions,
	TextInput
} from 'react-native';
import {connect } from 'react-redux';


import api from 'src/common/api';
import styles from 'src/common/styles';
import Header from '../Header';
import {LOGO,CALL_ICON, HEART_ICON, HEART_ICON_RED, ENVELOPE_ICON,DEFAULT_AVATAR} from 'src/common/constants';
import {login} from 'src/actions/auth';


class Login extends Component{
	constructor(props){
		super(props);
		this.state ={
			username:"",
			password:"",
		}
		this.updateInputValue = this.updateInputValue.bind(this);
	}

	onLoginPressed(){
		let {username, password} = this.state;
		let erroMsg ="";
		if(username === "") erroMsg = "Please provide username";
		else {
			if(password ==="" ) erroMsg="Password can't be left blank";
			else if(password.length <6) erroMsg="Password must be of 6 characters";
		}
		if(erroMsg !==""){
			Alert.alert(
                    'Error',
                    erroMsg,
                    [

                        {text: 'OK', onPress: () => {}},
                    ],
                    { cancelable: false }
                );
		}else{
			this.props.login({username, password});
		}
	}

	updateInputValue(key, value){
		this.setState({
			[key]:value
		});
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
				{/*<Header title="Login" isBackButton={true}/>*/}
				<ScrollView keyboardShouldPersistTaps="always">
					<View style={{justifyContent:'center', alignItems:'center', marginTop:50}}>
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
							secureTextEntry ={true}
							placeholder ="PASSWORD"
							placeholderTextColor ="#333"
							underlineColorAndroid ='transparent'
					        onChangeText={(text) => this.updateInputValue("password", text)}/>
					    <TouchableOpacity onPress={()=>navigate('ForgotPassword')}
						   style={styles.textButton}>
					      <Text style={styles.lightDarkText}>Forgot Password?</Text>
					    </TouchableOpacity>
					    <TouchableOpacity onPress={this.onLoginPressed.bind(this)}
						   style={[styles.fullWidthBtn,{backgroundColor:'#E91E63'}]}>
					      <Text style={[styles.btnText,{color:'#fff'}]}>Login</Text>
					    </TouchableOpacity>

					    <View style={styles.sepratingContainer}>
					    	<View style={{flex:0.6,height:1,backgroundColor:'#bab6b5'}}></View>
					    	<Text style={[{flex:1},styles.lightDarkText]}>OR CONNECT WITH</Text>
					    	<View style={{flex:0.6,height:1,backgroundColor:'#bab6b5'}}></View>
					    </View>
					    <View style={styles.sepratingContainer}>
					    	<TouchableOpacity onPress={()=>{}}
							   style={[styles.socialButton,{backgroundColor:'#375f9d',marginRight:10}]}>
						      <Text style={[styles.btnText,{color:'#fff'}]}>Facebook</Text>
						    </TouchableOpacity>
						    <TouchableOpacity onPress={()=>{}}
							   style={[styles.socialButton, {backgroundColor:'#d9372c',marginLeft:10}]}>
						      <Text style={[styles.btnText,{color:'#fff'}]}>Google</Text>
						    </TouchableOpacity>
					    </View>
					</View>
			</ScrollView>
			</View>
		);
	}
}

Login.navigationOptions = {
    title: 'Login',
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
      login: (data) => dispatch(login(data)),
  }
};

const mapStateToProps = (state) => {
   return {
       store: state,
   };
};
module.exports =  connect(mapStateToProps, mapDispatchToProps)(Login);
//export default Login;