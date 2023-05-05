import { arrButtonData } from "./data/data-array-btn.js";
import { Control } from "./utils/control.js";

class Regen {
  constructor(nameElement) {
    this.nameElement = nameElement;
  }

  createElemBody(parent, classEl) {
    const div = document.createElement(this.nameElement);

    if (this.nameElement === "textarea") {
      div.setAttribute("id", "textarea");
      div.setAttribute("autofocus", "autofocus");
    }
    div.className = classEl;
    parent.append(div);
    return this;
  }

  creatText(parent, classEl, text) {
    const str = document.createElement(this.nameElement);

    str.className = classEl;
    str.innerHTML = text;
    parent.prepend(str);
  }

  createButton(parent, classEl) {
    for (let i = 0; i < 64; i += 1) {
      const btn = document.createElement(this.nameElement);
      const p = document.createElement("p");

      btn.className = classEl;
      btn.setAttribute("id", arrButtonData[i].code);
      btn.onclick = inputValue;
      p.className = "btnName";
      p.setAttribute("id", arrButtonData[i].keyCode);
      p.innerHTML = arrButtonData[i].keyEng;
      parent.append(btn);
      btn.append(p);
      if (i === 13) {
        btn.className = `${classEl} backspace`;
        btn.onclick = logicBack;
      }
      if (i === 14) {
        btn.className = `${classEl} tab`;
        btn.onclick = logicTab;
      }
      if (i === 28) {
        btn.className = `${classEl} delete`;
        btn.onclick = logicDelete;
      }
      if (i === 29) {
        btn.className = `${classEl} capsLock`;
        btn.onclick = logicCaps;
      }
      if (i === 41) {
        btn.className = `${classEl} enter`;
        btn.onclick = logicEnter;
      }
      if (i === 42) {
        btn.className = `${classEl} shift`;
        btn.onmousedown = logicShift;
        p.onmouseup = shiftMouseUp;
      }
      if (i === 54) {
        btn.className = `${classEl} shift`;
        btn.onmousedown = logicShift;
        p.onmouseup = shiftMouseUp;
      }
      if (i === 58) {
        btn.className = `${classEl} space`;
        btn.onclick = logicSpace;
      }
      if (i === 62 || i === 61 || i === 60 || i === 53) {
        p.className = "btnName arrow";
      }
    }
  }
}

const regen = new Regen("div");
const textarea = new Regen("textarea");
const h1 = new Regen("h1");
const but = new Regen("button");

regen.createElemBody(document.body, "wrapper");
h1.creatText(document.body.childNodes[7], "title_key", "Virtual Keyboard");
regen.createElemBody(document.body.childNodes[7], "container");
regen.createElemBody(document.body.childNodes[7].lastChild, "wrapper_monitor");
textarea.createElemBody(
  document.body.childNodes[7].lastChild.firstChild,
  "monitor"
);
regen.createElemBody(document.body.childNodes[7].lastChild, "wrapper_keyboard");
regen.createElemBody(document.body.childNodes[7].lastChild.lastChild, "line");
but.createButton(
  document.body.childNodes[7].lastChild.lastChild.firstChild,
  "button"
);

function logicBack() {
  const valueText = document.getElementById("textarea").value;
  const idText = document.getElementById("textarea");
  if (idText.selectionStart !== idText.selectionEnd) {
    const range = valueText.slice(idText.selectionStart, idText.selectionEnd);
    const sub = valueText.indexOf(range, idText.selectionStart);
    document.getElementById("textarea").value =
      valueText.substring(0, sub) + valueText.substring(sub + range.length);
    idText.focus();
    idText.selectionStart = sub;
    idText.selectionEnd = sub;
  } else {
    const positionCursor = valueText.slice(
      idText.selectionStart - 1,
      idText.selectionEnd
    );
    const pub = valueText.indexOf(positionCursor, idText.selectionStart - 1);
    if (idText.selectionStart === 0) {
      idText.focus();
      idText.selectionStart = pub;
      idText.selectionEnd = pub;
    } else {
      document.getElementById("textarea").value =
        valueText.substring(0, pub) + valueText.substring(pub + 1);
      idText.focus();
      idText.selectionStart = pub;
      idText.selectionEnd = pub;
    }
  }
}

