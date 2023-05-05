export class Control {
  constructor(parent, tag, className, textContent = "") {
    this.node = document.createElement(tag);
    this.node.className = className;
    if (textContent) {
      this.node.textContent = textContent;
    }
    parent.append(this.node);
  }

  destroy() {
    this.node.remove();
  }
}
