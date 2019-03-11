import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';

export default class UnitsButton extends Component {
  render() {
    return createElement(
      'label',
      { class: 'button-unit' },
      createElement(
        'div',
        {
          class:
            this.props.unit === 'metric'
              ? 'button-unit__type button-unit__type--current'
              : 'button-unit__type'
        },
        'C'
      ),

      createElement(
        'div',
        {
          class:
            this.props.unit === 'imperial'
              ? 'button-unit__type button-unit__type--current'
              : 'button-unit__type'
        },
        'F'
      ),
      createElement('input', {
        class: 'visualy-hidden',
        type: 'checkbox',
        name: 'units',
        value: '',
        onChange: this.props.handleUnitsChange,
        title: ''
      })
    );
  }
}
