class FormValidator {
    constructor(config, formValid) {
        this._inputLists = config.inputLists;
        this._errorMessage = config.errorMessage //.popup__message-error_ nooot
        this._inputTypeError = config.inputTypeError
        this._messageErrorActive = config.messageErrorActive
        this._btn = config.btn
        this._popupInput = config.popupInput
        this.btnDisabled = config.btnDisabled

        this._popup = formValid.popup;
    }

    _handleHasInvalidInput(inputForms) {
        return inputForms.some((el) => {
            return !el.validity.valid;
        })
    }

    handleToggleButtonState(inputElement) {
        const buttonElement = inputElement.closest(this._popup).querySelector(this._btn)
        const inputForms = Array.from(buttonElement.closest(this._popup).querySelectorAll(this._popupInput));
        if (this._handleHasInvalidInput(inputForms)) {
            buttonElement.classList.add(this.btnDisabled);
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.classList.remove(this.btnDisabled);
            buttonElement.removeAttribute('disabled', false);
        }
    };

    _handleShowInputError(inputElement) {
        const errorElement = inputElement.closest(this._popup).querySelector(`${this._errorMessage}${inputElement.name}`);
        inputElement.classList.add(this._inputTypeError);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._messageErrorActive);

    }

    _handleHideInputError(inputElement) {
        const errorElement = inputElement.closest(this._popup).querySelector(`${this._errorMessage}${inputElement.name}`);
        inputElement.classList.remove(this._inputTypeError);
        errorElement.classList.remove(this._messageErrorActive);
        errorElement.textContent = '';
    }

    _handleIsValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._handleShowInputError(inputElement);
        } else {
            this._handleHideInputError(inputElement);
        }
    }

    _setEventListeners() {
        this._inputLists.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._handleIsValid(inputElement)
                this.handleToggleButtonState(inputElement)
            })
        });
    }

    enableValidation() {
        this._setEventListeners()
    }
}

export { FormValidator }

