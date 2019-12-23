import React, { Component } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import CustomButton from '../components/CustomButton'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Homepage',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.mainView}>
        <CustomButton
          style={{backgroundColor:'#202646'}}
          text="View Books"
          onPress={() => navigate('Books')}
        />
        <CustomButton
          style={{backgroundColor:'#202646'}}
          text="About Us"
          onPress={() => navigate('About')}
        />
        <CustomButton
          style={{backgroundColor:'#202646'}}
          text="Terms & Conditions"
          onPress={() => Linking.openURL('https://ofour.com/terms-of-service/').catch((err) => console.error('An error occurred', err))}
        />
        <CustomButton
          style={{backgroundColor:'#202646'}}
          text="Privacy Policy"
          onPress={() => Linking.openURL('https://ofour.com/terms-of-service/').catch((err) => console.error('An error occurred', err))}
        />
        <CustomButton
          style={{backgroundColor:'#202646'}}
          text="Settings"
          onPress={() => navigate('Settings')}
        />
      </View>
    );
  }
}

const styles =  StyleSheet.create({
  mainView: {
    padding: 20,
    flex: 1
  },
})



export default HomeScreen;
