

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
    title:'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
      
      />
    ),
  };

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
      </View>
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