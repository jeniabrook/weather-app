import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import TodayWeather from './app/components/TodayWeather';
import * as api from './app/utils/api';

export default class weatherApp extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: {}
    }
  }

  componentDidMount() {
    api.getAllWeather({lat:31.0461,lng:34.8516})
      .then((data)=>{
        this.setState({
          isLoading: false,
          data: data
        })
      });
  }

  render() {
    if (this.state.isLoading) {
      return(
        <View style={styles.containerCenter}>
          <ActivityIndicator/>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TodayWeather/>
        <Text>{JSON.stringify(this.state.data)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#90CAF9',
  },
  containerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#90CAF9',
  }
});

AppRegistry.registerComponent('weatherApp', () => weatherApp);
