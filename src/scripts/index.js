import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'
import PopupWithImage from './PopupWithImage.js'
import { initialCards } from '../utils/cards.js'
import '../pages/index.css'
import {
  buttonEdit, formEditName, formEditOccupation, newCardForm, buttonAdd, formsValid, inputLists, profileName, profileOccupation,
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


const enableValidation = {};

formsValid.forEach((formValid) => {
  const validity = new FormValidator(config, formValid);
  const formId = formValid.id
  enableValidation[formId] = validity
  validity.enableValidation();
})


const cardListSelector = '.elements';

const cards = new Section({
  items: initialCards,
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