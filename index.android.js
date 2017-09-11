import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import TodayWeather from './app/components/TodayWeather';
import ForecastWeather from './app/components/ForecastWeather';
import * as api from './app/utils/api';

export default class weatherApp extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      currentWeather: {},
      forecastWeather: {},
      position: ''
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => alert(error.message)
    );
    api.getAllWeather({lat:51.50,lng:-0.12})
      .then((data)=>{
        this.setState({
          isLoading: false,
          currentWeather: data.currentWeather,
          forecastWeather: data.forecastWeather
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
        <Text>{this.state.position}</Text>
        <TodayWeather today={this.state.currentWeather}/>
        <ForecastWeather forecast={this.state.forecastWeather}/>
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
