import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';
import { WeatherDataService } from '../../Services/WeatherDataService';
import { WeatherForecastItem } from '../WeatherForecastItem';
import { ForecastItem } from '../ForecastItem';

export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props);

    this.onServerResponse = this.onServerResponse.bind(this);
    WeatherDataService.subscribeForForecastWeather(this.onServerResponse);
  }

  onServerResponse(weatherData) {
    console.log('onServerResponse Forecast', weatherData);

    this.run();
  }

  render() {
    const data = WeatherDataService.getWeatherForecast();
    const cnt = data.cnt;

    const minMaxTemp = data.list.reduce(
      (acc, item) => {
        return {
          min: Math.min(item.main.temp_min, acc.min),
          max: Math.max(item.main.temp_max, acc.max)
        };
      },
      { min: Infinity, max: -Infinity }
    );

    console.log(minMaxTemp);
    minMaxTemp.min -= 1;
    minMaxTemp.max += 1;

    const step = (minMaxTemp.max - minMaxTemp.min) / 100;
    console.log(step);

    // const items = data.list.map(item => {
    //   return <WeatherForecastItem class="forecast__item" data={item} />;
    // });

    const items = data.list.map(item => {
      const height = (item.main.temp - minMaxTemp.min) / step;
      return <ForecastItem temp={item.main.temp} height={height} />;
    });

    return (
      <div class="forecast-grid">
        {/* <div class="forecast__max">{minMaxTemp.max.toString()}</div>
        <div class="forecast__min">{minMaxTemp.min.toString()}</div> */}
        {items}
      </div>
    );
  }
}
