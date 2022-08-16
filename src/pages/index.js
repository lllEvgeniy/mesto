import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Api from '../components/Api.js'
import '../pages/index.css'

import {
  buttonEdit, newCardForm, buttonAdd, formsValid, inputLists, profileName, profileOccupation, profileAvatar, profilePic,
} from '../utils/const.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'

const objSelector = ({ title: profileName, subtitle: profileOccupation, avatar: profileAvatar })
const config = {
  errorMessage: '.popup__message-error_',
  inputLists: inputLists,
  inputTypeError: 'popup__input_type_error',
  messageErrorActive: 'popup__message-error_active',
  inputElement: '.popup__input',
  btn: '.popup__btn',
  popupInput: '.popup__input',
  btnDisabled: 'popup__btn_disabled',
  popup: '.popup__wrapper',

  host: 'https://mesto.nomoreparties.co',
  token: '35932558-7da7-4b8a-bea3-eca911965720'

}
export const api = new Api(config.host, config.token)

Promise.all([
  api.getInfo('users', '/me'),
  api.getInfo('cards', ''),
])
  .then(([dataUser, dataCards]) => {
    userInfo.setUserInfo(dataUser)
    userInfo.getId(dataUser)
    cards.renderItems(dataCards)

  })
  .catch((errorMessage) => {
    console.log(errorMessage);
  })

const userInfo = new UserInfo(objSelector)

const enableValidation = {};

formsValid.forEach((formValid) => {
  const validity = new FormValidator(config, formValid);
  const formId = formValid.id
  enableValidation[formId] = validity
  validity.enableValidation();
})

const cardListSelector = '.elements';

const cards = new Section({
  items: [],
  renderer: (item) => {
    const card = createCard(item)
    cards.addItem(card)
  }
},
  cardListSelector
);

const createCard = (item) => {
  const id = userInfo.returnId()
  const card = new Card(item, '#user', openPopupImg, popupDeleteCard, id, {
    addLike: () => {
      api.addLike(item._id)
        .then((data) => {
          card.handleLikeCard(data.likes);
          card.addClassLikeCard()
        })
        .catch((error) => {
          console.log(error);
        })
    },
    delLike: () => {
      api.delLike(item._id)
        .then((data) => {
          card.handleDeleteLikeCard(data.likes);
          card.deleteClassLikeCard()
        })
        .catch((error) => {
          console.log(error);
        })
    }
  })
  const createdCard = card.generateCard();
  return createdCard;
}

const popupFormEdit = new PopupWithForm({
  selector: '.popup_form_edit-profile',
  handleFormSubmit: (formData) => {
    popupFormEdit.loadMessage(true)
    api.editProfile(formData.title, formData.subtitle)
      .then((data) => {
        userInfo.setUserInfo(data)
        popupFormEdit.closePopup()
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupFormEdit.loadMessage(false);
      })
  }
})

const popupDeleteCard = new PopupWithConfirmation({
  selector: '.popup_form_delete-card',
  delCard: (data, card) => {
    api.deleteCard(data)
      .then(() => {
        card.remove()
        popupDeleteCard.closePopup()
      })
      .catch((error) => {
        console.log(error);
      })
  }
}
)

const popupNewPlace = new PopupWithForm({
  selector: '.popup_form_edit-pictures',
  handleFormSubmit: (formData) => {
    popupNewPlace.loadMessage(true)
    api.createCard(formData.name, formData.link)
      .then((item) => {
        const card = createCard(item)
        cards.addItem(card);
        popupNewPlace.closePopup()
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupNewPlace.loadMessage(false);
      })
  }
})

const popupEditAvatar = new PopupWithForm({
  selector: '.popup_form_edit-avatar',
  handleFormSubmit: (formData) => {
    popupEditAvatar.loadMessage(true)
    api.editAvatar(formData.avatar)
      .then(() => {
        userInfo.setAvatar(formData)
        popupEditAvatar.closePopup()
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupEditAvatar.loadMessage(false);
      })
  }
})

const popupWithImage = new PopupWithImage({
  selector: '.popup_type_image',
})

const openPopupImg = (title, link) => {
  popupWithImage.openPopup(title, link)
}

buttonAdd.addEventListener('click', function () {
  enableValidation.newPlace.handleToggleButtonState()
  enableValidation.newPlace.resetValidation()
  popupNewPlace.openPopup(newCardForm);
});

buttonEdit.addEventListener('click', function () {
  enableValidation.editProfile.handleToggleButtonState()
  enableValidation.editProfile.resetValidation()
  const data = userInfo.getUserInfo()
  popupFormEdit.setInputValues(data)
  popupFormEdit.openPopup();
});

profilePic.addEventListener('click', function () {
  enableValidation.editAvatar.handleToggleButtonState()
  enableValidation.editAvatar.resetValidation()
  popupEditAvatar.openPopup();
});

popupFormEdit.setEventListeners()
popupNewPlace.setEventListeners()
popupWithImage.setEventListeners()
popupDeleteCard.setEventListeners()
popupEditAvatar.setEventListeners()