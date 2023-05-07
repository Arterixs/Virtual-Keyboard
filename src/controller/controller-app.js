import { ViewApp } from '../view/view-app.js';
import { ModelApp } from '../model/model-app.js';
import { getNewString, getNewPositionCaret } from '../utils/helpers.js';

export class ControllerApp {
  constructor(root, dataBtn) {
    this.model = new ModelApp(dataBtn);
    const { dataButtons } = this.model;
    this.view = new ViewApp(root, dataButtons, this.setBtn.bind(this), this.setCodeBtn.bind(this));
    this.capsFlag = false;
  }

  setBtn(btn) {
    this.model.arrayBtn.push(btn);
  }

  setCodeBtn(code, index) {
    this.model.collectionCodeBtn.set(code, index);
  }

  keyUp(code) {
    if (this.model.collectionCodeBtn.has(code)) {
      const buttonIndex = this.model.collectionCodeBtn.get(code);
      const btn = this.model.arrayBtn[buttonIndex];
      btn.classList.remove('active');
      if (code === 'ShiftLeft' || code === 'ShiftRight') {
        this.logicUpperCase(code, false);
      }
    }
  }

  keyDown(code) {
    if (this.model.collectionCodeBtn.has(code)) {
      const buttonIndex = this.model.collectionCodeBtn.get(code);
      const btn = this.model.arrayBtn[buttonIndex];
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
        this.logicUpperCase(code, this.capsFlag);
        break;
      case 'ShiftLeft':
        this.logicUpperCase(code, true);
        break;
      case 'ShiftRight':
        this.logicUpperCase(code, true);
        break;
      case 'ControlLeft':
        break;
      case 'WakeUp':
        break;
      case 'AltLeft':
        break;
      case 'Space':
        this.controlerInputKey(code, ' ');
        break;
      case 'AltRight':
        break;
      case 'ControlRight':
        break;
      case 'ArrowLeft':
        this.selectLeft();
        break;
      case 'ArrowUp':
        this.selectUp();
        break;
      case 'ArrowRight':
        this.selectRight();
        break;
      case 'ArrowDown':
        this.selectDown();
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

  // //////////////////////////////////////////////////////////////////////////////////////////////////////////

  logicUpperCase(codeKey, flag) {
    const { dataButtons, arrayBtn } = this.model;
    const isCaps = codeKey === 'CapsLock';
    if (isCaps) this.capsFlag = !this.capsFlag;
    arrayBtn.forEach((button, indx) => {
      const { code, keyShiftEN, keyEng } = dataButtons[indx];
      const convertKeyCode = `Key${keyShiftEN}`;
      const isKeyLetter = convertKeyCode === code;
      if (isCaps && isKeyLetter) {
        const copyButton = button;
        copyButton.textContent = flag ? copyButton.textContent.toLowerCase() : copyButton.textContent.toUpperCase();
      }
      if (!isCaps && keyShiftEN !== keyEng) {
        this.shift(button, flag, isKeyLetter, keyShiftEN, keyEng);
      }
    });
  }

  shift(button, flag, isKeyLetter, keyShiftEN, keyEng) {
    const copyButton = button;
    if (isKeyLetter) {
      if (this.capsFlag) {
        copyButton.textContent = flag ? copyButton.textContent.toLowerCase() : copyButton.textContent.toUpperCase();
      } else {
        copyButton.textContent = flag ? copyButton.textContent.toUpperCase() : copyButton.textContent.toLowerCase();
      }
    } else {
      copyButton.textContent = flag ? keyShiftEN : keyEng;
    }
  }

  selectRight() {
    const selection = getSelection();
    selection.modify('move', 'right', 'character');
  }

  selectLeft() {
    const selection = getSelection();
    selection.modify('move', 'left', 'character');
  }

  selectUp() {
    const selection = getSelection();
    selection.modify('move', 'backward', 'line');
  }

  selectDown() {
    const selection = getSelection();
    selection.modify('move', 'forward', 'line');
  }
}
