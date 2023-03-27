class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._config = config;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
  }

  //Отключение отправки формы 
  disableSubmit(evt) {
    evt.preventDefault();
  };


  enableValidation() {    
    this._inputs.forEach((form) => {
      form.addEventListener('submit', this.disableSubmit);
      form.addEventListener('input', () => {
        this._toggleButton();
      });
      this._addInputListeners();
      this._toggleButton();

      form.addEventListener('reset', () => {
        setTimeout(() => {
          this._toggleButton();
        }, 0);
      });

    });
  };


  _showErrorInput(input) {
    const inputId = input.id;
    const errorItem = this._form.querySelector(`#${inputId}-error`);
    input.classList.add(this._inputErrorClass);
    errorItem.textContent = input.validationMessage;
  };

  _hideErrorInput(input) {
    const inputId = input.id;
    const errorItem = this._form.querySelector(`#${inputId}-error`);
    errorItem.textContent = '';
    input.classList.remove(this._inputErrorClass);
  };

  //Проверка на валиднось вводных двнных пользователем
  _handleFormInput(evt) {
    const input = evt.target;

    if (input.validity.valid) {
      this._hideErrorInput(input);
    } else {
      this._showErrorInput(input);
    }
  };

  _toggleButton() {
    const isFormValid = this._form.checkValidity();

    this._buttonSubmit.disabled = !isFormValid;
    this._buttonSubmit.classList.toggle(this._inactiveButtonClass, !isFormValid);
  };

  resetFormValidation = () => {
    this._inputs.forEach((input) => {
      this._hideErrorInput(input);
    });

    this._toggleButton();
  };

  _addInputListeners() {
    this._inputs.forEach((item) => {
      item.addEventListener('input', (evt) => {
        this._handleFormInput(evt);
      });
    });
  };


}

export default FormValidator;
