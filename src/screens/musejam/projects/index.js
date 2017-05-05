'use strict'

import React, {Component} from 'react';
import {Alert,View, Text,TextInput, Button, TouchableOpacity, Image, ListView,ActivityIndicator} from 'react-native';
import {connect } from 'react-redux';
import {NavigationActions,} from 'react-navigation';
import ActionSheet from 'react-native-actionsheet';

import api from 'src/common/api'; 
import styles from 'src/common/styles';
import {MORE_ICON, FILTER_WHITE, SORT_WHITE, MENU,SEARCH} from 'src/common/constants';

import {RenderLoader} from 'src/common/components/RenderLoader';
import {fetchProjects,takeSet} from 'src/actions/musejam';
const buttons = ['Cancel', 'Change Password', 'Sign Out'];
const CANCEL_INDEX = 0;
const sortOptions =['Cancel','Sort by time','Sort amlphbatically'];
const filterOptions =['Cancel','Backers < 100000','Backers  100000 to 200000', 'Backers > 200000', 'Clear Filter'];
const renderRight=(state) =>{
      return(
        <View style={{flexDirection:'row', width:80}}>
          <TouchableOpacity onPress={()=>{}}>
            <Image
              style={styles.headerIcon}
              source={SORT_WHITE}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{}}>
            <Image
              style={styles.headerIcon}
              source={FILTER_WHITE}
            />
          </TouchableOpacity>
       </View>
      );
};

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!== r2});
var localProjects = null;
class Projects extends Component{
  constructor(props){
    super(props);
    this.state ={
      dataSource:ds,
      isProjects:false,
      loadingMore:false,
    }
    this.renderProjects = this.renderProjects.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.openProjectDetails = this.openProjectDetails.bind(this);
    this.show = this.show.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSorting = this.handleSorting.bind(this);
    this.sortByTime = this.sortByTime.bind(this);
    this.sortAlphabatically = this.sortAlphabatically.bind(this);
    this.filterByBackers = this.filterByBackers.bind(this);
    this.serachProject = this.serachProject.bind(this);
  }

  componentDidMount(){
    this.props.fetchProjects();
  }

  componentWillReceiveProps(nextProps) {
    let {projects,set}= nextProps.projects;
    let {projects: oldProjects, set:oldSet}= this.props.projects;
    localProjects = projects;
    if (set !== oldSet) {
      this.setState({
        dataSource: ds.cloneWithRows(set),
        isProjects:true,
        loadingMore:false
      });
    }
  }

  projectsScrolledToEnd(){
    if(this.state && this.state.dataSource && this.state.dataSource.getRowCount() >= 20){
       this.setState({
        loadingMore:true
       });
       this.props.takeSet();
    }
  }

  openProjectDetails(rowData){
       const { navigate } = this.props.navigation;
       navigate('Project', { project: rowData});
  }

  renderRow(rowData, sectionID, rowID) {
    let {
          blurb, 
          by, 
          country, 
          currency,
          location,
          state, 
          title, 
          type, 
          url
    } =rowData;
    let serialNo = rowData["s.no"],
        amtPledged = rowData["amt.pledged"],
        endTime = rowData["end.time"],
        percentageFunded = rowData["percentage.funded"],
        numbBackers = rowData["num.backers"];
        let daysStatus = api.getDaysDifference(endTime);
    return (
          <TouchableOpacity 
            onPress={()=> {this.openProjectDetails(rowData)}}
            underlayColor='#E0E0E0'
            style={styles.rowStyle}
            elevation={10}>
            <View>
               <Text style={{fontWeight:'bold', color:'#448AFF'}}>{title}</Text>
               <Text style={{}}>Pledge- ${amtPledged}</Text>
               <Text style={{}}>Backers- {numbBackers}</Text>
               <Text style={{}}>{daysStatus}</Text>

            </View>
         </TouchableOpacity>
    );
  }
  renderProjects(projects){
      return(
          <ListView
            style={[styles.width100,{paddingTop:15, marginBottom:20}]}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          /> 
      );
  }

