import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class TodayWeather extends Component {
  render() {
    let {temp_c, wx_desc} = this.props.today;
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20,fontWeight: 'bold'}}>Today Weather</Text>
        <Text>{temp_c}°</Text>
        <Text>{wx_desc}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('TodayWeather', () => TodayWeather);
