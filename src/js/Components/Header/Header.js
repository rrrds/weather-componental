import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';
import { SearchBar } from '../SearchBar';
import { FavouriteLocations } from '../FavouriteLocations';
import { WeatherDataService } from '../../Services/WeatherDataService';
import { UnitsButton } from '../UnitsButton';

export default class Header extends Component {
  constructor(host, props = {}) {
    super(host, props);

    this.state = {
      cityName: props.cityName || '',
      units: WeatherDataService.getCurrentUnit()
    };
  }

  handleSearch(cityName) {
    if (cityName) {
      WeatherDataService.load(cityName);

      this.setState({ cityName });
    }
  }

  handleUnitsChange() {
    WeatherDataService.toggleUnit();
    this.setState({ units: WeatherDataService.getCurrentUnit() });
  }

  render() {
    return [
      createElement('h1', {}, 'Weather App'),
      createElement(SearchBar, {
        class: 'search',
        handleSearch: e => this.handleSearch(e),
        cityName: this.state.cityName
      }),
      createElement(FavouriteLocations, {
        class: 'fav',
        handleSearch: e => this.handleSearch(e)
      }),

      createElement(UnitsButton, {
        unit: this.state.units,
        handleUnitsChange: e => this.handleUnitsChange(e)
      })
    ];
  }
}
