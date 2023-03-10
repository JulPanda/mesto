import Card from './Card.js';
import FormValidator from './FormValidator.js';
// import initialCards from './cards';

const aboutOpenButtonEdit = document.querySelector('.profile__button-edit');
const aboutOpenButtonCard = document.querySelector('.profile__button-add');
const aboutCloseButtons = document.querySelectorAll('.popup__button-close');

const aboutPopupEdit = document.querySelector('.popup_type_edit');
const aboutPopupCard = document.querySelector('.popup_type_new-card');
const aboutPopupImage = document.querySelector('.popup_type_image');

const popupImageZoom = aboutPopupImage.querySelector('.popup__image');
const popupTitleZoom = aboutPopupImage.querySelector('.popup__title-image');

// Инпут-профиль
const aboutProfileName = document.querySelector('.profile__title');
const aboutProfileJob = document.querySelector('.profile__subtitle');

// Секция карточек
const cardsList = document.querySelector('.cards');

// Находим форму в DOM
const formProfileElement = document.forms["form-name"];
const formCardElement = document.forms["form-card"];

// Находим поля формы в DOM
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_about');
const imagelinkInput = formCardElement.querySelector('.popup__input_type_link');
const placeInput = formCardElement.querySelector('.popup__input_type_place');

const formValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const validatorProfileForm = new FormValidator(formProfileElement, formValidation);
const validatorCardForm = new FormValidator(formCardElement, formValidation);

validatorProfileForm.enableValidation();
validatorCardForm.enableValidation();

// Открытие попапа профиля
function openPopupEdit(popup) {
  nameInput.value = aboutProfileName.textContent;
  jobInput.value = aboutProfileJob.textContent;
  openPopup(aboutPopupEdit);

  validatorProfileForm.resetFormValidation();
}


// Окрытие попапа карточки
function openPopupCard(popup) {
  openPopup(aboutPopupCard);

  validatorCardForm.resetFormValidation();
}


// Функция открытия
function openPopup(popup) {
  document.addEventListener('mousedown', closePopupOverlay);
  document.addEventListener('keyup', closePopupEsc);
  popup.classList.add('popup_opened');
}

// Функция закрытия
function closePopup(popup) {
  document.removeEventListener('mousedown', closePopupOverlay);
  document.removeEventListener('keyup', closePopupEsc);
  popup.classList.remove('popup_opened');
}

// Функция закрытия по клавише Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//Фукция закрытия по оверлей
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

//Функция создания карточки
function createCard(item) {
  const cardElement = new Card('.element-template', item, zoomCardToClick);
  const card = cardElement.getCardElement();
  
  return card;
};

// Добавление карточек на страницу
function addCards(card) {
  cardsList.prepend(card);
}

// Рендер карточек
function renderCards() {
  initialCards.reverse().forEach(function (item) {
    const card = createCard(item);

    addCards(card);
  });
}

renderCards();

//Добавление новой карточки через форму
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: placeInput.value,
    link: imagelinkInput.value
  });
  addCards(newCard);
  closePopup(aboutPopupCard);
  evt.target.reset();
}

// Функция вызова zoom-картинки
function zoomCardToClick(name, link) {
  popupImageZoom.src = link;
  popupImageZoom.alt = 'Фотография ' + name;
  popupTitleZoom.textContent = name;
  openPopup(aboutPopupImage);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Отмена стандартной отправки формы
  aboutProfileName.textContent = nameInput.value;
  aboutProfileJob.textContent = jobInput.value;
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  closePopup(aboutPopupEdit);
}

// Универсальный слушатель зактытия всех попапа
aboutCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () =>
    closePopup(popup));
});


//Вызов кнопки открытия попапа редактирования профиля
aboutOpenButtonEdit.addEventListener('click', function () {
  openPopupEdit(aboutPopupEdit);
});

//Вызов кнопки открытия попапа редактирования карточки
aboutOpenButtonCard.addEventListener('click', function () {
  openPopupCard(aboutPopupCard);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfileElement.addEventListener('submit', handleProfileFormSubmit);
formCardElement.addEventListener('submit', handleCardFormSubmit);