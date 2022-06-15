const editForm = document.querySelector('.popup_form_edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const editFormName = document.querySelector('.popup__input_name');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const editFormOccupation = editForm.querySelector('.popup__input_occupation');
const editFormWrapper = document.querySelector('.popup__wrapper');
const newCardForm = document.querySelector('.popup_form_edit-pictures');
const editFormClose = document.querySelectorAll('.popup__close');
const imgPopup = document.querySelector('.popup_type_image');
const imgPopupTitle = imgPopup.querySelector('.popup__signature');
const imgPopupImage = imgPopup.querySelector('.popup__image');
const addCard = newCardForm.querySelector('.popup__wrapper');
const titleNewPlace = newCardForm.querySelector('.popup__input_title');
const linkNewPlace = newCardForm.querySelector('.popup__input_link');
const closeBtnEditForm = editForm.querySelector('.popup__close');
const closeBtnImgPopup = imgPopup.querySelector('.popup__close');
const closeBtnCardForm = newCardForm.querySelector('.popup__close');
const elements = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-button');
const userTemplate = document.querySelector('#user').content;
const cardTemplate = userTemplate.querySelector('.element')
const popupOverlay = document.querySelectorAll('.popup')
const popup = document.querySelectorAll('.popup');
const popupContainer = document.querySelectorAll('.popup__container')

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

// Закрытие попапа

function closePopup(elem) {
  elem.classList.remove('popup_active');
  document.removeEventListener('keydown', closeEscape)
}

closeBtnEditForm.addEventListener('click', function () {
  closePopup(editForm)
});

closeBtnImgPopup.addEventListener('click', function () {
  closePopup(imgPopup)
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

// Удаления карточки

function handleDeleteCard(evt) {
  evt.target.closest('.element').remove()
}

// Открытие формы добавления карточки

addButton.addEventListener('click', function () {
  openPopup(newCardForm);
});

// Создание карточек

function createCard(cardData) {
  const cloneCard = cardTemplate.cloneNode(true);
  const likeElement = cloneCard.querySelector('.element__like');
  const elementImg = cloneCard.querySelector('.element__img')
  const elementTitle = cloneCard.querySelector('.element__title');
  const trashElement = cloneCard.querySelector('.element__trash');
  elementTitle.textContent = cardData.name
  elementImg.src = cardData.link
  elementImg.alt = cardData.name
  likeElement.addEventListener('click', function () {
    likeElement.classList.toggle('element__like_active');
  })
  trashElement.addEventListener('click', handleDeleteCard)
  elementImg.addEventListener('click', function () {
    imgPopupImage.src = elementImg.src
    imgPopupTitle.textContent = elementTitle.textContent
    imgPopupImage.alt = elementTitle.textContent
    openPopup(imgPopup)
  });
  return cloneCard;
}

function renderCard(cardData) {
  const cloneCard = createCard(cardData);
  elements.prepend(cloneCard);
}

addCard.addEventListener('submit', function (event) {
  event.preventDefault();
  renderCard({ name: titleNewPlace.value, link: linkNewPlace.value });
  addCard.reset();
  closePopup(newCardForm);
  enableValidation(false);
})

// создание первых 6 карточек
initialCards.forEach(renderCard)

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








