import { ViewApp } from '../view/view-app.js';
import { ModelApp } from '../model/model-app.js';
import { getNewString, getDeleteString, getDelString } from '../utils/helpers.js';

export class ControllerApp {
  constructor(root, dataBtn) {
    this.model = new ModelApp(dataBtn);
    const { dataButtons } = this.model;
    this.view = new ViewApp(root, dataButtons, this.setBtn.bind(this), this.setCodeBtn.bind(this));
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
        break;
      case 'ShiftLeft':
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
        break;
      case 'ArrowUp':
        break;
      case 'ArrowRight':
        break;
      case 'ArrowDown':
        break;
      case 'ShiftRight':
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
}
