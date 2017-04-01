'use strict';

import React,{Component} from 'react';
import {
  View,
  TouchableOpacity,
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

import {UserAvatar} from 'src/common/components/UserAvatar';
import {CALL_ICON, HEART_ICON, HEART_ICON_RED, ENVELOPE_ICON,DEFAULT_AVATAR,MORE_ICON, AVATAR,BACKGROUND_IMG} from 'src/common/constants';

class LeftDrawer extends Component{
  constructor(props) {
    super(props)
  }
  render(){
    let {routes,navigation, user} = this.props;
    let {displayName, email,photoURL} = user;
    return  (
      <Image source={BACKGROUND_IMG}
      style={styles.container}>
              <View style={{justifyContent: 'center',alignItems: 'center',backgroundColor:'#C2185B',}}>
                <UserAvatar photoURL={photoURL}/>
                <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold', paddingTop: 10 }}>{displayName}</Text>
                <Text style={{ color: '#ffffff', fontSize: 11, paddingTop: 10, paddingBottom: 20 }}>Since March 2017</Text>
              </View>
              <View>
              {
                  Object.keys(routes).map((item,index)=>{
                    return ((index === 0 || item ==="Dashboard")?null:
                      (<TouchableOpacity 
                        key={index} style={{marginBottom:0.5}} 
                           onPress={()=>{navigation.navigate(item)}}>
                              <View style={{flexDirection:'row', padding: 15, paddingLeft:0, backgroundColor:'#fff0', borderTopWidth:0.5, borderColor:'rgba(255,255,255, 0.5)', marginLeft: 20, marginRight:20}}>
                               <Text style={{fontSize:16, fontWeight: 'bold',color:'#fff'}}>{item}</Text>
                              </View>
                        </TouchableOpacity>)
                    );
                  })
              }
              </View>
          </Image>)
  }
}

/*Drawer.navigationOptions = {

  contentOptions: {
    activeBackgroundColor: '#ff5976',
    style: {
      backgroundColor: '#000000',
      zIndex: 100,
      paddingTop: 0
    }
  },
  header: ({ state, setParams, navigate, dispatch })  => ({
    visible: true,
    tintColor: '#ffffff',
    title: "LokaLocal",
    style: {
      backgroundColor: '#ff5976'
    },
    right: (
        <TouchableOpacity
          onPress={() => navigate('DrawerOpen')}
        >
          <Icon name="search" size={16} style={{ padding: 10, paddingRight: 20 }} color="#ffffff" />
        </TouchableOpacity>
      ),
    left: (
        <TouchableOpacity
          onPress={}
        >
          <Icon name="bars" size={16} style={{ padding: 10, paddingLeft: 20 }} color="#ffffff" />
        </TouchableOpacity>
      ),
  })
}*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'#FFDDCC',
    borderWidth:0,
  },
  icon: {
    width: 24,
    height: 24,
  },
  image: {
    height: 110,
    borderRadius: 55,
    width: 110,
    borderWidth: 3,
    borderColor: '#ffffff',
    marginTop: 30,
  }
});



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

export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer);

//export default Drawer;