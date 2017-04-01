'use strict';
import {StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

const styles=StyleSheet.create({

	container: {
		flex: 1,
	},
	centering:{
		justifyContent:'center',
		alignItems:'center'
	},
    centeredRow:{
        flex:1, 
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center'
    },
    header:{
        backgroundColor:'#E91E63',
    },
    headerContainer:{
        flexDirection:'row',  
        height:50, 
        backgroundColor:'#E91E63',
        alignItems:'center', 
        paddingLeft:10,
        paddingRight:10,
        elevation:10,
        shadowOffset:{width: 0, height: 5},
        shadowOpacity:.4,
        shadowRadius: 4,
    },
    middleContainer:{
        flex:8,
        justifyContent:'center',
    },
    sideContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    boldText:{
        fontWeight: 'bold', 
        fontSize:20,
        color:'#fbfbfd'
    },
    normalText:{
        justifyContent:'center',
        alignItems:'center', 
        fontSize:16
    },
    headerIcon:{
        height:20,
        width:20,
        resizeMode:'contain'
    },
	floatingButton:{
        position: 'absolute',
        bottom: 20,
        right: 30,
        height:50,
        width:50,
        borderRadius:25,
        backgroundColor:'#3f51b5', 
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{width: 0, height: 5},
        shadowOpacity:.4,
        shadowRadius: 4,
        elevation:10,
    },
    fabText:{
    	fontSize:35, 
    	color:'white', 
    	textAlign:'center'
    },
    listAvatar:{
    	width:40, 
    	height:40, 
    	resizeMode:'cover', 
    	borderRadius:20
    },
    profileImageContainer:{
    	height:140,
        width:140,
        borderRadius:70,
        backgroundColor:'#e0e0e0', 
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{width: 0, height: 5},
        shadowOpacity:.4,
        shadowRadius: 4,
        elevation:10,
    },
    profileImage:{
    	height:140,
        width:140,
        borderRadius:70,
    	resizeMode:'cover', 
    },
    saveButton:{
        backgroundColor:'#009688', 
        width:80,
        height:30, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:2
    },
    saveButtonText:{
        color:'#fff', 
        fontWeight:'bold' 
    },
    contactsRow:{
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center', 
        paddingLeft:10, 
        paddingRight:10, 
        paddingTop:10, 
        paddingBottom:10,
    },
    logoConatiner:{
        justifyContent:'center', 
        alignItems:'center', 
        marginTop:0.1*height,
        marginBottom:0.1*height,
        padding:10
    },
    logoSmall:{
        height:80,
        width:80,
        borderRadius:40,
        resizeMode:'cover', 
    },
    fullWidthBtn:{
        width:width-40,
        padding:10, 
        borderRadius:30,
        margin:10, 
        justifyContent:'center', 
        alignItems:'center', 
        borderWidth:1, 
        borderColor:'#fff'
    },
    btnText:{
        color:'#fff', 
        fontSize:16, 
        fontWeight:'bold'
    },
    formInput:{
        height: 40, 
        width:width-40,
        borderBottomColor:'#e4497e', 
        borderBottomWidth:2, 
        backgroundColor:'transparent', 
        marginTop:5, 
        marginBottom:5
    },
    textButton:{
        width:width-40,
        alignItems:'flex-end', 
        justifyContent:'flex-end'
    },
    lightDarkText:{
        textAlign:'center', 
        color:'#bab6b5', 
        fontWeight:'bold'
    },
    socialButton:{
        flex:1,
        justifyContent:'center',
        alignItems:'center', 
        padding:10, 
        borderRadius:30
    },
    sepratingContainer:{
        width:width-40, 
        flexDirection:'row', 
        marginTop:10, 
        justifyContent:'center', 
        alignItems:'center'
    },
    userAvatar: {
        height: 110,
        borderRadius: 55,
        width: 110,
        borderWidth: 3,
        borderColor: '#ffffff',
        marginTop: 30,
    },
    fullWidth:{
        width:width-40,
    },
    customRow:{
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center', 
        borderBottomWidth:1, 
        borderBottomColor:'#e0e0e0', 
        paddingTop:10, 
        paddingBottom:10
    }
});

export default styles;