class Card {
  constructor(template, data, userId, deleteCardClick, zoomCardToClick, likeCardClick) {
    this._template = template;
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner._id
    this._userId = userId;
    this._cardId = data._id;
    this._likes = data.likes;
    this._zoomCardToClick = zoomCardToClick;
    this._deleteCardClick = deleteCardClick;
    this._likeCardClick = likeCardClick;

    this.removeCard = this.removeCard.bind(this);
  }

  _getElementTemplate() {
    return document.querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true)
  }

  getIdCard() {
    return this._cardId;
  }

  // Подписка на события
  _setEventListeners() {
    this._aboutButtonDel.addEventListener('click', () => this._deleteCardClick(this));
    this._aboutButtonLike.addEventListener('click', () => this._likeCardClick(this));
    this._cardImage.addEventListener('click', () => this._zoomCardToClick(this._name, this._link));
  }

  // Функция удаления карточки
  removeCard() {
    this._element.remove();
  }


  isLiked() {
    return this._likes.some(like => {
      return like._id === this._userId;
    });
  }


  setLikes(list) {
    this._likeText.textContent = list.length;
    this._likes = list;
    if (this.isLiked()) {
      this._aboutButtonLike.classList.add('element__button-like_active');
    } else {
      this._aboutButtonLike.classList.remove('element__button-like_active');
    }
  }




  getCardElement() {
    this._element = this._getElementTemplate();
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__image');
    this._aboutButtonLike = this._element.querySelector('.element__button-like');
    this._aboutButtonDel = this._element.querySelector('.element__button-delete');
    this._likeText = this._element.querySelector('.element__like-counter');

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фотография ${this._name}`;

    if (!(this._userId === this._owner)) {
      this._aboutButtonDel.style.display = 'none';
    }

    this.setLikes(this._likes);

    this._setEventListeners();
    return this._element;
  }
}

export default Card;