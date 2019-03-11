import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';

export default class SearchBar extends Component {
  handleSearchSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);

    this.props.handleSearch(data.get('searchField'));
  }

  render() {
    return createElement(
      'form',
      { class: 'search-form', onSubmit: e => this.handleSearchSubmit(e) },
      createElement('input', {
        class: 'search__input',
        name: 'searchField',
        value: this.props.cityName || ''
      }),
      createElement('button', { class: 'button button--search' }, 'Search')
    );
  }
}
