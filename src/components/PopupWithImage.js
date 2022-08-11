import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
    constructor({ selector }) {
        super(selector)
        this.popupImg = this.popup.querySelector('.popup__image')
        this.popupSignature = this.popup.querySelector('.popup__signature')

    }

    openPopup(title, link) {
        this.popupImg.src = link
        this.popupImg.alt = title
        this.popupSignature.textContent = title
        super.openPopup()
    }
}
