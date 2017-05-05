'use strict'

import React, {Component} from 'react';
import {Alert,View,Image, Text, Button,TouchableOpacity,FlatList,StyleSheet,Dimensions,Picker} from 'react-native';
import {connect } from 'react-redux';
import {NavigationActions,} from 'react-navigation';
//import Video from 'react-native-video';
//import Video from'react-native-vlc';

const { width, height } = Dimensions.get('window');
import {RenderLoader} from 'src/common/components/RenderLoader';
import styles from 'src/common/styles';

//rtsp://mpv.cdn3.bigCDN.com:554/bigCDN/mp4:bigbuckbunnyiphone_400.mp4

class Videos extends Component{
	constructor(props){
		super(props);
    let {camera} = props.cameras;
    this.state={
      camera:camera
    }
	}
  onValueChange = (key:string, value:string) => {
        const newState = {};
        newState[key] = value;
        this.setState(newState);
  }
	render(){
    const { navigate } = this.props.navigation;
    let {cameras}= this.props.cameras;
		return(
			<View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
        {cameras &&
         <View style={[styles.fullWidth,{backgroundColor:'#e0e0e0',marginBottom:20}]}>
          <Picker
            selectedValue={this.state.camera}
            onValueChange={this.onValueChange.bind(this, 'camera')}>
            {cameras.map((item, index)=>{
              return (<Picker.Item label={(item.username !="")?item.username:"Test"} value={item.id} key={item.id}/>)
            })}
          </Picker>
        </View>
        }
          <View style={styles.sepratingContainer}>
					    	<TouchableOpacity onPress={()=>this.props.addCamera()}
							   style={[styles.socialButton,{backgroundColor:'#375f9d',marginRight:10}]}>
						      <Text style={[styles.btnText,{color:'#fff'}]}>Add Camera</Text>
						    </TouchableOpacity>
						    <TouchableOpacity onPress={()=>this.props.playVideo()}
							   style={[styles.socialButton, {backgroundColor:'#d9372c',marginLeft:10}]}>
						      <Text style={[styles.btnText,{color:'#fff'}]}>Play Streaming</Text>
						    </TouchableOpacity>
					</View>
			</View>
		);
	}
}
Videos.navigationOptions = {
  tabBarLabel: 'Videos',
};


const mapDispatchToProps = (dispatch) => {
   return {
   	openDrawer:() => dispatch(NavigationActions.navigate({ routeName: 'Drawer' })),
    addCamera:() => dispatch(NavigationActions.navigate({ routeName: 'AddCamera' })),
    playVideo:() => dispatch(NavigationActions.navigate({ routeName: 'VideoPlayer' }))
   }
};

const mapStateToProps = (state) => {
   return {
       cameras: state.cameras
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(Videos);

//export default Chats;