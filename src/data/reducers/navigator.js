'use strict'

import {AppNavigator} from 'src/containers/AppNavigator';
import { NavigationActions} from 'react-navigation';

import {
  REGISTER_USER, 
  LOGIN, 
  AUTHENTICATING,
  AUTHENTICATED,
  AUTH_SUCCESS,
  AUTH_ERROR, 
  SAVE_USER,
  LOGGED_OUT
} from 'src/common/constants'

const initialState = {
  index: 0,
  routes: [
    { key: 'Drawer', routeName: 'Drawer' },
  ],
};

function nav(state = initialState, action){
  let {data, type} = action;
  return AppNavigator.router.getStateForAction(action, state) || state;
  /*switch(type){
    case AUTHENTICATED:
    return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'UserProfile' }));
    case LOGGED_OUT:
    return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }));
    default:
    return AppNavigator.router.getStateForAction(action, state) || state;
  }*/
}
export default nav;
