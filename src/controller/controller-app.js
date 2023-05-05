import { ViewApp } from '../view/view-app.js';
import { ModelApp } from '../model/model-app.js';

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
        break;
      case 'Backspace':
        break;
      case 'Delete':
        break;
      default:
        this.inputText(contentKey);
        break;
    }
  }

  inputText(content) {
    const { textarea } = this.view;
    textarea.value += content;
  }
}
