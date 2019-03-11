import Component from '../../Framework/Component';
import { createElement } from '../../Framework/jsx';
import { FavoriteService } from '../../Services/FavoriteService';
import { favoriteService } from '../../Services/FavoriteService/FavoriteService';

export default class FavoriteButton extends Component {
  handleClick() {
    favoriteService.toggleCity(this.props.name);
    this.run();
  }

  render() {
    let styleClass = 'button-fav far fa-star';
    let title = 'Add favorite';

    if (favoriteService.isFavorite(this.props.name)) {
      styleClass = 'button-fav fas fa-star';
      title = 'Remove favorite';
    }

    return createElement('button', {
      class: styleClass,
      title: title,
      onClick: () => this.handleClick()
    });
  }
}
