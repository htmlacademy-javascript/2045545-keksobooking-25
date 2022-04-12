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
import {setFilter, checkByType, checkByPrice, checkByRooms, checkByGuests, checkByFeature, compareAdverts} from './filters.js';


const MAX_ADVERTS_QUANTITY = 10;
const RERENDER_DELAY = 500;

const resetButton = document.querySelector('.ad-form__reset');

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const renderAdverts =(adverts,  cb)=>{
  clearMap();
  const advertsArrayCopy=adverts.slice();
  let checked= checkByType(advertsArrayCopy);
  checked= checkByPrice(checked);
  checked =checkByRooms(checked);
  checked =checkByGuests(checked);
  checked=checkByFeature(checked, 'wifi');
  checked=checkByFeature(checked, 'dishwasher');
  checked=checkByFeature(checked, 'parking');
  checked=checkByFeature(checked, 'washer');
  checked=checkByFeature(checked, 'elevator');
  checked=checkByFeature(checked, 'conditioner');
  checked=checked.sort(compareAdverts);
  const maxQtyAdverts = checked.slice(0, MAX_ADVERTS_QUANTITY);
  maxQtyAdverts.forEach((advert) => {
    cb(advert);
  });
};

getData((adverts) => {
  renderAdverts(adverts, createMarker);
  setFilter(debounce(()=>renderAdverts(adverts, createMarker), RERENDER_DELAY,));
});


setUserFormSubmit();

resetButton.addEventListener('click', resetForm);
