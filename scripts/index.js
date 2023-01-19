const aboutOpenButton = document.querySelector('.profile__button-edit_opener');
const aboutPopup = document.querySelector('.popup');
const aboutCloseButton = document.querySelector('.popup__button-close');

const aboutProfileName = document.querySelector('.profile__title');
const aboutProfileJob = document.querySelector('.profile__subtitle');

// Находим форму в DOM
let formElement = document.querySelector('.popup__input');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input-name');
let jobInput = aboutPopup.querySelector('.popup__input-about');

function openPopup() {
  nameInput.value = aboutProfileName.textContent;
  jobInput.value = aboutProfileJob.textContent;
  aboutPopup.classList.add('popup_opened');
}

function closePopup() {
  aboutPopup.classList.remove('popup_opened');
}

aboutOpenButton.addEventListener('click', openPopup);
aboutCloseButton.addEventListener('click', closePopup);


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Отмена стандартной отправки формы
  aboutProfileName.textContent = nameInput.value;
  aboutProfileJob.textContent = jobInput.value;
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
