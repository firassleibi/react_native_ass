import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
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
          text="List Books"
          onPress={() => navigate('Books')}
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
