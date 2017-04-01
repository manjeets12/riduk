import React, {Component} from 'react';
import {Modal, StyleSheet, Image, Text, TouchableHighlight, TouchableOpacity, View,ActivityIndicator,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

import {LOGO} from 'src/common/constants';
import {connect } from 'react-redux';

var loaderInterval;
class LoadingOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: props.modalVisible,
            animating:props.modalVisible,
        };
    }


    shouldComponentUpdate(nextProps, nextState){
        return (this.props.modalVisible != nextProps.modalVisible);
     }
    componentDidMount(){
	 loaderInterval= setTimeout(() => {
	      this.setModalVisible(false);
	   }, 5000);
	}
	componentWillUnmount(){
	    clearTimeout(loaderInterval);
	}

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
	    let {modalVisible} = this.props;
        return (
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {}}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.centering}>
                             {/*<Image source={LOGO} style={{margin:10}}/>*/}
                            <ActivityIndicator
						        animating={true}
						        style={[styles.loader]}
						        size="large"
						        color="white"
						      />
						     <Text style={{color:'#fff', fontWeight:'900'}}>Connecting to Riduk ...</Text>
                        </View>
                    </View>
                </Modal>
        );
    }

}


var styles = StyleSheet.create({
    
    modalContainer: {
        flex:1,
        width,
        height,
        justifyContent:'center',
        alignItems:'center', 
        backgroundColor:'#000000',
        opacity:0.7
    },
    centering:{
    	flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    loader: {
	    alignItems: 'center',
	    justifyContent: 'center',
	    margin:10,
	    transform: [{scale:1.5}]
	},
   
});
//module.exports = LoadingOverlay;

const mapDispatchToProps = (dispatch) => {
   return {
    
   }
};

const mapStateToProps = (state) => {
   return {
       user: state.user,
   };
};
export default LoadingOverlay;

