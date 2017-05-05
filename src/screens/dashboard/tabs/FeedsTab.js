'use strict'

import React, {Component} from 'react';
import {Alert,View, Text, Button} from 'react-native';
import {connect } from 'react-redux';

import styles from 'src/common/styles';


class Feeds extends Component{
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

Feeds.navigationOptions = {
  tabBarLabel: 'Feeds',
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
export default connect(mapStateToProps, mapDispatchToProps)(Feeds);

//export default Feeds;