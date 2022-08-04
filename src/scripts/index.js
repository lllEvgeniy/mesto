import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'
import PopupWithImage from './PopupWithImage.js'
import { initialCards } from '../utils/cards.js'
import '../pages/index.css'
import {
  buttonEdit, formEditName, formEditOccupation, newCardForm, buttonAdd, formsValid, inputLists, profileName, profileOccupation, profileAvatar,
} from '../utils/const.js'

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
  popup: '.popup__wrapper'
}

async function requestGet(entity, entityId) {
  const res = await fetch(`https://nomoreparties.co/v1/cohort-47/${entity}${entityId}`, {
    headers: {
      authorization: '35932558-7da7-4b8a-bea3-eca911965720',
    }
  })
  return await res.json()
}

function requestPatch(name, about) {
  fetch('https://mesto.nomoreparties.co/v1/cohort-47/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '35932558-7da7-4b8a-bea3-eca911965720',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    })
  }

  )
    .then(res => res.json())
}







const enableValidation = {};

formsValid.forEach((formValid) => {
  const validity = new FormValidator(config, formValid);
  const formId = formValid.id
  enableValidation[formId] = validity
  validity.enableValidation();
})


const cardListSelector = '.elements';


// then(data => {
//   console.log(data[0].msg1);
//   console.log(data[1].msg2);
//   console.log(data[2].msg3);
// })



const cards = new Section({

  items: requestGet('cards', '')
    .then(data => {
      return data
    }),
  renderer: (item) => {
    const card = createCard(item)
    cards.addItem(card)
  }
},
  cardListSelector
);

const createCard = (item) => {
  const card = new Card(item, '#user', openPopupImg);
  const createdCard = card.generateCard();
  return createdCard;
}

const userInfo = new UserInfo(objSelector)

const popupFormEdit = new PopupWithForm({
  selector: '.popup_form_edit-profile',
  handleFormSubmit: (formData) => {
    requestPatch(formData.name, formData.occupation)
    userInfo.setUserInfo(formData)
    popupFormEdit.close
  }
})

const popupNewPlace = new PopupWithForm({
  selector: '.popup_form_edit-pictures',
  handleFormSubmit: (formData) => {
    const card = createCard(formData)
    cards.addItem(card);
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
  popupNewPlace.openPopup(newCardForm);
});

buttonEdit.addEventListener('click', function () {
  enableValidation.editProfile.handleToggleButtonState()
  const data = userInfo.getUserInfo()
  formEditName.value = data.title
  formEditOccupation.value = data.subtitle
  popupFormEdit.openPopup();

});

cards.renderItems();
popupFormEdit.setEventListeners()
popupNewPlace.setEventListeners()
popupWithImage.setEventListeners()


requestGet('users', '/me')
  .then((result) => {
    profileAvatar.src = result.avatar
    profileName.textContent = result.name
    profileOccupation.textContent = result.about
  })