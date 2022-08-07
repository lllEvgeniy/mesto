import Popup from './Popup.js'

export default class PopupWithDeleteCard extends Popup {
    constructor(selector ) {
        super(selector)
        this.popupBtn = this.popup.querySelector('.popup__btn')
    }

    setEventListeners() {
        this.popupBtn.addEventListener('click', () => {
            this.closePopup(this.popup)
        })
        super.setEventListeners()
    }
}