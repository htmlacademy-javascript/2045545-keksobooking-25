const closePopup = () => {
  const popup = document.querySelector('.leaflet-popup-pane');
  while (popup.firstChild) {
    popup.removeChild(popup.firstChild);
  }
};

const resetForm = () => {
  closePopup();
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {
  // getRandomPositiveInteger,
  // getRandomPositiveFloat,
  // getRandomArrayElement,
  // fillIncludedElementsArray,
  // repeatStr,
  // createRandomNumbersArray,
  closePopup,
  resetForm,
  debounce,
};
