import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';

// Creates a stack navigator for the HomeScreen
const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

// These are the navigation options for the homeStack, including label and icon with Icon properties
// When the icon is in focus it has the activeTintColor, when it is out of focus it adds the outline class to think icon
// then it also shifts to the inactiveTintColor
HomeStack.navigationOptions = {
  tabBarLabel: 'New Books',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-book${focused ? '' : '-outline'}`
          : 'md-book'
      }
    />
  ),
  tabBarOptions: {
    activeTintColor: '#E07D7D',
    inactiveTintColor: '#EEB8B8'
  }
};

// Creates a stack navigator for the LinksScreens
const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

// These are the navigation options for the linksStack, including label and icon with Icon properties
// When the icon is in focus it has the activeTintColor, when it is out of focus it adds the outline class to think icon
// then it also shifts to the inactiveTintColor
LinksStack.navigationOptions = {
  tabBarLabel: 'Book Shelf',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? `ios-bookmark${focused ? '' : '-outline'}`
        : 'md-bookmark'}
    />
  ),
  tabBarOptions: {
    activeTintColor: '#E07D7D',
    inactiveTintColor: '#EEB8B8'
  }
};
// exports the navigation stacks, using the createBottomTabNavigator, so they can be used as the main app container
export default createBottomTabNavigator({
  HomeStack,
  LinksStack
});
