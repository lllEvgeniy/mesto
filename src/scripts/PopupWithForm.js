import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor({ selector, handleFormSubmit }) {
        super(selector)
        this.handleFormSubmit = handleFormSubmit
        this._inputList = this.popup.querySelectorAll('.popup__input')
    }

    closePopup() {
        super.closePopup()
        this.popup.querySelector('.popup__wrapper').reset()

    }

    setEventListeners() {
        super.setEventListeners()
        this.popup.addEventListener('submit', (evt) => {
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