const formEdit = document.querySelector('.popup_form_edit-profile');

export default class UserInfo {
    constructor(objSelector) {
        this.title = objSelector.title
        this.subtitle = objSelector.subtitle


    }

    getUserInfo() {
        const data = {
            title: this.title.textContent,
            subtitle: this.subtitle.textContent
        }
        return data
    }

    setUserInfo(data) {
        this.title.textContent = data.name
        this.subtitle.textContent = data.occupation
    }
}