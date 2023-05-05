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
      const keyCode = this.model.collectionCodeBtn.get(code);
      const btn = this.model.arrayBtn[keyCode];
      btn.classList.remove('active');
    }
  }

  keyDown(code) {
    if (this.model.collectionCodeBtn.has(code)) {
      const keyCode = this.model.collectionCodeBtn.get(code);
      const btn = this.model.arrayBtn[keyCode];
      btn.classList.add('active');
    }
  }
}
