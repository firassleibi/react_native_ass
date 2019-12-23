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



const App = createAppContainer(MainNavigator);



export default App;
