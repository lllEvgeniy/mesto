const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.popup__message-error_${inputElement.name}`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__message-error_active');

};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.popup__message-error_${inputElement.name}`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__message-error_active');
  errorElement.textContent = '';

};



const hasInvalidInput = (inputList) => {

  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
};



const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__btn_disabled');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('popup__btn_disabled');
    buttonElement.removeAttribute('disabled');
  }
};


//-------------------------------------------------

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement, buttonElement, inputList) => {

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
      toggleButtonState(inputList, buttonElement);
    });
  });
};


const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__wrapper'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const buttonElement = formElement.querySelector('.popup__btn');
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));




    setEventListeners(formElement, buttonElement, inputList);
  });
};



enableValidation();
