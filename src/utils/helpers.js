export const getNewString = (positionCaret, oldText, newText) => {
  const oneHalfString = oldText.slice(0, positionCaret);
  const twoHalfString = oldText.slice(positionCaret);
  return `${oneHalfString}${newText}${twoHalfString}`;
};

export const getDeleteString = (positionCaret, oldText) => {
  if (positionCaret) {
    const oneHalfString = oldText.slice(0, positionCaret - 1);
    const twoHalfString = oldText.slice(positionCaret);
    return `${oneHalfString}${twoHalfString}`;
  }
  return oldText;
};

export const getDelString = (positionCaret, oldText) => {
  if (positionCaret) {
    const oneHalfString = oldText.slice(0, positionCaret);
    const twoHalfString = oldText.slice(positionCaret + 1);
    return `${oneHalfString}${twoHalfString}`;
  }
  return oldText;
};
