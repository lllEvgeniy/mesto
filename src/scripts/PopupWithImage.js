import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
    constructor({ selector }) {
        super(selector)
        this.popupImg = this.popupSelector.querySelector('.popup__image')
        this.popupSignature = this.popupSelector.querySelector('.popup__signature')

    }

    openPopup(title, link) {
        this.popupImg.src = link
        this.popupImg.alt = title
        this.popupSignature.textContent = title
        super.openPopup()
    }
}
