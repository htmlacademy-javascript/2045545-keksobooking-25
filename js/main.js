import {
  createAdverts
} from './data.js';
import {
  createMarker
} from './map.js';

import './validation.js';

import './map.js';
import './slider.js';

const adverts = createAdverts();

adverts.forEach((advert) => {
  createMarker(advert);
});
