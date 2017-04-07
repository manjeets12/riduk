'use strict'

import React, {Component} from 'react';
import {View, Text,Button, Image,ListView,TouchableOpacity, ScrollView,ActivityIndicator,DeviceEventEmitter,Dimensions} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Contacts from 'react-native-contacts';
import {connect } from 'react-redux';
//import VoxImplant from "react-native-voximplant";

import api from 'src/common/api';
import styles from 'src/common/styles';
import Header from '../Header';
import {getContactsSuccess,getContactsError} from 'src/actions/contacts';
import {LOGO,CALL_ICON, HEART_ICON, HEART_ICON_RED, ENVELOPE_ICON,DEFAULT_AVATAR} from 'src/common/constants';

//const { width, height } = Dimensions.get('window');

class LandingScreen extends Component{
	constructor(props){
		super(props);
		this.getContacts = this.getContacts.bind(this);
	}

	componentDidMount(){
      this.getContacts()
    }
	
	getContacts(){

      Contacts.getAll((err, contacts) => {
		  if(err && err.type === 'permissionDenied'){
		    console.log('please change your setting to invite your friends');
		    this.props.getContactsError();
		  } else {
		    console.log(contacts);
		    this.props.getContactsSuccess(contacts);
		  }
      });
    }
	

	render(){
		const { navigate, dispatch } = this.props.navigation;
		
		return(
			<View style={[styles.container,{backgroundColor:'#E91E63', alignItems:'center'}]}>
				<View style={styles.logoConatiner}>
					<Image
				        style={styles.profileImage}
				        source={LOGO}
				      />
				     {/*<Text style={[styles.boldText, {margin:10}]}>Riduk</Text>
				     <Text style={[styles.normalText,{textAlign:'center',}]}>Connect with your friends via video conferencing</Text>*/}
				</View>
				<View style={{alignItems:'center', padding:10}}>
					<TouchableOpacity onPress={()=>navigate('SignUp')}
					style={styles.fullWidthBtn}>
				      <Text style={styles.btnText}>Sign Up</Text>
				    </TouchableOpacity>
				    <TouchableOpacity onPress={()=>navigate('Login')}
					   style={[styles.fullWidthBtn,{backgroundColor:'#fff'}]}>
				      <Text style={[styles.btnText,{color:'#E91E63'}]}>Login</Text>
				    </TouchableOpacity>
				</View>
			</View>
		);
	}
};

LandingScreen.navigationOptions ={
     header: {
       visible: false,
     },
}

const mapDispatchToProps = (dispatch) => {
   return {
      getContactsSuccess: (data) => dispatch(getContactsSuccess(data)),
      getContactsError:()=>dispatch(getContactsError()),
  }
};

const mapStateToProps = (state) => {
   return {
     
   };
};
module.exports =  connect(mapStateToProps, mapDispatchToProps)(LandingScreen);