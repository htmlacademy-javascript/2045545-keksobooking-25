import {
  createMarker, clearMap
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
import {compareAdverts,setHousingType} from './filters.js';

const MAX_ADVERTS_QUANTITY = 10;

const resetButton = document.querySelector('.ad-form__reset');

const renderAdverts =(adverts, cb)=>{
  clearMap();
  const advertsArrayCopy=adverts.slice();
  advertsArrayCopy.sort(compareAdverts);
  const maxQtyAdverts = advertsArrayCopy.slice(0, MAX_ADVERTS_QUANTITY);
  maxQtyAdverts.forEach((advert) => {
    cb(advert);
  });
};

getData((adverts) => {
  renderAdverts(adverts, createMarker);
  setHousingType(()=>renderAdverts(adverts, createMarker));
});


setUserFormSubmit();

resetButton.addEventListener('click', resetForm);
