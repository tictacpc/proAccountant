
import React, { Component } from 'react';
import { Platform, ListView, StyleSheet, StatusBar, Text, TouchableHighlight, View, Dimensions, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// note PropTypes with version react > 15.5
//https://reactjs.org/blog/2017/04/07/react-v15.5.0.html

const Util = {
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
}

export default class ClockTimer extends Component {

    constructor() {
        super();
        this.state = {
            totalTime: "00:00.00",
            sectionTime: "00:00.00",
            stopWatch: false,
            resetWatch: true,

            initialTime: 0,
            currentTime: 0,
            timeAccumulation: 0,
            recordTime: 0,

            recordCounter: 0,
            record: [
                { title: "", time: "" },
                { title: "", time: "" },
                { title: "", time: "" },
                { title: "", time: "" },
                { title: "", time: "" },
                { title: "", time: "" },
                { title: "", time: "" }
            ],
        };
        // this.state = this.resetData();
    }

    startWatch() {
        if (this.state.resetWatch) {
            this.setState({
                stopWatch: false,
                resetWatch: false,
                timeAccumulation: 0,
                initialTime: (new Date()).getTime()
            })
        } else {
            this.setState({
                stopWatch: false,
                initialTime: (new Date()).getTime()
            })
        }

        let countingTime;
        let minute, second, milSecond;
        let seccountingTime, secminute, secsecond, secmilSecond;
        let interval = setInterval(() => {
            this.setState({
                currentTime: (new Date()).getTime()
            });

            countingTime = this.state.timeAccumulation + this.state.currentTime - this.state.initialTime;
            minute = Math.floor(countingTime / (60 * 1000));
            second = Math.floor((countingTime - 6000 * minute) / 1000);
            milSecond = Math.floor((countingTime % 1000) / 10);

            seccountingTime = countingTime - this.state.recordTime;
            secminute = Math.floor(seccountingTime / (60 * 1000));
            secsecond = Math.floor((seccountingTime - 6000 * secminute) / 1000);
            secmilSecond = Math.floor((seccountingTime % 1000) / 10);

            this.setState({
                // totalTime: (new Date()).toLocaleTimeString()
                totalTime: this.getTotalTime(minute, second, milSecond),
                sectionTime: this.getTotalTime(secminute, secsecond, secmilSecond)
            });

            if (this.state.stopWatch) {
                this.setState({
                    timeAccumumlation: countingTime
                });
                clearInterval(interval);
            }

        }, 10);
    }

    getTotalTime(minute, second, milSecond) {
        return this.convertTime(minute) + ":" + this.convertTime(second) + "." + this.convertTime(milSecond);
    }

    convertTime(number) {
        return (number < 10 ? "0" + number : number);
    }

    stopWatch() {
        this.setState({
            stopWatch: true
        })
    }

    //reset data
    clearRecord() {
        this.setState({
            stopWatch: false,
            resetWatch: true,
            intialTime: 0,
            currentTime: 0,
            recordTime: 0,
            timeAccumulation: 0,
            totalTime: "00:00.00",
            sectionTime: "00:00.00",
            recordCounter: 0,
            record: [
                { title: "", time: "" },
                { title: "", time: "" },
                { title: "", time: "" },
                { title: "", time: "" },
                { title: "", time: "" },
                { title: "", time: "" },
                { title: "", time: "" }
            ],
        });
    }

    resetData(){
        return {
            totalTime: "00:00.00",
            sectionTime: "00:00.00",
            stopWatch: false,
            resetWatch: true,

            initialTime: 0,
            currentTime: 0,
            timeAccumulation: 0,
            recordTime: 0,

            recordCounter: 0,
            record: [
                { title: "", time: "" },
                { title: "", time: "" },
                { title: "", time: "" },
                { title: "", time: "" },
                { title: "", time: "" },
                { title: "", time: "" },
                { title: "", time: "" }
            ],
        };
    }

    componentWillUnmount() {
        this.stopWatch();
        this.clearRecord();
    }

    addRecord(){
        let {recordCounter, record} = this.state;
        recordCounter++;
        if(recordCounter < 8){
            record.pop(); //remove last item
        }
        //add new item in first array [unshift]
        record.unshift({title: "Record " + recordCounter, time: this.state.sectionTime});
        this.setState({
            recordTime: this.state.timeAccumulation + this.state.currentTime - this.state.initialTime,
            recordCounter: recordCounter,
            record: record
        })

    }

    render() {
        return (
            <View style={styles.watchContainer} >
                <WatchFace
                    sectionTime={this.state.sectionTime}
                    totalTime={this.state.totalTime}
                ></WatchFace>

                <WatchControl
                    stopWatch={() => this.stopWatch()}
                    clearRecord={() => this.clearRecord()}
                    startWatch={() => this.startWatch()}
                    addRecord={() => this.addRecord()}
                >
                </WatchControl>

                {/* <WatchRecord record={this.state.record}></WatchRecord> */}

            </View>
        );
    }
}

class WatchFace extends Component {
    static propTypes = {
        sectionTime: PropTypes.string.isRequired,
        totalTime: PropTypes.string.isRequired
    };

    render() {
        return (
            <View style={styles.watchFaceContainer} >
                <Text style={styles.sectionTime} >{this.props.sectionTime}</Text>
                <Text style={styles.totalTime} >{this.props.totalTime}</Text>
            </View>
        );
    }
}

class WatchControl extends Component {

    static propTypes = {
        stopWatch: PropTypes.func.isRequired,
        clearRecord: PropTypes.func.isRequired,
        startWatch: PropTypes.func.isRequired,
        addRecord: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            watchOn: false,
            startBtnText: "Start",
            startBtnColor: "#60B644",
            stopBtnText: "Reset",
            underlayColor: "#fff",
        }
    }

    startWatchView() {
        if (!this.state.watchOn) {
            this.props.startWatch()
            this.setState({
                startBtnText: "Pause",
                startBtnColor: "#ff0044",
                stopBtnText: "Record",
                underlayColor: "#eee",
                watchOn: true
            })
        } else {
            this.props.stopWatch()
            this.setState({
                startBtnText: "Start",
                startBtnColor: "#60B644",
                stopBtnText: "Reset",
                underlayColor: "#eee",
                watchOn: false
            })
        }
    }

    addRecordView() {
        if (this.state.watchOn) {
            this.props.addRecord();
        } else {
            this.props.clearRecord();
            this.setState({
                stopBtnText: "Reset"
            });
        }
    }

    render() {
        return (
            <View style={styles.watchControlContainer}>
                <View style={{ flex: 1, alignItems: "flex-start" }}>
                    <TouchableOpacity
                        style={styles.btnStop}
                        underlayColor={this.state.underlayColor}
                        onPress={() => this.addRecordView()}
                    >

                        <Text style={styles.btnStopText}>{this.state.stopBtnText}</Text>

                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <TouchableOpacity style={styles.btnStart}
                        underlayColor="#eee"
                        onPress={() => this.startWatchView()}
                    >

                        <Text
                            style={[styles.btnStartText, { color: this.state.startBtnColor }]}>

                            {this.state.startBtnText}
                        </Text>

                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class WatchRecord extends Component {
    static propTypes = {
        record: PropTypes.array.isRequired
    };

    render() {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            theDataSource = ds.cloneWithRows(this.props.record);
        return (<ListView
            style={styles.recordList}
            dataSource={theDataSource}
            renderRow={(rowData) =>
                <View style={styles.recordItem}>
                    <Text style={styles.recordItemTitle}>{rowData.title}</Text>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.recordItemTime}>{rowData.time}</Text>
                    </View>
                </View>} />);
    }
}

const styles = StyleSheet.create({
    watchContainer: {
        backgroundColor: "#ffffff",
        alignItems: "center"
    },
    watchFaceContainer: {
        width: Util.size.width,
        paddingTop: 20, paddingLeft: 30, paddingRight: 30, paddingBottom: 20,
        backgroundColor: "#fff",
        borderBottomWidth: 1, borderBottomColor: "#ddd",
        // height: Util.size.height,
    },
    sectionTime: {
        fontSize: 20,
        fontWeight: "100",
        // paddingRight: 30,
        color: "#555",
        position: "absolute",
        // left: Util.size.width - 120,
        right: 40,
        top: 100,
        alignItems: "flex-end"
    },
    totalTime: {
        // fontSize: Util.size.width === 375 ? 70 : 60,
        fontSize: 70,
        fontWeight: "100",
        color: "#222",
        paddingLeft: 20
    },
    watchControlContainer: {
        width: Util.size.width,
        height: 120,
        flexDirection: "row",
        backgroundColor: '#c0c0c0',
        marginTop: 10,
        paddingTop: 30, paddingLeft: 60, paddingRight: 60, paddingBottom: 0,
    },
    btnStart: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    btnStop: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    btnStartText: {
        fontSize: 14,
        backgroundColor: "transparent"
    },
    btnStopText: {
        fontSize: 14,
        backgroundColor: "transparent",
        color: "#555"
    },

    //record
    recordList:{
        width: Util.size.width,
        height: Util.size.height - 300,
        paddingLeft: 15,
      },
      recordItem:{
        height: 40,
        borderBottomWidth:Util.pixel,borderBottomColor:"#bbb",
        paddingTop: 5, paddingLeft: 10, paddingRight:10, paddingBottom:5,
        flexDirection:"row",
        alignItems:"center"
      },
      recordItemTitle:{
        backgroundColor:"transparent",
        flex:1,
        textAlign:"left",
        paddingLeft:20,
        color:"#777"
      },
      recordItemTime:{
        backgroundColor:"transparent",
        flex:1,
        textAlign:"right",
        paddingRight:20,
        color:"#222"
      },
});