  renderRightIcon(){
    return(
      <View style={{flexDirection:'row', width:60}}>
          <TouchableOpacity onPress={()=>{this.show("sort")}} style={{flex:1}}>
            <Image
              style={styles.headerIcon}
              source={SORT_WHITE}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.show("filter")}} style={{flex:1}}>
            <Image
              style={styles.headerIcon}
              source={FILTER_WHITE}
            />
          </TouchableOpacity>
       </View>
    );
  }
  show(type) {
    if(type ==="sort"){
      this.sortActionSheet.show();
    }else{
      this.filterActionSheet.show();
    }
        
  }
  handleSorting(index){
    switch(index){
        case 1:this.sortByTime();
        break;
        case 2:this.sortAlphabatically();
        break;
        default:
        break;
    }
  }

  sortByTime(){
    let ordered = null;
     if(localProjects){
      ordered = localProjects.sort((a, b)=>{
        let aEndTime = a["end.time"];
        let bEndTime = b["end.time"];
        let aTime = new Date(aEndTime);
        let bTime = new Date(bEndTime);
        if(aTime > bTime) return -1;
        if(aTime < bTime) return 1;
        return 0;
      });
    }
    if(ordered){
      this.setState({
        dataSource:ds.cloneWithRows(ordered),
        isProjects:true,
        loadingMore:false
      })
    }
  }
  sortAlphabatically(){
    let ordered =null;
    if(localProjects){
      ordered = localProjects.sort((a, b)=>{
        let aTitle = (a.title || "").toLowerCase();
        let bTitle = (b.title || "").toLowerCase();
        if(aTitle < bTitle) return -1;
        if(aTitle > bTitle) return 1;
        return 0;
      });
    }
    if(ordered){
      this.setState({
        dataSource:ds.cloneWithRows(ordered),
        isProjects:true,
        loadingMore:false
      })
    }
  }
  handleFilter(index){
    switch(index){
        case 1:this.filterByBackers(1);
        break;
        case 2:this.filterByBackers(2);
        break;
        case 3:this.filterByBackers(3);
        break;
        case 4:this.filterByBackers(4);
        break;
        default:
        break;
    }
  }
  
  filterByBackers(index){
    let filtered;
    if(localProjects){
      if(index === 4){
        filtered = localProjects;
      }else{
          filtered = localProjects.filter((obj, count) =>{
              let numbBackers = obj["num.backers"];
              switch(index){
                case 1: return (numbBackers < 100000);
                case 2: return (numbBackers >=100000 && numbBackers < 200000);
                case 3: return (numbBackers >= 200000);
                default:return true;
              }
          });
      }
      
    }
    if(filtered){
      this.setState({
        dataSource:ds.cloneWithRows(filtered),
        isProjects:true,
        loadingMore:false
      })
    }
  }

  serachProject(text){
    if(text && localProjects){
      let temp = text.toLowerCase();
      let seracheData = localProjects.filter((obj, index) =>{
          return (obj.title.toLowerCase().indexOf(temp) > -1);
      });
      this.setState({
        dataSource:ds.cloneWithRows(seracheData),
        isProjects:true,
        loadingMore:false
      });
    }
  }
  
  render(){
    const { navigate } = this.props.navigation;
    const {projects, isFetched, isFetching, error} = this.props.projects;

    return(
      <View style={[styles.container,{alignItems:'center', backgroundColor:'#f2eae7'}]}>
         <View style={styles.headerContainer}>
             <View style={styles.sideContainer}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('DrawerOpen')}>
                  <Image
                    style={styles.headerIcon}
                    source={MENU}
                  />
                </TouchableOpacity>
             </View>
             <View style={styles.middleContainer}>
                <Image
                  style={[styles.headerIcon,{position:'absolute', left:0, bottom:15}]}
                  source={SEARCH}
                />
                <TextInput style={{backgroundColor:'transparent',color:'#FFF', fontSize:16, paddingLeft:30}}
                    placeholder ="serch by name"
                    placeholderTextColor ="#FFF"
                    underlineColorAndroid ='transparent'
                    onChangeText={(text) => {this.serachProject(text)}}/>
              
             </View>
             <View style={styles.sideContainer}>
              {this.renderRightIcon()}
             </View>
        </View>
        {isFetching && <RenderLoader/>}
         {this.state.isProjects &&  
          <ListView
            style={[styles.width100,{paddingTop:15, marginBottom:20}]}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            onEndReached={this.projectsScrolledToEnd.bind(this)}
          /> }

          {(this.state.loadingMore)?(
          <View style={{height:60, paddingTop:10, paddingBottom:10}}>
             <View style={{flexDirection:'row',alignItems: 'center', justifyContent:'center'}}>
                <ActivityIndicator
                         animating={true}
                         style={{paddingLeft:10}}
                         size="small"
                     />
                 <Text style={{marginLeft:10}}>loading more.....</Text>
             </View>
           </View>):null}
          
          <ActionSheet 
              ref={(o) => this.sortActionSheet = o}
              options={sortOptions}
              cancelButtonIndex={CANCEL_INDEX}
              onPress={this.handleSorting.bind(this)}
          />
          <ActionSheet 
              ref={(o) => this.filterActionSheet = o}
              options={filterOptions}
              cancelButtonIndex={CANCEL_INDEX}
              onPress={this.handleFilter.bind(this)}
          />
      </View>
    );
  }
}

Projects.navigationOptions = {
    //title: 'Projects',
    header:null
};

const mapDispatchToProps = (dispatch) => {
   return {
    fetchProjects: () => dispatch(fetchProjects()),
    takeSet:()=>dispatch(takeSet())
   }
};

const mapStateToProps = (state) => {
   return {
       projects: state.musejam,
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(Projects);

//export default Feeds;