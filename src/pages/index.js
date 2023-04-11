import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  aboutOpenButtonEdit,
  aboutOpenButtonCard,
  aboutOpenButtonAvatar,
  cardsListSelector,
  formProfileElement,
  formCardElement,
  nameInput,
  jobInput,
  imagelinkInput,
  placeInput,
  avatarInput,
  formValidation
} from '../utils/constants.js';

import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Popup from '../components/Popup.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

let userId = null;
//Формы
const aboutPopupEdit = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit);
const aboutPopupCard = new PopupWithForm('.popup_type_new-card', handleCardFormSubmit);
const aboutPopupImage = new PopupWithImage('.popup_type_image');
const aboutPopupConfirm = new PopupWithConfirm('.popup_type_confirm', handleDeleteCard);
const aboutPopupAvatar = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit);


const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle',
  avatarSelector: '.profile__image',
});

const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-62',
  headers: {
    'content-type': 'application/json',
    authorization: '13bee0f6-be28-45c8-b317-73da0bb635bc'
  },
});

//Валидация форм
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
}

// Окрытие попапа карточки
function openPopupCard() {
  aboutPopupCard.openPopup();
  formValidators['Popupcard'].resetFormValidation();
}

//Функция создания карточки
function createCard(item) {
  const cardElement = new Card('.element-template', item, userId, deleteCardClick, zoomCardToClick, likeCardClick);
  const card = cardElement.getCardElement();
  return card;
};

// Добавление карточек на страницу 
const cardsList = new Section({
  renderer: (item) => {
    const card = createCard(item);
    cardsList.addCards(card);
  }
}, cardsListSelector);


function likeCardClick(card) {
  if (card.isLiked()) {
    api.deleteCardLike(card.getIdCard())
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.setCardLike(card.getIdCard())
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
//api.getUserCards().then((items) => {
//cardsList.renderCards(items);
//});

//Добавление новой карточки через форму
function handleCardFormSubmit(dataCard) {
  aboutPopupCard.setLoading(`Создание...`);
  api.addCardsOut({
    name: dataCard.inputPlace,
    link: dataCard.inputLink
  })
    .then((newCard) => {
      cardsList.addCards(createCard(newCard));
      aboutPopupCard.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      aboutPopupCard.setLoading(`Создать`);
    });
}

Promise.all([api.getCurrentUser(), api.getUserCards()])
  .then(([user, items]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    cardsList.renderCards(items);
    console.log(userId);
    console.log(user);
    console.log(items);
  })
  .catch((err) => {
    console.log(err);
  });


function handleProfileFormSubmit(dataSet) {
  aboutPopupEdit.setLoading(`Сохранение...`);
  api.
    changeUserInfo({ name: dataSet.inputName, about: dataSet.inputAbout })
    .then((res) => {
      userInfo.setUserInfo(res);
      aboutPopupEdit.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      aboutPopupEdit.setLoading(`Сохранить`);
    });
}


// Функция вызова попапа удаления картинки
function deleteCardClick(card) {
  aboutPopupConfirm.openPopup(card);
}

//Удаление картинки с подтверждением
function handleDeleteCard(card) {
  aboutPopupConfirm.setLoading(`Удаление...`);
  console.log(card.getIdCard());
  api.deleteCard(card.getIdCard())
    .then(() => {
      card.removeCard();
      aboutPopupConfirm.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      aboutPopupConfirm.setLoading(`Да`);
    });
}


function openPopupAvatar() {
  aboutPopupAvatar.openPopup();
  formValidators['PopupAvatar'].resetFormValidation();
}

function handleAvatarFormSubmit(data) {
  aboutPopupAvatar.setLoading(`Сохранение...`);
  api.
    changeUserAvatar({ avatar: data.inputAvatarLink })
    .then((res) => {
      // userInfo.setUserAvatar(res);
      userInfo.setUserInfo(res);
      aboutPopupAvatar.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      aboutPopupAvatar.setLoading(`Сохранить`);
    });
}


aboutPopupEdit.setEventListeners();
aboutPopupCard.setEventListeners();
aboutPopupAvatar.setEventListeners();
aboutPopupImage.setEventListeners();
aboutPopupConfirm.setEventListeners();

//Вызов кнопки открытия попапа редактирования профиля
aboutOpenButtonEdit.addEventListener('click', function () {
  openPopupEdit();
});

//Вызов кнопки открытия попапа редактирования карточки
aboutOpenButtonCard.addEventListener('click', () =>
  openPopupCard());

//Вызов кнопки открытия попапа редактирования аватара
aboutOpenButtonAvatar.addEventListener('click', () =>
  openPopupAvatar());
