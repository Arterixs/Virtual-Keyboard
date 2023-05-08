import { ViewApp } from '../view/view-app.js';
import { ModelApp } from '../model/model-app.js';
import { getNewString, getNewPositionCaret, arrowApi, checkKeysCaps, changeShiftTextContent } from '../utils/helpers.js';

export class ControllerApp {
  constructor(root, dataBtn) {
    this.model = new ModelApp(dataBtn);
    this.view = new ViewApp(root, this.model.getButtonsArray(), this.setBtn.bind(this), this.setCodeBtn.bind(this));
  }

  keyUp(code) {
    if (this.model.checkKeyCode(code)) {
      const buttonIndex = this.model.getKeyCode(code);
      const btn = this.model.getButton(buttonIndex);
      btn.classList.remove('active');
      if (code === 'ShiftLeft' || code === 'ShiftRight') {
        this.logicShift(false);
      }
      if (code === 'ShiftLeft' || code === 'AltLeft') {
        this.clearSet();
      }
    }
  }

  keyDown(code) {
    if (this.model.checkKeyCode(code)) {
      const buttonIndex = this.model.getKeyCode(code);
      const btn = this.model.getButton(buttonIndex);
      btn.classList.add('active');
      this.checkKey(code, btn.textContent);
    }
  }

  setBtn(btn) {
    this.model.setArrayBtn(btn);
  }

  setCodeBtn(code, index) {
    this.model.setKeyCode(code, index);
  }

  clearSet() {
    this.model.cleanKeyLang();
  }

  checkKeysLang() {
    const amountKeysPress = this.model.getSizeKeysLang();
    if (amountKeysPress === 2) {
      this.model.swiftLang();
      this.changeLanguage();
    }
  }

  setKeyLang(code) {
    this.model.setKeysLang(code);
    this.checkKeysLang();
  }

  checkKey(code, contentKey) {
    switch (code) {
      case 'Tab':
        this.controlerInputKey(code, '    ');
        break;
      case 'CapsLock':
        this.model.swiftCapsFlag();
        this.logicCapsLock(this.model.getCapsFlag());
        break;
      case 'ShiftLeft':
        this.logicShift(true);
        this.setKeyLang(code);
        break;
      case 'ShiftRight':
        this.logicShift(true);
        break;
      case 'ControlLeft':
        break;
      case 'WakeUp':
        break;
      case 'AltLeft':
        this.setKeyLang(code);
        break;
      case 'Space':
        this.controlerInputKey(code, ' ');
        break;
      case 'AltRight':
        break;
      case 'ControlRight':
        break;
      case 'ArrowLeft':
        arrowApi('left', 'character');
        break;
      case 'ArrowUp':
        arrowApi('backward', 'line');
        break;
      case 'ArrowRight':
        arrowApi('right', 'character');
        break;
      case 'ArrowDown':
        arrowApi('forward', 'line');
        break;
      case 'Enter':
        this.controlerInputKey(code, '\n');
        break;
      case 'Backspace':
        this.controlerInputKey(code);
        break;
      case 'Delete':
        this.controlerInputKey(code);
        break;
      default:
        this.controlerInputKey(code, contentKey);
        break;
    }
  }

  controlerInputKey(code, content = '') {
    const { textarea } = this.view;
    const positionCaret = textarea.selectionStart;
    const newLine = getNewString(positionCaret, textarea.value, content, code);
    if (textarea.value.length !== positionCaret) {
      const newPosCaret = getNewPositionCaret(code, positionCaret, content);
      textarea.value = newLine;
      textarea.selectionStart = newPosCaret;
      textarea.selectionEnd = newPosCaret;
    } else {
      textarea.value = newLine;
    }
    textarea.focus();
  }

  changeLanguage() {
    const { dataButtons, arrayBtn } = this.model;
    const currentLang = this.model.getLang();
    arrayBtn.forEach((button, indx) => {
      const { keyRu, keyEng } = dataButtons[indx];
      const copyButton = button;
      copyButton.textContent = currentLang ? keyRu : keyEng;
    });
  }

  logicCapsLock(isCaps) {
    const { dataButtons, arrayBtn } = this.model;
    arrayBtn.forEach((button, indx) => {
      const { code } = dataButtons[indx];
      if (checkKeysCaps(code)) {
        const copyButton = button;
        copyButton.textContent = isCaps ? copyButton.textContent.toUpperCase() : copyButton.textContent.toLowerCase();
      }
    });
  }

  logicShift(isShift) {
    const { dataButtons, arrayBtn } = this.model;
    const isCaps = this.model.getCapsFlag();
    const currentLang = this.model.getLang();
    arrayBtn.forEach((button, indx) => {
      const { code, keyShiftRu, keyShiftEN, keyRu, keyEng } = dataButtons[indx];
      if (!checkKeysCaps(code)) return;
      const isKeyLetter = `Key${keyShiftEN}` === code;
      const copyButton = button;
      if (isKeyLetter) {
        changeShiftTextContent(button, isShift, isCaps);
      } else {
        const loverCaseLang = currentLang ? keyRu : keyEng;
        const upperCaseLang = currentLang ? keyShiftRu : keyShiftEN;
        copyButton.textContent = isShift ? upperCaseLang : loverCaseLang;
        changeShiftTextContent(button, isShift, isCaps);
      }
    });
  }
}
