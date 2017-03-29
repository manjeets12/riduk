'use strict';

import React,{Component} from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image
} from 'react-native';
import {
  DrawerNavigator,
} from 'react-navigation';

import {connect } from 'react-redux';

import Dashboard from '../dashboard';
import UserProfile from '../userProfile'

import {CALL_ICON, HEART_ICON, HEART_ICON_RED, ENVELOPE_ICON,DEFAULT_AVATAR,MORE_ICON} from 'src/common/constants';



const DrawerConstructor = DrawerNavigator({
  Dashboard:{
    path:'/',
    screen:Dashboard,
  },
  UserProfile:{
    path:'/',
    screen:UserProfile,
  },
}, {
  initialRouteName: 'Dashboard',
  contentOptions: {
    activeTintColor: '#e91e63',
  },
  headerMode: 'screen',
});

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

class Drawer extends Component{
  constructor(props){
    super(props);
  }
 
  render(){
      const { navigate } = this.props.navigation;
      
    return(
      <DrawerConstructor/ >
    );
  }
}
Drawer.navigationOptions = {
    title: 'Dashboard',
};
const mapDispatchToProps = (dispatch) => {
   return {
    //openDrawer:() => dispatch(NavigationActions.navigate({ routeName: 'Drawer' }))
   }
};

const mapStateToProps = (state) => {
   return {
       user: state.user,
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);

//export default Drawer;