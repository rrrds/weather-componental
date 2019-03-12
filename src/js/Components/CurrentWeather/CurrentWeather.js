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
    this.state = { data: null };

    this.onServerResponse = this.onServerResponse.bind(this);
    WeatherDataService.subscribeForCurrentWeather(this.onServerResponse);
  }

  onServerResponse(weatherData) {
    this.setState({ data: weatherData });
  }

  render() {
    if (!this.state.data) return createElement('div');

    return createElement(
      'div',
      { class: 'main weather-details' },
      createElement(
        'div',
        { class: 'weather-icon' },
        createElement(FavoriteButton, {
          name: `${this.state.data.name},${this.state.data.sys.country}`
        }),
        createElement('h2', {}, this.state.data.name),
        createElement('i', {
          class: `owf owf-${
            this.state.data.weather[0].id
          } current-weather-icon`,
          title: this.state.data.weather[0].description
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
            formatTemperature(this.state.data.main.temp_min)
          ),
          createElement(
            'div',
            { class: 'main-temperature' },
            formatTemperature(this.state.data.main.temp)
          ),
          createElement(
            'div',
            { class: 'aux-temperature' },
            createElement('i', { class: 'fas fa-arrow-circle-up' }),
            formatTemperature(this.state.data.main.temp_max)
          )
        ),
        createElement(
          'ul',
          { class: 'row data-details data-details--sub' },
          createElement(
            'li',
            { title: 'Wind' },
            createElement('i', { class: 'fas fa-wind' }),
            formatWind(this.state.data.wind.speed)
          ),
          createElement(
            'li',
            { title: 'Humidity' },
            createElement('i', { class: 'fas fa-tint' }),
            formatHumidity(this.state.data.main.humidity)
          ),
          createElement(
            'li',
            { title: 'Pressure' },
            createElement('i', { class: 'fas fa-weight-hanging' }),
            formatPressure(this.state.data.main.pressure)
          )
        )
      )
    );
  }
}
