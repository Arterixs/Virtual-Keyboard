export class ModelApp {
  constructor(dataBtn) {
    this.collectionCodeBtn = new Map();
    this.arrayBtn = [];
    this.dataButtons = dataBtn;
    this.capsFlag = false;
  }

  getCapsFlag() {
    return this.capsFlag;
  }

  changeCapsFlag() {
    this.capsFlag = !this.capsFlag;
  }

  setArrayBtn(button) {
    this.arrayBtn.push(button);
  }

  getButtonsArray() {
    return this.dataButtons;
  }

  getButton(index) {
    return this.arrayBtn[index];
  }

  setKeyCode(code, iteration) {
    this.collectionCodeBtn.set(code, iteration);
  }

  getKeyCode(code) {
    return this.collectionCodeBtn.get(code);
  }

  checkKeyCode(code) {
    return this.collectionCodeBtn.has(code);
  }
}
