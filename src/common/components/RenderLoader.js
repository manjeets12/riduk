'use strict';

import React from 'react';
import {
	View,
    ActivityIndicator,
} from 'react-native';

//const {height, width} = Dimensions.get('window');

import styles from 'src/common/styles';

export const RenderLoader =(props) =>{
	return(
			<ActivityIndicator
		        animating={true}
		        style={[styles.centering, {height: 80}]}
		        size="large"
		     />
		);
};

RenderLoader.propTypes={
    loaderStyle:View.propTypes.style,
};
RenderLoader.defaultProps = {
  loaderStyle:{},
};


