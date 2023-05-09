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
} from './constants/code-key.js';

export const getNewString = (positionCaret, oldText, newText, code) => {
  const isKeyBackspace = code === BACKSPACE;
  if (!positionCaret && isKeyBackspace) return oldText;
  const isKeyDelete = code === DELETE;
  const endOfLine = isKeyBackspace ? positionCaret - 1 : positionCaret;
  const startOfLine = isKeyDelete ? positionCaret + 1 : positionCaret;
  const oneHalfString = oldText.slice(0, endOfLine);
  const twoHalfString = oldText.slice(startOfLine);
  const newString =
    isKeyBackspace || isKeyDelete ? `${oneHalfString}${twoHalfString}` : `${oneHalfString}${newText}${twoHalfString}`;
  return newString;
};

export const getNewPositionCaret = (code, position, content) => {
  if (code === ENTER) return position + 1;
  if (code === BACKSPACE) return position ? position - 1 : position;
  if (code === DELETE) return position;
  return position + content.length;
};

export const arrowApi = (direction, typeLine) => {
  const selection = getSelection();
  selection.modify('move', direction, typeLine);
};

export const checkKeysCaps = (code) => {
  switch (code) {
    case TAB:
    case CAPS_LOCK:
    case SHIFT_LEFT:
    case SHIFT_RIGHT:
    case CONTROL_LEFT:
    case WIN:
    case ALT_LEFT:
    case SPACE:
    case ALT_RIGHT:
    case CONTROL_RIGHT:
    case ARROW_LEFT:
    case ARROW_RIGHT:
    case ARROW_DOWN:
    case ARROW_UP:
    case ENTER:
    case BACKSPACE:
    case DELETE:
      return false;
    default:
      return true;
  }
};

export const changeShiftTextContent = (button, isShift, isCaps) => {
  if (isShift) {
    button.textContent = isCaps ? button.textContent.toLowerCase() : button.textContent.toUpperCase();
  } else {
    button.textContent = isCaps ? button.textContent.toUpperCase() : button.textContent.toLowerCase();
  }
};

export const getStateStorageCaps = () => localStorage.getItem('capsLockState') || false;
export const getStateStorageLang = () => localStorage.getItem('languageState') || false;
export const setStateStorageCaps = (state) => {
  localStorage.setItem('capsLockState', state);
};
export const setStateStorageLang = (state) => {
  localStorage.setItem('languageState', state);
};
