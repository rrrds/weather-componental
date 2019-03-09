import IWeatherDataService from './IWeatherDataService';
import { fetchCurrentData, fetchForecastData } from '../../api';

const API_UNITS_METRIC = 'metric';
const API_UNITS_IMPERIAL = 'imperial';

class WeatherDataService extends IWeatherDataService {
  constructor() {
    super();

    this.dataCurrent = null;
    this.dataForecast = null;
    this.selectedUnit = API_UNITS_METRIC;
    this.lastSearch = null;
  }

  load(cityName = '') {
    if (cityName) {
      Promise.all([
        fetchCurrentData(cityName, this.selectedUnit),
        fetchForecastData(cityName, this.selectedUnit)
      ]).then(data => {
        if (data && data[0].cod == 200) {
          [this.dataCurrent, this.dataForecast] = data;
          this.lastSearch = cityName;
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

  toggleUnit() {
    this.selectedUnit =
      this.selectedUnit === API_UNITS_METRIC
        ? API_UNITS_IMPERIAL
        : API_UNITS_METRIC;

    if (this.cbUnitChange) {
      this.cbUnitChange(this.getCurrentUnit());
    }

    this.load(this.getLastSearch());
  }

  getCurrentUnit() {
    return this.selectedUnit;
  }

  getLastSearch() {
    return this.lastSearch || '';
  }
}

export const weatherDataService = new WeatherDataService();
