import {
  renderPopup
} from './popup.js';
import {
  createAdverts
} from './data.js';
import {
  deactivateForm,
  activateForm
} from './form.js';

const adverts = createAdverts();
renderPopup(adverts[0]);

deactivateForm();
activateForm();
