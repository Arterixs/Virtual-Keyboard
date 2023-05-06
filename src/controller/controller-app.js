import { ViewApp } from '../view/view-app.js';
import { ModelApp } from '../model/model-app.js';
import { getNewString, getDeleteString, getDelString } from '../utils/helpers.js';

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
        this.inputText('    ');
        break;
      case 'CapsLock':
        this.logicCapsLock(code);
        break;
      case 'ShiftLeft' || 'ShiftRight':
        this.logicShift(true);
        break;
      case 'ControlLeft':
        break;
      case 'WakeUp':
        break;
      case 'AltLeft':
        break;
      case 'Space':
        this.inputText(' ');
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
        this.pressEnter();
        break;
      case 'Backspace':
        this.logicBackspace();
        break;
      case 'Delete':
        this.logicDelete();
        break;
      default:
        this.inputText(contentKey);
        break;
    }
  }

  inputText(content) {
    const { textarea } = this.view;
    const positionCaret = textarea.selectionStart;
    if (textarea.value.length !== positionCaret) {
      const newString = getNewString(positionCaret, textarea.value, content);
      const updatePositionCaret = positionCaret + content.length;
      textarea.value = newString;
      textarea.selectionStart = updatePositionCaret;
      textarea.selectionEnd = updatePositionCaret;
    } else {
      textarea.value += content;
    }
    textarea.focus();
  }

  pressEnter() {
    const { textarea } = this.view;
    const positionCaret = textarea.selectionStart;
    const content = '\n';
    if (textarea.value.length !== positionCaret) {
      const newString = getNewString(positionCaret, textarea.value, content);
      const updatePositionCaret = positionCaret + 1;
      textarea.value = newString;
      textarea.selectionStart = updatePositionCaret;
      textarea.selectionEnd = updatePositionCaret;
    } else {
      textarea.value += content;
    }
    textarea.focus();
  }

  logicBackspace() {
    const { textarea } = this.view;
    const positionCaret = textarea.selectionStart;
    if (textarea.value.length !== positionCaret) {
      const newString = getDeleteString(positionCaret, textarea.value);
      const updatePositionCaret = positionCaret ? positionCaret - 1 : positionCaret;
      textarea.value = newString;
      textarea.selectionStart = updatePositionCaret;
      textarea.selectionEnd = updatePositionCaret;
    } else {
      textarea.value = getDeleteString(positionCaret, textarea.value);
    }
    textarea.focus();
  }

  logicDelete() {
    const { textarea } = this.view;
    const positionCaret = textarea.selectionStart;
    if (textarea.value.length !== positionCaret) {
      const newString = getDelString(positionCaret, textarea.value);
      const updatePositionCaret = positionCaret;
      textarea.value = newString;
      textarea.selectionStart = updatePositionCaret;
      textarea.selectionEnd = updatePositionCaret;
    } else {
      textarea.value = getDelString(positionCaret, textarea.value);
    }
    textarea.focus();
  }

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
