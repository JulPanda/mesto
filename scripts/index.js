const aboutOpenButtonEdit = document.querySelector('.profile__button-edit');
const aboutOpenButtonCard = document.querySelector('.profile__button-add');
const aboutPopup = document.querySelector('.popup');
const aboutCloseButtonEdit = document.querySelector('.popup__button-close_edit');
const aboutCloseButtonCard = document.querySelector('.popup__button-close_card');
const aboutCloseButtonImage = document.querySelector('.popup__button-close_image');

const aboutPopupEdit = document.querySelector('.popup_type_edit');
const aboutPopupCard = document.querySelector('.popup_type_new-card');
const aboutPopupImage = document.querySelector('.popup_type_image');

// Инпут-профиль
const aboutProfileName = document.querySelector('.profile__title');
const aboutProfileJob = document.querySelector('.profile__subtitle');

// Темплейт карточки
const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('.element-template')
  .content
  .querySelector('.element');

// Находим форму в DOM
const formProfileElement = document.querySelector('#form-name');
const formCardElement = document.querySelector('#form-card');
// Находим поля формы в DOM
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_about');
const imagelinkInput = formCardElement.querySelector('.popup__input_type_link');
const placeInput = formCardElement.querySelector('.popup__input_type_place');

// Открытие попапа профиля
function openPopupEdit(popup) {
  nameInput.value = aboutProfileName.textContent;
  jobInput.value = aboutProfileJob.textContent;  
  openPopup(aboutPopupEdit);  
  }


// Окрытие попапа карточки
function openPopupCard(popup) {
  openPopup(aboutPopupCard);  
}


// Функция открытия
function openPopup(popup) {
  document.addEventListener('click', closePopupOverlay);
  document.addEventListener('keyup', closePopupEsc);
  popup.classList.add('popup_opened');

  resetFormValidation(formValidation);
}

// Функция закрытия
function closePopup(popup) {
  document.removeEventListener('click', closePopupOverlay);
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
function createCard({ name, link }) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__image');
  const aboutButtonLike = cardElement.querySelector('.element__button-like');
  const aboutButtonDel = cardElement.querySelector('.element__button-delete');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = `Фотография ${name}`;

  // Лайк
  aboutButtonLike.addEventListener('click', function () {
    aboutButtonLike.classList.toggle('element__button-like_active');
  });

  // Удаление карточки
  aboutButtonDel.addEventListener('click', function () {
    cardElement.remove('.element');
  });

  // Вызов картинки
  cardImage.addEventListener('click', function () {
    aboutPopupImage.querySelector('.popup__image').src = link;
    aboutPopupImage.querySelector('.popup__image').alt = 'Фотография ' + name;
    aboutPopupImage.querySelector('.popup__title-image').textContent = name;
    openPopup(aboutPopupImage);
  });

  return cardElement;
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

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Отмена стандартной отправки формы
  aboutProfileName.textContent = nameInput.value;
  aboutProfileJob.textContent = jobInput.value;
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  closePopup(aboutPopup);
}


// Вызов кнопки закрытия попапа профиля
aboutCloseButtonEdit.addEventListener('click', function () {
  closePopup(aboutPopupEdit);
});
//Вызов кнопки открытия попапа редактирования профиля
aboutOpenButtonEdit.addEventListener('click', function () {
  openPopupEdit(aboutPopupEdit);
});

// Вызов кнопки закрытия попапа карточки
aboutCloseButtonCard.addEventListener('click', function () {
  closePopup(aboutPopupCard);
});
//Вызов кнопки открытия попапа редактирования карточки
aboutOpenButtonCard.addEventListener('click', function () {
  openPopupCard(aboutPopupCard);
});

// Вызов кнопки закрытия попапа карточки
aboutCloseButtonImage.addEventListener('click', function () {
  closePopup(aboutPopupImage);
});

//Фукция закрытия по оверлей
//function closePopupOverlay(evt) {
// if (evt.target.classList.contains('.popup_opened')) {
//    closePopup(evt.target);
//  }
//}

//document.addEventListener('click', function (evt) {
//if (evt.target.classList.contains('.popup_opened')) {
// closePopup(evt.target);
//}

//});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfileElement.addEventListener('submit', handleProfileFormSubmit);
formCardElement.addEventListener('submit', handleCardFormSubmit);