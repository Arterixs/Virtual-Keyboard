import { ViewApp } from '../view/view-app.js';
import { ModelApp } from '../model/model-app.js';
import { getNewString, getNewPositionCaret, arrowApi, checkKeysCaps } from '../utils/helpers.js';

export class ControllerApp {
  constructor(root, dataBtn) {
    this.model = new ModelApp(dataBtn);
    this.view = new ViewApp(root, this.model.getButtinsArray(), this.setBtn.bind(this), this.setCodeBtn.bind(this));
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
        this.logicUpperCase(code, false);
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
      console.log('переключил', this.set);
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
      console.log(code);
    }
  }

  checkKey(code, contentKey) {
    switch (code) {
      case 'Tab':
        this.controlerInputKey(code, '    ');
        break;
      case 'CapsLock':
        this.logicUpperCase(code, this.model.getCapsFlag());
        break;
      case 'ShiftLeft':
        this.logicUpperCase(code, true);
        this.setSet(code);
        break;
      case 'ShiftRight':
        this.logicUpperCase(code, true);
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

  logicUpperCase(codeKey, flag) {
    const { dataButtons, arrayBtn } = this.model;
    const isCaps = codeKey === 'CapsLock';
    if (isCaps) this.model.changeCapsFlag();
    arrayBtn.forEach((button, indx) => {
      const { code, keyShiftEN, keyRu, keyShiftRu, keyEng } = dataButtons[indx];
      const convertKeyCode = `Key${keyShiftEN}`;
      const isKeyLetter = convertKeyCode === code;
      if (isCaps && checkKeysCaps(code)) {
        const copyButton = button;
        copyButton.textContent = flag ? copyButton.textContent.toLowerCase() : copyButton.textContent.toUpperCase();
      }
      if (!isCaps && keyShiftEN !== keyEng) {
        this.shift(button, flag, isKeyLetter, keyShiftEN, keyEng, keyShiftRu, keyRu);
      }
    });
  }

  shift(button, flag, isKeyLetter, keyShiftEN, keyEng, keyShiftRu, keyRu) {
    const copyButton = button;
    if (isKeyLetter) {
      if (this.model.getCapsFlag()) {
        copyButton.textContent = flag ? copyButton.textContent.toLowerCase() : copyButton.textContent.toUpperCase();
      } else {
        copyButton.textContent = flag ? copyButton.textContent.toUpperCase() : copyButton.textContent.toLowerCase();
      }
    } else {
      const lang = this.lang ? keyRu : keyEng;
      const shiftLang = this.lang ? keyShiftRu : keyShiftEN;
      copyButton.textContent = flag ? shiftLang : lang;
    }
  }
}
