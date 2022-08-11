export default class UserInfo {
    constructor(objSelector) {
        this.title = objSelector.title
        this.subtitle = objSelector.subtitle
        this.avatar = objSelector.avatar

    }

    getUserInfo() {
        const data = {
            title: this.title.textContent,
            subtitle: this.subtitle.textContent,
        }
        return data
    }

    setUserInfo({ name, about, avatar, _id }) {
        this.title.textContent = name
        this.subtitle.textContent = about
        this.avatar.src = avatar
        this._id = _id
    }

    setAvatar(data) {
        this.avatar.src = data.avatar
    }

    getId(data) {
        this.id = data._id
    }

    returnId() {
        return this.id
    }

}
