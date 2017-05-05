'use strict'

import React, {Component} from 'react';
import {Alert,View, Text, Button} from 'react-native';
import {connect } from 'react-redux';

import styles from 'src/common/styles';


class Maps extends Component{
	constructor(props){
		super(props);
	}
	
	render(){
    	const { navigate } = this.props.navigation;
    	
		return(
			<View style={[styles.container,{alignItems:'center', backgroundColor:'#f2eae7'}]}>
			   <Text>Feeds</Text>
			</View>
		);
	}
}

Maps.navigationOptions = {
  tabBarLabel: 'Maps',
};

const mapDispatchToProps = (dispatch) => {
   return {
   	logout: () => dispatch(logout()),
   	startUpload:(data) =>dispatch(startUpload(data)),
   	openDrawer:() => dispatch(NavigationActions.navigate({ routeName: 'Drawer' }))
   }
};

const mapStateToProps = (state) => {
   return {
       user: state.user,
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(Maps);

//export default UserProfile;