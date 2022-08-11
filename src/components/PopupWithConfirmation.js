import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
    constructor({ selector, delCard }) {
        super(selector)
        this.popupBtn = this.popup.querySelector('.popup__btn')
        this.delCard = delCard
    }

    openPopup(id, el) {
        this.el = el
        this.id = id
        super.openPopup()
    }

    setEventListeners() {
        this.popupBtn.addEventListener('click', () => {
            this.delCard(this.id,  this.el)
            this.closePopup()
        })
        super.setEventListeners()
    }
}