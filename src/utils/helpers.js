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
