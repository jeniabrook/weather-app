import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class TodayWeather extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is Today Weather Component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#90CAF9',
  }
});

AppRegistry.registerComponent('TodayWeather', () => TodayWeather);
