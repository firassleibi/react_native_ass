import React, { Component } from 'react';
import { View,FlatList,StyleSheet,Text,ActivityIndicator,Image, Dimensions, Alert, TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';



export default class BooksScreen extends React.Component {
  static navigationOptions = {
    title: 'Books',
  };
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      dataSource: [],
      filterValue: ''
    };
    this.ids = [];
    this.arrayholder = [];
    this.showLoader = true;
  }

  loadMore(){
    if(!this.state.isLoading){
      this.state.isLoading = true;
      var lastId = this.ids.pop();
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

          this.arrayholder  = this.state.dataSource.concat(responseJson);

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
        this.arrayholder  = responseJson;

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  filter(text){
    this.state.filterValue = text;
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title.toUpperCase()} ${item.author.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
    });
    //Stop Infinit Loading
    if(text.length>0){
      this.state.isLoading = true;
    }
    else{
      this.state.isLoading = false;
    }
  }
  listFooter(){
    if(this.state.filterValue == '')
      return <ActivityIndicator size="large" color="#0000ff"/>
    else {
      return null;
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
          <View style={{flex:1}}>
          <TextInput
            lightTheme
            round
            onChangeText={text => this.filter(text)}
            autoCorrect={false}
            style={styles.filter}
            onFocus={() => this.showLoader = false}
            onBlur={() => this.showLoader = true}
            placeholder="Filter"/>
          <FlatList style={styles.listStyle} ListFooterComponent={()=>this.listFooter()} ItemSeparatorComponent={this.FlatListItemSeparator}  onEndReachedThreshold={0.01}   onEndReached={()=>this.loadMore()} data={this.state.dataSource} extraData={this.state.dataSource} renderItem={({item,index})=> <Item date={item.year} navigate={navigate} image={item.coverurl} id={item.md5} title={item.title} author={item.author} />}  keyExtractor={(item,index) => index.toString()}
          />
          </View>

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
  listStyle:{
    flex: 1
  },
  filter:{
    padding: 8,
    borderColor: '#d61bae',
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    fontSize: 18

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
