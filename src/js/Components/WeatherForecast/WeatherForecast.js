import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';
import { WeatherDataService } from '../../Services/WeatherDataService';
import { WeatherForecastItem } from '../WeatherForecastItem';
import { ForecastItem } from '../ForecastItem';
import ComponentFactory from '../../Framework/ComponentFactory';

export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props);
    this.state = {};

    this.onServerResponse = this.onServerResponse.bind(this);
    WeatherDataService.subscribeForForecastWeather(this.onServerResponse);
  }

  onServerResponse(weatherData) {
    this.setState({ data: weatherData });
  }

  render() {
    if (!this.state.data) return null;

    const minMaxTemp = this.state.data.list.reduce(
      (acc, item) => {
        return {
          min: Math.min(item.main.temp_min, acc.min),
          max: Math.max(item.main.temp_max, acc.max)
        };
      },
      { min: Infinity, max: -Infinity }
    );

    minMaxTemp.min -= 1;
    minMaxTemp.max += 1;

    const step = (minMaxTemp.max - minMaxTemp.min) / 100;

    const items = this.state.data.list.map(item => {
      const height = (item.main.temp - minMaxTemp.min) / step;
      return createElement(ForecastItem, {
        temp: item.main.temp,
        height: height
      });
    });

    return createElement('div', { class: 'forecast-grid' }, items);
  }
}

ComponentFactory.register(WeatherForecast);
