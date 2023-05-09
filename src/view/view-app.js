import { Control } from '../utils/control.js';
import { checkKeysCaps } from '../utils/helpers.js';
import { TITLE_CONTENT_RU, TITLE_CONTENT_EN } from '../utils/constants/content.js';

export class ViewApp {
  constructor(root, arrButton, setBtn, setCodeBtn, isLang, isCaps) {
    this.root = root;
    this.textarea = null;
    this.title = null;
    this.render(arrButton, setBtn, setCodeBtn, isLang, isCaps);
  }

  render(arrButton, setBtn, setCodeBtn, isLang, isCaps) {
    const wrapper = new Control(this.root, 'div', 'wrapper');
    const title = new Control(wrapper.node, 'h1', 'title_key', isLang ? TITLE_CONTENT_RU : TITLE_CONTENT_EN);
    this.title = title.node;
    const container = new Control(wrapper.node, 'div', 'container');
    const monitorWrap = new Control(container.node, 'div', 'wrapper_monitor');
    const monitor = new Control(monitorWrap.node, 'textarea', 'monitor');
    this.textarea = monitor.node;
    const keyboardWrap = new Control(container.node, 'div', 'wrapper_keyboard');
    const line = new Control(keyboardWrap.node, 'div', 'line');
    for (let i = 0; i < arrButton.length; i += 1) {
      const getLangContent = isLang ? arrButton[i].keyRu : arrButton[i].keyEng;
      const getContentSize = isCaps ? getLangContent.toUpperCase() : getLangContent.toLowerCase();
      const getCheckContentSize = checkKeysCaps(arrButton[i].code) ? getContentSize : getLangContent;
      const button = new Control(line.node, 'button', arrButton[i].className, getCheckContentSize);
      setBtn(button.node);
      setCodeBtn(arrButton[i].code, i);
    }
  }
}
