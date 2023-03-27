export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }


  // Добавление карточек на страницу
  addCards(card) {
    this._container.prepend(card);
  }

  // Рендер карточек
  renderCards() {
    this._renderedItems.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

}