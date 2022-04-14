const popup = document.querySelector('.leaflet-popup-pane');

const closePopup = () => {
  while (popup.firstChild) {
    popup.removeChild(popup.firstChild);
  }
};


const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {
  closePopup,
  debounce,
};
