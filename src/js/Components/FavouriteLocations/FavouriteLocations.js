import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';
import { FavoriteService } from '../../Services/FavoriteService';

export default class FavouriteLocations extends Component {
  constructor(host, props) {
    super(host, props);

    this.favorites = FavoriteService.getData();

    this.onFavoritesUpdate = this.onFavoritesUpdate.bind(this);
    FavoriteService.subscribeForUpdate(this.onFavoritesUpdate);
  }

  onFavoritesUpdate(data) {
    this.favorites = data;
    this.run();
  }

  handleFavClick(e) {
    if (e.target.localName === 'button') {
      const button = e.target;

      this.props.handleSearch(button.dataset.city);
    }
  }

  render() {
    this.favorites = FavoriteService.getData();

    if (this.favorites.lenght === 0) {
      return <div />;
    }

    const buttons = this.favorites.map(city => {
      return (
        <button data-city={city} class="button button--fav">
          {city}
        </button>
      );
    });

    return <div onClick={e => this.handleFavClick(e)}>{buttons}</div>;
  }
}
