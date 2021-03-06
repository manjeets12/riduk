'use strict';

import React, {Component} from 'react';
import { View, BackAndroid, StatusBar,Dimensions} from 'react-native';
import {
  NavigationActions,
  addNavigationHelpers,
  StackNavigator,
  DrawerNavigator
} from 'react-navigation';
import { connect} from 'react-redux';

const { width, height } = Dimensions.get('window');
var api=require('src/common/api');                 //for setting navigator
import styles from 'src/common/styles';
//import Drawer from 'react-native-drawer';

/*Containers*/
import LandingScreen from 'src/screens/landingScreen';
import Login from 'src/screens/login'
import SignUp from 'src/screens/signUp'
import ForgotPassword from 'src/screens/forgotPassword'

//after login scenes
//import {Musejam} from 'src/screens/musejam';
import Cubical from 'src/screens/cubical';
import Projects from 'src/screens/musejam/projects';
import Project from 'src/screens/musejam/details'
import Dashboard from 'src/screens/dashboard'
import UserProfile from 'src/screens/userProfile'
import DrawerContent from 'src/screens/drawer'
import AddCamera from 'src/screens/settings/addCamera'
import VideoPlayer from 'src/screens/VideoPlayer';

/*const StacksOverTabs = StackNavigator({
  Dashboard:{screen:Dashboard},
  AddCamera:{screen:AddCamera},
}, {
  headerMode: 'none',
});*/
const routesConfig = {
  Landing:{screen:LandingScreen},
  Login: { screen: Login },
  SignUp: { screen: SignUp },
  ForgotPassword: { screen: ForgotPassword },
  Dashboard:{screen:Dashboard},
  Projects:{screen:Projects},
  Project:{screen:Project},
  UserProfile:{screen:UserProfile},
  Cubical:{screen:Cubical},
  AddCamera:{screen:AddCamera},
  VideoPlayer:{screen:VideoPlayer}
};

export const AppBeforeLogin = StackNavigator(routesConfig);

export const AppNavStack = StackNavigator({...routesConfig},{initialRouteName:'Dashboard'});

const mainDrawerRoutes ={
    Dashboard:{screen:AppNavStack},
    Cubical:{screen:Cubical},
    Projects:{screen:Projects},
    Project:{screen:Project},
    UserProfile:{screen:UserProfile},
    AddCamera:{screen:AddCamera}
}


export const AppNavigator = DrawerNavigator({...mainDrawerRoutes}, {
  drawerWidth: 0.8*width,
  contentComponent:({navigation})=> <DrawerContent navigation={navigation} routes={mainDrawerRoutes} />,
});



//export const AppNavigator = StackNavigator(routesConfig);


export const UnAuthorizedApp =()=>{
  return(
      <View style={styles.container}>
            {(api.isAndroid()) &&
              <StatusBar
                  backgroundColor="#C2185B"
                  barStyle="light-content"
              />
            }
            <AppBeforeLogin/>
          </View>
  );
};



class AppWithNavigationState extends Component{
  constructor(props) {
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
  }
  
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  //added to handle back button functionality on android
  handleBackButton() {
    const {nav, dispatch} = this.props;

    if (nav && nav.routes && nav.routes.length > 1) {
      dispatch(NavigationActions.back());
      return true;
    }
    return false;
  }

  render() {
    let {dispatch, nav} = this.props;

    return (
          <View style={styles.container}>
            {(api.isAndroid()) &&
              <StatusBar
                  backgroundColor="#C2185B"
                  barStyle="light-content"
              />
            }
            <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })}/>
          </View>
    );
  }
};

/*const mapStateToProps = (state) => {
   return {
       nav: state.nav,
       authenticated:state.user.authenticated
   };
};*/
export default connect(state =>({nav: state.nav}))(AppWithNavigationState);
//module.exports = AppWithNavigationState;
