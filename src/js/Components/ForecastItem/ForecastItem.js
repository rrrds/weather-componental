import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';

export default class ForecastItem extends Component {
  render() {
    return (
      <div
        class="forecast__column"
        data-temp={this.props.temp}
        data-height={this.props.height}
        style={`--height:${this.props.height}%`}
        title={`${this.props.temp}`}
      />
    );
  }
}
