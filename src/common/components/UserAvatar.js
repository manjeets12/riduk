'use strict';

import React from 'react';
import {
    Image,
    Platform,
} from 'react-native';

//const {height, width} = Dimensions.get('window');

import styles from 'src/common/styles';
import {DEFAULT_AVATAR} from 'src/common/constants';




export const UserAvatar =(props)=>{
	let {photoURL} = props;
    if(photoURL){
        return <Image style={styles.userAvatar} source={{uri:photoURL}}/>;
    }else{
        return <Image style={styles.userAvatar} source={DEFAULT_AVATAR}/>;
    }
};
UserAvatar.propTypes={
    photoURL:React.PropTypes.string
};
UserAvatar.defaultProps = {
  photoURL: null,
};

//module.exports = UserAvatar;