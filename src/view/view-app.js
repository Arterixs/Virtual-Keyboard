import { Control } from '../utils/control.js';

export class ViewApp {
  constructor(root, arrButton) {
    this.root = root;
    this.arrButton = arrButton;
    this.render();
  }

  render() {
    const wrapper = new Control(this.root, 'div', 'wrapper');
    const titleIgnore = new Control(
      wrapper.node,
      'h1',
      'title_key',
      'Для переключения языка используется комбинация: левыe shift + alt'
    );
    const container = new Control(wrapper.node, 'div', 'container');
    const monitorWrap = new Control(container.node, 'div', 'wrapper_monitor');
    const monitorIgnore = new Control(monitorWrap.node, 'textarea', 'monitor');
    const keyboardWrap = new Control(container.node, 'div', 'wrapper_keyboard');
    const line = new Control(keyboardWrap.node, 'div', 'line');
    for (let i = 0; i < this.arrButton.length; i += 1) {
      const button = new Control(line.node, 'button', this.arrButton[i].className);
      const spanIgnore = new Control(button.node, 'span', 'button__span', this.arrButton[i].keyEng);
    }
  }
}
