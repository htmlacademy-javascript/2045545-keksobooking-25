import {
  createMarker
} from './map.js';
import {
  resetForm
} from './utils.js';
import './validation.js';

import './map.js';
import './slider.js';
import './api.js';
import {
  setUserFormSubmit
} from './validation.js';
import {
  getData,
} from './api.js';

const MAX_ADVERTS_QUANTITY = 10;

const resetButton = document.querySelector('.ad-form__reset');

getData((adverts) => {
  const maxQtyAdverts = adverts.slice(0, MAX_ADVERTS_QUANTITY);
  maxQtyAdverts.forEach((advert) => {
    createMarker(advert);
  });
});

setUserFormSubmit();

resetButton.addEventListener('click', resetForm);
