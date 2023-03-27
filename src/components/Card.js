class Card {
  constructor(template, data, zoomCardToClick) {
    this._template = template;
    this._name = data.name;
    this._link = data.link;
    this._zoomCardToClick = zoomCardToClick;    

    this._removeCard = this._removeCard.bind(this);
    this._likeCard = this._likeCard.bind(this);        
  }

  _getElementTemplate() {
    return document.querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true)
  }

  // Подписка на события
  _setEventListeners() {
    this._aboutButtonDel.addEventListener('click', this._removeCard);
    this._aboutButtonLike.addEventListener('click', this._likeCard);
    this._cardImage.addEventListener('click', () => this._zoomCardToClick(this._name, this._link));
  }

  // Функция удаления карточки
  _removeCard() {
    this._element.remove();
  }

  //Функция лайка карточки
  _likeCard() {
    this._aboutButtonLike.classList.toggle('element__button-like_active');
  }

  getCardElement() {
    this._element = this._getElementTemplate();
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__image');
    this._aboutButtonLike = this._element.querySelector('.element__button-like');
    this._aboutButtonDel = this._element.querySelector('.element__button-delete');

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фотография ${this._name}`;

    this._setEventListeners();
    return this._element;
  }
}

export default Card;