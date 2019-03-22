import Component from '../../Framework/Component';
import { Header } from '../Header';
import { CurrentWeather } from '../CurrentWeather';
import { WeatherForecast } from '../WeatherForecast';
import ComponentFactory from '../../Framework/ComponentFactory';
import { parseJSX } from '../../Framework/Template';

export default class App extends Component {
  render() {
    return parseJSX`
      <div class={app}>
        <Header class={header} />
        <CurrentWeather />
        <WeatherForecast class={forecast} />
      </div>`;
  }
}

ComponentFactory.register(App);
