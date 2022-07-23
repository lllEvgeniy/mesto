import Popup from './Popup.js'
const popupImage = document.querySelector('.popup__image');
const popupSignature = document.querySelector('.popup__signature');

export default class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector)
        this.popupImg = this.popupSelector.querySelector('.popup__image')
        this.popupSignature = this.popupSelector.querySelector('.popup__signature')

    }

    openPopup(title, link) {
        super.openPopup()
        this.popupImg.src = link
        this.popupImg.alt = title
        this.popupSignature.textContent = title
    }
}
