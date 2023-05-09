import { arrButtonData } from './script/data/data-array-btn.js';
import { ControllerApp } from './script/controller/controller-app.js';
import { F12 } from './script/utils/constants/code-key.js';

(function start() {
  const controller = new ControllerApp(document.body, arrButtonData);
  document.addEventListener('keydown', (e) => {
    if (e.code !== F12) {
      e.preventDefault();
    }
    controller.keyDown(e.code);
  });
  document.addEventListener('keyup', (e) => {
    if (e.code !== F12) {
      e.preventDefault();
    }
    controller.keyUp(e.code);
  });
})();
