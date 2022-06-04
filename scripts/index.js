//-----------------------------------------------------------------------------//
const editForm = document.querySelector('.popup_form_edit-profile');
const editButton = document.querySelector('button.profile__edit-button');
const editFormName = document.querySelector('input[name="name"]');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const editFormOccupation = document.querySelector('input[name="occupation"]');
const popupFormEditProfile = document.querySelector('.popup__form_edit-profile');
const editFormWrapper = document.querySelector('.popup__wrapper');
const newCardForm = document.querySelector('.popup_form_edit-pictures');
const editFormClose = document.querySelectorAll('.popup__close');


// открытие попапа ---------------------
function openPopup(elem) {
  elem.classList.add('popup_active');
}
// Закрытие попапа ------------------------------

editFormClose.forEach(function (btn) {
  btn.addEventListener('click', function () {
    let editFormActive = document.querySelector('.popup_active');
    closePopup(editFormActive)
  });
});

function closePopup(elem) {
  elem.classList.remove('popup_active');
}
//--------------------------------------------------

editButton.addEventListener('click', function () {
  openPopup(editForm);
  editFormName.value = profileName.textContent;
  editFormOccupation.value = profileOccupation.textContent;
});

editFormWrapper.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = editFormName.value;
  profileOccupation.textContent = editFormOccupation.value;
  closePopup(editForm);
});

// 1 Шесть карточек «из коробки»
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const userTemplate = document.querySelector('#user').content;
const elements = document.querySelector('section.elements');

initialCards.forEach(initialCard => {
  const cloneCard = userTemplate.querySelector('.element').cloneNode(true);
  cloneCard.querySelector('.element__img').src = initialCard.link;
  cloneCard.querySelector('.element__title').textContent = initialCard.name;
  elements.prepend(cloneCard);


  const trashElement = cloneCard.querySelector('.element__trash');
  trashElement.addEventListener('click', function () {
    trashElement.closest('.element').remove()
  })


  const likeElement = cloneCard.querySelector('.element__like');
  likeElement.addEventListener('click', function () {
    likeElement.classList.toggle('element__like_active');
  })
});

// 2 Форма добавления карточки
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', function () {
  openPopup(newCardForm);
});

// 3 Добавление карточки

const addCard = newCardForm.querySelector('.popup__wrapper');
const titleNewPlace = newCardForm.querySelector('input[name="name"]');
const linkNewPlace = newCardForm.querySelector('input[name="occupation"]');

addCard.addEventListener('submit', function (event) {
  event.preventDefault();
  const cloneCard = userTemplate.querySelector('.element').cloneNode(true);
  elements.prepend(cloneCard);
  cloneCard.querySelector('.element__img').src = linkNewPlace.value;
  cloneCard.querySelector('.element__title').textContent = titleNewPlace.value;
  const elementImg = cloneCard.querySelector('.element__img');
  const elementTitle = cloneCard.querySelector('.element__title');
  elementImg.addEventListener('click', function () {
    imgPopup.classList.add('popup_active');
    imgPopupImage.src = elementImg.src
    imgPopupTitle.textContent = elementTitle.textContent
  });
  const trashElement = cloneCard.querySelector('.element__trash');
  trashElement.addEventListener('click', function () {
    trashElement.closest('.element').remove()
  });
  const likeElement = cloneCard.querySelector('.element__like');
  likeElement.addEventListener('click', function () {
    likeElement.classList.toggle('element__like_active');
  })
  addCard.reset();
  closePopup(newCardForm);
});

// 6 Открытие попапа с картинкой

const imgElement = document.querySelectorAll('.element__img');
const imgPopup = document.querySelector('.popup_form_img');
const imgPopupTitle = imgPopup.querySelector('.popup__signature');
const imgPopupImage = imgPopup.querySelector('.popup__image');

imgElement.forEach(function (item) {
  item.addEventListener('click', function () {
    imgPopup.classList.add('popup_active');
    imgPopupImage.src = item.src;
    imgPopupImage.alt = item.alt;
    const element = item.closest('.element');
    const elementTitle = element.querySelector('.element__title');
    imgPopupTitle.textContent = elementTitle.textContent;
  });
});




