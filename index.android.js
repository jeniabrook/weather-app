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

  /*
   * This function is for getting the weather by geolocation of GPS chip.
   * First it will take the current position, then we will pass that position to 
   * our API that based on Promise, when that promise fullfiled, we will set the state of our app.
  */
  getWeatherByLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latitude = parseFloat(position.coords.latitude);
        let longitude = parseFloat(position.coords.longitude);
        api.getAllWeather({lat:latitude,lng:longitude})
        .then((data)=>{
          this.setState({
            isLoading: false,
            currentWeather: data.currentWeather,
            forecastWeather: data.forecastWeather
          })
        })
        /**
         * If we have an error from network, will trigger back the spinner, show message,
         * and then after 1 minute it will try to refetech the data.
         * We can also add here a button to force trigger fatch data again.
         */
        .catch((error)=>{ 
          this.setState({
            isLoading: true
          });
          alert(error)
        });
      },
      /**
       * Here We will catch if there problem with GPS, and that mandatory for our app.
       */
      (error) => alert(error.message)
    ); 
  }

  /**
   * For the first time that the app mounts we will fetch the data
   * Then set Timer to fetch it every min and save ref to that timer.
   */
  componentDidMount() {
    this.getWeatherByLocation();
    this.timer = setInterval(()=>{this.getWeatherByLocation()}, 60000);
  }

  /**
   * After app unmounts we will clear the timer that we set.
   */
  componentWillUnmount() {
    clearInterval(this.timer);
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
