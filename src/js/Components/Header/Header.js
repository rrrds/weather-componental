import Component from '../../Framework/Component';
import { SearchBar } from '../SearchBar';
import { FavouriteLocations } from '../FavouriteLocations';
import { WeatherDataService } from '../../Services/WeatherDataService';
import { UnitsButton } from '../UnitsButton';
import ComponentFactory from '../../Framework/ComponentFactory';
import { parseJSX } from '../../Framework/Template';

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
    return parseJSX`
      <h1>Weather App</h1>
      <SearchBar 
        class={search} 
        handleSearch={${e => this.handleSearch(e)}}
        cityName={${this.state.cityName}} />
      <FavouriteLocations 
        class={fav} 
        handleSearch={${e => this.handleSearch(e)}} />
      <UnitsButton 
        unit={${this.state.units}} 
        handleUnitsChange={${e => this.handleUnitsChange(e)}} />`;
  }
}

ComponentFactory.register(Header);
