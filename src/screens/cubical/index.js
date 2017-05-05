'use strict'
import {Platform, TouchableOpacity, Image, View, Button,Text,TextInput,Alert} from 'react-native';
import React, {Component} from 'react';
import { NavigationActions, TabNavigator} from 'react-navigation';
import {connect } from 'react-redux';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import {DEFAULT_AVATAR,MORE_ICON, MENU, BASE_CUBICAL_URL,DELETE_ICON} from 'src/common/constants';
import styles from 'src/common/styles';
import Header from 'src/screens/Header';

import {fetchArtists,resetTracks} from 'src/actions/cubical';
import TabPage from './TabPage';


class Cubical extends Component{
	constructor(props){
		super(props);
    this.state ={
      isCard:false,
      isTabShown:false,
      name:"",
      tracks:0
    }
    this.renderLfetIcon = this.renderLfetIcon.bind(this);
    this.renderRightIcon = this.renderRightIcon.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.renderCustomCard = this.renderCustomCard.bind(this);
	}
  componentWillReceiveProps(nextProps) {
    let {tracks,resultCount}= nextProps.artists;
    let {tracks: oldTracks, resultCount:oldCount}= this.props.artists;
    if (tracks !== oldTracks) {
      this.setState({
        isTabShown:true
      });
    }
  }

  updateInputValue(key, value){
    this.setState({
      [key]:value
    });
  }
  startArtistSearch(){
     let {name, tracks} = this.state;
     let errorMsg =""
     if(name ==="" || tracks ===""){
        errorMsg ="Both field required";
     }else if(name.toLowerCase() !== "jack"){
        errorMsg ="Right now you can only search for jack";
     }else if(parseInt(tracks) !==4){
         errorMsg ="Right now you can only search for 4 tracks";
     }

    if(errorMsg !==""){
      Alert.alert(
                    'Error',
                    errorMsg,
                    [

                        {text: 'OK', onPress: () => {}},
                    ],
                    { cancelable: false }
                );
    }else{
      this.props.fetchArtists({name, tracks});
    }
  }

  renderLfetIcon(){
    const { navigate } = this.props.navigation;
    return(
      <TouchableOpacity onPress={()=>navigate('DrawerOpen')}>
        <Image
          style={styles.headerIcon}
          source={MENU}
        />
      </TouchableOpacity>
    )
  }
  renderRightIcon(){
    let {tracks,resultCount}= this.props.artists;
    if(tracks && tracks.length !=0){
        return(
            <TouchableOpacity onPress={()=>{
                  this.props.resetTracks();
                  this.setState({
                    isCard:false,
                    isTabShown:false,
                    name:"",
                    tracks:0
                  })
                }
              }>
              <Image
                style={styles.headerIcon}
                source={DELETE_ICON}
              />
            </TouchableOpacity>
          );
    }
    return null;
    
  }
  renderCustomCard(){
    return(
       <View style={styles.custtomCard}>
            <Text style={{fontWeight:'bold', fontSize:16, color:'#4b8df9'}}>Please fill the details</Text>
            <TextInput
            style={[styles.formInput,{marginBottom:20}]}
            placeholder ="Name"
            placeholderTextColor ="#333"
            underlineColorAndroid ='transparent'
            onChangeText={(text) => this.updateInputValue("name", text)}/>
            <TextInput
              style={[styles.formInput,{marginBottom:20}]}
              placeholder ="No of tracks"
              placeholderTextColor ="#333"
              underlineColorAndroid ='transparent'
              keyboardType={"numeric"}
              onChangeText={(text) => this.updateInputValue("tracks", text)}/>
            <Button
             onPress={this.startArtistSearch.bind(this)}
             title="Search"
             accessibilityLabel="Search for artists"
            />
        </View>
    )
  }
 

	render(){
    const { navigate } = this.props.navigation;
    let {tracks,resultCount}= this.props.artists;
    let {isCard, isTabShown} = this.state;
    	
		return(
			 <View style={[styles.container,{alignItems:'center', backgroundColor:'#f2eae7'}]}>
         <Header title="Cubical Dashboard" isBackButton={false} renderLfetIcon ={this.renderLfetIcon} renderRightIcon={this.renderRightIcon}/>
          {(isCard && tracks && tracks.length !==0)?(
                <ScrollableTabView
                  style={{backgroundColor:'#E91E63', elevation:10}}
                  tabBarTextStyle={{fontSize: 15, fontWeight:'bold',}}
                  initialPage={0}
                  renderTabBar={() => <ScrollableTabBar />}>
                 {
                    tracks.map((item, index)=>{
                        let artistName = item.artistName;
                        let url = BASE_CUBICAL_URL+"term="+artistName.replace(/\s/g,'')+"&limit=1";
                        return <TabPage tabLabel={artistName} url={url} data={item} key ={index}/>
                    })
                  }
                </ScrollableTabView>
            ):(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
               {(!isCard)?(
                     <Button
                       onPress={()=>{this.setState({isCard:true})}}
                       title="Search Artists"
                       accessibilityLabel="Search for artists"
                     />):(
                  this.renderCustomCard()
               )}
              </View>
          )}

      </View>
		);
	}
}
Cubical.navigationOptions = {
    header:null
};

const mapDispatchToProps = (dispatch) => {
   return {
   	 fetchArtists:(data)=>dispatch(fetchArtists(data)),
     resetTracks:()=>dispatch(resetTracks())
   }
};

const mapStateToProps = (state) => {
   return {
       artists: state.cubical,
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cubical);


