import { ViewApp } from '../view/view-app.js';
import { ModelApp } from '../model/model-app.js';
import { getNewString, getNewPositionCaret, arrowApi, checkKeysCaps } from '../utils/helpers.js';

export class ControllerApp {
  constructor(root, dataBtn) {
    this.model = new ModelApp(dataBtn);
    this.view = new ViewApp(root, this.model.getButtonsArray(), this.setBtn.bind(this), this.setCodeBtn.bind(this));
    this.set = new Set();
    this.lang = false;
  }

  setBtn(btn) {
    this.model.setArrayBtn(btn);
  }

  setCodeBtn(code, index) {
    this.model.setKeyCode(code, index);
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

  clearSet() {
    this.set.clear();
  }

  checkSet() {
    if (this.set.size === 2) {
      this.lang = !this.lang;
      this.swiftLanguage();
    }
  }

  setSet(code) {
    this.set.add(code);
    this.checkSet();
  }

  keyDown(code) {
    if (this.model.checkKeyCode(code)) {
      const buttonIndex = this.model.getKeyCode(code);
      const btn = this.model.getButton(buttonIndex);
      btn.classList.add('active');
      this.checkKey(code, btn.textContent);
    }
  }

  checkKey(code, contentKey) {
    switch (code) {
      case 'Tab':
        this.controlerInputKey(code, '    ');
        break;
      case 'CapsLock':
        this.model.changeCapsFlag();
        this.logicCapsLock(this.model.getCapsFlag());
        break;
      case 'ShiftLeft':
        this.logicShift(true);
        this.setSet(code);
        break;
      case 'ShiftRight':
        this.logicShift(true);
        break;
      case 'ControlLeft':
        break;
      case 'WakeUp':
        break;
      case 'AltLeft':
        this.setSet(code);
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

  swiftLanguage() {
    const { dataButtons, arrayBtn } = this.model;
    arrayBtn.forEach((button, indx) => {
      const { keyRu, keyEng } = dataButtons[indx];
      const copyButton = button;
      copyButton.textContent = this.lang ? keyRu : keyEng;
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
    arrayBtn.forEach((button, indx) => {
      const { code, keyShiftRu, keyShiftEN, keyRu, keyEng } = dataButtons[indx];
      if (!checkKeysCaps(code)) return;
      const convertKeyCode = `Key${keyShiftEN}`;
      const isKeyLetter = convertKeyCode === code;
      const copyButton = button;
      if (isKeyLetter) {
        if (isShift) {
          copyButton.textContent = isCaps ? copyButton.textContent.toLowerCase() : copyButton.textContent.toUpperCase();
        } else {
          copyButton.textContent = isCaps ? copyButton.textContent.toUpperCase() : copyButton.textContent.toLowerCase();
        }
      } else {
        const loverCaseLang = this.lang ? keyRu : keyEng;
        const upperCaseLang = this.lang ? keyShiftRu : keyShiftEN;
        copyButton.textContent = isShift ? upperCaseLang : loverCaseLang;
        if (isShift) {
          copyButton.textContent = isCaps ? copyButton.textContent.toLowerCase() : copyButton.textContent.toUpperCase();
        } else {
          copyButton.textContent = isCaps ? copyButton.textContent.toUpperCase() : copyButton.textContent.toLowerCase();
        }
      }
    });
  }
}
