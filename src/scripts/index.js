import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import Section from './Section.js'
import Popup from './Popup.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'
import PopupWithImage from './PopupWithImage.js'
import { initialCards } from './cards.js'
import '../pages/index.css'


const formEdit = document.querySelector('.popup_form_edit-profile');
const buttonEdit = document.querySelector('.profile__edit-button');
const formEditName = document.querySelector('.popup__input_name');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const formEditOccupation = formEdit.querySelector('.popup__input_occupation');
const newCardForm = document.querySelector('.popup_form_edit-pictures');
const buttonAdd = document.querySelector('.profile__add-button');
const formValid = { popup: '.popup__wrapper' }
const inputLists = Array.from(document.querySelectorAll('.popup__input'));
const titleNewPlace = document.querySelector('.popup__input_title');
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
}

const validity = new FormValidator(config, formValid);

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
  popupSelector: '.popup_form_edit-profile',
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData)
    popupFormEdit.close
  }
})

const popupNewPlace = new PopupWithForm({
  popupSelector: '.popup_form_edit-pictures',
  handleFormSubmit: (formData) => {
   const card = createCard(formData)
    cards.addItem(card);
  }
})

const popupWithImage = new PopupWithImage({
  popupSelector: '.popup_type_image',
})

const openPopupImg = (title, link) => {
  popupWithImage.openPopup(title, link)
}

buttonAdd.addEventListener('click', function () {
  validity.handleToggleButtonState(titleNewPlace)
  popupNewPlace.openPopup(newCardForm);
});

buttonEdit.addEventListener('click', function () {
  validity.handleToggleButtonState(formEditName)
  const data = userInfo.getUserInfo()
  formEditName.value = data.title
  formEditOccupation.value = data.subtitle
  popupFormEdit.openPopup();

});


validity.enableValidation();
cards.renderItems();
