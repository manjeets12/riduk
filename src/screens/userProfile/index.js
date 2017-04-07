'use strict'

import React, {Component} from 'react';
import {Alert,View, Text, Image,ListView,TouchableOpacity, ScrollView,ActivityIndicator,DeviceEventEmitter,Dimensions,TextInput,Modal,StyleSheet,Button} from 'react-native';
import { NavigationActions} from 'react-navigation';

import {connect } from 'react-redux';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'src/common/firebase';

//import VoxImplant from "react-native-voximplant";
import {logout, reloadUser} from 'src/actions/auth';
import {startUpload} from 'src/actions/uploads'
import api from 'src/common/api';
import styles from 'src/common/styles';
import Header from '../Header';
import {UserAvatar} from 'src/common/components/UserAvatar';
import {CALL_ICON, HEART_ICON, HEART_ICON_RED, ENVELOPE_ICON,DEFAULT_AVATAR,MORE_ICON} from 'src/common/constants';

const buttons = ['Cancel', 'Change Password', 'Sign Out'];
const CANCEL_INDEX = 0;
const ImagePickerButtons1 =['Cancel','Camera','Gallery','View Profile Photo'];
const ImagePickerButtons2 =['Cancel','Camera','Gallery'];
const imageOptions = {
      width: 300,
      height: 300,
      cropping: true,
      includeBase64:true
};

const renderRight=(state) =>{
        return(
	        <TouchableOpacity onPress={()=>state.params.showActionsheet()}>
		      <Image
		        style={styles.headerIcon}
		        source={MORE_ICON}
		      />
		    </TouchableOpacity>
	    );
}

class UserProfile extends Component{
	constructor(props){
		super(props);
    this.ref = null;
		this.show = this.show.bind(this);
		this._handlePress = this._handlePress.bind(this);
    this.uploadProfilePic = this.uploadProfilePic.bind(this);
	}
	componentDidMount() {
      
  }
  componentDidMount() {
    let {uid} = this.props.user;
    this.props.navigation.setParams({ showActionsheet: this.show });
    this.props.reloadUser();
    this.ref = firebase.database().ref('users/'+uid);
    this.ref.on('value', this.handleUserUpdate);
  }
  componentWillUnmount() {
    if (this.ref) {
      this.ref.off('value', this.handleUserUpdate);
    }
  }
  handleUserUpdate = (snapshot) => {
    console.log("user updates - ", snapshot);
  }

	show() {
        this.ActionSheet.show();
  }
    _handlePress(index) {
        switch(index){
          case 1:this.props.openDrawer();
          break;
          case 2:this.props.logout();
          break;
          default:
          break;
        }
    }

    openImageOptions(){
      
      ImagePicker.openPicker(imageOptions).then((image) => {
          //this.props.startUpload({url:url,path:image.path});
          this.uploadProfilePic(image.path)
          console.log(image);
      });
    	//this.ImagePicker.show();
    }

    handleImagePicker(index){
      //this.props.openDrawer();
    	//let {uid} = this.props.user;
    	//let url = 'Images/Avatar/'+uid;
      //this.props.logout();
    	/* ImagePicker.openPicker(imageOptions).then(image => {
    	 	this.props.startUpload({url:url,path:image.path});
            console.log(image);
          }); */
       switch(index){
          case 1:
           ImagePicker.openCamera(imageOptions).then(image => {
            console.log(image);
          });
          
          break;
          case 2:
          ImagePicker.openPicker(imageOptions).then(image => {
            console.log(image);
          });         
          break;
          case 3:
          console.log('showProfile');
          break;
          default:
          break;
        }
    }

  uploadProfilePic(path){
    let {uid,displayName, email} = this.props.user;
    let timeStamp = new Date().getTime();
    let url = 'Images/'+timeStamp;
    const unsubscribe = firebase.storage()
                .ref(url)
                .putFile(path,{contentType: 'image/jpeg'})
                .on('state_changed', snapshot => {
                    console.log(snapshot);
                }, error => {
                   console.log(error);
                    //Error
                    unsubscribe();
                }, uploadedFile => {
                    //Success
                    console.log(uploadedFile);
                    //let avatar =["http://localhost:8081/index.android.bundle?platform=android&dev=true&hot=false&minify=false", uploadedFile.downloadUrl];
                    this.ref.set({
                       avatar,
                    })   //setting user to database
                    .then((response) =>{
                      console.log(response);
                    })
                    .catch((error) => {
                      console.log('An error occurred', error);
                    });
                    unsubscribe();
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
    	let {displayName, email, emailVerified, isAnonymous, photoURL, providerId, uid} = this.props.user;
		return(
			<View style={[styles.container,{alignItems:'center', backgroundColor:'#f2eae7'}]}>
				<ScrollView keyboardShouldPersistTaps="always">
					<TouchableOpacity style={{justifyContent:'center', alignItems:'center', marginTop:50}}
					onPress={this.openImageOptions.bind(this)}>
						  <UserAvatar photoURL={photoURL}/>
					    <Text style={[styles.normalText,{textAlign:'center', margin:10}]}>{displayName}</Text>
              <Text style={[styles.normalText,{textAlign:'center', margin:10}]}>{email}</Text>
					</TouchableOpacity>
					
					
				</ScrollView>
			    <ActionSheet 
                    ref={(o) => this.ActionSheet = o}
                    options={buttons}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={this._handlePress}
                />
                <ActionSheet 
                    ref={(o) => this.ImagePicker = o}
                    options={ImagePickerButtons1}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={this.handleImagePicker}
                />
				
			</View>
		);
	}
}

UserProfile.navigationOptions = {
    title: 'Profile',
    header:({ state}) => ({
      right: renderRight(state),
      style: {backgroundColor:'#E91E63'},
      tintColor: '#FFF',
      titleStyle: {
        color: '#FFF'
      }
    })
};

const mapDispatchToProps = (dispatch) => {
   return {
   	logout: () => dispatch(logout()),
   	startUpload:(data) =>dispatch(startUpload(data)),
    reloadUser:()=>dispatch(reloadUser())
   	//openDrawer:() => dispatch(NavigationActions.navigate({ routeName: 'Dashboard' }))
   }
};

const mapStateToProps = (state) => {
   return {
       user: state.user,
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

//export default UserProfile;






