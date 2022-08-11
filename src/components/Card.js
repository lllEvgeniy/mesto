import { popupFormDeleteCard } from "../utils/const.js";

import { popupDeleteCard } from '../pages/index.js';
class Card {
    constructor(data, cardSelector, openPopupImg, removeCardFromServer, id, { addLike, delLike }) {
        this._data = data;
        this._dataId = data._id
        this._ownerId = data.owner._id
        this._likes = data.likes
        this._id = id
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._removeCardFromServer = removeCardFromServer
        this._openPopupImg = openPopupImg
        this._delLike = delLike
        this._addLike = addLike

    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    async _handleRemoveCard(el) {

        try {
            await this._removeCardFromServer(this._dataId)
            el.remove()
        } catch (error) {
            console.log(error);
        }

    }

    _popupFormDeleteCard(el) {
        popupFormDeleteCard.querySelector('.popup__btn').addEventListener('click', () => {
            this._handleRemoveCard(el)
        });
    }

    handleLikeCard(dataLikes) {
        this._element.querySelector('.element__counter').textContent = dataLikes.length
    }

    handleDeleteLikeCard(dataLikes) {
        this._element.querySelector('.element__counter').textContent = dataLikes.length
    }

    addClassLikeCard() {
        this._elementLike.classList.add('element__like_active')
    }

    deleteClassLikeCard() {
        this._elementLike.classList.remove('element__like_active')
    }

    _setEventListeners() {

        this._element.querySelector('.element__img').addEventListener('click', () => {
            this._openPopupImg(this._name, this._link)
        });

        this._element.querySelector('.element__trash').addEventListener('click', () => {
            popupDeleteCard.openPopup(this._popupFormDeleteCard(this._element));
        });

        this._elementLike.addEventListener('click', (ev) => {
            if (ev.target.classList.contains('element__like_active')) {
                this._delLike();
            }
            else {
                this._addLike();
            }
        }
        )
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementLike = this._element.querySelector('.element__like')
        this._element.querySelector('.element__img').src = `${this._link}`;
        this._element.querySelector('.element__img').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setEventListeners()
        this._element.querySelector('.element__counter').textContent = this._likes.length
        if (this._ownerId == this._id) {
            const elTrash = this._element.querySelector('.element__trash')
            elTrash.style.display = "block"
        }
        const id = this._likes.some((item) => {
            return item._id == this._id
        })
        if (id.toString() == 'true') {
            this.addClassLikeCard()


        } else {
            this.deleteClassLikeCard()
        }
        return this._element;
    }
}

export { Card }