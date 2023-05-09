import { ViewApp } from '../view/view-app.js';
import { ModelApp } from '../model/model-app.js';
import { getNewString, getNewPositionCaret, arrowApi, checkKeysCaps, changeShiftTextContent } from '../utils/helpers.js';

export class ControllerApp {
  constructor(root, dataBtn) {
    this.model = new ModelApp(dataBtn);
    this.view = new ViewApp(root, this.model.getButtonsArray(), this.setBtn.bind(this), this.setCodeBtn.bind(this));
    this.setListener();
  }

  setListener() {
    const { dataButtons, arrayBtn } = this.model;
    arrayBtn.forEach((button, indx) => {
      const { code } = dataButtons[indx];
      this.checkKey(code, button.textContent, button);
    });
  }

  keyUp(code) {
    if (this.model.checkKeyCode(code)) {
      const btn = this.getCurrentButton(code);
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
      const btn = this.getCurrentButton(code);
      btn.classList.add('active');
      this.checkKey(code, btn.textContent);
    }
  }

  getCurrentButton(code) {
    const buttonIndex = this.model.getKeyCode(code);
    return this.model.getButton(buttonIndex);
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

  checkKey(code, contentKey, button = null) {
    switch (code) {
      case 'Tab':
        if (button) {
          button.onclick = () => this.controlerInputKey(code, '    ');
          break;
        }
        this.controlerInputKey(code, '    ');
        break;
      case 'CapsLock':
        if (button) {
          button.onclick = () => this.logicCapsLock();
          break;
        }
        this.logicCapsLock();
        break;
      case 'ShiftLeft':
        if (button) {
          button.onmousedown = () => (this.logicShift(true), this.setKeyLang(code));
          button.onmouseup = () => (this.logicShift(false), this.clearSet());
          button.onmouseout = () => (this.logicShift(false), this.clearSet());
          break;
        }
        this.logicShift(true);
        this.setKeyLang(code);
        break;
      case 'ShiftRight':
        if (button) {
          button.onmousedown = () => this.logicShift(true);
          button.onmouseup = () => this.logicShift(false);
          button.onmouseout = () => this.logicShift(false);
          break;
        }
        this.logicShift(true);
        break;
      case 'AltLeft':
        if (button) {
          button.onmousedown = () => this.setKeyLang(code);
          button.onmouseup = () => this.clearSet();
          button.onmouseout = () => this.clearSet();
          break;
        }
        this.setKeyLang(code);
        break;
      case 'Space':
        if (button) {
          button.onclick = () => this.controlerInputKey(code, ' ');
          break;
        }
        this.controlerInputKey(code, ' ');
        break;
      case 'ArrowLeft':
        if (button) {
          button.onclick = () => arrowApi('left', 'character');
          break;
        }
        arrowApi('left', 'character');
        break;
      case 'ArrowUp':
        if (button) {
          button.onclick = () => arrowApi('backward', 'line');
          break;
        }
        arrowApi('backward', 'line');
        break;
      case 'ArrowRight':
        if (button) {
          button.onclick = () => arrowApi('right', 'character');
          break;
        }
        arrowApi('right', 'character');
        break;
      case 'ArrowDown':
        if (button) {
          button.onclick = () => arrowApi('forward', 'line');
          break;
        }
        arrowApi('forward', 'line');
        break;
      case 'Enter':
        if (button) {
          button.onclick = () => this.controlerInputKey(code, '\n');
          break;
        }
        this.controlerInputKey(code, '\n');
        break;
      case 'Backspace':
        if (button) {
          button.onclick = () => this.controlerInputKey(code);
          break;
        }
        this.controlerInputKey(code);
        break;
      case 'Delete':
        if (button) {
          button.onclick = () => this.controlerInputKey(code);
          break;
        }
        this.controlerInputKey(code);
        break;
      case 'ControlLeft':
      case 'WakeUp':
      case 'AltRight':
      case 'ControlRight':
        break;
      default:
        if (button) {
          button.onclick = () => this.controlerInputKey(code, contentKey, true);
          break;
        }
        this.controlerInputKey(code, contentKey);
        break;
    }
  }

  controlerInputKey(code, content = '', click = false) {
    const { textarea } = this.view;
    const positionCaret = textarea.selectionStart;
    let value = content;
    if (click) {
      const btn = this.getCurrentButton(code);
      value = btn.textContent;
    }
    const newLine = getNewString(positionCaret, textarea.value, value, code);
    if (textarea.value.length !== positionCaret) {
      const newPosCaret = getNewPositionCaret(code, positionCaret, value);
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

  logicCapsLock() {
    this.model.swiftCapsFlag();
    const isCaps = this.model.getCapsFlag();
    const { dataButtons, arrayBtn } = this.model;
    arrayBtn.forEach((button, indx) => {
      const { code } = dataButtons[indx];
      if (checkKeysCaps(code)) {
        button.textContent = isCaps ? button.textContent.toUpperCase() : button.textContent.toLowerCase();
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
      if (isKeyLetter) {
        changeShiftTextContent(button, isShift, isCaps);
      } else {
        const loverCaseLang = currentLang ? keyRu : keyEng;
        const upperCaseLang = currentLang ? keyShiftRu : keyShiftEN;
        button.textContent = isShift ? upperCaseLang : loverCaseLang;
        changeShiftTextContent(button, isShift, isCaps);
      }
    });
  }
}
