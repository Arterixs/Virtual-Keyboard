export class ModelApp {
  constructor(dataBtn) {
    this.collectionCodeBtn = new Map();
    this.keysLang = new Set();
    this.arrayBtn = [];
    this.dataButtons = dataBtn;
    this.langEn = false;
    this.capsFlag = false;
  }

  setKeysLang(key) {
    this.keysLang.add(key);
  }

  cleanKeyLang() {
    this.keysLang.clear();
  }

  getSizeKeysLang() {
    return this.keysLang.size;
  }

  getLang() {
    return this.langEn;
  }

  swiftLang() {
    this.langEn = !this.langEn;
  }

  getCapsFlag() {
    return this.capsFlag;
  }

  swiftCapsFlag() {
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
