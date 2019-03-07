import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';

export default class SearchBar extends Component {
  handleSearchSubmit(e) {
    console.log(e);
    e.preventDefault();

    const data = new FormData(e.target);

    this.props.handleSearch(data.get('searchField'));
  }

  render() {
    return (
      <form class="search-form" onSubmit={e => this.handleSearchSubmit(e)}>
        <input
          class="search__input"
          name="searchField"
          value={this.props.cityName || ''}
        />
        <button class="button button--search">Search</button>
        {/* <SearchHistory /> */}
      </form>
    );
  }
}
