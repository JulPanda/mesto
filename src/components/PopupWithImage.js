import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImageZoom = this.popup.querySelector('.popup__image');
    this.popupTitleZoom = this.popup.querySelector('.popup__title-image');
  }

  openPopup(name, link) {
    this.popupImageZoom.src = link;
    this.popupImageZoom.alt = 'Фотография ' + name;
    this.popupTitleZoom.textContent = name;
    super.openPopup();
  }

}

