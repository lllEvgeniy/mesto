import { DefaultCard, AddCard } from './Card.js'
import { FormValidator } from './FormValidator.js'

const editForm = document.querySelector('.popup_form_edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const editFormName = document.querySelector('.popup__input_name');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const editFormOccupation = editForm.querySelector('.popup__input_occupation');
const editFormWrapper = document.querySelector('.popup__wrapper');
const newCardForm = document.querySelector('.popup_form_edit-pictures');
const addCard = newCardForm.querySelector('.popup__wrapper');
const titleNewPlace = newCardForm.querySelector('.popup__input_title');
const linkNewPlace = newCardForm.querySelector('.popup__input_link');
const closeBtnEditForm = editForm.querySelector('.popup__close');
const closeBtnCardForm = newCardForm.querySelector('.popup__close');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelectorAll('.popup');
const formValid = { popup: '.popup__wrapper' }
const inputList = Array.from(document.querySelectorAll('.popup__input'));

const config = {
  errorMessage: '.popup__message-error_',
  inputList: inputList,
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

closeBtnEditForm.addEventListener('click', function () {
  closePopup(editForm)
});

closeBtnCardForm.addEventListener('click', function () {
  closePopup(newCardForm)
});

// Отрытие редактора профиля

editButton.addEventListener('click', function () {
  editFormName.value = profileName.textContent;
  editFormOccupation.value = profileOccupation.textContent;
  openPopup(editForm);
});

// Закрытие редактора профиля

editFormWrapper.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = editFormName.value;
  profileOccupation.textContent = editFormOccupation.value;
  closePopup(editForm);
});

// Открытие формы добавления карточки

addButton.addEventListener('click', function () {
  openPopup(newCardForm);
});

// закрытие вне дива
popup.forEach((el) => {
  el.addEventListener('mousedown', (e) => {
    const container = el.querySelector('.popup__container')
    const click = e.composedPath().includes(container);
    if (!click) {
      closePopup(el)
    }
  })
})

initialCards.forEach((item) => {
  const card = new DefaultCard(item, '#user');
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});


function renderCard(cardData) {
  const card = new AddCard(cardData, '#user');
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
}

addCard.addEventListener('submit', function (event) {
  event.preventDefault();
  renderCard({ name: titleNewPlace.value, link: linkNewPlace.value });
  addCard.reset();
  closePopup(newCardForm);
})

const valdity = new FormValidator(config, formValid);
valdity.enableValidation();