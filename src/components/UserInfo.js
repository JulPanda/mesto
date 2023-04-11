export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(aboutSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileJob.textContent,
      avatar: this._profileAvatar.src
    }    
  }

  setUserInfo(dataSet) {    
    this._profileName.textContent = dataSet.name;
    this._profileJob.textContent = dataSet.about;
    this._profileAvatar.src = dataSet.avatar;
    console.log(dataSet);
  }

  setUserAvatar(dataSet) {    
    this._profileAvatar = dataSet.avatar;
  }
}