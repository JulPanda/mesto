export default class UserInfo {
  constructor(userData) {
    this._ProfileName = document.querySelector(userData.nameSelector);
    this._ProfileJob = document.querySelector(userData.aboutSelector);
  }

  getUserInfo() {
    return {
      name: this._ProfileName.textContent,
      about: this._ProfileJob.textContent
    }
  }

  setUserInfo(dataSet) {
    this._ProfileName.textContent = dataSet.inputName;
    this._ProfileJob.textContent = dataSet.inputAbout;
  }
}