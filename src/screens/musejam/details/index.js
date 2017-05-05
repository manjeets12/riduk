'use strict'

import React, {Component} from 'react';
import {Alert,View, Text, Button,Image,TouchableOpacity} from 'react-native';
import {connect } from 'react-redux';

import styles from 'src/common/styles';

import {MORE_ICON} from 'src/common/constants';
const renderRight=(state) =>{
        return(
          <TouchableOpacity onPress={()=>{}}>
          <Image
            style={styles.headerIcon}
            source={MORE_ICON}
          />
        </TouchableOpacity>
      );
}


class ProjectDetails extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    console.log(this.props);
    const { navigate } = this.props.navigation;
      
    return(
      <View style={[styles.container,{alignItems:'center', backgroundColor:'#f2eae7'}]}>
         <Text>ProjectDetails</Text>
      </View>
    );
  }
}

ProjectDetails.navigationOptions = {
    title: 'Projects',
    headerStyle: {backgroundColor:'#E91E63'},
    headerTintColor: '#FFF',
    headerTitleStyle: { color: '#FFF'}
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
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);

//export default Feeds;