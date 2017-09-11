import axios from 'axios'

const APP_ID = "c35da019";
const APP_KEY = "03315cebf399fb0ee4ada2eeba8c70ba";
/**
 * This method will return a promise with forecast weather
 * @param {*lat and lng to fetch the data} position 
 */
function getForecastWeather(position) {
  let {lat, lng} = position;
  return axios.get(`http://api.weatherunlocked.com/api/trigger/${lat},${lng}/forecast%20tomorrow%20temperature%20gt%2016%20include7dayforecast?app_id=${APP_ID}&app_key=${APP_KEY}`)
          .then((forcast) => {
            return forcast.data.ForecastWeather.Days;
          });
}

/**
 * This method will return a promise with current day weather
 * @param {*lat and lng to fetch the data} position 
 */
function getTodayWeather(position) {
  let {lat, lng} = position;
  return axios.get(`http://api.weatherunlocked.com/api/trigger/${lat},${lng}/current%20temperature%20gt%2016%20includecurrent?app_id=${APP_ID}&app_key=${APP_KEY}`)
          .then((today)=>{
            return today.data.CurrentWeather;
          });
}

/**
 * This methdo is the exported method, it takes 2 promises and bundle the fulfiled promise into 
 * an object that will be more convenient to work with.
 * @param {*lat and lng to fetch the data} position 
 */
function getAllWeather(position) {
  return axios.all([
    getTodayWeather(position),
    getForecastWeather(position)
  ]).then((data)=>{
    let currentWeather = data[0];
    let forecastWeather = data[1];
    return {
      currentWeather,
      forecastWeather
    }
  });
}

export {getAllWeather}