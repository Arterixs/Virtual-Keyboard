import { ViewApp } from '../view/view-app.js';
import { ModelApp } from '../model/model-app.js';
import { getNewString, getNewPositionCaret, arrowApi, checkKeysCaps, changeShiftTextContent } from '../utils/helpers.js';
import {
  ENTER,
  TAB,
  CAPS_LOCK,
  SHIFT_LEFT,
  SHIFT_RIGHT,
  ALT_LEFT,
  SPACE,
  ARROW_DOWN,
  ARROW_RIGHT,
  ARROW_LEFT,
  ARROW_UP,
  BACKSPACE,
  DELETE,
  CONTROL_LEFT,
  CONTROL_RIGHT,
  WIN,
  ALT_RIGHT,
} from '../utils/constants/code-key.js';

export class ControllerApp {
  constructor(root, dataBtn) {
    this.model = new ModelApp(dataBtn);
    const isLang = this.model.getLang();
    const isCaps = this.model.getCapsFlag();
    this.view = new ViewApp(
      root,
      this.model.getButtonsArray(),
      this.setBtn.bind(this),
      this.setCodeBtn.bind(this),
      isLang,
      isCaps
    );
    this.hangListeners();
  }

  hangListeners() {
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
      if (code === SHIFT_LEFT || code === SHIFT_RIGHT) {
        this.logicShift(false);
      }
      if (code === SHIFT_LEFT || code === ALT_LEFT) {
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
      case TAB:
        if (button) {
          button.onclick = () => this.controlerInputKey(code, '    ');
          break;
        }
        this.controlerInputKey(code, '    ');
        break;
      case CAPS_LOCK:
        if (button) {
          button.onclick = () => this.logicCapsLock();
          break;
        }
        this.logicCapsLock();
        break;
      case SHIFT_LEFT:
        if (button) {
          button.onmousedown = () => (this.logicShift(true), this.setKeyLang(code));
          button.onmouseup = () => (this.logicShift(false), this.clearSet());
          button.onmouseout = () => (this.logicShift(false), this.clearSet());
          break;
        }
        this.logicShift(true);
        this.setKeyLang(code);
        break;
      case SHIFT_RIGHT:
        if (button) {
          button.onmousedown = () => this.logicShift(true);
          button.onmouseup = () => this.logicShift(false);
          button.onmouseout = () => this.logicShift(false);
          break;
        }
        this.logicShift(true);
        break;
      case ALT_LEFT:
        if (button) {
          button.onmousedown = () => this.setKeyLang(code);
          button.onmouseup = () => this.clearSet();
          button.onmouseout = () => this.clearSet();
          break;
        }
        this.setKeyLang(code);
        break;
      case SPACE:
        if (button) {
          button.onclick = () => this.controlerInputKey(code, ' ');
          break;
        }
        this.controlerInputKey(code, ' ');
        break;
      case ARROW_LEFT:
        if (button) {
          button.onclick = () => arrowApi('left', 'character');
          break;
        }
        arrowApi('left', 'character');
        break;
      case ARROW_UP:
        if (button) {
          button.onclick = () => arrowApi('backward', 'line');
          break;
        }
        arrowApi('backward', 'line');
        break;
      case ARROW_RIGHT:
        if (button) {
          button.onclick = () => arrowApi('right', 'character');
          break;
        }
        arrowApi('right', 'character');
        break;
      case ARROW_DOWN:
        if (button) {
          button.onclick = () => arrowApi('forward', 'line');
          break;
        }
        arrowApi('forward', 'line');
        break;
      case ENTER:
        if (button) {
          button.onclick = () => this.controlerInputKey(code, '\n');
          break;
        }
        this.controlerInputKey(code, '\n');
        break;
      case BACKSPACE:
        if (button) {
          button.onclick = () => this.controlerInputKey(code);
          break;
        }
        this.controlerInputKey(code);
        break;
      case DELETE:
        if (button) {
          button.onclick = () => this.controlerInputKey(code);
          break;
        }
        this.controlerInputKey(code);
        break;
      case CONTROL_LEFT:
      case WIN:
      case ALT_RIGHT:
      case CONTROL_RIGHT:
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
