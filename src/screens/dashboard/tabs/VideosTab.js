'use strict'

import React, {Component} from 'react';
import {Alert,View,Image, Text, Button,TouchableOpacity,FlatList,StyleSheet,Dimensions,Picker} from 'react-native';
import {connect } from 'react-redux';
//import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
//import Video from'react-native-vlc';

const { width, height } = Dimensions.get('window');
import {RenderLoader} from 'src/common/components/RenderLoader';
//import VideoPlayer from 'src/screens/VideoPlayer';

class Videos extends Component{
	constructor(props){
		super(props);
    this.state={
      language:"js"
    }
	}




	render(){
    const { navigate } = this.props.navigation;
		return(
			<View style={{flex:1}}>
        <VideoPlayer
            source={{ uri: 'rtsp://mpv.cdn3.bigCDN.com:554/bigCDN/mp4:bigbuckbunnyiphone_400.mp4' }}
            navigator={navigate}
            videoStyle={{minHeight:200}}
        />
			</View>
		);
	}
}
Videos.navigationOptions = {
  tabBar: {
    label: 'Videos',
  },
};


const mapDispatchToProps = (dispatch) => {
   return {
   	openDrawer:() => dispatch(NavigationActions.navigate({ routeName: 'Drawer' }))
   }
};

const mapStateToProps = (state) => {
   return {
       user: state.user,
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(Videos);

//export default Chats;