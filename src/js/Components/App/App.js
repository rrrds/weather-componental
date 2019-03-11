import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';
import { Header } from '../Header';
import { CurrentWeather } from '../CurrentWeather';
import { WeatherForecast } from '../WeatherForecast';

export default class App extends Component {
  render() {
    return createElement(
      'div',
      { class: 'app' },
      createElement(Header, { class: 'header', units: 'C' }),
      createElement(CurrentWeather),
      createElement(WeatherForecast, { class: 'forecast' })
    );
  }
}
