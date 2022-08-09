import { popupFormDeleteCard } from "../utils/const.js";

import { popupDeleteCard, api } from './index.js';
class Card {
    constructor(data, cardSelector, openPopupImg, removeCardFromServer, get, checkTaskOnServer) {
        this._data = data;
        this._get = get
        this._ownerId = data.owner._id
        this._likes = data.likes
        this._id = data._id
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._removeCardFromServer = removeCardFromServer
        this._checkTaskOnServer = checkTaskOnServer
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

    async _handleRemoveCard(el) {

        try {
            await this._removeCardFromServer(this._id)
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

    _handleLikeCard(el) {

        api.checkTask(this._id)

            .then((data) => {
                console.log(data);
                el.querySelector('.element__counter').textContent = data.likes.length
                this._element.querySelector('.element__like').classList.add('element__like_active');
            })
    }

    _handleDeleteLikeCard(el) {
        api.delLike(this._id)
            .then((data) => {
                el.querySelector('.element__counter').textContent = data.likes.length
                this._element.querySelector('.element__like').classList.remove('element__like_active');
            })
    }

    _setEventListeners() {

        this._element.querySelector('.element__img').addEventListener('click', () => {
            this._openPopupImg(this._name, this._link)
        });

        this._element.querySelector('.element__trash').addEventListener('click', () => {
            popupDeleteCard.openPopup(this._popupFormDeleteCard(this._element));
        });

        this._element.querySelector('.element__like').addEventListener('click', () => {
            api.checkTask(this._id)
                .then((data) => {
                    const id = data.likes.some((item) => {
                        console.log(data.likes);
                        return item._id == '9ed86b818f4ce3d5f1a6bc6a'
                    })
                    console.log(id);
                    if (id.toString() == 'true') {
                        console.log('del');
                        this._handleDeleteLikeCard(this._element)
                    } else {
                        console.log('add');
                        this._handleLikeCard(this._element)
                    }
                })
            // const id = this._data.likes.some((item) => {
            //     return item._id == '9ed86b818f4ce3d5f1a6bc6a'
            // })
            // console.log(id);







        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__img').src = `${this._link}`;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setEventListeners();
        this._element.querySelector('.element__counter').textContent = this._likes.length
        if (this._ownerId == '9ed86b818f4ce3d5f1a6bc6a') {
            const elTrash = this._element.querySelector('.element__trash')
            elTrash.style.display = "block"
        }



        return this._element;
    }
}

export { Card }