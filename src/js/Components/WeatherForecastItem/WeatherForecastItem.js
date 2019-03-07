import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';

export default class WeatherForecastItem extends Component {
  render() {
    const mainData = this.props.data.main;

    const details = Object.keys(mainData).map(key => {
      return <li>{`${key}: ${mainData[key]}`}</li>;
    });

    return (
      <div>
        {this.props.data.dt_txt}
        <ul>{details}</ul>
      </div>
    );
  }
}
