import React from 'react';
import {
    StyleSheet, 
    View,
    Image, 
    Text, 
    TextInput,
    TouchableHighlight, 
    TouchableOpacity, 
    Dimensions,
    Platform,
} from 'react-native';

import styles from 'src/common/styles';
import api from 'src/common/api';

const {height, width} = Dimensions.get('window');

const Header =(props)=>{
	let {title, isBackButton,rightIcon,renderRightIcon} =props;
    return (
         <View style={styles.headerContainer}>
             <View style={styles.sideContainer}>
             	{(isBackButton && 
             	<TouchableOpacity onPress={()=>api.navigator.pop()}>
			      <Image
			        style={styles.headerIcon}
			        source={require('src/Images/back-arrow.png')}
			      />
			    </TouchableOpacity>)}
             </View>
             <View style={styles.middleContainer}>
                <TextInput
                            style={styles.formInput}
                            placeholder ="serch by name"
                            placeholderTextColor ="#333"
                            underlineColorAndroid ='transparent'
                            onChangeText={(text) => {}}/>
             	<Text style={[styles.boldText,{paddingLeft:20}]}>{title}</Text>
             </View>
             <View style={styles.sideContainer}>
             	{renderRightIcon()}
             </View>
        </View>
    );
}
Header.propTypes={
    title:React.PropTypes.string.isRequired,
    rightIcon:React.PropTypes.string,
    isBackButton:React.PropTypes.bool,
    renderRightIcon:React.PropTypes.func
};
Header.defaultProps = {
  title: '',
  isBackButton:true,
  renderRightIcon:()=>{}
};

module.exports = Header;