export const getNewString = (positionCaret, oldText, newText, code) => {
  const isKeyBackspace = code === 'Backspace';
  if (!positionCaret && isKeyBackspace) return oldText;
  const isKeyDelete = code === 'Delete';
  const endOfLine = isKeyBackspace ? positionCaret - 1 : positionCaret;
  const startOfLine = isKeyDelete ? positionCaret + 1 : positionCaret;
  const oneHalfString = oldText.slice(0, endOfLine);
  const twoHalfString = oldText.slice(startOfLine);
  const newString =
    isKeyBackspace || isKeyDelete ? `${oneHalfString}${twoHalfString}` : `${oneHalfString}${newText}${twoHalfString}`;
  return newString;
};

export const getNewPositionCaret = (code, position, content) => {
  if (code === 'Enter') return position + 1;
  if (code === 'Backspace') return position ? position - 1 : position;
  if (code === 'Delete') return position;
  return position + content.length;
};

export const arrowApi = (direction, typeLine) => {
  const selection = getSelection();
  selection.modify('move', direction, typeLine);
};

export const checkKeysCaps = (code) => {
  switch (code) {
    case 'Tab':
      return false;
    case 'CapsLock':
      return false;
    case 'ShiftLeft':
      return false;
    case 'ShiftRight':
      return false;
    case 'ControlLeft':
      return false;
    case 'WakeUp':
      return false;
    case 'AltLeft':
      return false;
    case 'Space':
      return false;
    case 'AltRight':
      return false;
    case 'ControlRight':
      return false;
    case 'ArrowLeft':
      return false;
    case 'ArrowUp':
      return false;
    case 'ArrowRight':
      return false;
    case 'ArrowDown':
      return false;
    case 'Enter':
      return false;
    case 'Backspace':
      return false;
    case 'Delete':
      return false;
    default:
      return true;
  }
};
