import React, { Component } from 'react';
import { View,FlatList,StyleSheet,Text,ActivityIndicator,Image, Dimensions, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';



export default class BooksScreen extends React.Component {
  static navigationOptions = {
    title: 'Books',
  };
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
    };
    this.ids = [];
  }

  loadMore(){
    if(!this.state.isLoading){
      this.state.isLoading = true;
      lastId = this.ids.pop();
      this.ids = [];
      for(var i=lastId;i<lastId+50;i++){
        this.ids.push(i);
      }
      return fetch('http://gen.lib.rus.ec/json.php?ids='+this.ids.join(',')+'&fields=Title,Author,MD5,coverurl,year')
        .then((response) => response.json())
        .then((responseJson) => {

          this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.concat(responseJson),
          }, function(){

          });

        })
        .catch((error) =>{
          console.error(error);
        });
    }



  }

  componentDidMount(){
    //Set Ids to fetch
    for(var i=0;i<50;i++){
      this.ids.push(i);
    }
    return fetch('http://gen.lib.rus.ec/json.php?ids='+this.ids.join(',')+'&fields=Title,Author,MD5,coverurl,year')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  render() {
    const {navigate} = this.props.navigation;
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
          <FlatList ListFooterComponent={<ActivityIndicator size="large" color="#0000ff"/>} ItemSeparatorComponent={this.FlatListItemSeparator}  onEndReachedThreshold={0.01}   onEndReached={()=>this.loadMore()} data={this.state.dataSource} extraData={this.state.dataSource} renderItem={({item,index})=> <Item date={item.year} navigate={navigate} image={item.coverurl} id={item.md5} title={item.title} author={item.author} />}  keyExtractor={(item,index) => index.toString()}
          />

    );
  }
}

function Item({title,index,author,id,navigate,image,date}){
  return (
    <View style={styles.item}>
      <View style={styles.dataGroup, styles.noMargin}>
        <Text style={styles.itemName}>Title:</Text>
        <Text>{title}</Text>
      </View>
      <View style={styles.dataGroup}>
        <Text style={styles.itemName}>Author:</Text>
        <Text>{author}</Text>
      </View>
      <CustomButton onPress={()=>navigate('Details',{item:{title:title,image:image,author:author,date:date}})} style={{backgroundColor:'#202646',marginTop: 10}} text="View Details"/>

    </View>
  );
}
const styles =  StyleSheet.create({

  mainView: {
    padding: 0,
    flex: 1
  },
  item: {
    padding: 15,
    margin: 10,
    borderRadius: 3,

    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,



  },
  itemName: {
    color: '#ae34b5',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataGroup:{
    marginTop: 10
  },
  noMargin:{
    margin: 0
  }
})
