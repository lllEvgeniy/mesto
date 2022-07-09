const popupElement = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCloseButton = document.querySelector('.popup__close_img');
const popupSignature = document.querySelector('.popup__signature');

class Card {
    constructor(cardSelector) {
        this._cardSelector = cardSelector;
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
        popupElement.classList.add('popup_active');
    }

    _handleClosePopup() {
        popupElement.classList.remove('popup_active');
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

        popupCloseButton.addEventListener('click', () => {
            this._handleClosePopup()
        });

        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleRemoveCard(this._element.querySelector('.element__trash'))
        });

        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeCard(this._element.querySelector('.element__like'))
        });
    }
}

class DefaultCard extends Card {
    constructor(data, cardSelector) {
        super(cardSelector);
        this._name = data.name;
        this._link = data.link;
    }

    generateCard() {
        this._element = super._getTemplate();
        super._setEventListeners();
        this._element.querySelector('.element__img').src = `${this._link}`;
        this._element.querySelector('.element__title').textContent = this._name;
        return this._element;
    }
}

class AddCard extends Card {
    constructor(cardData, cardSelector) {
        super(cardSelector);
        this._name = cardData.name;
        this._link = cardData.link;
    }

    generateCard() {
        this._element = super._getTemplate();
        this._element.querySelector('.element__img').src = `${this._link}`;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}

export { DefaultCard, AddCard }