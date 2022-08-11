import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor({ selector, handleFormSubmit }) {
        super(selector)
        this.handleFormSubmit = handleFormSubmit
        this._inputList = this.popup.querySelectorAll('.popup__input')

        this.popupBtn = this.popup.querySelector('.popup__btn')
        this.popupBtnTextContent = this.popup.querySelector('.popup__btn').textContent
        this.form = this.popup.querySelector('.popup__wrapper')

    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    loadMessage(load) {
        if (load) {
            this.popupBtn.textContent = 'Сохранение...';
        }
        else {
            this.popupBtn.textContent = this.popupBtnTextContent;
        }
    }

    closePopup() {
        super.closePopup()
        this.form.reset()

    }

    setEventListeners() {
        super.setEventListeners()
        this.popup.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this.handleFormSubmit(this._getInputValues());
            // this.closePopup()
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