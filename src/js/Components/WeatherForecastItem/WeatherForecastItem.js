import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';
import ComponentFactory from '../../Framework/ComponentFactory';

export default class WeatherForecastItem extends Component {
  render() {
    const mainData = this.props.data.main;

    const details = Object.keys(mainData).map(key => {
      return createElement('li', {}, `${key}: ${mainData[key]}`);
    });

    return createElement(
      'div',
      {},
      this.props.data.dt_txt,
      createElement('ul', {}, details)
    );
  }
}

ComponentFactory.register(WeatherForecastItem);
