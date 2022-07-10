const popupImage = document.querySelector('.popup__image');
const popupSignature = document.querySelector('.popup__signature');

class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _handleOpenPopup() {
        popupImage.src = this._link;
        popupImage.alt = this._name
        popupSignature.textContent = this._name

    }

    _handleRemoveCard(el) {
        el.closest('.element').remove()
    }

    _handleLikeCard(el) {
        el.classList.toggle('element__like_active');
    }

    _setEventListeners() {
        this._element.querySelector('.element__img').addEventListener('click', () => {
            this._handleOpenPopup()
        });


        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleRemoveCard(this._element.querySelector('.element__trash'))
        });

        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeCard(this._element.querySelector('.element__like'))
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__img').src = `${this._link}`;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}

export { Card }