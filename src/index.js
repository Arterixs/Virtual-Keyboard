import { arrButtonData } from './data/data-array-btn.js';
import { ControllerApp } from './controller/controller-app.js';

(function () {
  const controller = new ControllerApp(document.body, arrButtonData);
  document.addEventListener('keydown', (e) => {
    e.preventDefault();
    controller.keyDown(e.code);
  });
  document.addEventListener('keyup', (e) => {
    e.preventDefault();
    controller.keyUp(e.code);
  });
})();
