import { Control } from '../utils/control.js';

export class ViewApp {
  constructor(root, arrButton, setBtn, setCodeBtn) {
    this.root = root;
    this.textarea = null;
    this.render(arrButton, setBtn, setCodeBtn);
  }

  render(arrButton, setBtn, setCodeBtn) {
    const wrapper = new Control(this.root, 'div', 'wrapper');
    const titleIgnore = new Control(
      wrapper.node,
      'h1',
      'title_key',
      'Для переключения языка используется комбинация: левыe shift + alt'
    );
    const container = new Control(wrapper.node, 'div', 'container');
    const monitorWrap = new Control(container.node, 'div', 'wrapper_monitor');
    const monitor = new Control(monitorWrap.node, 'textarea', 'monitor');
    const keyboardWrap = new Control(container.node, 'div', 'wrapper_keyboard');
    const line = new Control(keyboardWrap.node, 'div', 'line');
    for (let i = 0; i < arrButton.length; i += 1) {
      const button = new Control(line.node, 'button', arrButton[i].className, arrButton[i].keyEng);
      setBtn(button.node);
      setCodeBtn(arrButton[i].code, i);
    }
    this.textarea = monitor.node;
  }
}
