import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

export default class ForecastWeather extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      forecastDataSource: ds.cloneWithRows(props.forecast)
    }
  }

  renderRow = (forecastDay) => {
    let {date, temp_max_c, temp_min_c, Timeframes} = forecastDay;
    let {wx_desc} = Timeframes[0];
    return(
      <View style={styles.row}>
        <Text style={styles.text}>{date}</Text>
        <Text style={styles.descText}>{wx_desc}</Text>
        <Text style={styles.textMinTemp}>{temp_min_c}</Text>
        <Text style={styles.textMaxTemp}>{temp_max_c}</Text>   
      </View>
    );
  }

  render() {
    return (
      <View style={styles.forecastContainer}>
        <ListView
          dataSource={this.state.forecastDataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  forecastContainer: {
    flex: 4
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  
    padding: 10,
    backgroundColor: '#BBDEFB',
    marginBottom: 8
  },
  text: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  descText: {
    width: 135
  },
  textMaxTemp: {
    paddingLeft: 10,
    paddingRight: 10,
    color: 'red'
  },
  textMinTemp: {
    paddingLeft: 10,
    paddingRight: 10,
    color: 'blue'
      }
});

AppRegistry.registerComponent('ForecastWeather', () => ForecastWeather);
