'use strict'
import {Platform, TouchableOpacity, Image, View, Button,Text,TextInput,Alert} from 'react-native';
import React, {Component} from 'react';
import { NavigationActions, TabNavigator} from 'react-navigation';
import {connect } from 'react-redux';
var ScrollableTabView = require('react-native-scrollable-tab-view');

import {DEFAULT_AVATAR,MORE_ICON, MENU} from 'src/common/constants';
import styles from 'src/common/styles';
import {RenderLoader} from 'src/common/components/RenderLoader';


class TabPage extends Component{
	constructor(props){
		super(props);
    this.state ={
      results:null, 
      isLoading:false,
    }
    this.updateInputValue = this.updateInputValue.bind(this);
    this.renderCustomCard = this.renderCustomCard.bind(this);
    this.fetchArtistData = this.fetchArtistData.bind(this);
	}
  
  componentDidMount(){
    this.fetchArtistData();
  }

  fetchArtistData(){
    let {url} = this.props;
    console.log(url);
    this.setState({
      isLoading:true
    });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
            isLoading:false,
            results:data.results
        });
      })
      .catch((error) => {
        console.log(error);
      });

  }

  updateInputValue(key, value){
    this.setState({
      [key]:value
    });
  }
  

  
  renderCustomCard(result){
    let {artworkUrl30,artworkUrl60,artworkUrl100,artistName,trackName} = result;
    return(
       <View style={styles.custtomCard}>
          <Image style={{width:100, height:100, resizeMode:'contain', margin:20}} source={{uri:artworkUrl100}}/>
          <View style={{flexDirection:'row', marginTop:5, marginBottom:5, padding:10,alignItems:'center', justifyContent:'center'}}>
            <Text>Artist : </Text>
            <Text>{artistName}</Text>
          </View>
          <View style={{flexDirection:'row', marginTop:5, marginBottom:5, padding:10, alignItems:'center', justifyContent:'center'}}>
            <Text>Track : </Text>
            <Text>{trackName}</Text>
          </View>
       </View>
    );
  }
	render(){
    let {isLoading, results} = this.state;
		return(
			 <View style={[styles.container,{alignItems:'center', backgroundColor:'#f2eae7', justifyContent:'center'}]}>
          {isLoading && <RenderLoader/>}
          {results && (results.length !=0) && this.renderCustomCard(results[0])}
      </View>
		);
	}
}

export default TabPage;