function logicDelete() {
  const valueText = document.getElementById("textarea").value;
  const idText = document.getElementById("textarea");
  if (idText.selectionStart !== idText.selectionEnd) {
    const range = valueText.slice(idText.selectionStart, idText.selectionEnd);
    const sub = valueText.indexOf(range, idText.selectionStart - 2);
    document.getElementById("textarea").value =
      valueText.substring(0, sub) + valueText.substring(sub + range.length);
    idText.focus();
    idText.selectionStart = sub;
    idText.selectionEnd = sub;
  } else {
    const positionCursor = valueText.slice(
      idText.selectionStart,
      idText.selectionEnd + 1
    );
    const pub = valueText.indexOf(positionCursor, idText.selectionEnd);
    document.getElementById("textarea").value =
      valueText.substring(0, pub) + valueText.substring(pub + 1);
    idText.focus();
    idText.selectionStart = pub;
    idText.selectionEnd = pub;
  }
}

function logicSpace() {
  const valueText = document.getElementById("textarea").value;
  const idText = document.getElementById("textarea");
  if (idText.selectionStart !== idText.selectionEnd) {
    const range = valueText.slice(idText.selectionStart, idText.selectionEnd);
    const sub = valueText.indexOf(range, idText.selectionStart - 2);
    document.getElementById("textarea").value = `${valueText.substring(
      0,
      sub
    )} ${valueText.substring(sub + range.length)}`;
    idText.focus();
    idText.selectionStart = sub + 1;
    idText.selectionEnd = sub + 1;
  } else {
    const positionCursor = valueText.slice(
      idText.selectionStart,
      idText.selectionEnd + 1
    );
    const pub = valueText.indexOf(positionCursor, idText.selectionStart);
    document.getElementById("textarea").value = `${valueText.substring(
      0,
      pub
    )} ${valueText.substring(pub)}`;
    idText.focus();
    idText.selectionStart = pub + 1;
    idText.selectionEnd = pub + 1;
  }
}

function logicTab(event) {
  event.preventDefault();
  const valueText = document.getElementById("textarea").value;
  const idText = document.getElementById("textarea");
  const positionCursor = valueText.slice(
    idText.selectionStart,
    idText.selectionEnd + 1
  );
  const pos = valueText.indexOf(positionCursor, idText.selectionStart);

  document.getElementById("textarea").value = `${valueText.substring(
    0,
    pos
  )}\t${valueText.substring(pos)}`;
  idText.focus();
  idText.selectionStart = pos + 1;
  idText.selectionEnd = pos + 1;
}

function logicEnter(event) {
  event.preventDefault();
  const valueText = document.getElementById("textarea").value;
  const idText = document.getElementById("textarea");
  const positionCursor = valueText.slice(
    idText.selectionStart,
    idText.selectionEnd
  );
  const pub = valueText.indexOf(positionCursor, idText.selectionStart);
  const position = valueText.slice(0, pub);
  document.getElementById("textarea").value = `${valueText.substring(
    0,
    pub
  )}\n${valueText.substring(pub)}`;
  idText.focus();
  idText.selectionStart = position.length + 1;
  idText.selectionEnd = position.length + 1;
}

function logicShift() {
  if (localStorage.getItem("language") === "en") {
    arrButtonData.forEach((item) => {
      const valueBut = document.getElementById(`${item.keyCode}`);
      valueBut.textContent = item.keyShiftEN;
    });
  } else {
    arrButtonData.forEach((item) => {
      const valueBut = document.getElementById(`${item.keyCode}`);
      valueBut.textContent = item.keyShiftRu;
    });
  }
}

function shiftMouseUp() {
  if (localStorage.getItem("language") === "en") {
    arrButtonData.forEach((item) => {
      const valueBut = document.getElementById(`${item.keyCode}`);
      valueBut.textContent = item.keyEng;
    });
  } else {
    arrButtonData.forEach((item) => {
      const valueBut = document.getElementById(`${item.keyCode}`);
      valueBut.textContent = item.keyRu;
    });
  }
}

