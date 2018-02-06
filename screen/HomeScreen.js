

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Button, Image
} from 'react-native';

export default class HomeScreen extends Component {
    static navigationOptions = {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
        //   source={require('./chats-icon.png')}
        //   style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };
  
    render() {
      return (
        <Button
          onPress={() => this.props.navigation.navigate('Detail')}
          title="Go to Detail"
        />
      );
    }
  }
  