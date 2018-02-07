

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Button, Image
} from 'react-native';

import ClockTimer from './learn/1_ClockTimer';

export default class HomeScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    drawerLabel: 'Home',
    title:'Home',
    // headerLeft: <Button title="Info" onPress={() => { navigation.navigate('DrawerOpen')} } />
  });

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ClockTimer></ClockTimer>

        {/* <Button
          onPress={() => this.props.navigation.navigate('Detail')}
          title="Go to Detail"
        /> */}
      </View>
    );
  }
}