function logicCaps() {
  if (localStorage.getItem("language") === "en") {
    if (localStorage.getItem("caps") !== "off") {
      arrButtonData.forEach((item) => {
        if (item.code === "Key" + `${item.keyShiftEN}`) {
          const valueBut = document.getElementById(`${item.keyCode}`);
          valueBut.textContent = item.keyEng;
        }
      });
      return localStorage.setItem("caps", "off");
    }
    arrButtonData.forEach((item) => {
      const valueBut = document.getElementById(`${item.keyCode}`);
      valueBut.textContent = item.keyShiftEN;
    });
    return localStorage.removeItem("caps");
  }
  if (localStorage.getItem("caps") !== "off") {
    arrButtonData.forEach((item) => {
      if (item.code === `${item.code}`) {
        const valueBut = document.getElementById(`${item.keyCode}`);
        valueBut.textContent = item.keyRu;
      }
    });
    return localStorage.setItem("caps", "off");
  }
  arrButtonData.forEach((item) => {
    const valueBut = document.getElementById(`${item.keyCode}`);
    valueBut.textContent = item.keyCapsRu;
  });
  return localStorage.removeItem("caps");
}

function inputValue() {
  const res = this.id;
  const idText = document.getElementById("textarea");
  arrButtonData.forEach((item) => {
    if (
      res === item.code &&
      res !== "ShiftLeft" &&
      res !== "ShiftRight" &&
      res !== "ControlLeft" &&
      res !== "ControlRight" &&
      res !== "AltLeft" &&
      res !== "AltRight" &&
      res !== "WakeUp"
    ) {
      document.getElementById("textarea").value += document.getElementById(
        `${item.code}`
      ).textContent;
      idText.focus();
    } else {
      idText.focus();
    }
  });
}

const idText = document.getElementById("textarea");
idText.focus();

document.addEventListener("keydown", (KeyboardEvent) => {
  if (KeyboardEvent.keyCode === 9) {
    logicTab();
    KeyboardEvent.preventDefault();
  }
  if (KeyboardEvent.keyCode === 20) {
    logicCaps();
    KeyboardEvent.preventDefault();
  }
  if (KeyboardEvent.keyCode === 16) {
    logicShift();
    KeyboardEvent.preventDefault();
  }
  if (
    KeyboardEvent.keyCode === 39 ||
    KeyboardEvent.keyCode === 40 ||
    KeyboardEvent.keyCode === 37 ||
    KeyboardEvent.keyCode === 38
  ) {
    KeyboardEvent.preventDefault();
    arrButtonData.forEach((item) => {
      if (item.code === KeyboardEvent.code) {
        idText.value += document.getElementById(`${item.code}`).textContent;
      }
    });
  }
  if (KeyboardEvent.keyCode === 18) {
    KeyboardEvent.preventDefault();
  }
  arrButtonData.forEach((item) => {
    if (KeyboardEvent.code === item.code) {
      document.getElementById(`${item.code}`).classList.add("active");
    }
  });
  idText.focus();
});

document.addEventListener("keyup", (KeyboardEvent) => {
  arrButtonData.forEach((item) => {
    if (KeyboardEvent.code === item.code) {
      document.getElementById(`${item.code}`).classList.remove("active");
    }
  });
  if (KeyboardEvent.keyCode === 16) {
    shiftMouseUp();
  }
});

function layoutEn() {
  if (localStorage.getItem("language") === "en") {
    arrButtonData.forEach((item) => {
      const valueBut = document.getElementById(`${item.keyCode}`);
      valueBut.textContent = item.keyRu;
    });
    return localStorage.removeItem("language");
  }
  arrButtonData.forEach((item) => {
    const valueBut = document.getElementById(`${item.keyCode}`);
    valueBut.textContent = item.keyEng;
  });
  return localStorage.setItem("language", "en");
}

const layoutBtn = (...btnKeys) => {
  const pressed = new Set();
  document.addEventListener("keydown", (KeyboardEvent) => {
    pressed.add(KeyboardEvent.code);
    for (let i = 0; i < btnKeys.length; i += 1) {
      if (!pressed.has(btnKeys[i])) {
        return;
      }
    }
    pressed.clear();
    layoutEn();
  });
  document.addEventListener("keyup", (KeyboardEvent) => {
    pressed.delete(KeyboardEvent.code);
    document.getElementById(`${btnKeys[0]}`).classList.remove("active");
    document.getElementById(`${btnKeys[1]}`).classList.remove("active");
  });
};

layoutBtn("ShiftLeft", "AltLeft");

window.addEventListener("beforeunload", (layoutEn(), logicCaps()));
window.addEventListener("load", (layoutEn(), logicCaps()));
