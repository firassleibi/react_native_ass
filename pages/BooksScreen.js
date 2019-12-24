import React, { Component } from 'react';
import { View,FlatList,StyleSheet,Text,ActivityIndicator,Image, Dimensions, Alert, TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';
import { addBooks,clearBooks,setBooks } from '../actions';
import { connect } from 'react-redux';



class BooksScreen extends React.Component {
  static navigationOptions = {
    title: 'Books',
  };
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      filterValue: ''
    };
    this.ids = [];
    this.showLoader = true;
    this.props.clearBooks();
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
          }, function(){

          });
          this.props.addBooks(responseJson);



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
        }, function(){

        });
        this.props.addBooks(responseJson);

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  filter(text){

    if(text.length>0){
      if(this.state.saved_data == null){
        this.state.saved_data = this.props.books;
      }
      this.state.isLoading = true;
      this.state.filterValue = text;
      const newData = this.state.saved_data.filter(item => {
        const itemData = `${item.title.toUpperCase()} ${item.author.toUpperCase()}`;
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      this.props.setBooks(newData);
    }
    else{
      this.state.isLoading = false;
      this.props.setBooks(this.state.saved_data );
      this.state.saved_data = null;
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
          <FlatList style={styles.listStyle} ListFooterComponent={()=>this.listFooter()} ItemSeparatorComponent={this.FlatListItemSeparator}  onEndReachedThreshold={0.01}   onEndReached={()=>this.loadMore()} data={this.props.books} extraData={this.props.books} renderItem={({item,index})=> <Item date={item.year} navigate={navigate} image={item.coverurl} id={item.md5} title={item.title} author={item.author} />}  keyExtractor={(item,index) => index.toString()}
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


const mapStateToProps = state => {
  return {
    books: state.app.books
  };
};

const mapDispatchToProps = {
  addBooks,clearBooks,setBooks
};

export default connect(mapStateToProps,mapDispatchToProps)(BooksScreen);
