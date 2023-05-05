export const getNewString = (positionCaret, oldText, newText) => {
  const oneHalfString = oldText.slice(0, positionCaret);
  const twoHalfString = oldText.slice(positionCaret);
  return `${oneHalfString}${newText}${twoHalfString}`;
};
