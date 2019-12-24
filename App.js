import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button, ActivityIndicator } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import HomeScreen from './pages/HomeScreen';
import BooksScreen from './pages/BooksScreen';
import DetailsScreen from './pages/DetailsScreen';
import AboutScreen from './pages/AboutScreen';
import SettingsScreen from './pages/SettingsScreen';
import { Provider } from 'react-redux';
import Store from './store'



const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Books: {screen: BooksScreen},
  Details: {screen: DetailsScreen},
  About: {screen: AboutScreen},
  Settings: {screen: SettingsScreen},
},
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#d61bae',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);



const AppContainer = createAppContainer(MainNavigator);



export default (props) => {
  return (
    <View style={styles.flex}>
      <Provider store={Store}>
        <AppContainer screenProps={props} />
      </Provider>
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor:'red'
  }
})
