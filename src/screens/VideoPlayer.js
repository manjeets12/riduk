'use strict'

import React, { Component } from 'react';
import {
    View,
} from 'react-native';

import VideoPlayer from 'react-native-video-controls';

export default class Player extends Component {

    constructor( props ) {
        super( props );
    }
    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
                 <VideoPlayer
                    source={{ uri: params.url }}
                    onBack={ () =>this.props.navigation.goBack() }  
                    videoStyle={{minHeight:200}}
                />
        );
    }
}


Player.navigationOptions = {
    //title: 'Projects',
    header:null
};

