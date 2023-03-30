import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  aboutOpenButtonEdit,
  aboutOpenButtonCard,
  cardsListSelector,
  formProfileElement,
  formCardElement,
  nameInput,
  jobInput,
  imagelinkInput,
  placeInput,
  formValidation
} from '../components/constants.js';

import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Popup from '../components/Popup.js';
import UserInfo from '../components/UserInfo.js';

//Формы
const aboutPopupEdit = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit);
const aboutPopupCard = new PopupWithForm('.popup_type_new-card', handleCardFormSubmit);
const aboutPopupImage = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});


//Валидация форм
//const validatorProfileForm = new FormValidator(formProfileElement, formValidation);
//const validatorCardForm = new FormValidator(formCardElement, formValidation);
//validatorProfileForm.enableValidation();
//validatorCardForm.enableValidation();

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formValidation);



// Функция вызова zoom-картинки
function zoomCardToClick(name, link) {
  aboutPopupImage.openPopup(name, link);
}

// Открытие попапа профиля
function openPopupEdit() {
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  aboutPopupEdit.openPopup();
  formValidators['Popupname'].resetFormValidation();
  //validatorProfileForm.resetFormValidation();
}

// Окрытие попапа карточки
function openPopupCard() {
  aboutPopupCard.openPopup();
  formValidators['Popupcard'].resetFormValidation();
  //validatorCardForm.resetFormValidation();
}

//Функция создания карточки
function createCard(item) {
  const cardElement = new Card('.element-template', item, zoomCardToClick);
  const card = cardElement.getCardElement();

  return card;
};

// Добавление карточек на страницу
const cardsList = new Section({
  items: initialCards, renderer: (item) => {
    const card = createCard(item);
    cardsList.addCards(card);
  }
}, cardsListSelector);

cardsList.renderCards();

//Добавление новой карточки через форму
function handleCardFormSubmit(dataCard) {
  const newCard = createCard({
    name: dataCard.inputPlace,
    link: dataCard.inputLink
  });
  cardsList.addCards(newCard);
  aboutPopupCard.closePopup();
}

function handleProfileFormSubmit(dataSet) {
  userInfo.setUserInfo(dataSet);
  aboutPopupEdit.closePopup();
}


aboutPopupEdit.setEventListeners();

aboutPopupCard.setEventListeners();

aboutPopupImage.setEventListeners();

//Вызов кнопки открытия попапа редактирования профиля
aboutOpenButtonEdit.addEventListener('click', function () {
  openPopupEdit();
});

//Вызов кнопки открытия попапа редактирования карточки
aboutOpenButtonCard.addEventListener('click', () =>
  openPopupCard());
