import IWeatherDataService from './IWeatherDataService';
import { fetchCurrentData, fetchForecastData } from '../../api';

class WeatherDataService extends IWeatherDataService {
  constructor() {
    super();

    this.dataCurrent = null;
    this.dataForecast = null;
  }

  load(cityName = '') {
    console.log('Load new data');

    if (cityName) {
      Promise.all([
        fetchCurrentData(cityName),
        fetchForecastData(cityName)
      ]).then(data => {
        console.log(data);
        [this.dataCurrent, this.dataForecast] = data;
        this.dataLoaded();
      });
    }
  }

  dataLoaded() {
    console.log('New data loaded');

    if (this.cbCurrent) {
      console.log('Call current cb');
      this.cbCurrent(this.getCurrentWeather());
    }

    if (this.cbForecast) {
      console.log('Call forecast cb');

      this.cbForecast(this.getWeatherForecast());
    }
  }

  getCurrentWeather() {
    return this.dataCurrent;
  }

  getWeatherForecast() {
    return this.dataForecast;
  }

  subscribeForCurrentWeather(cb) {
    console.log('Add Current cb');
    this.cbCurrent = cb;
  }

  subscribeForForecastWeather(cb) {
    console.log('Add Forecast cb');
    this.cbForecast = cb;
  }
}

export const weatherDataService = new WeatherDataService();
