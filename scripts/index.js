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

// Темплейт карточки
const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('.element-template')
  .content
  .querySelector('.element');

// Находим форму в DOM
const formProfileElement = document.forms["form-name"];
const formCardElement = document.forms["form-card"];

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

  resetFormValidation(formProfileElement, formValidation);
}


// Окрытие попапа карточки
function openPopupCard(popup) {
  openPopup(aboutPopupCard);

  resetFormValidation(formCardElement, formValidation);
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
    popupImageZoom.src = link;
    popupImageZoom.alt = 'Фотография ' + name;
    popupTitleZoom.textContent = name;
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