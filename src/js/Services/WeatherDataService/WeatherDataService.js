import IWeatherDataService from './IWeatherDataService';
import { fetchCurrentData, fetchForecastData } from '../../api';

class WeatherDataService extends IWeatherDataService {
  constructor() {
    super();

    this.dataCurrent = null;
    this.dataForecast = null;
  }

  load(cityName = '') {
    if (cityName) {
      Promise.all([
        fetchCurrentData(cityName),
        fetchForecastData(cityName)
      ]).then(data => {
        if (data && data[0].cod == 200) {
          [this.dataCurrent, this.dataForecast] = data;
        } else {
          [this.dataCurrent, this.dataForecast] = [null, null];
        }

        this.dataLoaded();
      });
    }
  }

  dataLoaded() {
    if (this.cbCurrent) {
      this.cbCurrent(this.getCurrentWeather());
    }

    if (this.cbForecast) {
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
    this.cbCurrent = cb;
  }

  subscribeForForecastWeather(cb) {
    this.cbForecast = cb;
  }
}

export const weatherDataService = new WeatherDataService();
