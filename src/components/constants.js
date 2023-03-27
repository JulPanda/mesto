
// Исходные данные: массив для создания карточек
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Кнопки редактирования профиля и добавление новых карточек
export const aboutOpenButtonEdit = document.querySelector('.profile__button-edit');
export const aboutOpenButtonCard = document.querySelector('.profile__button-add');

// Секция карточек
export const cardsListSelector = '.cards';
// Находим форму в DOM
export const formProfileElement = document.forms["form-name"];
export const formCardElement = document.forms["form-card"];

// Находим поля формы в DOM
export const nameInput = formProfileElement.querySelector('.popup__input_type_name');
export const jobInput = formProfileElement.querySelector('.popup__input_type_about');
export const imagelinkInput = formCardElement.querySelector('.popup__input_type_link');
export const placeInput = formCardElement.querySelector('.popup__input_type_place');

export const formValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//export default initialCards;