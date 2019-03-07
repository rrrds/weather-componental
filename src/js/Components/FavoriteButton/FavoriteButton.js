import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';
import { FavoriteService } from '../../Services/FavoriteService';
import { favoriteService } from '../../Services/FavoriteService/FavoriteService';

export default class FavoriteButton extends Component {
  handleClick() {
    favoriteService.toggleCity(this.props.name);
  }

  render() {
    return (
      <button onClick={() => this.handleClick()}>{this.props.name}</button>
    );
  }
}
