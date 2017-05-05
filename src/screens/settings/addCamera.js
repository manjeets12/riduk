'use strict'

import React, {Component} from 'react';
import {Picker,View, Text, Image,ListView,TouchableOpacity, ScrollView,ActivityIndicator,DeviceEventEmitter,Dimensions,TextInput,Alert} from 'react-native';
import {connect } from 'react-redux';
//import VoxImplant from "react-native-voximplant";

import api from 'src/common/api';
import styles from 'src/common/styles';
import Header from '../Header';
import {addCamera} from 'src/actions/cameras';

import {LOGO,CALL_ICON, HEART_ICON, HEART_ICON_RED, ENVELOPE_ICON,DEFAULT_AVATAR} from 'src/common/constants';

const { width, height } = Dimensions.get('window');

class AddCamera extends Component{
	constructor(props){
		super(props);
		this.state ={
			ip:'',
			port:'',
			username:'',
			password:''
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

	onSavePressed(){
        let {cameras} = this.props;
		let {ip, port, username, password} = this.state;
		let errorMsg ="";
		if(username === ""){
			errorMsg ="Username field is required";
		}else if(ip ===""){
			errorMsg ="ip address is required";
		}else if(port ===''){
			errorMsg ='Port is required';
		}else if(password ===''){
			errorMsg ='Password is required';
		}

		if(errorMsg === ""){
            let last = [...cameras.cameras].pop();
            let id = last.id + 1;
            let rtspUrl = "rtsp://";
            rtspUrl +=ip +":"+port;
            rtspUrl += "/user="+username;
            rtspUrl += "&password="+password;
            rtspUrl += "&channel=1&stream=0.sdp?real_stream--rtp-caching=100";
			this.props.addCamera({ip, port, username, password, id:id, url:rtspUrl});

             Alert.alert(
                    'Success',
                    "Camera Added Successfully",
                    [

                        {text: 'OK', onPress: () => {}},
                    ],
                    { cancelable: false }
                );
		}else{
               Alert.alert(
                    'Error',
                    errorMsg,
                    [

                        {text: 'OK', onPress: () => {}},
                    ],
                    { cancelable: false }
                );
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
							placeholder ="IP Address"
							placeholderTextColor ="#333"
							underlineColorAndroid ='transparent'
					        onChangeText={(text) => this.updateInputValue("ip", text)}/>
					    <TextInput
							style={styles.formInput}
							placeholder ="Port"
							placeholderTextColor ="#333"
							underlineColorAndroid ='transparent'
					        onChangeText={(text) => this.updateInputValue("port", text)}/>
						<TextInput
							style={styles.formInput}
							placeholder ="Username"
							placeholderTextColor ="#333"
							underlineColorAndroid ='transparent'
					        onChangeText={(text) => this.updateInputValue("username", text)}/>
					    <TextInput
							style={styles.formInput}
							secureTextEntry ={true}
							placeholder ="password"
							placeholderTextColor ="#333"
							underlineColorAndroid ='transparent'
					        onChangeText={(text) => this.updateInputValue("password", text)}/>
					   
					    <TouchableOpacity onPress={this.onSavePressed.bind(this)}
						   style={[styles.fullWidthBtn,{backgroundColor:'#E91E63'}]}>
					       <Text style={[styles.btnText,{color:'#fff'}]}>Save</Text>
					    </TouchableOpacity>
					</View>
			</ScrollView>
			</View>
		);
	}
}

AddCamera.navigationOptions = {
    title: 'Add Camera',
    headerStyle: {backgroundColor:'#E91E63'},
    headerTintColor: '#FFF',
    headerTitleStyle: { color: '#FFF'}
};

const mapDispatchToProps = (dispatch) => {
   return {
      addCamera: (data) => dispatch(addCamera(data)),
  }
};

const mapStateToProps = (state) => {
   return {
       cameras: state.cameras
   };
};
module.exports =  connect(mapStateToProps, mapDispatchToProps)(AddCamera);