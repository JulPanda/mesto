export default class Section {
  constructor({ renderer }, containerSelector) {
   // this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }


  // Добавление карточек на страницу
  addCards(card) {
    this._container.prepend(card);
  }

  // Рендер карточек
  renderCards(items) {
    items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

}