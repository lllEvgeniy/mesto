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
const imgElement = document.querySelectorAll('.element__img');
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

// открытие попапа
function openPopup(elem) {

  elem.classList.add('popup_active');
}
// Закрытие попапа

function closePopup(elem) {
  elem.classList.remove('popup_active');
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

  cloneCard.querySelector('.element__title').textContent = cardData.name
  cloneCard.querySelector('.element__img').src = cardData.link
  cloneCard.querySelector('.element__img').alt = cardData.name

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
})

// создание первых 6 карточек
initialCards.forEach(renderCard)



// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {  //
  // Находим элемент ошибки внутри самой функции
  const btnElement = formElement.querySelector('.popup__btn')
  const errorElement = formElement.querySelector(`.popup__input_message-error_${inputElement.name}`);
  // Остальной код такой же

  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input_message-error_active');
  btnElement.classList.add('popup__btn_disabled');
  btnElement.setAttribute('disabled', true);
  //formElement.removeEventListener('dblclick', doubleClickHandler)
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const btnElement = formElement.querySelector('.popup__btn');
  const errorElement = formElement.querySelector(`.popup__input_message-error_${inputElement.name}`);
  // Остальной код такой же
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input_message-error_active');
  errorElement.textContent = '';
  btnElement.classList.remove('popup__btn_disabled')
  btnElement.removeAttribute('disabled');
  //coverHeading.removeEventListener('dblclick', doubleClickHandler)
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {

    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {

    hideInputError(formElement, inputElement);
  }
};


const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
    });
  });
};


const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__wrapper'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();



//----------------------------------------------------------------------------

// $(document).mouseup(function (e) {
//   var container = $("YOUR CONTAINER SELECTOR");
//   if (container.has(e.target).length === 0){
//       container.hide();
//   }
// });



// document.addEventListener('click',  (e) => {
// const container = e.composedPath().includes(editFormWrapper);
// if ( ! container ) {
//   editFormWrapper.classList.remove('popup_active');
// }
// })


// popupOverlay.forEach((el) => {
//   el.addEventListener('click', () => {
//     el.classList.remove('popup_active');
//   })
// })


// popupOverlay.addEventListener('keydown', function (evt) {
//   if (evt.key === '27') {
//    console.log(evt);
//  }

// })
// popupOverlay.forEach((el) => {
//   el.addEventListener('keydown', (evt) => {
//     if (evt.key === 'Escape') {
//       console.log(evt);
//     el.classList.remove('popup_active');
//     }
//   })
// })



// function keyHandler(evt) {
//   if (evt.key === 'Enter') {
//     editFormWrapper.classList.remove('popup_active');
//   }
// }

