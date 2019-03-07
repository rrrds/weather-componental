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
    if (!data) return <div />;

    const items = Object.keys(data.main).map(key => {
      return {
        tag: 'li',
        children: [`${key}: ${data.main[key]}`]
      };
    });

    return (
      <div class="main weather-details">
        <div class="weather-icon">
          <FavoriteButton name={`${data.name},${data.sys.country}`} />
          <h2>{data.name}</h2>
          <i
            class={`owf owf-${data.weather[0].id} current-weather-icon`}
            title={data.weather[0].description}
          />
        </div>
        <div>
          <div class="row data-details">
            <div class="aux-temperature">
              <i class="fas fa-arrow-circle-down" />
              {formatTemperature(data.main.temp_min)}
            </div>
            <div class="main-temperature">
              {formatTemperature(data.main.temp)}
            </div>
            <div class="aux-temperature">
              <i class="fas fa-arrow-circle-up" />
              {formatTemperature(data.main.temp_max)}
            </div>
          </div>
          <ul class="row data-details data-details--sub">
            <li title="Wind">
              <i class="fas fa-wind" />
              {formatWind(data.wind.speed)}
            </li>
            <li title="Humidity">
              <i class="fas fa-tint" />
              {formatHumidity(data.main.humidity)}
            </li>
            <li title="Pressure">
              <i class="fas fa-weight-hanging" />
              {formatPressure(data.main.pressure)}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
