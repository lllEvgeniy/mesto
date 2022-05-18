let page = document.querySelector('div.page');
let profileInfo = page.querySelector('main.content > section.profile > div.profile__wrapper > div.profile__info');
let profileTitle = profileInfo.querySelector('div.profile__title');
let editButton = profileTitle.querySelector('button.profile__edit-button');
let editForm = page.querySelector('div.edit-form');
let editFormWrapper = editForm.querySelector('form.edit-form__wrapper');
let editFormName = editFormWrapper.querySelector('input[name="name"]');
let profileName = profileTitle.querySelector('h1.profile__name');
let profileOccupation = profileInfo.querySelector('p.profile__occupation');
let editFormOccupation = editFormWrapper.querySelector('input[name="occupation"]');
let editFormClose = editFormWrapper.querySelector('button.edit-form__close');

function editFormOpen() {
  editForm.classList.add('edit-form_active');
  editFormName.value = profileName.textContent;
  editFormOccupation.value = profileOccupation.textContent;
};
editButton.addEventListener('click', editFormOpen);

function CloseForm() {
  editForm.classList.remove('edit-form_active');
};
editFormClose.addEventListener('click', CloseForm);

function editFormSaved(event) {
  profileName.textContent = editFormName.value;
  profileOccupation.textContent = editFormOccupation.value;
  event.preventDefault();
};
editFormWrapper.addEventListener('submit', editFormSaved);
editFormWrapper.addEventListener('submit', CloseForm);



