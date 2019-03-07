/* eslint-disable class-methods-use-this */
import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';
import { Header } from '../Header';
import { CurrentWeather } from '../CurrentWeather';
import { WeatherForecast } from '../WeatherForecast';

import { fakeFavoritesData } from '../../fakeData';

export default class App extends Component {
  render() {
    return (
      <div class="app">
        <Header class="header" favorites={fakeFavoritesData} units="C" />
        <CurrentWeather />
        <WeatherForecast class="forecast" />
      </div>
    );
  }
}
