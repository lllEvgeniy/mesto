let page = document.querySelector('.page');
let editForm = page.querySelector('.edit-form');
let content = page.querySelector('.content');
let elements = content.querySelector('.elements');
let element = elements.querySelector('.element');
let elementWrapper = element.querySelector('.element__wrapper');
let profile = content.querySelector('.profile');
let profileWrapper = profile.querySelector('.profile__wrapper');
let profileInfo = profileWrapper.querySelector('.profile__info');
let profileOccupation = profileInfo.querySelector('.profile__occupation');
let profileTitle = profileInfo.querySelector('.profile__title');
let profileName = profileTitle.querySelector('.profile__name');
let editButton = profileTitle.querySelector('.profile__edit-button');
let editFormWrapper = editForm.querySelector('.edit-form__wrapper');
let editFormOccupation = editFormWrapper.querySelector('.edit-form__occupation');
let editFormName = editFormWrapper.querySelector('.edit-form__name');
let editFormClose = editForm.querySelector('.edit-form__close');
let editFormBtn = editFormWrapper.querySelector('.edit-form__btn');

function editFormOpen(){
    editForm.classList.add('edit-form__active');
}
  editButton.addEventListener('click', editFormOpen)

  function FormClose(){
    editForm.classList.remove('edit-form__active')
  }
  editFormClose.addEventListener('click', FormClose)


function editFormSaved(){
    profileName.innerHTML = `<h1 class="profile__name">${editFormName.value}</h1>
  `;
  profileOccupation.innerHTML = ` <p class="profile__occupation">
  ${editFormOccupation.value}
</p>
  `;

  editForm.classList.remove('edit-form__active')
}
  editFormBtn.addEventListener('click', editFormSaved)




