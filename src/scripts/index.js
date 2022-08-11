import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'
import PopupWithImage from './PopupWithImage.js'
import Api from './Api.js'
import '../pages/index.css'
import {
  buttonEdit, formEditName, formEditOccupation, newCardForm, buttonAdd, formsValid, inputLists, profileName, profileOccupation, profileAvatar, profilePic,
} from '../utils/const.js'
import PopupWithDeleteCard from './PopupWithDeleteCard.js'

const objSelector = ({ title: profileName, subtitle: profileOccupation })
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
    profileAvatar.src = dataUser.avatar
    profileName.textContent = dataUser.name
    profileOccupation.textContent = dataUser.about
    userInfo.getId(dataUser)
    cards.renderItems(dataCards)

  })
  .catch((errorMessage) => {
    console.log(errorMessage);
  })

const userInfo = new UserInfo(objSelector)

// api.getInfo('users', '/me')
//   .then((result) => {
//     profileAvatar.src = result.avatar
//     profileName.textContent = result.name
//     profileOccupation.textContent = result.about

//     return result
//   })



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
  const card = new Card(item, '#user', openPopupImg, deleteCard, id, {
    addLike: () => {
      api.addLike(item._id)
        .then((data) => {
          card.handleLikeCard(data.likes);
        })
    },
    delLike: () => {
      api.delLike(item._id)
        .then((data) => {
          card.handleDeleteLikeCard(data.likes);
        })
    }
  })
  const createdCard = card.generateCard();

  return createdCard;
}




const popupFormEdit = new PopupWithForm({
  selector: '.popup_form_edit-profile',
  handleFormSubmit: (formData) => {
    api.editProfile(formData.name, formData.occupation)
    userInfo.setUserInfo(formData)
    popupFormEdit.close
  }
})


const popupNewPlace = new PopupWithForm({
  selector: '.popup_form_edit-pictures',
  handleFormSubmit: (formData) => {
    api.createCard(formData.name, formData.link)
      .then((item) => {
        const card = createCard(item)
        cards.addItem(card);
      })

  }
})

const popupEditAvatar = new PopupWithForm({
  selector: '.popup_form_edit-avatar',
  handleFormSubmit: (formData) => {
    profileAvatar.src = formData.avatar
    api.editAvatar(formData.avatar)
    popupEditAvatar.close
  }
})


export const popupDeleteCard = new PopupWithDeleteCard(
  '.popup_form_delete-card',
)


const popupWithImage = new PopupWithImage({
  selector: '.popup_type_image',
})

const openPopupImg = (title, link) => {
  popupWithImage.openPopup(title, link)
}

buttonAdd.addEventListener('click', function () {
  enableValidation.newPlace.handleToggleButtonState()
  popupNewPlace.openPopup(newCardForm);
});

buttonEdit.addEventListener('click', function () {
  enableValidation.editProfile.handleToggleButtonState()
  const data = userInfo.getUserInfo()
  formEditName.value = data.title
  formEditOccupation.value = data.subtitle
  popupFormEdit.openPopup();
});

profilePic.addEventListener('click', function () {
  enableValidation.editAvatar.handleToggleButtonState()
  popupEditAvatar.openPopup();
});


popupFormEdit.setEventListeners()
popupNewPlace.setEventListeners()
popupWithImage.setEventListeners()
popupDeleteCard.setEventListeners()
popupEditAvatar.setEventListeners()


function deleteCard(id) {
  return api.deleteCard(id)
}

