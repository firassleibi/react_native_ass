import React,{Component} from 'react';
import {Text,StyleSheet,View,Button} from 'react-native';

export default class AboutScreen extends Component{
  static navigationOptions = {
    title: 'Settings',
  };
  render(){
    const navigate = this.props.navigation;
    return(
      <View style={styles.mainView}>
        <Text style={styles.head}>Lorem Ipsum</Text>
        <Text style={styles.text}>Some Settings</Text>
        <Button onPress={()=>navigate.goBack()} style={{marginTop: 20}} title={'Save Settings'}/>

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
