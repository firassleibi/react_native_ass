import React,{Component} from 'react';
import {Text,StyleSheet,View} from 'react-native';

export default class AboutScreen extends Component{
  static navigationOptions = {
    title: 'About Us',
  };
  render(){
    const navigate = this.props.navigation;
    return(
      <View style={styles.mainView}>
        <Text style={styles.head}>Lorem Ipsum</Text>
        <Text style={styles.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

      </View>
    )

  }
}

const styles =  StyleSheet.create({
  head:{
    fontSize: 19,
    color: '#ae34b5',
    fontWeight: 'bold'
  },
  text:{
    fontSize: 16
  },
  mainView: {
    padding: 10,
    flex: 1
  }
})
