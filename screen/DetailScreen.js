

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button, Image
} from 'react-native';

export default class DetailScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Detail',
    drawerIcon: ({ tintColor }) => (
      <Image
        // source={require('./notif-icon.png')}
        // style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  render() {
    return (
      <Button
        style={styles.button}
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}


const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: 'mediumseagreen',
    alignItems: 'center',
    justifyContent: 'center'
  },
});