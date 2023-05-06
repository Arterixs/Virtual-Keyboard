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
        this.logicShift(false);
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
        this.logicCapsLock(code);
        break;
      case 'ShiftLeft':
        this.logicShift(true);
        break;
      case 'ShiftRight':
        this.logicShift(true);
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

  logicCapsLock() {
    const { dataButtons, arrayBtn } = this.model;
    this.capsFlag = !this.capsFlag;
    arrayBtn.forEach((item, indx) => {
      const keyCode = dataButtons[indx].code;
      const keyContent = dataButtons[indx].keyShiftEN;
      if (`Key${keyContent}` === keyCode) {
        const copyItem = item;
        copyItem.textContent = this.capsFlag ? keyContent : dataButtons[indx].keyEng;
      }
    });
  }

  logicShift(flag) {
    const { dataButtons, arrayBtn } = this.model;
    arrayBtn.forEach((button, indx) => {
      const keyCode = dataButtons[indx].keyEng;
      const keyText = dataButtons[indx].keyShiftEN;
      if (keyText !== keyCode) {
        const copyButton = button;
        copyButton.textContent = flag ? keyText : dataButtons[indx].keyEng;
      }
    });
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
