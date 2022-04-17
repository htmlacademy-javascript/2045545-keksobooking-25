import {
  sendData
} from './api.js';
import {
  getRussianTypeWord
} from './dictionary.js';
import {
  closePopup,
} from './utils.js';
import {
  createErrorMessage,
  createSuccessMessage
} from './messages.js';
import { resetFilters } from './filters.js';
import { removeAvatarPreview, removePhotoPreviews } from './photos.js';

const DEFAULT_PRICE_PLACEHOLDER=5000;

const form = document.querySelector('.ad-form');
const type = form.querySelector('[name="type"]');
const price = form.querySelector('#price');
const sliderElement = document.querySelector('.ad-form__slider');


const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const guestNumberOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const PRICE_MIN =0;
const PRICE_MAX=100000;
const START_SLIDER_POSITION=5000;
const SLIDER_STEP=1;


let priceIsChanged = 0;
let userSetPrice = 0;

pristine.addValidator(
  form.querySelector('#title'),
  validateTitle);

const validatePrice = () =>   price.value >= minPrice[type.value];

const getPriceErrorMessage = () =>
  `Не менее ${minPrice[type.value]} р/ночь при типе жилья "${getRussianTypeWord(type.value).toLowerCase()}"`;


pristine.addValidator(price, validatePrice, getPriceErrorMessage);


const onPriceChange =()=> {
  priceIsChanged =1;
  userSetPrice = price.value;
  sliderElement.noUiSlider.set(price.value);
};

const onTypeChange = () => {
  if (priceIsChanged) {
    price.value = userSetPrice;
    price.placeholder=userSetPrice;
  }
  else   {
    price.placeholder = minPrice[type.value];
  }
  pristine.validate(price);
};


price.addEventListener('change', onPriceChange);
type.addEventListener('change', onTypeChange);


const roomNumber = form.querySelector('#room_number');
const guestNumber = form.querySelector('#capacity');


const validateGuestNumber = () => guestNumberOptions[roomNumber.value].includes(guestNumber.value);


const getGuestNumberErrorMessage = () => `Для ${roomNumber.value} ${roomNumber.value==='1' ? 'комнаты': 'комнат'} количество гостей ${guestNumber.value} невозможно`;


const onRoomOrGuestChange = () => {
  getGuestNumberErrorMessage();
  pristine.validate(guestNumber);
  pristine.validate(roomNumber);
};

roomNumber.addEventListener('change', onRoomOrGuestChange);
roomNumber.addEventListener('focus', onRoomOrGuestChange);
guestNumber.addEventListener('change', onRoomOrGuestChange);
guestNumber.addEventListener('focus', onRoomOrGuestChange);


pristine.addValidator(roomNumber, validateGuestNumber, getGuestNumberErrorMessage);
pristine.addValidator(guestNumber, validateGuestNumber, getGuestNumberErrorMessage);


const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');

const validateTimeinTimeout = () => timein.value === timeout.value;
const onTimeinTimeoutChangeSynchronize = (evt) => {
  if (evt.target === timein) {
    timeout.value = timein.value;
  } else {
    timein.value = timeout.value;
  }
};

pristine.addValidator(timein, validateTimeinTimeout);
pristine.addValidator(timeout, validateTimeinTimeout);

timein.addEventListener('change', onTimeinTimeoutChangeSynchronize);
timeout.addEventListener('change', onTimeinTimeoutChangeSynchronize);

const submitButton = form.querySelector('.ad-form__submit');


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetPricePlaceholder=()=>{
  price.placeholder=DEFAULT_PRICE_PLACEHOLDER;
};

const resetSlider=()=> {
  sliderElement.noUiSlider.set(price.placeholder);
};

const resetForm = () => {
  closePopup();
  removeAvatarPreview();
  removePhotoPreviews();
  resetSlider();
  resetFilters();
  resetPricePlaceholder();
};


const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          createSuccessMessage();
          form.reset();
          closePopup();
        },
        () => {
          createErrorMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
      resetForm();
    }
  });
};


noUiSlider.create(sliderElement, {
  range: {
    min: PRICE_MIN,
    max: PRICE_MAX,
  },
  start: START_SLIDER_POSITION,
  step: SLIDER_STEP,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => value
  }

});


const putUserPriceToPriceInput = () => {
  price.value = sliderElement.noUiSlider.get();
  userSetPrice = price.value;
  pristine.validate(price);
};


sliderElement.noUiSlider.on('update', () => {
  putUserPriceToPriceInput();
});

sliderElement.noUiSlider.on('slide', () => {
  putUserPriceToPriceInput();
  priceIsChanged = 1;
});

priceIsChanged = 0;

type.addEventListener('change', () => {
  sliderElement.noUiSlider.set(price.placeholder);
});


export {
  setUserFormSubmit, resetForm};
