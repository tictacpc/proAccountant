

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, Button, Image
} from 'react-native';

export default class SlideMenuScreen extends Component {
    // static navigationOptions = {
    //     drawerLabel: 'Home',
    //     drawerIcon: ({ tintColor }) => (
    //         <Image
    //         //   source={require('./chats-icon.png')}
    //         //   style={[styles.icon, {tintColor: tintColor}]}
    //         />
    //     ),
    // };

    render() {
        //console.log(this.props);
        return (
            <View style={styles.container} ></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3c3c47'
    },
});