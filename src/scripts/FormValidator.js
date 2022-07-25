class FormValidator {
    constructor(config, formValid) {
        this._inputLists = config.inputLists;
        this._errorMessage = config.errorMessage
        this._inputTypeError = config.inputTypeError
        this._messageErrorActive = config.messageErrorActive
        this._btn = config.btn
        this._popupInput = config.popupInput
        this.btnDisabled = config.btnDisabled
        this._popup = config.popup
        this._formValid = formValid;
        this.button = this._formValid.querySelector(this._btn);
        this._inputForms = Array.from(this._formValid.querySelectorAll(this._popupInput))
    }

    _handleHasInvalidInput() {
        return this._inputForms.some((el) => {
            return !el.validity.valid;
        })
    }

    handleToggleButtonState() {
        if (this._handleHasInvalidInput(this._inputForms)) {
            this.button.classList.add(this.btnDisabled);
            this.button.setAttribute('disabled', true);
        } else {
            this.button.classList.remove(this.btnDisabled);
            this.button.removeAttribute('disabled', false);
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

