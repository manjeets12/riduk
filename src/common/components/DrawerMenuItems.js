// JavaScript Document
'use strict'
  var React= require('react');
  var ReactNative = require('react-native');
  var {
   ListView,View,ScrollView,
   Text,TouchableOpacity,Image,Dimensions
  }= ReactNative;
  const { width, height } = Dimensions.get('window');

  import styles from '../styles'
  import {LOGO,CALL_ICON, HEART_ICON, HEART_ICON_RED, ENVELOPE_ICON,DEFAULT_AVATAR} from 'src/common/constants';

  class DrawerMenuItems extends React.Component{
    constructor(props) {
     super(props);
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
       this.state = {
         menuItems:ds.cloneWithRows([
           'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
          ])
       };
       this.openLinks = this.openLinks.bind(this);
       this.sendPage = this.sendPage.bind(this);
    }
    componentWillReceiveProps(nextProps) {
    }
    onLoggedOutPressed(){
     
    }
    openLinks(key){
      this.props.closeDrawer();
      let link;
      switch(key){
        case "rateUs": 
              //link = RATE_US_LINK; break;
        case "ourPartners":
              //link = OUR_PARTNERS_LINK; break;
        case "aboutUs":
              //link = ABOUT_US_LINK; break;
        case "FAQ":
              //link = FAQ_LINK ;break;
        default:break;
      }
      //api.openURL(link);
    }
    onPressProfile(){
      this.props.closeDrawer();
      const route = {
            type: 'authenticate',
            route: {
                key: 'profile',
                title: 'Update Profile'
            }
        };
        this.props._handleNavigate(route);
    }
    onPressSettings() {
        const route = {
            type: 'authenticate',
            route: {
                key: 'settings',
                title: 'Settings'
            }
        };
        this.props._handleNavigate(route);
    }
    sendPage(page, title, type) {
        this.props.closeDrawer();
        const route = {
            type: type,
            route: {
                key: page,
                title: title
            }
        };
        this.props._handleNavigate(route);
    }


    
    render(){
        let name ="";
        name += (this.props && this.props.user && this.props.user.firstName)?this.props.user.firstName:"";
        name += (this.props && this.props.user && this.props.user.lastName)?this.props.user.lastName:"";
     return (
        <View style={{flex:1,backgroundColor:'#F8BBD0',borderColor:'#DDD',shadowColor:'#000',
                shadowOffset:{width: 3, height: 3},
                shadowOpacity: 0.1,
                shadowRadius: 1.5,
                elevation:  1}}>
                <View style={{margin:0}}>
                     <TouchableOpacity
                        style={{backgroundColor: '#C2185B'}}
                        underlayColor='#E0E0E0'
                        onPress={this.onPressProfile.bind(this)}>
                         <View style={{flexDirection:'column', marginTop:30,alignItems:'center',marginBottom:10,}}>
                               <Image
                                style={styles.logoSmall}
                                source={LOGO}
                              />
                               <Text style={{fontSize:16, color:'#333',fontWeight:'600',marginTop:5}}>{name}</Text>
                               <Text style={{fontSize:15, color:'#333',fontWeight:'400'}}>{(this.props && this.props.user && this.props.user.email)?this.props.user.email:''}</Text>
                           </View>
                      </TouchableOpacity>
                      <View style={{height:1, backgroundColor:'#C2185B',marginTop:0}}></View>
                    <ScrollView>
                     
                    </ScrollView>
                </View>   
        </View>
      );
     }
}


module.exports =  DrawerMenuItems;