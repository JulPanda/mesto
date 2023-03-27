class Popup{
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._closePopupOverlay = this._closePopupOverlay.bind(this);
    this._closePopupEsc = this._closePopupEsc.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }
  
// Функция открытия
openPopup() {
  document.addEventListener('mousedown', this._closePopupOverlay);
  document.addEventListener('keyup', this._closePopupEsc);
  this.popup.classList.add('popup_opened');
}

// Функция закрытия
closePopup() {
  document.removeEventListener('mousedown', this._closePopupOverlay);
  document.removeEventListener('keyup', this._closePopupEsc);
  this.popup.classList.remove('popup_opened');
}

// Функция закрытия по клавише Esc
_closePopupEsc(evt) {
  if (evt.key === "Escape") {
    this.closePopup();
  }
}

//Функция закрытия по оверлей
_closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    this.closePopup(evt.target);
  }
}


setEventListeners() {  
  this._aboutCloseButton = this.popup.querySelector('.popup__button-close');
  this._aboutCloseButton.addEventListener('click', () => this.closePopup());
}

}

export default Popup;