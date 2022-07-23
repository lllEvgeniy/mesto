import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector)
        this.popupSelector = document.querySelector(popupSelector);
        this.handleFormSubmit = handleFormSubmit
        this._inputList = this.popupSelector.querySelectorAll('.popup__input')
    }

    closePopup() {
        super.closePopup()
        this.popupSelector.querySelector('.popup__wrapper').reset()

    }

    setEventListeners() {
        super.setEventListeners()
        this.popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this.handleFormSubmit(this._getInputValues());
            this.closePopup()
        })
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
}