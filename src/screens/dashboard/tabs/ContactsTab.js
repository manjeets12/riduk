'use strict'

import React, {Component} from 'react';
import {Alert,View, Text, Button,TouchableOpacity,FlatList } from 'react-native';
import {connect } from 'react-redux';

import styles from 'src/common/styles';


class Contacts extends Component{
	constructor(props){
		super(props);
	}
  renderItem({item, index}){
      let {givenName, familyName, middleName, phoneNumbers, emailAddresses} = item;
      let name = (givenName || "")+(middleName || "")+(familyName + "");
      let mail = emailAddresses[0];
      let phone = phoneNumbers[0];

      return(
        <TouchableOpacity onPress={() => {}} key ={index} style={styles.cardRow}>
          <View>
          {name && 
              <Text>{name}</Text>
          }
          {phone && 
              <Text>{phone.number}</Text>
          }
          {mail && 
              <Text>{mail.email}</Text>
          }
          </View>
        </TouchableOpacity>
        
      );
  }

  
	
	render(){
    	const { navigate } = this.props.navigation;
      let {contacts} = this.props;
    	
		return(
			<View style={[styles.container,{alignItems:'center', backgroundColor:'#f2eae7'}]}>
			  {contacts && (contacts.length !=0) && 
          <FlatList
             style={[styles.width100]}
             data={contacts}
             renderItem={this.renderItem.bind(this)}
             ItemSeparatorComponent={(index) => <View key={index} style={styles.separator}
             keyExtractor={(item, index)=>index} />}
             legacyImplementation={false}
             initialNumToRender={15}
           />
          }
			</View>
		);
	}
}
Contacts.navigationOptions = {
  tabBar: {
    label: 'Contacts',
  },
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
       contacts:state.contacts.contacts
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);

//export default Chats;