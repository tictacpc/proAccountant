

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, Button, Image, FlatList, TouchableOpacity
} from 'react-native';

class ListItem extends Component {
    onPress = () => {
        this.props.onPressItem(this.props.key);
    };

    render() {
        console.log(this.props.image);
        return (
            <TouchableOpacity onPress={this.onPress}>

                <View style={styles.itemView}>
                    <Image style={{ height: 25, width: 25 }}
                        source={this.props.image} />
                    <Text style={{ fontSize: 18, color: 'white', paddingLeft: 10, alignItems: 'center', }}>
                        {this.props.id}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

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

    onPressItem = (key) => {
        this.props.navigation.navigate('Detail');
    }

    renderItem = ({ item }) => (
        <ListItem
            id={item.key}
            onPressItem={this.onPressItem}
            image={item.image}
        />
    );

    render() {
        //console.log(this.props);

        return (
            <View style={styles.container} >
                <View style={styles.accountContainer}>
                    <Image style={styles.avatarImg}
                        source={require('./img/avatar.png')} />
                    <View style={styles.accountName}>
                        <Text style={styles.textAc}>Lena W. Lowery</Text>
                        <Text style={styles.textAc}>(EMP001)</Text>
                    </View>

                </View>

                <FlatList
                    style={{ flex: 4,}}
                    data={dataItem}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const dataItem = [
    {
        key: 'My Profile',
        image: require('./img/login.png')
    },
    {
        key: 'Notifications',
        image: require('./img/notification.png')
    },
    {
        key: 'Settings',
        image: require('./img/settings.png')
    },
    {
        key: 'About Us',
        image: require('./img/about.png')
    },
    {
        key: 'Rate Our App',
        image: require('./img/star.png')
    },
    {
        key: 'Refer a Friend',
        image: require('./img/refer_a_friend.png')
    },
    {
        key: 'Log out',
        image: require('./img/log_out.png')
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#3c3c47',
    },
    accountContainer: {
        justifyContent: 'center',
        padding: 10,
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    textAc: {
        color: 'white', fontSize: 14, paddingTop: 5, alignItems: 'center', paddingLeft:5
    },
    accountName: {
        flexDirection: 'column',
        
    },
    avatarImg: {
        width: 65,
        height: 65
    },
    itemView: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
    },
});