'use strict'

import React, {Component} from 'react';
import {Alert,View, ListView, Text, Button, TouchableOpacity, Image, Platform, ScrollView,Dimensions} from 'react-native';
import {connect } from 'react-redux';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';

import imagePro from 'src/common/imagePro';

import styles from 'src/common/styles';
import {CAMERA_ICON_BLACK,DEFAULT_AVATAR} from 'src/common/constants';
import {startPredictor, startPredictorFromUrl} from 'src/actions/imgPro';
import {RenderLoader} from 'src/common/components/RenderLoader';


const { width, height } = Dimensions.get('window');
const CANCEL_INDEX = 0;
const ImagePickerButtons =['Cancel','Camera','Gallery'];
const imageOptions = {
      width: 300,
      height: 300,
      cropping: false,
      includeBase64:true
};

const renderItem =function(item){
     return (
            <TouchableOpacity key ={item.id}
              underlayColor='#E0E0E0'
              onPress ={()=>{}} >
               <View style ={styles.customRow} >
                     <View style ={{flex:1, alignItems:'flex-start',justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold',textAlign:'center',color:'#333'}}>{item.name}</Text>
                     </View>
                     <View style ={{flex:1, alignItems:'flex-end',justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold', textAlign:'center', color:'#333'}}>{item.value}</Text>
                     </View>
                </View>
            </TouchableOpacity>
          );
}

const renderPredictions =function(concepts){
  let elements = concepts.map((item, index) =>{
          return renderItem(item);
  });
  return (
        <ScrollView style={[styles.fullWidth,{marginBottom:30}]} showsVerticalScrollIndicator={false}>
         {elements}
        </ScrollView>
  );
}

const renderPredictionHeader = function(){
  return (
    <View style ={[styles.customRow,{borderBottomWidth:1,borderBottomColor:'#f2eae7'}]}>
           <View style ={{flex:1, alignItems:'flex-start',justifyContent:'center'}}>
              <Text style={{}}>PREDICTED CONCEPT</Text>
           </View>
           <View style ={{flex:1, alignItems:'flex-end',justifyContent:'center'}}>
              <Text style={{}}>PROBABILITY</Text>
           </View>
    </View>
  );
}
let imageRow = (item, index) => <Image style={{width:100, height:100, resizeMode:'contain'}} source={{uri:item.localUrl}} key ={index}/>;
class Tasks extends Component{
	constructor(props){
		super(props);
    this.state ={
      image_uri:null,
      image_data:null,
    }
    this.showPickerOptions = this.showPickerOptions.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
    this.handleImagePicker = this.handleImagePicker.bind(this);
    this.predictImage = this.predictImage.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.renderCameraButton = this.renderCameraButton.bind(this);
    this.updateFocusedImage = this.updateFocusedImage.bind(this);
	}


  renderCameraButton(){
    return(
         <TouchableOpacity
                    onPress={this.showPickerOptions}
                    elevation={10}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        justifyContent:'center',
                        alignItems:'center',
                        shadowColor:'#000',
                        shadowOffset:{width: 0, height: 5},
                        shadowOpacity:.4,
                        shadowRadius: 4,
                        elevation:10,
                    }}
                    >
                    <Image 
                       style={{height:30,
                       width:30,
                       resizeMode:'contain'}}
                       source={CAMERA_ICON_BLACK}/>
            </TouchableOpacity>
    );
  }
  renderFocusedImage(){
    let {image_data, image_uri} = this.state;
    let {localUrl} = this.props.modal;
    let image_url = image_uri ||localUrl;
    let source = (image_url)?{uri:image_url}:DEFAULT_AVATAR
      return(
        <View style={{backgroundColor:'rgba(233, 30, 178, 0.1)'}}>
            <Image style={{width:width, height:0.3*height, resizeMode:'contain'}} source={source}>
                {this.renderImages()}
                {this.renderCameraButton()}
            </Image>
        </View>
      );
  }
  renderImages(){
    let {images} = this.props.modal;
    if(images && images.length !=0){
      return(
        <ScrollView
                    contentContainerStyle ={{position:'absolute',bottom:0, backgroundColor:'rgba(233, 30, 178, 0.1)', alignItems:'center', justifyContent:'center'}} 
                    horizontal={true} >
                    {images.map((item, index) =>{
                       return (
                          <TouchableOpacity key ={index}  
                            onPress={()=>this.updateFocusedImage(item)}
                            underlayColor='#E0E0E0'
                            >
                            <Image style={{width:50, height:50, resizeMode:'cover', borderRadius:25, marginRight:5}} source={{uri:item.localUrl}}/>
                          </TouchableOpacity>
                        );
                    })}
        </ScrollView>
      );
    }
    return null;
  }
  updateFocusedImage(item){
     this.setState({
        image_uri:item.localUrl,
     });
    this.props.startPredictorFromUrl(item);
  }
 
  showPickerOptions() {
        this.ImagePicker.show();
         /*ImagePicker.openPicker(imageOptions).then(image => {
            console.log(image);
            this.uploadPicture(image);
          });*/  
  }
  handleImagePicker(index){
       switch(index){
          case 1:
           ImagePicker.openCamera(imageOptions).then(image => {
            console.log(image);
            this.uploadPicture(image);
          });
          
          break;
          case 2:
          ImagePicker.openPicker(imageOptions).then(image => {
            console.log(image);
            this.uploadPicture(image);
          });         
          break;
          default:
          break;
        }
  }

  uploadPicture(response){
     if (response.didCancel) {
              console.log('User cancelled image picker');
        }else if (response.error) {
               if(response.error==="Camera permissions not granted"){
                Alert.alert(
                    'Riduk',
                    'Please grant permissions to access the Camera',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]
                 );
              }
              console.log('ImagePicker Error: ', response.error);
        }else{
              let source;
              if (Platform.OS === 'ios') {
                source = {uri: response.path.replace('file://', ''), data:response.data, isStatic: true};
              }else {
                source = {uri: response.path, data:response.data, isStatic: true};
              }
              this.setState({
                  image_uri:source.uri,
                  image_data:source.data
              });
              let imageData={base64: source.data, localUrl:source.uri};
              this.props.startPredictor(imageData);
              //this.predictImage(imageData);
        }
    }
  predictImage(data){
    imagePro.models.predict(Clarifai.GENERAL_MODEL, data)
    .then((response) =>{
      console.log(response);
      alert(response)
    })
    .catch((error)=>{
      console.log(error);
      alert(error);
    });
  }
	
	render(){
    	//const { navigate } = this.props.navigation;
      let {isFetching, isSuccess, isFailed, error, concepts, url, images} = this.props.modal;
		return(
			<View style={[styles.container,{flex: 1, alignItems:'center', backgroundColor:'#f2eae7'}]}>
          {this.renderFocusedImage()}
          <View>
              
             {isFetching && <RenderLoader/>}
             {isSuccess && renderPredictionHeader()}
             {concepts && (concepts.length !=0) && renderPredictions(concepts)}
          </View>
          <ActionSheet 
              ref={(o) => this.ImagePicker = o}
              options={ImagePickerButtons}
              cancelButtonIndex={CANCEL_INDEX}
              onPress={this.handleImagePicker}
          />
			</View>
		);
	}
}

Tasks.navigationOptions = {
  tabBarLabel: 'XPrep',
};

const mapDispatchToProps = (dispatch) => {
   return {
    startPredictor:(data) =>dispatch(startPredictor(data)),
    startPredictorFromUrl:(data) =>dispatch(startPredictorFromUrl(data))
   }
};

const mapStateToProps = (state) => {
   return {
       modal: state.imgModal,
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);

//export default UserProfile;