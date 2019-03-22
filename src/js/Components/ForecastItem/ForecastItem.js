import Component from '../../Framework/Component';
import { formatTemperature } from '../../formatters';
import ComponentFactory from '../../Framework/ComponentFactory';
import { parseJSX } from '../../Framework/Template';

export default class ForecastItem extends Component {
  render() {
    const customCssVar = `--height:${this.props.height}%`;

    return parseJSX`
      <div
        class={forecast__column}
        data-temp={${this.props.temp}}
        data-height={${this.props.height}}
        style={${customCssVar}}
        title={${formatTemperature(this.props.temp)}}
      ></div>`;
  }
}

ComponentFactory.register(ForecastItem);
