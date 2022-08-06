import { popupFormDeleteCard } from "../utils/const.js";
import { popupDeleteCard } from './index.js'
class Card {
    constructor(data, cardSelector, openPopupImg, removeCardFromServer) {
        this._likes = data.likes
        this._id = data._id
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._removeCardFromServer = removeCardFromServer

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

   async _handleRemoveCard() {

    try {
        await  this._removeCardFromServer(this._id)
        this._element.remove()
    } catch (error) {
        console.log(error);
    }

    }

    _handleLikeCard() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _setEventListeners() {
        this._element.querySelector('.element__img').addEventListener('click', () => {
            this._openPopupImg(this._name, this._link)
        });


        this._element.querySelector('.element__trash').addEventListener('click', () => {
            popupDeleteCard.openPopup(popupFormDeleteCard);
            // this._handleRemoveCard()
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
        this._element.querySelector('.element__counter').textContent = this._likes.length
        return this._element;
    }
}

export { Card }