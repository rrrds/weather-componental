/* eslint-disable class-methods-use-this */
import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';
import { Header } from '../Header';
import { CurrentWeather } from '../CurrentWeather';
import { WeatherForecast } from '../WeatherForecast';

export default class App extends Component {
  render() {
    return (
      <div class="app">
        <Header class="header" units="C" />
        <CurrentWeather />
        <WeatherForecast class="forecast" />
      </div>
    );
  }
}
