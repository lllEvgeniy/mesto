export default class Popup {
    constructor(selector) {
        this.popupSelector = document.querySelector(selector);
        this.popupCloseButton = this.popupSelector.querySelector('.popup__close')
    }


    openPopup() {
        this.popupSelector.classList.add('popup_active');
    }

    closePopup() {
        this.popupSelector.classList.remove('popup_active');
    }

    _handleEscClose(event) {
        if (event.key == 'Escape') {
            this.closePopup()
        }
    }
    setEventListeners() {


        this.popupCloseButton.addEventListener('click', () => {
            this.closePopup(this.popupSelector)
        })

        document.addEventListener('keydown', (event) => {
            this._handleEscClose(event)
        })


        this.popupSelector.addEventListener('mousedown', (e) => {
            const container = this.popupSelector.querySelector('.popup__container')
            const click = e.composedPath().includes(container);
            if (!click) {
                this.closePopup(this.popupSelector)
            }
        })
    }

}


