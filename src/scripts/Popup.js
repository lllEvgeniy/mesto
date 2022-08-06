export default class Popup {
    constructor(selector) {
        this.popup = document.querySelector(selector);
        this.popupCloseButton = this.popup.querySelector('.popup__close')
    }


    openPopup() {
        this.popup.classList.add('popup_active');
        document.addEventListener('keydown', (event) => {
            this._handleEscClose(event)
        })
    }

    closePopup() {
        this.popup.classList.remove('popup_active');
        document.removeEventListener('keydown', (event) => {
            this._handleEscClose(event)
        })
    }

    _handleEscClose(event) {
        if (event.key == 'Escape') {
            this.closePopup()
        }
    }
    setEventListeners() {
        this.popupCloseButton.addEventListener('click', () => {
            this.closePopup(this.popup)
        })

        this.popup.addEventListener('mousedown', (e) => {
            const container = this.popup.querySelector('.popup__container')
            const click = e.composedPath().includes(container);
            if (!click) {
                this.closePopup(this.popup)
            }
        })
    }

}
