//-----------------------------------------------------------------------------//
const editForm = document.querySelector('div.edit-form')
const editButton = document.querySelector('button.profile__edit-button')
const editFormName = document.querySelector('input[name="name"]')
const profileName = document.querySelector('h1.profile__name');
const profileOccupation = document.querySelector('p.profile__occupation');
const editFormOccupation = document.querySelector('input[name="occupation"]');
const editFormWrapper = document.querySelector('form.edit-form__wrapper')

editButton.addEventListener('click', function () {
  editForm.classList.add('edit-form_active');
  editFormName.value = profileName.textContent;
  editFormOccupation.value = profileOccupation.textContent;
});

editFormWrapper.addEventListener('submit', function () {
  profileName.textContent = editFormName.value;
  profileOccupation.textContent = editFormOccupation.value;
  event.preventDefault();
  closeForm();
});



// 1 Шесть карточек «из коробки»

const userTemplate = document.querySelector('#user').content;
const elements = document.querySelector('section.elements');
const userElementOne = userTemplate.querySelector('.element').cloneNode(true);
const userElementTwo = userTemplate.querySelector('.element').cloneNode(true);
const userElementThree = userTemplate.querySelector('.element').cloneNode(true);
const userElementFour = userTemplate.querySelector('.element').cloneNode(true);
const userElementFive = userTemplate.querySelector('.element').cloneNode(true);
const userElementSix = userTemplate.querySelector('.element').cloneNode(true);

elements.append(userElementOne);
elements.append(userElementTwo);
elements.append(userElementThree);
elements.append(userElementFour);
elements.append(userElementFive);
elements.append(userElementSix);

userElementOne.querySelector('.element__img').src = '../img/karchevsk.jpg';
userElementOne.querySelector('.element__img').alt = 'Старое здание в Карачаевске';
userElementOne.querySelector('.element__title').textContent = 'Карачаевск';

userElementTwo.querySelector('.element__img').src = '../img/montain.jpg';
userElementTwo.querySelector('.element__img').alt = 'Гора в дали на закате';
userElementTwo.querySelector('.element__title').textContent = 'Гора Эльбрус';

userElementThree.querySelector('.element__img').src = '../img/dombai.jpg';
userElementThree.querySelector('.element__img').alt = 'Гора Домбай';
userElementThree.querySelector('.element__title').textContent = 'Домбай';

userElementFour.querySelector('.element__img').src = '../img/montain2.jpg';
userElementFour.querySelector('.element__img').alt = 'Гора в дали на закате';
userElementFour.querySelector('.element__title').textContent = 'Гора Эльбрус';

userElementFive.querySelector('.element__img').src = '../img/dombai2.jpg';
userElementFive.querySelector('.element__img').alt = 'Гора Домбай';
userElementFive.querySelector('.element__title').textContent = 'Домбай';

userElementSix.querySelector('.element__img').src = '../img/karachaevo.jpg';
userElementSix.querySelector('.element__img').alt = 'Старое здание в Карачаевске';
userElementSix.querySelector('.element__title').textContent = 'Карачаево-Ч...';

// 2 Форма добавления карточки

const page = document.querySelector('div.page')
const addButton = document.querySelector('button.profile__add-button')
const newCardForm = page.lastElementChild;

addButton.addEventListener('click', function () {
  newCardForm.classList.add('edit-form_active');
});

// 3 Добавление карточки

const addCard = newCardForm.querySelector('form.edit-form__wrapper')
const titleNewPlace = newCardForm.querySelector('input[name="name"]')
const linkNewPlace = newCardForm.querySelector('input[name="occupation"]');

addCard.addEventListener('submit', function () {
  event.preventDefault();
  const cloneCard = userTemplate.querySelector('.element').cloneNode(true);
  elements.prepend(cloneCard);
  cloneCard.querySelector('.element__img').src = linkNewPlace.value;
  cloneCard.querySelector('.element__title').textContent = titleNewPlace.value;
  const elementImg = cloneCard.querySelector('img.element__img')
  const elementTitle = cloneCard.querySelector('h2.element__title')
  elementImg.addEventListener('click', function () {
    imgPopup.classList.add('img-popup_active');
    imgPopupImage.src = elementImg.src
    imgPopupTitle.textContent = elementTitle.textContent

  });


  const trashElement = cloneCard.querySelector('img.element__trash')
  trashElement.addEventListener('click', function (item) {
    trashElement.parentNode.parentNode.removeChild(trashElement.parentNode);
  });
  const likeElement = cloneCard.querySelector('button.element__like')
  likeElement.addEventListener('click', function () {
    likeElement.classList.toggle('element__like_active');
  })
  closeForm();
});

// 4 Лайк карточки

const likeElement = document.querySelectorAll('button.element__like')
likeElement.forEach(function (searchLike) {
  searchLike.addEventListener('click', function (searchStop) {
    searchStop.stopPropagation();
    this.classList.toggle('element__like_active');
  });
});


// 5 Удаление карточки

const trashElement = document.querySelectorAll('img.element__trash')
trashElement.forEach(function (item) {
  item.addEventListener('click', function () {
    item.parentNode.parentNode.removeChild(item.parentNode);
  });
});

// 6 Открытие попапа с картинкой

const imgElement = document.querySelectorAll('img.element__img')
const imgPopup = document.querySelector('div.img-popup')
const imgPopupTitle = document.querySelector('figcaption.img-popup__title')
const imgPopupImage = document.querySelector('img.img-popup__image')

imgElement.forEach(function (item) {
  item.addEventListener('click', function () {
    imgPopup.classList.add('img-popup_active');
    imgPopupImage.src = item.src
    imgPopupImage.alt = item.alt
    const elementTitle = item.parentNode.querySelector('h2.element__title')
    imgPopupTitle.textContent = elementTitle.textContent
  });
});

// Закрытие попапа

const closeImgPopup = document.querySelector('button.img-popup__close')

closeImgPopup.addEventListener('click', function () {
  imgPopup.classList.remove('img-popup_active')
})

const editFormClose = document.querySelectorAll('button.edit-form__close')


function closeForm() {
  let editFormActive = document.querySelector('div.edit-form_active')
  editFormActive.classList.remove('edit-form_active')
}

editFormClose.forEach((button) => {
  button.addEventListener('click', closeForm);
});

