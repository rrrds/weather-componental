import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';
import { formatTemperature } from '../../formatters';
import ComponentFactory from '../../Framework/ComponentFactory';

export default class ForecastItem extends Component {
  render() {
    return createElement('div', {
      class: 'forecast__column',
      'data-temp': this.props.temp,
      'data-height': this.props.height,
      style: `--height:${this.props.height}%`,
      title: formatTemperature(this.props.temp)
    });
  }
}

ComponentFactory.register(ForecastItem);
