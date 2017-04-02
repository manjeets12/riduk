'use strict'
import {Platform, TouchableOpacity, Image} from 'react-native';
import React, {Component} from 'react';
import { NavigationActions, StackNavigator} from 'react-navigation';
import {connect } from 'react-redux';

import Projects from './projects';   //imported project listing  component
import ProjectDetails from './details' //imported single project detail page
import styles from 'src/common/styles';

import {DEFAULT_AVATAR,MORE_ICON} from 'src/common/constants';

export const Musejam = StackNavigator({
  Projects:{screen:Projects},
  Project: { screen: ProjectDetails },
});
//export default Musejam;


