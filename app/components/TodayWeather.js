import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class TodayWeather extends Component {
  render() {
    let img = this.props.today.wx_icon.replace('.gif','.png');
    return (
      <View style={styles.container}>
        <Image source={{uri: `../img/${img}`}} style={{width: 256, height: 256}}/>
        <Text>{img}</Text>
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
