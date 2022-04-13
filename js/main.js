import {
  createMarker
} from './map.js';
import {
  resetForm, debounce
} from './utils.js';
import {renderFilteredAdverts} from './popup.js';
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
import {setFilter} from './filters.js';
import './photos.js';


const RERENDER_DELAY = 500;

const resetButton = document.querySelector('.ad-form__reset');


getData((adverts) => {
  renderFilteredAdverts(adverts, createMarker);
  setFilter(debounce(()=>renderFilteredAdverts(adverts, createMarker), RERENDER_DELAY,));
});


setUserFormSubmit();

resetButton.addEventListener('click', resetForm);
