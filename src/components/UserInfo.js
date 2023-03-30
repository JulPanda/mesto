export default class UserInfo {
  constructor(userData) {
    this._profileName = document.querySelector(userData.nameSelector);
    this._profileJob = document.querySelector(userData.aboutSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileJob.textContent
    }
  }

  setUserInfo(dataSet) {
    this._profileName.textContent = dataSet.inputName;
    this._profileJob.textContent = dataSet.inputAbout;
  }
}