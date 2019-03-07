import IWeatherDataService from './IWeatherDataService';

class WeatherDataService extends IWeatherDataService {
  getCurrentWeather() {}
  getWeatherForecast() {}

  subscribeForCurrentWeather(cb) {}

  subscribeForForecastWeather(cb) {}
}

export const weatherDataService = new WeatherDataService();
