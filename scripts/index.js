import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const formEdit = document.querySelector('.popup_form_edit-profile');
const buttonEdit = document.querySelector('.profile__edit-button');
const formEditName = document.querySelector('.popup__input_name');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const formEditOccupation = formEdit.querySelector('.popup__input_occupation');
const formEditWrapper = document.querySelector('.popup__wrapper');
const newCardForm = document.querySelector('.popup_form_edit-pictures');
const cardAdd = newCardForm.querySelector('.popup__wrapper');
const titleNewPlace = newCardForm.querySelector('.popup__input_title');
const linkNewPlace = newCardForm.querySelector('.popup__input_link');
const btnCloseFormEdit = formEdit.querySelector('.popup__close');
const btnCloseFormCard = newCardForm.querySelector('.popup__close');
const buttonAdd = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const formValid = { popup: '.popup__wrapper' }
const inputLists = Array.from(document.querySelectorAll('.popup__input'));
const popupCloseButton = document.querySelector('.popup__close_img');
const popupTypeImage = document.querySelector('.popup_type_image');
const element = document.querySelector('.elements');


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

// открытие попапа
function openPopup(elem) {
  elem.classList.add('popup_active');
  document.addEventListener('keydown', closeEscape)
}

//закрытие по кнопке
function closeEscape(elem) {
  if (elem.key == 'Escape') {
    const el = document.querySelector('.popup_active')
    closePopup(el)
  }
}

// // Закрытие попапа

function closePopup(elem) {
  elem.classList.remove('popup_active');
  document.removeEventListener('keydown', closeEscape)
}

btnCloseFormEdit.addEventListener('click', function () {
  closePopup(formEdit)
});

btnCloseFormCard.addEventListener('click', function () {
  closePopup(newCardForm)
});

popupCloseButton.addEventListener('click', function () {
  closePopup(popupTypeImage)
});

// Отрытие редактора профиля

buttonEdit.addEventListener('click', function () {
  formEditName.value = profileName.textContent;
  formEditOccupation.value = profileOccupation.textContent;
  openPopup(formEdit);
});

// Закрытие редактора профиля

formEditWrapper.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = formEditName.value;
  profileOccupation.textContent = formEditOccupation.value;
  closePopup(formEdit);
});

// Открытие формы добавления карточки

buttonAdd.addEventListener('click', function () {
  openPopup(newCardForm);
});

// закрытие вне дива
popups.forEach((el) => {
  el.addEventListener('mousedown', (e) => {
    const container = el.querySelector('.popup__container')
    const click = e.composedPath().includes(container);
    if (!click) {
      closePopup(el)
    }
  })
})

initialCards.forEach((elem) => {
  addCardPrepend(createCard(elem))
});

function createCard(elem) {
  const card = new Card(elem, '#user');
  const cardElement = card.generateCard();
  return cardElement
}

function addCardPrepend(elem) {
  element.prepend(elem);
}

cardAdd.addEventListener('submit', function (event) {
  event.preventDefault();
  const elem = ({ name: titleNewPlace.value, link: linkNewPlace.value });
  addCardPrepend(createCard(elem))
  cardAdd.reset();
  closePopup(newCardForm);
  validity.handleToggleButtonState(titleNewPlace)
})

const validity = new FormValidator(config, formValid);
validity.enableValidation();

const elemenstImg = document.querySelectorAll('.element__img');

elemenstImg.forEach((item) => {
  item.addEventListener('click', function () {
    openPopup(popupTypeImage)
  })
})