/* eslint-disable class-methods-use-this */
import Component from '../../Framework/Component';
import { WeatherDataService } from '../../Services/WeatherDataService';
import { createElement } from '../../Framework/jsx';
import {
  formatTemperature,
  formatHumidity,
  formatPressure,
  formatWind
} from '../../formatters';
import { FavoriteButton } from '../FavoriteButton';

export default class CurrentWeather extends Component {
  constructor(host, props) {
    super(host, props);

    this.onServerResponse = this.onServerResponse.bind(this);
    WeatherDataService.subscribeForCurrentWeather(this.onServerResponse);
  }

  onServerResponse(weatherData) {
    this.run();
  }

  render() {
    const data = WeatherDataService.getCurrentWeather();
    if (!data) return createElement('div');

    return createElement(
      'div',
      { class: 'main weather-details' },
      createElement(
        'div',
        { class: 'weather-icon' },
        createElement(FavoriteButton, {
          name: `${data.name},${data.sys.country}`
        }),
        createElement('h2', {}, data.name),
        createElement('i', {
          class: `owf owf-${data.weather[0].id} current-weather-icon`,
          title: data.weather[0].description
        })
      ),
      createElement(
        'div',
        {},
        createElement(
          'div',
          { class: 'row data-details' },
          createElement(
            'div',
            { class: 'aux-temperature' },
            createElement('i', { class: 'fas fa-arrow-circle-down' }),
            formatTemperature(data.main.temp_min)
          ),
          createElement(
            'div',
            { class: 'main-temperature' },
            formatTemperature(data.main.temp)
          ),
          createElement(
            'div',
            { class: 'aux-temperature' },
            createElement('i', { class: 'fas fa-arrow-circle-up' }),
            formatTemperature(data.main.temp_max)
          )
        ),
        createElement(
          'ul',
          { class: 'row data-details data-details--sub' },
          createElement(
            'li',
            { title: 'Wind' },
            createElement('i', { class: 'fas fa-wind' }),
            formatWind(data.wind.speed)
          ),
          createElement(
            'li',
            { title: 'Humidity' },
            createElement('i', { class: 'fas fa-tint' }),
            formatHumidity(data.main.humidity)
          ),
          createElement(
            'li',
            { title: 'Pressure' },
            createElement('i', { class: 'fas fa-weight-hanging' }),
            formatPressure(data.main.pressure)
          )
        )
      )
    );
  }
}
