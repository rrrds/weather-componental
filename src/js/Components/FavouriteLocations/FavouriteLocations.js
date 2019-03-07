import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';

export default class FavouriteLocations extends Component {
  handleFavClick(e) {
    if (e.target.localName === 'button') {
      const button = e.target;

      console.log('Click', button.dataset.city);

      this.props.handleSearch(button.dataset.city);
    }
  }

  render() {
    const buttons = this.props.data.map(city => {
      return (
        <button data-city={city.name} class="button button--fav">
          {city.name}
        </button>
      );
    });

    return <div onClick={e => this.handleFavClick(e)}>{buttons}</div>;
  }
}
