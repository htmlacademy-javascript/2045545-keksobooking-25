import {
  renderPopup
} from './popup.js';
import {
  createAdverts
} from './data.js';


const adverts = createAdverts();
renderPopup(adverts[0]);
