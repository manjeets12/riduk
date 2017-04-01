'use strict'
import {Platform, TouchableOpacity, Image} from 'react-native';
import React, {Component} from 'react';
import { NavigationActions, TabNavigator} from 'react-navigation';
import {connect } from 'react-redux';

import Chats from './tabs/ChatsTab';
import Feeds from './tabs/FeedsTab';
import Maps from './tabs/MapsTab';
import Tasks from './tabs/TaskTab';
import styles from 'src/common/styles';

import {DEFAULT_AVATAR,MORE_ICON} from 'src/common/constants';


const renderRight=(state) =>{
        return(
          <TouchableOpacity onPress={()=>state.params.openDrawer()}>
          <Image
            style={styles.headerIcon}
            source={DEFAULT_AVATAR}
          />
        </TouchableOpacity>
      );
}

const DashboardTabs = TabNavigator({
  Tasks:{screen:Tasks},
  Feeds: { screen: Feeds },
  Maps:{screen:Maps},
  Chats: { screen: Chats },
}, 
{
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#FFFF00' : '#FFFF00',
    labelStyle: {
      fontSize: 14,
      fontWeight:'500'
    },
    style: {
      backgroundColor: '#E91E63',
    },
    indicatorStyle :{
      backgroundColor:'#FFFF00',
      height:3,
    },
    headerMode: 'screen',
    navigationOptions: {
        title: 'Dashboard'
    }
  }
});
//export default Dashboard;

//



class Dashboard extends Component{
	constructor(props){
		super(props);
    this.openDrawer = this.openDrawer.bind(this);
	}
  componentDidMount() {
      this.props.navigation.setParams({ openDrawer: this.openDrawer });
  }

  openDrawer(){
    //this.props.openDrawer();
  }
	
	render(){
    	const { navigate } = this.props.navigation;
    	
		return(
			<DashboardTabs/ >
		);
	}
}

Dashboard.navigationOptions = {
    title: 'Dashboard',
    header:({ state}) => ({
      //right: renderRight(state),
      style: {backgroundColor:'#E91E63', elevation:0},
      tintColor: '#FFF',
      titleStyle: {
        color: '#FFF'
      },
      //visible:false,
    })
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


