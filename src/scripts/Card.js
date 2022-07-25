class Card {
    constructor(data, cardSelector, openPopupImg) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;

        this._openPopupImg = openPopupImg
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _handleRemoveCard() {
        this._element.remove()
    }

    _handleLikeCard() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _setEventListeners() {
        this._element.querySelector('.element__img').addEventListener('click', () => {
            this._openPopupImg(this._name, this._link)
        });


        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleRemoveCard()
        });

        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeCard()
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