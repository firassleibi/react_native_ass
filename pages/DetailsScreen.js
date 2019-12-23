import React,{Component} from 'react';
import {Text,StyleSheet, Image,View,ActivityIndicator} from 'react-native';
export default class DetailsScreen extends Component{
  static navigationOptions = {
    title: 'Book Details',
  };
  render(){
    const navigate = this.props.navigation;
    return(
      <View style={styles.item}>
        <Image
            PlaceholderContent={<ActivityIndicator />}
            style={styles.image}
            source={{uri:'http://gen.lib.rus.ec/covers/'+navigate.getParam('item', '').image}}/>
        <View style={styles.dataGroup, styles.noMargin}>
          <Text style={styles.itemName}>Title:</Text>
          <Text>{navigate.getParam('item', '').title}</Text>
        </View>
        <View style={styles.dataGroup}>
          <Text style={styles.itemName}>Author:</Text>
          <Text>{navigate.getParam('item', '').author}</Text>
        </View>
        <View style={styles.dataGroup}>
          <Text style={styles.itemName}>Date:</Text>
          <Text>{navigate.getParam('item', '').date}</Text>
        </View>

      </View>
    )

  }
}

const styles =  StyleSheet.create({

  image:{
    flex: 1,
    width: '100%',
    height: 200,
    resizeMode:  'cover',
    borderRadius: 5,
    marginBottom: 20
  },
  mainView: {
    padding: 10,
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
