import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';

import HomeScreen from '../pages/HomeScreen';
import EmploymentsScreen from '../pages/EmploymentsScreen';
import EditScreen from '../pages/EditScreen';


export const AppNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Employments: {screen: EmploymentsScreen},
  Edit: {screen: EditScreen},
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

const AppWithNavigationState = ({ dispatch, nav }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState)
