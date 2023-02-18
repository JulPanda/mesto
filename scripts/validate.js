// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const formValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Отключение отправки формы 
function disableSubmit(evt) {
  evt.preventDefault();
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', disableSubmit);
    form.addEventListener('input', function () {
      toggleButton(form, config);
    });
    addInputListeners(form, config);
    toggleButton(form, config);

    form.addEventListener('reset', () => {
      setTimeout(() => {
        toggleButton(form, config);
      }, 0);
    });

  });
}

//Проверка на валиднось вводных двнных пользователем
function handleFormInput(evt, config) {
  const input = evt.target;
  const inputId = input.id;
  const errorItem = document.querySelector(`#${inputId}-error`);

  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass);
    errorItem.textContent = '';
  } else {
    input.classList.add(config.inputErrorClass);
    errorItem.textContent = input.validationMessage;
  }
}

function toggleButton(form, config) {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();

  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

function addInputListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector)); // Формируем массив из инпутов

  inputs.forEach((item) => {
    item.addEventListener('input', (evt) => {
      handleFormInput(evt, config)
    });
  });
}

function resetFormValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));

  inputs.forEach((input) => {
    const inputId = input.id;
    const errorItem = document.querySelector(`#${inputId}-error`);
    console.log(input);
    console.log(errorItem);
    errorItem.textContent = '';
    input.classList.remove(config.inputErrorClass);
  });

  toggleButton(form, config);
}

enableValidation(formValidation);