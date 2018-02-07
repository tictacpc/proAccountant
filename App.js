/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { StackNavigator, DrawerNavigator } from 'react-navigation';
import HomeScreen from './screen/HomeScreen';
import DetailScreen from './screen/DetailScreen';
import SlideMenuScreen from './screen/SlideMenuScreen';

const StackNavigatorApp = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Detail: {
    screen: DetailScreen,
  },
});

const DrawerMenuNavigator = DrawerNavigator({
  MainScreen: {
    screen: StackNavigatorApp,
  },
}, {
    contentComponent: props => <SlideMenuScreen {...props} />
  });

export default DrawerMenuNavigator;