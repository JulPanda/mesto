import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this.popup.querySelector('.popup__form');
    this._btnConfirm = this._form.querySelector('.popup__button-save');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card);
    });
  }


  openPopup(card) {
    super.openPopup();
    this._card = card;
  }

  setLoading(loadingMessage) {
    this._btnConfirm.textContent = loadingMessage;    
  }

}